# TNE Frontend

Interfaz web desarrollada con Quasar Framework y Vue 3 para el sistema
de autenticación TNE. Incluye registro de usuarios, login y pantalla de bienvenida.

## Tecnologías

- Quasar Framework v2
- Vue 3
- TypeScript
- Pinia (manejo de estado)
- Axios (consumo de API REST)
- Vite

## Requisitos previos

- Node.js v20 o superior
- npm
- Repositorio `tne-backend` corriendo en puerto 3000

## Instalación

1. Clona el repositorio:
   git clone https://github.com/1rv1nn/tne-frontend.git
   cd tne-frontend

2. Instala las dependencias:
   npm install

3. Copia el archivo de variables de entorno:
   copy .env.example .env

## Variables de entorno

| Variable     | Descripción          | Valor por defecto         |
| ------------ | -------------------- | ------------------------- |
| VITE_API_URL | URL base del backend | http://localhost:3000/api |

## Correr en desarrollo

npm run dev

La aplicación estará disponible en: http://localhost:9000

## Pantallas

### Login

- Validación de correo y contraseña
- Mensaje de error en credenciales incorrectas
- Enlace a registro

### Registro

- Validación de nombre, correo, contraseña y confirmación
- Asignación automática de rol invitado
- Redirección al login tras registro exitoso

### Bienvenida

- Muestra nombre y rol del usuario autenticado
- Badge rojo para admin, azul para invitado
- Botón de cerrar sesión

## Rutas

| Ruta      | Descripción            | Protegida |
| --------- | ---------------------- | --------- |
| /login    | Pantalla de login      | No        |
| /register | Pantalla de registro   | No        |
| /welcome  | Pantalla de bienvenida | Sí        |

## Correr en producción

npm run build

Los archivos compilados estarán en la carpeta `dist/`.

## Usuario de prueba

| Campo    | Valor         |
| -------- | ------------- |
| Email    | admin@tne.com |
| Password | password      |
| Rol      | admin         |
