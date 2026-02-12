
# ParaBank — Tests Playwright

Este repositorio contiene pruebas de Playwright para el sitio demo ParaBank (https://parabank.parasoft.com/parabank/index.htm).

**Requisitos**
- Node.js: >= 18 (recomendado 18.x o 20.x)
- npm: v9+ (incluido con Node.js)

**Dependencias (versiones)**
- `@playwright/test`: ^1.58.2
- `@types/node`: ^25.2.3

Estas dependencias están listadas en `package.json` y se instalan con `npm install`.

**Instalación paso a paso**

1. Abrir una terminal en la carpeta raíz del proyecto.
2. Instalar dependencias de Node:
=======
# ParaBank — Proyecto Full Stack
# 12/02/2026 
Proyecto completo con pruebas automatizadas (Playwright), frontend (React) y backend (Node.js) para el sitio demo ParaBank (https://parabank.parasoft.com/parabank/index.htm).

## 📋 Descripción

ParaBank es una aplicación bancaria de prueba con:
- **Frontend**: Interfaz React para interactuar con el banco
- **Backend**: API REST con autenticación (Node.js + Express)
- **Tests**: Suite completa de pruebas automatizadas (Playwright)

## ⚙️ Requisitos Previos

- **Node.js**: >= 18 (recomendado 18.x o 20.x)
- **npm**: v9+ (incluido con Node.js)
- **Git** (opcional, para versionado)

## 📦 Instalación

### 1. Instalar dependencias globales
>>>>>>> 570c4e3 (se borra un js)

```powershell
npm install
```

3. Instalar los navegadores y runtime necesarios para Playwright:

```powershell
npx playwright install --with-deps
```

Nota: en Windows puede pedir permisos; ejecutar la terminal como Administrador si hay problemas.

4. (Opcional) Añadir script útil en `package.json`:

```json
"scripts": {
  "test": "playwright test"
}
```

**Comandos de ejecución**

- Ejecutar todos los tests:

# ParaBank — Test Suite Playwright

Suite de pruebas automatizadas para el sitio demo ParaBank (https://parabank.parasoft.com/parabank/index.htm) usando Playwright.

## Requisitos

- Node.js: >= 18 (recomendado 18.x o 20.x)
- npm: v9+ (incluido con Node.js)
- Dependencias: `@playwright/test ^1.58.2`, `@faker-js/faker` (opcional para generación de datos)

## Instalación paso a paso

### 1. Instalar dependencias

```powershell
npm install
```

### 2. Instalar navegadores y runtime de Playwright
=======
### 2. Instalar dependencias del Backend

```powershell
cd backend
npm install
cd ..
```

### 3. Instalar dependencias del Frontend

```powershell
cd frontend
npm install
cd ..
```

### 4. Instalar navegadores de Playwright


```powershell
npx playwright install --with-deps
```



### 3. (Opcional) Instalar faker para generación de datos

```powershell
npm install --save-dev @faker-js/faker
```

## Casos de Prueba

### 1. Login — Pruebas de inicio de sesión

- **`tests/login.spec.js`** — Test individual de login (credenciales hardcodeadas)
- **`tests/login.data.spec.js`** — Test data-driven: usa `tests/data/users.json` y ejecuta login para cada usuario

Ejecución:
```powershell
npx playwright test tests/login.spec.js -j 1
npx playwright test tests/login.data.spec.js -j 1  # Todos los usuarios en users.json
```

### 2. Registro — Pruebas de creación de usuarios

- **`tests/register.spec.js`** — Test individual de registro único
- **`tests/register.bulk.spec.js`** — Registro masivo: lee `tests/data/register-users.json` y crea múltiples usuarios secuencialmente. Guarda usuarios creados en `tests/data/created-register-users.json`

Ejecución:
```powershell
npx playwright test tests/register.spec.js --headed -j 1
npx playwright test tests/register.bulk.spec.js -j 1    # Crea todos los usuarios de register-users.json

```

### 3. Transferencias — Pruebas de transferencia de fondos

- **`tests/transfer.spec.js`** — Test individual de transferencia (credenciales hardcodeadas)
- **`tests/transfer.data.spec.js`** — Transferencias data-driven: usa `tests/data/users.json` y ejecuta transferencias para cada usuario

Ejecución:
```powershell
npx playwright test tests/transfer.spec.js --headed -j 1
npx playwright test tests/transfer.data.spec.js -j 1  # Transferencias para todos los usuarios
```

## ⭐ Gestión de Datos de Prueba (IMPORTANTE)

Este es el paso crucial antes de ejecutar tests de registro masivo.

### Generar datos de registro masivo

#### Opción A: Generar con Faker (aleatorio)

```powershell
node tests/generate-register-users.js
```

Esto crea `tests/data/register-users.json` con 10 usuarios aleatorios usando Faker.

#### Opción B: Usar datos estáticos predefinidos

El archivo `tests/data/register-users.json` **ya contiene 10 usuarios de prueba** listos para usar. No necesitas generar nada si prefieres reutilizar estos datos.

### Workflow típico de registro masivo

1. **Crear/generar datos (una sola vez)**:
  ```powershell
  # Ya existen datos en register-users.json, puedes reutilizarlos
  # O genera nuevos con:
  node tests/generate-register-users.js
  ```

2. **Ejecutar registro masivo**:
  ```powershell
  npx playwright test tests/register.bulk.spec.js -j 1
  ```
  Esto registra automáticamente todos los usuarios de `register-users.json` y guarda credenciales en `created-register-users.json`.

3. **Reutilizar usuarios creados** (opcional):
  Los usuarios creados se guardan en `tests/data/created-register-users.json` para uso posterior en login/transfer.

### Datos de login disponibles

Archivo: `tests/data/users.json`

Contiene usuarios predefinidos para pruebas:
- reg_user_1 / Password123!
- reg_user_2 / Password123!
- reg_user_3 / Password123!
- (más usuarios agregados según necesidad)

## Comandos de Ejecución

### Ejecutar todos los tests
=======
> **Nota**: En Windows puede solicitar permisos. Si hay problemas, ejecuta PowerShell como Administrador.

## 🚀 Inicio Rápido

### Ejecutar Backend (Terminal 1)

```powershell
cd backend
npm run dev
```

Backend disponible en `http://localhost:3000`

### Ejecutar Frontend (Terminal 2)

```powershell
cd frontend
npm run dev
```

Frontend disponible en `http://localhost:5173`

## 🧪 Pruebas con Playwright

### Ejecutar todos los tests


```powershell
npx playwright test
```

### Ejecutar tests específicos

npx playwright test tests/login.spec.js          # Solo este archivo
npx playwright test -g "registro"                # Tests que coincidan con patrón
npx playwright test --headed                     # Ver navegador en tiempo real
npx playwright test -j 1                         # Ejecutar en serie (1 worker)
```

### Reportes

```powershell
# Ver reporte HTML interactivo
npx playwright show-report
```

**Notas útiles**
- Si las pruebas fallan por tiempo de carga, aumentar timeouts o añadir `await page.waitForLoadState('networkidle')` y `page.waitForTimeout(...)` como se hace en los tests.
- Si necesitas ejecutar un test específico en modo depuración interactiva, usa `npx playwright test --debug`.




Quick start

1. Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

API: `http://localhost:3000/api`
=======

```powershell
# Solo login
npx playwright test tests/login.spec.js -j 1

# Login data-driven (múltiples usuarios)
npx playwright test tests/login.data.spec.js -j 1

# Solo registro
npx playwright test tests/register.spec.js --headed -j 1

# Registro masivo
npx playwright test tests/register.bulk.spec.js -j 1

# Solo transferencias
npx playwright test tests/transfer.spec.js --headed -j 1

# Transferencias data-driven
npx playwright test tests/transfer.data.spec.js -j 1
```

### Opciones útiles

```powershell
--headed              # Ver el navegador en tiempo real
-j 1                  # Ejecutar en serie (1 worker)
--debug               # Modo depuración interactivo
-g "patrón"          # Ejecutar tests que coincidan con el patrón
```

## 📊 Ver Reportes de Tests

```powershell
npx playwright show-report
```

Abrirá el reporte HTML interactivo en tu navegador.

## 📝 Gestión de Datos de Prueba

### Datos de login disponibles

Archivo: `tests/data/users.json`

Contiene usuarios predefinidos:
- reg_user_1 / Password123!
- reg_user_2 / Password123!
- reg_user_3 / Password123!
- Y más...

### Generar usuarios de prueba (opcional)

```powershell
node tests/generate-register-users.js
```

Esto crea `tests/data/register-users.json` con usuarios aleatorios usando Faker.

### Workflow típico de registro masivo

1. **Generar o usar datos predefinidos**
2. **Ejecutar registro masivo**:
   ```powershell
   npx playwright test tests/register.bulk.spec.js -j 1
   ```
3. **Usuarios creados** se guardan en `tests/data/created-register-users.json`

## 📁 Estructura del Proyecto

```
ParaBank/
├── backend/              # API REST (Node.js + Express)
├── frontend/             # Interfaz (React)
├── tests/                # Pruebas Playwright
│   └── data/            # Datos de prueba
├── playwright.config.js  # Config de Playwright
└── package.json
```

## 📦 Guardar como ZIP

```powershell
Compress-Archive -Path * -DestinationPath ..\ParaBank.zip -Force -Exclude .git, node_modules
```

## 🚀 Subir a GitHub

### 1. Instalar Git (si no lo tienes)

```powershell
winget install --id Git.Git -e --source winget
```

O descarga desde: https://git-scm.com/download/win

### 2. Inicializar repositorio local

```powershell
git init
git add .
git commit -m "Initial commit - ParaBank project"
git branch -M main
```

### 3. Crear repositorio en GitHub

Entra a https://github.com → New repository → crea un nuevo repo

### 4. Conectar y hacer push

```powershell
git remote add origin https://github.com/TU_USUARIO/REPO-NAME.git
git push -u origin main
```

Reemplaza `TU_USUARIO` y `REPO-NAME` por tus datos.

## 📚 Referencias

- [Playwright Documentation](https://playwright.dev)
- [React](https://react.dev)
- [Express.js](https://expressjs.com)
- [ParaBank Demo](https://parabank.parasoft.com/parabank/index.htm)

## 📄 Licencia

Proyecto de demostración con fines educativos.

---

**Última actualización**: Febrero 2026
>>>>>>> 570c4e3 (se borra un js)
