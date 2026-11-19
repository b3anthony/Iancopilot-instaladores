# Ian Copilot

**El asistente de programación con IA de Giantucchi**, dentro de **VS Code** y de **Antigravity**:
chat, modo Agente, edición de código, las skills de la empresa y tus actividades de IAN.

Instalarlo lleva unos 5 minutos. No hace falta cuenta de GitHub.

- [1. Qué necesitas](#1-qué-necesitas)
- [2. Descargar](#2-descargar)
- [3. Instalar en Windows 10 / 11](#3-instalar-en-windows-10--11)
- [4. Instalar en Linux](#4-instalar-en-linux)
- [5. Abrirlo y empezar a usarlo](#5-abrirlo-y-empezar-a-usarlo)
- [6. Actualizar y desinstalar](#6-actualizar-y-desinstalar)
- [7. Si algo no funciona](#7-si-algo-no-funciona)

## 1. Qué necesitas

| Qué | Para qué |
|---|---|
| **Windows 10 u 11 (64 bits)** o **Linux (64 bits)** | Son los sistemas para los que hay instalador. Mac todavía no |
| **VS Code** actualizado o **Antigravity** | Ian Copilot se instala dentro de uno de ellos |
| **IAN de escritorio**, con tu cuenta vinculada | Para ver tus actividades y las skills de tu cargo. Sin él, Ian Copilot funciona como asistente, pero sin lo de Giantucchi |
| **Claude Code** o **Antigravity**, con tu sesión iniciada | Ian Copilot usa tu propia suscripción: sus modelos aparecen solos |

## 2. Descargar

Entra en **[Releases → la más reciente](../../releases/latest)** y, en **Assets**, descarga el
archivo de tu sistema:

| Tu sistema | Archivo |
|---|---|
| Windows 10 / 11 | `ian-copilot-win32-x64-<versión>.vsix` |
| Linux | `ian-copilot-linux-x64-<versión>.vsix` |

El `.vsix` **no se abre con doble clic**: se instala desde VS Code o Antigravity (pasos 3 y 4).

## 3. Instalar en Windows 10 / 11

### Con el ratón (VS Code o Antigravity)

1. Abre VS Code o Antigravity.
2. Abre **Extensiones**: `Ctrl+Shift+X`.
3. Arriba a la derecha de ese panel, pulsa los **tres puntos (`···`)**.
4. Elige **Install from VSIX…** («Instalar desde VSIX…»).
5. Busca el archivo `ian-copilot-win32-x64-<versión>.vsix` (normalmente en **Descargas**) y pulsa
   **Install**.
6. Cuando diga *Completed installing extension*, recarga la ventana: `Ctrl+Shift+P` →
   escribe **Reload Window** → `Enter`.

### Con PowerShell (solo VS Code)

Abre **PowerShell** (tecla Windows → escribe `PowerShell` → `Enter`) y pega esto. Descarga la
versión más reciente y la instala:

```powershell
cd $HOME\Downloads
$v = (Invoke-RestMethod https://api.github.com/repos/b3anthony/Iancopilot-instaladores/releases/latest).tag_name.TrimStart('v')
Invoke-WebRequest "https://github.com/b3anthony/Iancopilot-instaladores/releases/latest/download/ian-copilot-win32-x64-$v.vsix" -OutFile "ian-copilot-win32-x64-$v.vsix"
code --install-extension ".\ian-copilot-win32-x64-$v.vsix"
```

Después, abre VS Code (o recarga la ventana si ya estaba abierto).

> Si sale *«code» no se reconoce como comando*, VS Code se instaló sin añadirse al PATH. Usa la
> instalación con el ratón, o reinstala VS Code marcando **«Agregar a PATH»**.

## 4. Instalar en Linux

### Con el ratón (VS Code o Antigravity)

Igual que en Windows (paso 3), con el archivo `ian-copilot-linux-x64-<versión>.vsix`.

### Con la terminal (solo VS Code)

Abre una terminal y pega esto. Descarga la versión más reciente y la instala:

```bash
cd ~/Descargas 2>/dev/null || cd ~/Downloads
v=$(curl -sL https://api.github.com/repos/b3anthony/Iancopilot-instaladores/releases/latest | grep -m1 '"tag_name"' | cut -d'"' -f4 | sed 's/^v//')
curl -LO "https://github.com/b3anthony/Iancopilot-instaladores/releases/latest/download/ian-copilot-linux-x64-$v.vsix"
code --install-extension "ian-copilot-linux-x64-$v.vsix"
```

Después, abre VS Code (o recarga la ventana si ya estaba abierto).

> Si instalaste VS Code con **Flatpak**, cambia la última línea por
> `flatpak run com.visualstudio.code --install-extension "ian-copilot-linux-x64-$v.vsix"`.

### Comprobar que se instaló bien (Windows y Linux)

En **Extensiones** (`Ctrl+Shift+X`), busca **Ian Copilot**. Debe salir con el editor
**giantucchi** (identificador `giantucchi.ian-copilot`). Si ves «Continue», no es este.

## 5. Abrirlo y empezar a usarlo

1. **Abre el panel.** Ian Copilot vive en la **barra lateral derecha**. Si no la ves, pulsa
   `Ctrl+Alt+B` o el botón **Ian Copilot** de la barra de estado (abajo a la derecha).
2. **La primera vez** sale una pantalla que explica **qué datos se guardan**. Léela y elige
   **Acepto** o **No, gracias**:
   - **Se guarda**, unido a tu cuenta de IAN, en el servidor de Giantucchi: lo que escribes en el
     chat de Ian Copilot (antes se borran las contraseñas y claves que aparezcan), el modo y el
     modelo que usas, y cómo te fue (si aceptaste los cambios, qué herramientas se usaron, cuántos
     tokens). De esto último, sin texto ni código.
   - **No se guarda**: tu código ni el contenido de tus archivos, las respuestas del modelo, ni lo
     que escribas fuera de Ian Copilot.
   - Puedes cambiar tu decisión cuando quieras en **Ajustes → Privacidad**.
3. **Elige un modelo** en el selector de debajo del chat (por ejemplo, «Claude …» o
   «Antigravity · …») y escribe tu pregunta.

Lo principal:

| Qué | Cómo |
|---|---|
| **Chat** sobre tu código | `Ctrl+L` (si tienes código seleccionado, va con la pregunta) |
| **Editar** un trozo de código | Selecciónalo, `Ctrl+I` y di qué cambiar. Aceptar: `Ctrl+Shift+Enter`; rechazar: `Ctrl+Shift+Retroceso` |
| **Agente**: que haga una tarea completa | Elige el modo **Agente** en el chat. Antes de cada acción te pide permiso |
| **Plan**: que proponga cómo hacerlo, sin tocar nada | Elige el modo **Plan** |
| Añadir contexto (archivos, carpetas, terminal…) | Escribe `@` en el chat |
| **Skills de Giantucchi** de tu cargo | Escribe `/` en el chat (por ejemplo `/programacion`, `/diseno`, `/seguridad`) |
| **Tus actividades de IAN** | Botón de lista en la barra de arriba del panel |
| Autocompletado mientras escribes | Se activa o desactiva con `Ctrl+K` y después `Ctrl+A` |

## 6. Actualizar y desinstalar

- **Actualizar:** descarga el `.vsix` nuevo y repite el paso 3 o 4: sustituye al anterior. Tu
  configuración, tus conversaciones y tu decisión sobre los datos se conservan.
- **Desinstalar:** Extensiones → **Ian Copilot** → **Uninstall**, o en la terminal
  `code --uninstall-extension giantucchi.ian-copilot`.

**Opcional, comprobar que el archivo llegó entero.** En la *Release* está `SHA256SUMS.txt`, con la
huella de cada archivo. Compara la tuya con la de ese archivo:

- Windows (PowerShell): `Get-FileHash .\ian-copilot-win32-x64-<versión>.vsix`
- Linux: `sha256sum ian-copilot-linux-x64-<versión>.vsix`

## 7. Si algo no funciona

| Qué pasa | Qué hacer |
|---|---|
| No veo el panel de Ian Copilot | Pulsa `Ctrl+Alt+B` (barra lateral derecha) o el botón **Ian Copilot** de la barra de estado. Si sigue sin salir, actualiza VS Code |
| No aparece ningún modelo | Instala Claude Code o Antigravity, inicia sesión en él y recarga la ventana (`Ctrl+Shift+P` → *Reload Window*) |
| «Las skills de Giantucchi dependen de tu cuenta de IAN» | Abre IAN de escritorio y vincula tu cuenta. Después, recarga la ventana |
| «Tu cargo (…) todavía no tiene skills de Giantucchi» | Es normal: tu cargo aún no tiene skills asignadas. Si crees que debería, avisa al responsable |
| No salen tus actividades | Comprueba que IAN de escritorio tiene tu cuenta vinculada |
| *Install from VSIX* da un error | Comprueba que descargaste el archivo de tu sistema (Windows o Linux) y que tu VS Code está actualizado |
| *«code» no se reconoce como comando* | Usa la instalación con el ratón (paso 3 o 4) |

Para cualquier otro problema, escribe al responsable de Ian Copilot. Indica tu sistema (Windows o
Linux), si usas VS Code o Antigravity, y la versión de Ian Copilot (está en su ficha de
Extensiones).
