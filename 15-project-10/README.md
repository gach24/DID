# Lista de tareas con React + Vite + Electron

Tutorial paso a paso para construir una aplicación de escritorio sencilla
(una lista de tareas) con **React + Vite** dentro de **Electron**, y
generar un instalador `.exe` con **electron-builder**.

No se asume experiencia previa con Electron.

---

## 0. ¿Qué es Electron?

Electron es un runtime que combina **Chromium** (el motor de Chrome para
renderizar HTML/CSS/JS) con **Node.js** (para acceder al sistema de
ficheros, red, etc.) en una única aplicación de escritorio.

Tiene dos procesos importantes que conviene tener claros desde el principio:

- **Main process** (Node): arranca con la app, crea ventanas, accede al
  sistema operativo. Es el fichero `electron/main.cjs` de este proyecto.
- **Renderer process** (Chromium): cada ventana es un proceso renderer.
  Es donde corre nuestra app React. **No tiene acceso a Node por defecto**
  (por seguridad).
- **Preload script**: puente controlado entre los dos. Se carga en el
  renderer pero tiene acceso a algunas APIs de Node y se comunica con el
  main vía IPC. Es el fichero `electron/preload.cjs`.

En esta práctica el renderer hace todo el trabajo (la UI y el guardado
con `localStorage`). El main solo abre la ventana. Es el caso más simple
para empezar.

---

## 1. Crear el proyecto Vite + React + TS

```bash
npm create vite@latest 15-project-10 -- --template react-ts
cd 15-project-10
npm install
```

> Si en PowerShell el flag `--template` se queda en blanco, usa la
> alternativa: `npx create-vite@latest 15-project-10 --template react-ts`.

## 2. Limpieza inicial

Igual que en proyectos anteriores:

- Borrar `src/App.css` y `src/assets/`.
- Borrar `public/favicon.svg` y `public/icons.svg`.
- Vaciar `src/App.tsx` dejando solo el esqueleto:

```tsx
function App() {
  return (
    <>
    </>
  )
}

export default App
```

- Editar `index.html` para quitar la línea del favicon y poner
  `<title>Task App</title>`.

## 3. Instalar Electron y electron-builder

```bash
npm install --save-dev electron electron-builder concurrently wait-on
```

| Paquete | Para qué sirve |
| --- | --- |
| `electron` | El runtime de Electron. Da el binario `electron` que abre la ventana. |
| `electron-builder` | Empaqueta y firma la app, genera instaladores (NSIS, MSI, etc.). |
| `concurrently` | Lanza dos procesos a la vez (Vite y Electron) en un solo comando. |
| `wait-on` | Espera a que el servidor de Vite esté escuchando antes de arrancar Electron. |

## 4. Crear el proceso main de Electron

Crea la carpeta `electron/` y dentro **`main.cjs`**:

```js
const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 720,
    minWidth: 480,
    minHeight: 480,
    title: 'Task App',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

Y un **`preload.cjs`** mínimo (lo dejamos preparado por si más adelante
quieres usar IPC):

```js
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('app', {
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
});
```

### ¿Por qué `.cjs`?

`package.json` tiene `"type": "module"` (lo necesita Vite). Eso convierte
todos los `.js` en ESM. El proceso main de Electron es más cómodo en
**CommonJS** (`require`, `__dirname` directo, sin asincronía en el
import), así que forzamos la extensión `.cjs` para mezclar ambos mundos
sin pelearnos con configuraciones.

### Notas de seguridad

- `contextIsolation: true` y `nodeIntegration: false` son los **defaults
  recomendados** desde Electron 12+. No los cambies.
- El `sandbox: true` bloquea aún más el renderer. Si no usas APIs de
  Node desde el preload no hay motivo para desactivarlo.

## 5. Configurar Vite

Edita `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    strictPort: true,
  },
})
```

Las dos líneas que importan:

- **`base: './'`** → en producción Electron carga `dist/index.html` con
  `file://`. Sin esta línea Vite genera rutas absolutas (`/assets/...`)
  que en `file://` apuntan a la raíz del disco y la app sale **en
  blanco**. Es el bug más típico la primera vez.
