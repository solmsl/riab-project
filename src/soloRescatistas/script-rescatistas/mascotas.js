// archivo: mascotas.js
document.addEventListener('DOMContentLoaded', async () => {
  const mascotasList = document.getElementById('mascotas-list');

  try {
    // Solicitar los datos de la API
    const response = await fetch('https://riab-api.vercel.app/mascotas');
    const data = await response.json();

    if (data.success && Array.isArray(data.mascotas)) {
      data.mascotas.forEach(mascota => {
        // Crear una tarjeta para cada mascota
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');

        card.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${mascota.nombreApodo}</h5>
              <p class="card-text">
                <strong>ID:</strong> ${mascota.id} <br>
                <strong>Especie:</strong> ${mascota.especie} <br>
                <strong>Raza:</strong> ${mascota.raza} <br>
                <strong>Color:</strong> ${mascota.color} <br>
                <strong>Año de Nacimiento:</strong> ${mascota.anioNacimiento}
              </p>
            </div>
          </div>
        `;

        // Agregar la tarjeta al contenedor de la lista de mascotas
        mascotasList.appendChild(card);
      });
    } else {
      mascotasList.innerHTML = `<p>No se encontraron mascotas registradas.</p>`;
    }
  } catch (error) {
    console.error('Error al obtener las mascotas:', error);
    mascotasList.innerHTML = `<p>Hubo un problema al cargar la lista de mascotas.</p>`;
  }
});


  