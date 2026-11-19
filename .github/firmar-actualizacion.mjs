#!/usr/bin/env node
/**
 * Ian Copilot: firma el manifiesto de una versión para la actualización automática
 * (lo comprueba extensions/vscode/src/ian/selfUpdateCore.ts).
 *
 * Uso (lo ejecuta el flujo «Firmar y publicar» del repositorio de instaladores, que tiene una copia
 * de este archivo; la clave privada está en su secret IAN_UPDATE_SIGNING_KEY):
 *
 *   IAN_UPDATE_SIGNING_KEY="$(cat clave.pem)" node ian-firmar-actualizacion.mjs \
 *     --tag v1.3.42 --dir carpeta-con-los-vsix [--public-key clave.pub.pem] > ian-copilot-update.signed.json
 *
 * Incluye todos los `ian-copilot-<sistema>-<versión>.vsix` de la carpeta. Con --public-key, comprueba
 * además que la firma se verifica con esa clave pública (la que va dentro de la extensión).
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const FILE =
  /^ian-copilot-((?:win32|linux|darwin)-(?:x64|arm64))-(\d+\.\d+\.\d+)\.vsix$/;

export function keyIdOf(publicKey) {
  const key =
    publicKey instanceof crypto.KeyObject
      ? publicKey
      : crypto.createPublicKey(publicKey);
  const der = key.export({ type: "spki", format: "der" });
  return crypto.createHash("sha256").update(der).digest("hex").slice(0, 16);
}

/** Devuelve { payload, signature, keyId } para un objeto manifiesto. */
export function signManifest(manifest, privateKeyPem) {
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  if (privateKey.asymmetricKeyType !== "ed25519") {
    throw new Error("La clave de firma tiene que ser Ed25519.");
  }
  const payload = Buffer.from(JSON.stringify(manifest), "utf8");
  return {
    payload: payload.toString("base64"),
    signature: crypto.sign(null, payload, privateKey).toString("base64"),
    keyId: keyIdOf(crypto.createPublicKey(privateKey)),
  };
}

async function sha256File(file) {
  const hash = crypto.createHash("sha256");
  for await (const chunk of fs.createReadStream(file)) hash.update(chunk);
  return hash.digest("hex");
}

export async function buildManifest(dir, tag) {
  if (!/^v\d+\.\d+\.\d+$/.test(tag))
    throw new Error(`Etiqueta no válida: ${tag}`);
  const version = tag.slice(1);
  const files = {};
  for (const name of fs.readdirSync(dir).sort()) {
    const m = FILE.exec(name);
    if (!m) continue;
    if (m[2] !== version) {
      throw new Error(`${name} no es de la versión ${version}.`);
    }
    const full = path.join(dir, name);
    files[m[1]] = {
      name,
      size: fs.statSync(full).size,
      sha256: await sha256File(full),
    };
  }
  if (Object.keys(files).length === 0) {
    throw new Error(`No hay instaladores de la versión ${version} en ${dir}.`);
  }
  return {
    formatVersion: 1,
    product: "ian-copilot",
    version,
    tag,
    publishedAt: new Date().toISOString(),
    files,
  };
}

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
}

async function main() {
  const tag = arg("--tag");
  const dir = arg("--dir");
  const publicKeyFile = arg("--public-key");
  const key = process.env.IAN_UPDATE_SIGNING_KEY;
  if (!tag || !dir) throw new Error("Faltan --tag y --dir.");
  if (!key) throw new Error("Falta la variable IAN_UPDATE_SIGNING_KEY.");

  const manifest = await buildManifest(dir, tag);
  const signed = signManifest(manifest, key);

  if (publicKeyFile) {
    const pub = fs.readFileSync(publicKeyFile, "utf8");
    const ok =
      signed.keyId === keyIdOf(pub) &&
      crypto.verify(
        null,
        Buffer.from(signed.payload, "base64"),
        crypto.createPublicKey(pub),
        Buffer.from(signed.signature, "base64"),
      );
    if (!ok) {
      throw new Error(
        "La clave privada no corresponde a la clave pública de la extensión.",
      );
    }
  }
  process.stdout.write(JSON.stringify(signed, null, 2) + "\n");
  for (const [platform, f] of Object.entries(manifest.files)) {
    console.error(
      `[firmado] ${platform}: ${f.name} (${f.size} bytes, ${f.sha256})`,
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((e) => {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  });
}