- **`strictPort: true`** → si 5173 está ocupado falla en vez de elegir
  otro puerto, así `wait-on tcp:5173` siempre funciona.

## 6. Configurar `package.json`

Añade el campo `main` y los scripts nuevos:

```json
{
  "main": "electron/main.cjs",
  "scripts": {
    "dev": "vite",
    "dev:electron": "concurrently -k -n vite,electron -c blue,magenta \"npm:dev\" \"wait-on tcp:5173 && electron .\"",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "pack": "npm run build && electron-builder --dir",
    "dist": "npm run build && electron-builder"
  }
}
```

- **`main`** le dice a Electron qué fichero arrancar.
- **`dev:electron`** lanza Vite y, cuando el puerto 5173 responde,
  arranca Electron con `electron .` (que lee `main` del package.json).
  El flag `-k` de concurrently mata todos los procesos al cerrar la
  ventana, evitando un Vite zombi.
- **`pack`** genera la carpeta empaquetada sin instalador (rápido, para
  probar).
- **`dist`** genera el instalador `.exe`.

## 7. Probar en desarrollo

```bash
npm run dev:electron
```

Debería abrirse la ventana de Electron con la app Vite cargada y HMR
funcionando.

## 8. Construir la UI (lista de tareas)

Estructura que vamos a crear:

```
src/
├── components/
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   └── TaskList.tsx
├── hooks/
│   └── useTasks.ts
├── types.ts
├── App.tsx
└── index.css
```

### `src/types.ts`

```ts
export interface Task {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}
```

### `src/hooks/useTasks.ts`

Encapsulamos el CRUD y la persistencia en `localStorage`. El renderer
de Electron tiene `localStorage` como cualquier navegador, así que es
gratis para una app pequeña.

```ts
import { useEffect, useState } from 'react';
import type { Task } from '../types';

const STORAGE_KEY = 'tasks';

const readStorage = (): Task[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(readStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, done: false, createdAt: Date.now() },
    ]);
  };

  const toggleTask = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const removeTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const clearDone = () =>
    setTasks((prev) => prev.filter((t) => !t.done));

  return { tasks, addTask, toggleTask, removeTask, clearDone };
};
```

### Componentes

`TaskForm`, `TaskItem` y `TaskList` son componentes de presentación.
Idea general:

- `TaskForm` recibe `onAdd(text)` y maneja un input controlado.
- `TaskItem` muestra una tarea y emite `onToggle` / `onRemove`.
- `TaskList` recibe el array y delega en `TaskItem`.

#### `src/components/TaskForm.tsx`

Formulario controlado: guarda el valor del input en estado local y, al
enviar, llama a `onAdd` y limpia el campo.

```tsx
import { useState, type FormEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
}

export const TaskForm = ({ onAdd }: Props) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdd(value);
    setValue('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      <button type="submit" disabled={!value.trim()}>
        Añadir
      </button>
    </form>
  );
};
```

Detalles:

- El botón se desactiva si el input está vacío (`!value.trim()`).
- `autoFocus` deja el cursor listo al abrir la app.
- El form previene el reload por defecto con `e.preventDefault()`.

#### `src/components/TaskItem.tsx`

Una sola tarea: checkbox + texto + botón de borrar. Usa una clase
condicional `done` para tachar el texto cuando está completada.

