const idInput = document.getElementById('id-input');
const mensajeEliminar = document.getElementById('mensajeEliminar');

async function eliminarMascota(id) {
    try {
        const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            mensajeEliminar.textContent = 'Mascota eliminada correctamente';
        } else {
            mensajeEliminar.textContent = 'No se pudo eliminar la mascota. Verifique el ID.';
        }
    } catch (error) {
        console.error('Error al eliminar la mascota:', error);
        mensajeEliminar.textContent = 'Error al eliminar la mascota. Inténtelo de nuevo más tarde.';
    }
}

document.getElementById('btnEliminar').addEventListener('click', () => {
    const id = idInput.value; 
        if (id) {
            eliminarMascota(id);
    } else {
        mensajeEliminar.textContent = 'Por favor, ingrese un ID válido.';
    }
});
