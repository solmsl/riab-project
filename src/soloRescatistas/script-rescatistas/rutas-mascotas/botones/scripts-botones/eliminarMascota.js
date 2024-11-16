const idInput = document.getElementById('id-input');
const mensajeEliminar = document.getElementById('mensajeEliminar');

async function eliminarMascota(id) {
    const confirmarEliminacion = confirm(`ATENCION RESCATISTA: ¿Estás seguro que quieres eliminar la mascota con el ID: ${id}?`);
    
    if (confirmarEliminacion) {
        try {
            const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                mensajeEliminar.textContent = 'Mascota eliminada correctamente';

                // Actualizar el listado de mascotas en localStorage
                const mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
                const index = mascotas.findIndex(m => m.id === id);
                if (index !== -1) {
                    mascotas.splice(index, 1); // Eliminar la mascota del array
                    localStorage.setItem('mascotas', JSON.stringify(mascotas));
                }
                
                // Aquí puedes agregar código para actualizar las cartas en la página de mascotas si es necesario.
            } else {
                mensajeEliminar.textContent = 'No se pudo eliminar la mascota. Verifique el ID.';
            }
        } catch (error) {
            console.error('Error al eliminar la mascota:', error);
            mensajeEliminar.textContent = 'Error al eliminar la mascota. Inténtelo de nuevo más tarde.';
        }
    }
}

document.getElementById('btnEliminar').addEventListener('click', () => {
    const id = idInput.value.trim();
    
    if (id) {
        eliminarMascota(id);
    } else {
        mensajeEliminar.textContent = 'Por favor, ingrese un ID válido.';
    }
});
