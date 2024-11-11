const idInput = document.getElementById('id-input');
const mensajeEliminar = document.getElementById('mensajeEliminar');

// async function obtenerMascota(id) {
//     try {
//         // Hacer la solicitud para obtener los datos de la mascota
//         const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`);
        
//         // Si la respuesta no es exitosa, lanzar un error
//         if (!response.ok) {
//             throw new Error('No se pudo obtener los datos de la mascota');
//         }

//         const data = await response.json();
//         console.log('Datos de la mascota:', data); // Verificamos qué datos estamos recibiendo
        
//         if (data) {
//             const { nombreApodo, especie, raza, color, anioNacimiento } = data;
//             return `${nombreApodo} (${especie}, ${raza}, ${color}, Año de Nacimiento: ${anioNacimiento})`;
//         } else {
//             return null; // Si no encontramos datos, devolvemos null
//         }
//     } catch (error) {
//         console.error('Error al obtener los datos de la mascota:', error);
//         return null;
//     }
// }

async function eliminarMascota(id) {
    // Obtener los datos de la mascota antes de mostrar el cartel
    const datosMascota = await obtenerMascota(id);
    
    if (datosMascota) {
        const confirmarEliminacion = confirm(`¿Seguro que quieres eliminar a la mascota con el id: ${idInput}?`);
        
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
