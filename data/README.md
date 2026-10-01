# API de Registro e Inicio de Sesión

Servicio web desarrollado con Node.js y Express.

## Requisitos
- Node.js 18 o superior

## Instalación
npm install

## Ejecución
npm start

## Endpoints
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /registro | Registra un usuario |
| POST | /login | Inicia sesión |

## Ejemplo de petición
{ "usuario": "leonel", "contrasena": "12345" }

## Respuestas
- Autenticación correcta: "Autenticación satisfactoria"
- Autenticación incorrecta: "Error en la autenticación"

## Autor
Leonel Antonio Morales Ramírez - SENA ADSO