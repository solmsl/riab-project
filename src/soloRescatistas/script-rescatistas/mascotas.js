document.addEventListener('DOMContentLoaded', async function () {
  const mascotasList = document.getElementById('mascotas-list');

  try {
    // Obtener las mascotas desde la API
    const response = await fetch('https://riab-api.vercel.app/mascotas');
    const mascotas = await response.json();

    // Limpiar la lista antes de mostrar las nuevas mascotas
    mascotasList.innerHTML = '';

    // Verificar si se recibieron mascotas
    if (mascotas && mascotas.length > 0) {
      mascotas.forEach(function (mascota) {
        const mascotaDiv = document.createElement('div');
        mascotaDiv.classList.add('mascota');
        mascotaDiv.id = `mascota-${mascota.id}`; // Asignar un id único a cada mascota

        mascotaDiv.innerHTML = `
          <p>ID: <strong>${mascota.id}</strong></p>
          <p>Nombre: <strong>${mascota.nombreApodo}</strong></p>
          <p>Especie: <strong>${mascota.especie}</strong></p>
          <p>Raza: <strong>${mascota.raza}</strong></p>
          <p>Color: <strong>${mascota.color}</strong></p>
          <p>Año de Nacimiento: <strong>${mascota.anioNacimiento}</strong></p>
          <p>Centro: <strong>${mascota.centro || 'No especificado'}</strong></p> <!-- Centro si existe -->
        `;

        mascotasList.appendChild(mascotaDiv);
      });
    } else {
      mascotasList.innerHTML = '<p>No se encontraron mascotas.</p>';
    }
  } catch (error) {
    console.error('Error al cargar las mascotas:', error);
    mascotasList.innerHTML = '<p>Hubo un problema al cargar las mascotas. Inténtelo de nuevo más tarde.</p>';
  }
});

  