```tsx
import type { Task } from '../types';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onRemove }: Props) => {
  return (
    <li className={`task-item${task.done ? ' done' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.text}</span>
      </label>
      <button
        type="button"
        className="btn-remove"
        aria-label="Eliminar tarea"
        onClick={() => onRemove(task.id)}
      >
        ✕
      </button>
    </li>
  );
};
```

Detalles:

- El componente es **tonto** (no tiene estado): solo muestra y delega
  con callbacks. Eso facilita testearlo y reutilizarlo.
- `aria-label` hace accesible el botón de eliminar para lectores de
  pantalla (el icono ✕ por sí solo no se interpreta).

#### `src/components/TaskList.tsx`

Recibe el array entero y renderiza un `TaskItem` por cada tarea. Si la
lista está vacía muestra un mensaje en vez de un `<ul>` vacío.

```tsx
import type { Task } from '../types';
import { TaskItem } from './TaskItem';

interface Props {
  tasks: Task[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export const TaskList = ({ tasks, onToggle, onRemove }: Props) => {
  if (tasks.length === 0) {
    return <p className="empty">No hay tareas. ¡Añade una!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};
```

Detalles:

- `key={task.id}` es **obligatorio** en listas: React lo usa para saber
  qué item ha cambiado, se ha añadido o eliminado. Nunca uses el
  índice del array como key si la lista cambia de orden o tamaño.
- El "early return" cuando `tasks.length === 0` evita renderizar un
  `<ul>` vacío y permite mostrar un placeholder amigable.

### `src/App.tsx`

Junta el hook con los componentes y muestra contadores:

```tsx
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useTasks } from './hooks/useTasks';

function App() {
  const { tasks, addTask, toggleTask, removeTask, clearDone } = useTasks();
  const remaining = tasks.filter((t) => !t.done).length;
  const completed = tasks.length - remaining;

  return (
    <main className="container">
      <header>
        <h1>Task App</h1>
        <p className="subtitle">
          {remaining} pendientes · {completed} completadas
        </p>
      </header>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onRemove={removeTask} />
      {completed > 0 && (
        <footer>
          <button className="btn-clear" onClick={clearDone}>Limpiar completadas</button>
        </footer>
      )}
    </main>
  );
}

export default App;
```

### `src/index.css`

Estilos básicos: tema oscuro, layout centrado con `flex`, tarjetas
redondeadas para cada tarea.

```css
:root {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  line-height: 1.5;
  color-scheme: dark;
  color: rgba(255, 255, 255, 0.92);
  background-color: #1a1a1a;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
}

#root { width: 100%; max-width: 560px; }

.container { display: flex; flex-direction: column; gap: 1.25rem; }

header h1 { margin: 0 0 0.25rem; font-size: 2rem; letter-spacing: -0.02em; }
.subtitle { margin: 0; color: rgba(255, 255, 255, 0.55); font-size: 0.9rem; }

.task-form { display: flex; gap: 0.5rem; }
.task-form input {
  flex: 1;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #242424;
  color: inherit;
  font-size: 1rem;
  outline: none;
}
.task-form input:focus { border-color: #646cff; }

button {
  padding: 0.65rem 1rem;
  border-radius: 8px;
  border: 1px solid transparent;
  background: #646cff;
  color: white;
  font-weight: 500;
  cursor: pointer;
}
button:hover:not(:disabled) { background: #535bf2; }
button:disabled { opacity: 0.4; cursor: not-allowed; }

.task-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.85rem;
  background: #242424;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
}
.task-item label { display: flex; align-items: center; gap: 0.65rem; flex: 1; cursor: pointer; }
.task-item input[type="checkbox"] { width: 1.1rem; height: 1.1rem; accent-color: #646cff; }
.task-item.done span { text-decoration: line-through; color: rgba(255, 255, 255, 0.4); }

.btn-remove { background: transparent; border: none; color: rgba(255, 255, 255, 0.4); padding: 0.25rem 0.5rem; }
.btn-remove:hover:not(:disabled) { background: transparent; color: #ff6b6b; }

.empty { text-align: center; color: rgba(255, 255, 255, 0.4); padding: 1.5rem 0; margin: 0; }

footer { display: flex; justify-content: flex-end; }
.btn-clear {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  padding: 0.4rem 0.75rem;
}
.btn-clear:hover:not(:disabled) { background: rgba(255, 255, 255, 0.05); }
```

> El fichero del repo tiene algunas reglas extra (transiciones, etc.).
> Lo de arriba es lo mínimo funcional; copia el del repo si quieres el
> resultado exacto.

---

## 9. Generar el instalador

### 9.1. Icono

`electron-builder` espera un icono en `build/icon.ico` para Windows.
Requisitos:

- Formato `.ico`.
- **Mínimo 256x256 px**, ideal multi-resolución (16, 32, 48, 64, 128, 256).
- Si no tienes uno, hay un placeholder en `build/icon.ico` que puedes
  reemplazar. Convertidores online: `convertio.co`, `cloudconvert.com`.

### 9.2. Bloque `build` en `package.json`

```json
"build": {
  "appId": "com.did.taskapp",
  "productName": "Task App",
  "asar": true,
  "files": [
    "dist/**/*",
    "electron/**/*",
    "package.json"
  ],
  "directories": {
    "output": "release",
    "buildResources": "build"
  },
  "win": {
    "target": ["nsis"],
    "icon": "build/icon.ico"
  },
  "nsis": {
    "oneClick": false,
    "perMachine": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "Task App",
    "runAfterFinish": true,
    "deleteAppDataOnUninstall": false
  }
}
```

Cosas a tener en cuenta:

- **`appId`** debe ser único (estilo dominio inverso). Identifica la
  app en el registro de Windows; si lo cambias, una nueva instalación
  no sobrescribe la anterior.
- **`files`** controla qué se incluye dentro del `.asar`. Si dejas
  fuera `electron/**/*` la app no arrancará (no encuentra `main.cjs`).
- **`asar: true`** empaqueta tu código en un único `app.asar`. No es
  cifrado; alguien con acceso al disco puede extraerlo. Si te importa
  ofuscar (no proteger), hay opciones extra.
- **`directories.output`** es donde aparece el instalador final.

### 9.3. Comandos

```bash
# Empaqueta sin instalador (carpeta release/win-unpacked/), util para probar rapido
npm run pack

# Genera el instalador NSIS .exe en release/
npm run dist
```

La primera vez `electron-builder` descarga binarios de Electron y NSIS
a `%LOCALAPPDATA%\electron-builder\Cache\` (~150 MB). Es normal.

El instalador queda en `release/Task App Setup x.y.z.exe`.

### 9.4. Probar el instalador

Doble click. Como no firmamos el binario, **Windows SmartScreen mostrará
un aviso** ("Windows protegió tu PC"). Hay que pulsar "Más
información → Ejecutar de todas formas". Para eliminar ese aviso en
producción real necesitas un certificado de firma de código (de pago).

---

## 10. Opciones del instalador NSIS

Todas estas claves van dentro de `build.nsis`:

| Opción | Valor por defecto | Qué hace |
| --- | --- | --- |
| `oneClick` | `true` | Si `true`, instala sin asistente y sin opciones (estilo Squirrel). Pon `false` para mostrar el asistente clásico. |
| `perMachine` | `false` | `true` instala para todos los usuarios (requiere admin); `false` solo para el usuario actual. |
| `allowToChangeInstallationDirectory` | `false` | Permite al usuario elegir carpeta de instalación. Solo aplica con `oneClick: false`. |
| `createDesktopShortcut` | `true` | Crea acceso directo en el escritorio. Acepta también `"always"`. |
| `createStartMenuShortcut` | `true` | Acceso directo en el menú Inicio. |
| `shortcutName` | `productName` | Nombre del acceso directo. |
| `menuCategory` | `false` | Si `true`, agrupa en una carpeta del menú Inicio con el nombre de `productName`, o pasa un string para el nombre de la carpeta. |
| `runAfterFinish` | `true` | Marca por defecto la casilla "Iniciar app al terminar". |
| `deleteAppDataOnUninstall` | `false` | Borra `%APPDATA%\Task App` al desinstalar. Cuidado: borra los datos del usuario. |
| `installerIcon` | `build/installerIcon.ico` | Icono del propio `.exe` instalador. |
| `uninstallerIcon` | `build/uninstallerIcon.ico` | Icono del desinstalador. |
| `installerHeaderIcon` | — | Icono que sale en la cabecera del asistente. |
| `installerHeader` | `build/installerHeader.bmp` | Banner BMP 150x57 en la cabecera (solo modo asistente). |
| `installerSidebar` | `build/installerSidebar.bmp` | Banner BMP 164x314 lateral en la primera/última página. |
| `license` | — | Ruta a un `.txt`/`.rtf` con el EULA. Si existe, aparece la página de aceptación. |
| `language` | autodetect | Código LCID, p.ej. `"3082"` para español. |
| `artifactName` | `${productName} Setup ${version}.${ext}` | Nombre final del fichero generado. |
| `differentialPackage` | `true` | Genera ficheros para auto-actualización diferencial. |

### Añadir más targets

```jsonc
"win": {
  "target": [
    { "target": "nsis", "arch": ["x64"] },
    "portable",  // un .exe sin instalación
    "zip"        // distribución manual
  ]
}
```

Targets válidos en Windows: `nsis`, `nsis-web`, `portable`, `appx`,
`squirrel`, `msi` (experimental), `zip`, `7z`, `dir`.

### Ejemplo: añadir EULA y enlaces

1. Crea `build/license.txt` con el texto del EULA.
2. Añade en `nsis`:
   ```json
   "license": "build/license.txt",
   "warningsAsErrors": false
   ```
3. Vuelve a ejecutar `npm run dist`.

### Ejemplo: instalador para todos los usuarios sin elección

```json
"nsis": {
  "oneClick": true,
  "perMachine": true,
  "createDesktopShortcut": true,
  "runAfterFinish": true
}
```

Esto da un instalador estilo "siguiente, siguiente, listo" sin preguntar
nada. Más cómodo para entornos corporativos.

---

## 11. Troubleshooting

| Síntoma | Causa habitual |
| --- | --- |
| La app empaquetada se abre **en blanco**. | Falta `base: './'` en `vite.config.ts`. Reconstruye con `npm run dist`. |
| `npm run dev:electron` arranca Electron pero la ventana intenta cargar y falla. | Vite tarda más de lo esperado. Sube el timeout de `wait-on` o revisa si el puerto 5173 está ocupado. |
| `Application entry file "electron/main.cjs" does not exist`. | El bloque `files` del `build` no incluye `electron/**/*`. |
| Error `app.isPackaged is undefined`. | Estás ejecutando el código del main fuera de Electron (con `node`). Hay que arrancarlo con `electron .`. |
| El icono no se ve en el ejecutable instalado. | Ico inválido o menor de 256x256. Regenera el `.ico` con un tamaño multi-resolución. |
| SmartScreen bloquea el instalador. | Falta firma de código. Es esperable sin certificado, no es un bug. |
| `electron-builder` se queda colgado descargando. | Primera ejecución descarga binarios en `%LOCALAPPDATA%\electron-builder\Cache\`. Paciencia, ~150 MB. |
| El instalador no actualiza una versión vieja. | Cambiaste `appId`. Mantén el mismo `appId` entre versiones. |

---

## Apéndice: reducir el tamaño del instalador

El instalador de Electron parte de un suelo de ~70-80 MB (Chromium pesa
lo que pesa). Si ves un `.exe` de 100-200 MB, normalmente puedes
recortarlo bastante con estas opciones de `electron-builder`. De mayor
a menor impacto:

### A.1. Compresión LZMA al máximo (gratis, ~10-15%)

En el bloque `build` de `package.json`:

```json
"compression": "maximum"
```

Por defecto es `normal`. `maximum` tarda más en empaquetar pero genera
un `.exe` más pequeño.

### A.2. Quitar locales de Chromium que no usas (~20-25 MB)

Lo más rentable. Electron incluye ~50 ficheros `.pak` (uno por idioma)
en `release/win-unpacked/locales/`. Si solo te importan español e
inglés:

```json
"electronLanguages": ["en-US", "es"]
```

### A.3. `nsis-web`: instalador *downloader* (~3 MB en vez de ~100 MB)

El `.exe` deja de incluir la app y se descarga el paquete real al
instalar:

```json
"win": {
  "target": [{ "target": "nsis-web", "arch": ["x64"] }],
  "icon": "build/icon.ico"
}
```

Trade-offs:

- El usuario necesita **internet** al instalar.
- Tienes que subir el paquete (`*.7z`) a un servidor y configurar
  `publish` (S3, GitHub Releases, URL genérica...).

### A.4. Excluir basura de `node_modules`

Por defecto se cuelan READMEs, source maps y tests de las
dependencies. Añade exclusiones al `files`:

```json
"files": [
  "dist/**/*",
  "electron/**/*",
  "package.json",
  "!**/*.{md,map,d.ts,ts,tsx}",
  "!**/{LICENSE,CHANGELOG.md,README.md}",
  "!**/test/**",
  "!**/tests/**",
  "!**/__tests__/**"
]
```

Ahorro típico: 5-10 MB.

### A.5. Desactivar `differentialPackage` si no auto-actualizas

Genera un `.blockmap` para `electron-updater`. Si no lo usas, fuera:

```json
"nsis": {
  "differentialPackage": false
}
```

Ahorro mínimo, pero no aporta nada dejarlo activo.

### A.6. Combo recomendado para esta práctica

```json
"build": {
  "appId": "com.did.taskapp",
  "productName": "Task App",
  "asar": true,
  "compression": "maximum",
  "electronLanguages": ["en-US", "es"],
  "files": [
    "dist/**/*",
    "electron/**/*",
    "package.json",
    "!**/*.{md,map,d.ts}",
    "!**/{LICENSE,CHANGELOG.md,README.md}"
  ],
  "directories": { "output": "release", "buildResources": "build" },
  "win": { "target": ["nsis"], "icon": "build/icon.ico" },
  "nsis": {
    "oneClick": false,
    "perMachine": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "Task App",
    "runAfterFinish": true,
    "deleteAppDataOnUninstall": false,
    "differentialPackage": false
  }
}
```

Resultado esperado: bajar de ~100 MB a **~70-75 MB**.

### A.7. Inspeccionar qué hay dentro del instalador

Si el `.exe` pesa más de la cuenta, mira qué se está colando:

```powershell
# Tamaño real del .exe
Get-ChildItem release\*.exe | Select Name, Length

# Tamaño de la carpeta unpacked (siempre mayor que el .exe)
Get-ChildItem release\win-unpacked -Recurse | Measure-Object -Sum Length

# Listar el contenido del asar (tu código React empaquetado)
npx asar list release\win-unpacked\resources\app.asar
```

### A.8. Alternativas a Electron si necesitas instaladores muy pequeños

Para apps que tienen que pesar 5-10 MB, Electron no es la herramienta:

- **Tauri** (Rust + WebView nativo del SO): instalador de 5-10 MB,
  reutilizas tu código React. En Windows usa Edge WebView2 en vez de
  Chromium, así que algunas APIs difieren.
- **Neutralino**, **Wails**: filosofía similar.

Para una app de aula con Electron, los puntos A.1 + A.2 + A.4 te dejan
un instalador razonable sin cambiar de stack.

---

## Scripts disponibles

```bash
npm run dev            # Solo Vite (navegador)
npm run dev:electron   # Vite + Electron en paralelo
npm run build          # Compila TS y genera dist/
npm run preview        # Sirve dist/ en navegador (sin Electron)
npm run pack           # Empaqueta sin instalador (release/win-unpacked/)
npm run dist           # Genera el instalador NSIS en release/
```
