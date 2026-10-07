/**
 * Lógica de la interfaz: toma el usuario y la contraseña del formulario
 * y los envía a la API (/login o /registro). Luego muestra la respuesta.
 */

// ---------- 1. Referencias a los elementos de la página ----------
const formulario = document.getElementById('formulario');
const inputUsuario = document.getElementById('usuario');
const inputContrasena = document.getElementById('contrasena');
const mensaje = document.getElementById('mensaje');
const titulo = document.getElementById('titulo');
const btnEnviar = document.getElementById('btnEnviar');
const btnTabLogin = document.getElementById('btnTabLogin');
const btnTabRegistro = document.getElementById('btnTabRegistro');

// Modo actual: 'login' o 'registro'
let modo = 'login';

// ---------- 2. Cambiar entre pestañas ----------
function cambiarModo(nuevoModo) {
  modo = nuevoModo;
  mensaje.textContent = '';   // Limpia el mensaje anterior
  mensaje.className = 'mensaje';

  if (modo === 'login') {
    titulo.textContent = 'Iniciar sesión';
    btnEnviar.textContent = 'Iniciar sesión';
    btnTabLogin.classList.add('activa');
    btnTabRegistro.classList.remove('activa');
  } else {
    titulo.textContent = 'Crear cuenta';
    btnEnviar.textContent = 'Registrarse';
    btnTabRegistro.classList.add('activa');
    btnTabLogin.classList.remove('activa');
  }
}

btnTabLogin.addEventListener('click', () => cambiarModo('login'));
btnTabRegistro.addEventListener('click', () => cambiarModo('registro'));

// ---------- 3. Enviar los datos a la API ----------
formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault(); // Evita que la página se recargue al enviar

  // Datos escritos por el usuario
  const datos = {
    usuario: inputUsuario.value.trim(),
    contrasena: inputContrasena.value
  };

  // Elegimos la ruta de la API según la pestaña activa
  const ruta = modo === 'login' ? '/login' : '/registro';

  try {
    // Petición POST a la API enviando los datos en formato JSON
    const respuesta = await fetch(ruta, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    // Leemos el mensaje que devuelve la API
    const resultado = await respuesta.json();

    // Mostramos el mensaje: verde si salió bien, rojo si hubo error
    mensaje.textContent = resultado.mensaje;
    mensaje.className = respuesta.ok ? 'mensaje exito' : 'mensaje error';

    // Si el registro fue exitoso, limpiamos el formulario
    if (respuesta.ok && modo === 'registro') {
      formulario.reset();
    }
  } catch (error) {
    // Si el servidor está apagado o no responde
    mensaje.textContent = 'No se pudo conectar con el servidor';
    mensaje.className = 'mensaje error';
  }
});