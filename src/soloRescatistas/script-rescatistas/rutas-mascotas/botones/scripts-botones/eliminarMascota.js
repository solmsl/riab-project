// Referencias a los elementos HTML
const idInput = document.getElementById('id-input');
const mensajeEliminar = document.getElementById('mensajeEliminar');

// Función para eliminar la mascota
async function eliminarMascota(id) {
    try {
        // Realiza una petición DELETE al servidor para eliminar la mascota
        const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            mensajeEliminar.textContent = 'Mascota eliminada correctamente';
        } else {
            mensajeEliminar.textContent = 'No se pudo eliminar la mascota. Verifique el ID.';
        }
    } catch (error) {
        // Si ocurre un error en la solicitud, muestra un mensaje de error
        console.error('Error al eliminar la mascota:', error);
        mensajeEliminar.textContent = 'Error al eliminar la mascota. Inténtelo de nuevo más tarde.';
    }
}

// Maneja el evento del botón de eliminación cuando se hace clic
document.getElementById('btnEliminar').addEventListener('click', () => {
    const id = idInput.value; // Obtiene el valor del ID ingresado
    if (id) {
        // Si el ID es válido, se llama a la función para eliminar la mascota
        eliminarMascota(id);
    } else {
        // Si el ID no es válido, muestra un mensaje de advertencia
        mensajeEliminar.textContent = 'Por favor, ingrese un ID válido.';
    }
});
