const idInput = document.getElementById('id-input');
const mensajeEliminar = document.getElementById('mensajeEliminar');

async function obtenerMascota(id) {
    try {
        const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`);
        const data = await response.json();

        if (data) {
            // Mostrar los datos de la mascota en el mensaje de confirmación
            const { nombreApodo, especie, raza, color, anioNacimiento } = data;
            return `${nombreApodo} (${especie}, ${raza}, ${color}, Año de Nacimiento: ${anioNacimiento})`;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al obtener los datos de la mascota:', error);
        return null;
    }
}

async function eliminarMascota(id) {
    // Obtener los datos de la mascota antes de mostrar el cartel
    const datosMascota = await obtenerMascota(id);
    
    if (datosMascota) {
        const confirmarEliminacion = confirm(`¿Seguro que quieres eliminar a la mascota: ${datosMascota}?`);
        
        if (confirmarEliminacion) {
            try {
                const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    mensajeEliminar.textContent = 'Mascota eliminada correctamente';

                    // Actualizar el listado de mascotas en mascotas.html
                    const mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
                    const index = mascotas.findIndex(m => m.id === id);
                    if (index !== -1) {
                        mascotas.splice(index, 1); // Eliminar la mascota del array
                        localStorage.setItem('mascotas', JSON.stringify(mascotas));
                    }
                    
                    // Actualizar la visualización en mascotas.html
                    // Aquí necesitas agregar código para refrescar el DOM en mascotas.html si es necesario
                } else {
                    mensajeEliminar.textContent = 'No se pudo eliminar la mascota. Verifique el ID.';
                }
            } catch (error) {
                console.error('Error al eliminar la mascota:', error);
                mensajeEliminar.textContent = 'Error al eliminar la mascota. Inténtelo de nuevo más tarde.';
            }
        }
    } else {
        mensajeEliminar.textContent = 'No se pudo obtener los datos de la mascota.';
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

