const idInput = document.getElementById('id-input');
const mensajeEliminar = document.getElementById('mensajeEliminar');

async function obtenerMascota(id) {
    try {
        const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`);
        if (!response.ok) throw new Error('No se pudo obtener los datos de la mascota');
        
        const data = await response.json();
        console.log('Datos de la mascota obtenidos:', data); 
        return data ? `${data.nombreApodo} (${data.especie}, ${data.raza}, ${data.color}, Año de Nacimiento: ${data.anioNacimiento})` : null;
        
    } catch (error) {
        console.error('Error al obtener los datos de la mascota:', error);
        return null;
    }
}

async function eliminarMascota(id) {
    const datosMascota = await obtenerMascota(id);
    
    if (datosMascota) {
        const confirmarEliminacion = confirm(`¿Seguro que quieres eliminar a la mascota: ${datosMascota}?`);
        
        if (confirmarEliminacion) {
            try {
                const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    mensajeEliminar.textContent = 'Mascota eliminada correctamente';
                    
                    let mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
                    const index = mascotas.findIndex(m => m.id === id);
                    if (index !== -1) {
                        mascotas.splice(index, 1);
                        localStorage.setItem('mascotas', JSON.stringify(mascotas));
                    }
                    // Aquí llama a la función para actualizar la vista si es necesario
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

