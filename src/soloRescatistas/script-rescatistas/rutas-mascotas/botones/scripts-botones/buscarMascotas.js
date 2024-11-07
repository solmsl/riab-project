const idInput = document.getElementById('id-input');
const mensajeActualizacion = document.getElementById('mensajeActualizacion');
const mascotaInfo = document.getElementById('mascotaInfo');

// Función para buscar la mascota
async function buscarMascota(id) {
    try {
        const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`);
        const data = await response.json();

        console.log(data);

        if (response.ok && data) {
            mostrarMascota(data);
            mensajeActualizacion.textContent = 'Mascota encontrada';
            mensajeActualizacion.classList.remove('text-danger');
            mensajeActualizacion.classList.add('text-success');
        } else {
            mensajeActualizacion.textContent = 'Mascota no encontrada.';
            mensajeActualizacion.classList.remove('text-success');
            mensajeActualizacion.classList.add('text-danger');
            mascotaInfo.innerHTML = '';
        }
    } catch (error) {
        console.error('Error al buscar la mascota:', error);
        mensajeActualizacion.textContent = 'Error al buscar la mascota. Inténtelo de nuevo más tarde.';
        mensajeActualizacion.classList.remove('text-success');
        mensajeActualizacion.classList.add('text-danger');
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
    const id = idInput.value.trim();
    if (id && /^\d+$/.test(id)) { // Verifica si el ID es válido (solo números)
        buscarMascota(id);
    } else {
        mensajeActualizacion.textContent = 'Por favor, ingrese un ID válido.';
        mensajeActualizacion.classList.remove('text-success');
        mensajeActualizacion.classList.add('text-danger');
        mascotaInfo.innerHTML = ''; // Limpia la lista de información
    }
});
