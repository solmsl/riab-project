const idInput = document.getElementById('id-input');
const mensajeActualizacion = document.getElementById('mensajeActualizacion');
const mascotaInfo = document.getElementById('mascotaInfo');

// Función para buscar la mascota
async function buscarMascota(id) {
    try {
        // Realiza una petición GET al servidor para obtener los datos de la mascota
        const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`);
        const data = await response.json();
        
        // Si la respuesta es exitosa y se encuentra la mascota
        if (response.ok && data) {
            mostrarMascota(data); // Muestra la información de la mascota
            mensajeActualizacion.textContent = 'Mascota encontrada';
        } else {
            // Si no se encuentra la mascota, muestra un mensaje de error
            mensajeActualizacion.textContent = 'Mascota no encontrada.';
            mascotaInfo.innerHTML = ''; // Limpia la lista de información
        }
    } catch (error) {
        // Si ocurre un error en la solicitud, muestra un mensaje de error
        console.error('Error al buscar la mascota:', error);
        mensajeActualizacion.textContent = 'Error al buscar la mascota. Inténtelo de nuevo más tarde.';
        mascotaInfo.innerHTML = ''; // Limpia la lista de información
    }
}

// Función para mostrar la información de la mascota
function mostrarMascota(mascota) {
    // Extrae los datos de la mascota, y si no existe alguna propiedad, asigna un valor por defecto
    const id = mascota.id || 'No especificado';
    const nombreApodo = mascota.nombreApodo || 'No especificado';
    const especie = mascota.especie || 'No especificado';
    const raza = mascota.raza || 'No especificado';
    const color = mascota.color || 'No especificado';
    const anioNacimiento = mascota.anioNacimiento || 'No especificado';

    // Muestra la información de la mascota en la lista
    mascotaInfo.innerHTML = `
        <li><strong>ID:</strong> ${id}</li>
        <li><strong>Nombre/Apodo:</strong> ${nombreApodo}</li>
        <li><strong>Especie:</strong> ${especie}</li>
        <li><strong>Raza:</strong> ${raza}</li>
        <li><strong>Color:</strong> ${color}</li>
        <li><strong>Año de Nacimiento:</strong> ${anioNacimiento}</li>
    `;
}

// Maneja el evento del botón de búsqueda cuando se hace clic
document.getElementById('btnBuscar').addEventListener('click', () => {
    const id = idInput.value; // Obtiene el valor del ID ingresado
    if (id) {
        // Si el ID es válido, se llama a la función para buscar la mascota
        buscarMascota(id);
    } else {
        // Si el ID no es válido, muestra un mensaje de advertencia
        mensajeActualizacion.textContent = 'Por favor, ingrese un ID válido.';
        mascotaInfo.innerHTML = ''; // Limpia la lista de información
    }
});
