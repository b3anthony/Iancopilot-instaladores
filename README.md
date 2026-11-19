# Cómo instalar Ian Copilot

Ian Copilot es el asistente de programación con IA de Giantucchi. Funciona dentro de **VS Code** y
de **Antigravity**: chat, modo Agente, edición de código, las skills de la empresa y tus
actividades de IAN.

Tiempo: unos 5 minutos.

## 1. Antes de empezar

Necesitas:

| Qué | Para qué |
|---|---|
| **Windows 10 u 11 (64 bits)** o **Linux (64 bits)** | Son los sistemas para los que hay instalador. Mac todavía no |
| **VS Code** (1.70 o posterior) o **Antigravity** | Es donde se instala Ian Copilot |
| **IAN de escritorio**, con tu cuenta vinculada | Ian Copilot usa tu cuenta de IAN: sin ella no verás tus actividades ni las skills de tu cargo |
| Una cuenta de **GitHub** con acceso a `giantucchi-org/Iancopilot-instaladores` | Para descargar el instalador. Si no lo tienes, pásale tu usuario de GitHub al responsable de Ian Copilot |

Para los **modelos de IA** se usa tu propia suscripción. Si tienes **Claude Code** o **Antigravity**
instalado y con la sesión iniciada en tu equipo, sus modelos aparecen solos en Ian Copilot.

## 2. Descargar el instalador

1. Entra en **https://github.com/giantucchi-org/Iancopilot-instaladores/releases** con tu cuenta
   de GitHub. Ese repositorio solo contiene los instaladores; el código de Ian Copilot está
   aparte.
2. Abre la versión más reciente (la de arriba, marcada como *Latest*).
3. En **Assets**, descarga el archivo de tu sistema:

| Tu sistema | Archivo |
|---|---|
| Windows 10 / 11 | `ian-copilot-win32-x64-<versión>.vsix` |
| Linux | `ian-copilot-linux-x64-<versión>.vsix` |

El `.vsix` no se abre con doble clic: se instala desde VS Code o Antigravity (paso 3).

**Opcional, comprobar que el archivo llegó entero.** En la misma página está `SHA256SUMS.txt`, con
la huella de cada archivo. Compara la tuya con la de ese archivo:

- Windows (PowerShell): `Get-FileHash .\ian-copilot-win32-x64-<versión>.vsix`
- Linux: `sha256sum ian-copilot-linux-x64-<versión>.vsix`

## 3. Instalar

### En VS Code o Antigravity, con el ratón

1. Abre **Extensiones**: `Ctrl+Shift+X`.
2. Arriba a la derecha del panel, pulsa los **tres puntos (`···`)**.
3. Elige **Install from VSIX…** («Instalar desde VSIX…»).
4. Busca el `.vsix` que descargaste y pulsa **Install**.
5. Cuando diga *Completed installing extension*, recarga la ventana: `Ctrl+Shift+P` →
   **Developer: Reload Window**.

### Con la terminal (alternativa)

```bash
code --install-extension ian-copilot-win32-x64-<versión>.vsix     # VS Code en Windows
code --install-extension ian-copilot-linux-x64-<versión>.vsix     # VS Code en Linux
```

### Comprobar que se instaló bien

En Extensiones, busca **Ian Copilot**. Debe salir con el editor **giantucchi** y, en la ficha,
el identificador `giantucchi.ian-copilot`. Si ves «Continue» o el editor «Continue», no es este.

## 4. Primer uso

1. En la barra lateral izquierda aparece el icono de **Ian Copilot**. Púlsalo.
2. La primera vez sale una pantalla que explica **qué datos se guardan**. Léela y elige
   **Acepto** o **No, gracias**. En resumen:
   - **Se guarda**, unido a tu cuenta de IAN, en el servidor de Giantucchi: lo que escribes en el
     chat de Ian Copilot (antes se borran las contraseñas y claves que aparezcan), el modo y el
     modelo que usas, y cómo te fue (si aceptaste los cambios, qué herramientas se usaron, cuántos
     tokens). De esto último, sin texto ni código.
   - **No se guarda**: tu código ni el contenido de tus archivos, las respuestas del modelo, ni lo
     que escribas fuera de Ian Copilot.
   - Puedes cambiar tu decisión cuando quieras en **Ajustes → Privacidad**.
3. Elige un modelo en el selector de debajo del chat (por ejemplo, «Antigravity · …» o
   «Claude …») y escribe tu pregunta.
4. **Skills de Giantucchi:** escribe `/` en el chat para ver las de tu cargo (por ejemplo,
   `/programacion`, `/diseno` o `/seguridad`). Se descargan solas al abrir Ian Copilot. Cada
   persona recibe solo las de su cargo. Si aún no salen, recarga la ventana.
5. **Tus actividades de IAN:** botón de lista en la barra de arriba del panel.

## 5. Actualizar a una versión nueva

Descarga el `.vsix` nuevo y repite el paso 3: sustituye al anterior. Tu configuración, tus
conversaciones y tu decisión sobre los datos se conservan.

## 6. Desinstalar

Extensiones → **Ian Copilot** → **Uninstall** (o, en la terminal,
`code --uninstall-extension giantucchi.ian-copilot`).

## 7. Si algo no funciona

| Qué pasa | Qué hacer |
|---|---|
| No aparece ningún modelo | Instala Claude Code o Antigravity, inicia sesión en él y recarga la ventana (`Ctrl+Shift+P` → *Reload Window*) |
| «Las skills de Giantucchi dependen de tu cuenta de IAN» | Abre IAN de escritorio y vincula tu cuenta. Después, recarga la ventana |
| «Tu cargo (…) todavía no tiene skills de Giantucchi» | Es normal: tu cargo aún no tiene skills asignadas. Si crees que debería, avisa al responsable |
| No salen tus actividades | Comprueba que IAN de escritorio tiene tu cuenta vinculada |
| *Install from VSIX* da un error | Comprueba que descargaste el archivo de tu sistema (Windows o Linux) y que tu VS Code está actualizado |

Para cualquier otro problema, escribe al responsable de Ian Copilot. Indica tu sistema (Windows o
Linux), si usas VS Code o Antigravity, y la versión de Ian Copilot (está en su ficha de
Extensiones).
