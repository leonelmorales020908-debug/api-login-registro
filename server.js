/**
 * ============================================================
 * SERVICIO WEB: REGISTRO E INICIO DE SESIÓN
 * Autor: Leonel Antonio Morales Ramírez
 * Programa: Análisis y Desarrollo de Software - SENA
 * Descripción: API REST que permite registrar usuarios y
 *              autenticarlos con usuario y contraseña.
 * ============================================================
 */

// ---------- 1. IMPORTACIÓN DE MÓDULOS ----------
const express = require('express');   // Framework para crear el servidor web
const bcrypt = require('bcryptjs');   // Librería para cifrar contraseñas
const fs = require('fs');             // Módulo para leer/escribir archivos
const path = require('path');         // Módulo para manejar rutas de archivos

// ---------- 2. CONFIGURACIÓN INICIAL ----------
const app = express();                // Creamos la aplicación Express
const PORT = 3000;                    // Puerto donde escuchará el servidor
const RUTA_DATOS = path.join(__dirname, 'data', 'usuarios.json'); // Archivo donde se guardan los usuarios

// Middleware: permite que el servidor entienda el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Middleware: sirve los archivos de la carpeta "public" (la interfaz HTML, CSS y JS)
app.use(express.static(path.join(__dirname, 'public')));

// ---------- 3. FUNCIONES AUXILIARES ----------

/**
 * Lee los usuarios almacenados en el archivo JSON.
 * @returns {Array} Lista de usuarios registrados.
 */
function leerUsuarios() {
  try {
    const contenido = fs.readFileSync(RUTA_DATOS, 'utf-8'); // Lee el archivo como texto
    return JSON.parse(contenido);                            // Convierte el texto a arreglo
  } catch (error) {
    return []; // Si el archivo no existe o está vacío, devuelve una lista vacía
  }
}

/**
 * Guarda la lista de usuarios en el archivo JSON.
 * @param {Array} usuarios - Lista de usuarios a guardar.
 */
function guardarUsuarios(usuarios) {
  fs.writeFileSync(RUTA_DATOS, JSON.stringify(usuarios, null, 2)); // Guarda con formato legible
}

// ---------- 4. RUTAS (ENDPOINTS) ----------

/**
 * GET /
 * Ruta de prueba para verificar que el servicio está activo.
 */
app.get('/', (req, res) => {
  res.json({ mensaje: 'Servicio web de registro e inicio de sesión activo' });
});

/**
 * POST /registro
 * Registra un nuevo usuario.
 * Cuerpo esperado (JSON): { "usuario": "leonel", "contrasena": "12345" }
 */
app.post('/registro', async (req, res) => {
  const { usuario, contrasena } = req.body; // Extraemos los datos enviados por el cliente

  // Validación: ambos campos son obligatorios
  if (!usuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Debe enviar usuario y contraseña' });
  }

  const usuarios = leerUsuarios(); // Cargamos los usuarios existentes

  // Validación: el usuario no debe estar repetido
  const existe = usuarios.find((u) => u.usuario === usuario);
  if (existe) {
    return res.status(409).json({ mensaje: 'El usuario ya existe' });
  }

  // Ciframos la contraseña (10 = nivel de seguridad del cifrado)
  const contrasenaCifrada = await bcrypt.hash(contrasena, 10);

  // Agregamos el nuevo usuario y guardamos
  usuarios.push({ usuario, contrasena: contrasenaCifrada });
  guardarUsuarios(usuarios);

  // Respuesta exitosa (201 = recurso creado)
  res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
});

/**
 * POST /login
 * Autentica a un usuario.
 * Cuerpo esperado (JSON): { "usuario": "leonel", "contrasena": "12345" }
 */
app.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body; // Extraemos los datos enviados

  // Validación: ambos campos son obligatorios
  if (!usuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Debe enviar usuario y contraseña' });
  }

  const usuarios = leerUsuarios();                          // Cargamos los usuarios
  const encontrado = usuarios.find((u) => u.usuario === usuario); // Buscamos el usuario

  // Si el usuario no existe -> error de autenticación
  if (!encontrado) {
    return res.status(401).json({ mensaje: 'Error en la autenticación' });
  }

  // Comparamos la contraseña enviada con la cifrada almacenada
  const coincide = await bcrypt.compare(contrasena, encontrado.contrasena);

  // Si la contraseña no coincide -> error de autenticación
  if (!coincide) {
    return res.status(401).json({ mensaje: 'Error en la autenticación' });
  }

  // Credenciales correctas -> autenticación satisfactoria
  res.status(200).json({ mensaje: 'Autenticación satisfactoria' });
});

// ---------- 5. INICIO DEL SERVIDOR ----------
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});