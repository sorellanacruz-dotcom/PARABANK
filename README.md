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

```powershell
npx playwright install --with-deps
```

> **Nota:** En Windows puede solicitar permisos. Ejecuta como Administrador si hay problemas.

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
- **`tests/register.jdbc.spec.js`** — Test de registro con `ConnType=JDBC`

Ejecución:
```powershell
npx playwright test tests/register.spec.js --headed -j 1
npx playwright test tests/register.bulk.spec.js -j 1    # Crea todos los usuarios de register-users.json
npx playwright test tests/register.jdbc.spec.js -j 1
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
```powershell
npx playwright test
```

### Ejecutar tests específicos
```powershell
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
