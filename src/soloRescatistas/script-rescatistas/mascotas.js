document.addEventListener('DOMContentLoaded', async function () {
  const mascotasList = document.getElementById('mascotas-list');

  try {
    // Obtener las mascotas desde el localStorage
    const mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];

    // Limpiar la lista antes de mostrar las nuevas mascotas
    mascotasList.innerHTML = '';

    // Verificar si se recibieron mascotas
    if (mascotas && mascotas.length > 0) {
      mascotas.forEach(function (mascota) {
        const mascotaDiv = document.createElement('div');
        mascotaDiv.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4');
        mascotaDiv.classList.add('mascota');
        mascotaDiv.id = `mascota-${mascota.id}`; // Asignar un id único a cada mascota

        mascotaDiv.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${mascota.nombreApodo}</h5>
              <p class="card-text"><strong>Especie:</strong> ${mascota.especie}</p>
              <p class="card-text"><strong>Raza:</strong> ${mascota.raza}</p>
              <p class="card-text"><strong>Color:</strong> ${mascota.color}</p>
              <p class="card-text"><strong>Año de Nacimiento:</strong> ${mascota.anioNacimiento}</p>
              <p class="card-text"><strong>Centro:</strong> ${mascota.centro || 'No especificado'}</p>
              <p class="card-text"><strong>ID:</strong> ${mascota.id}</p>
            </div>
          </div>
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

  