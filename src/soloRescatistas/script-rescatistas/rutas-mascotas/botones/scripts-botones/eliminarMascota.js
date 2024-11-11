const idInput = document.getElementById('id-input');
const mensajeEliminar = document.getElementById('mensajeEliminar');
const nombreApodoInput = document.getElementById('nombreApodo');
const especieInput = document.getElementById('especie');
const razaInput = document.getElementById('raza');
const colorInput = document.getElementById('color');
const anioNacimientoInput = document.getElementById('anio_nacimiento');

// Función para eliminar la mascota
async function eliminarMascota(id) {
    try {
        // Buscar los detalles de la mascota
        const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`);
        const data = await response.json();

        if (data) {
            // Mostrar cartel de confirmación
            const confirmDelete = confirm(`¿Seguro que quieres eliminar a la mascota?\nNombre o Apodo: ${data.nombreApodo}\nEspecie: ${data.especie}\nRaza: ${data.raza}\nColor: ${data.color}\nAño de nacimiento: ${data.anioNacimiento}`);

            if (confirmDelete) {
                // Realizar la eliminación en la base de datos
                const deleteResponse = await fetch(`https://riab-api.vercel.app/mascotas/${id}`, {
                    method: 'DELETE',
                });

                if (deleteResponse.ok) {
                    mensajeEliminar.textContent = 'Mascota eliminada correctamente';

                    // Actualizar localStorage
                    let mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
                    mascotas = mascotas.filter(mascota => mascota.id !== id);
                    localStorage.setItem('mascotas', JSON.stringify(mascotas));

                    // Eliminar la carta correspondiente en mascotas.html
                    const mascotaToRemove = document.querySelector(`.card[data-id="${id}"]`);
                    if (mascotaToRemove) {
                        mascotaToRemove.remove();
                    }
                } else {
                    mensajeEliminar.textContent = 'No se pudo eliminar la mascota. Verifique el ID.';
                }
            } else {
                mensajeEliminar.textContent = 'No se eliminó la mascota.';
            }
        } else {
            mensajeEliminar.textContent = 'Mascota no encontrada.';
        }
    } catch (error) {
        console.error('Error al eliminar la mascota:', error);
        mensajeEliminar.textContent = 'Error al eliminar la mascota. Inténtelo de nuevo más tarde.';
    }
}

// Evento de clic en el botón de eliminación
document.getElementById('btnEliminar').addEventListener('click', () => {
    const id = idInput.value.trim(); 
    if (id) {
        eliminarMascota(id);
    } else {
        mensajeEliminar.textContent = 'Por favor, ingrese un ID válido.';
    }
});

