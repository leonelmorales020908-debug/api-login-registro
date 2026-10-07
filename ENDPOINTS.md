# Endpoints de la API Api_Login

**Aprendiz:** Leonel Antonio Morales Ramírez
**Programa:** Análisis y Desarrollo de Software - SENA

**URL base:** http://localhost:3000

## Lista de endpoints

| Método | Endpoint | Descripción | Body (JSON) |
|--------|----------|-------------|-------------|
| GET | http://localhost:3000/ | Muestra la interfaz de login | No lleva |
| POST | http://localhost:3000/registro | Registra un usuario nuevo | {"usuario":"...","contrasena":"..."} |
| POST | http://localhost:3000/login | Inicia sesión | {"usuario":"...","contrasena":"..."} |

## Respuestas de cada endpoint

| Endpoint | Caso | Status | Mensaje |
|----------|------|--------|---------|
| /registro | Registro exitoso | 201 Created | Usuario registrado correctamente |
| /registro | Usuario repetido | 409 Conflict | El usuario ya existe |
| /registro | Faltan datos | 400 Bad Request | Debe enviar usuario y contraseña |
| /login | Datos correctos | 200 OK | Autenticación satisfactoria |
| /login | Datos incorrectos | 401 Unauthorized | Error en la autenticación |
| /login | Faltan datos | 400 Bad Request | Debe enviar usuario y contraseña |

## Ejemplo de petición

**POST** http://localhost:3000/login

```json
{
  "usuario": "postman1",
  "contrasena": "12345"
}
```

**Respuesta:**

```json
{
  "mensaje": "Autenticación satisfactoria"
}
```

## Repositorio

https://github.com/leonelmorales020908-debug/api-login-registro