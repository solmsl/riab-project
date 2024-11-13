document.addEventListener('DOMContentLoaded', function () {
    // Obtener las mascotas almacenadas en localStorage
    const mascotasGuardadas = JSON.parse(localStorage.getItem('mascotas')) || [];
  
    const mascotasContainer = document.getElementById('mascotas-container');
  
    // Crear una tarjeta para cada mascota
    mascotasGuardadas.forEach(mascota => {
      const mascotaCard = document.createElement('div');
      mascotaCard.classList.add('col-12', 'col-md-4', 'mb-4');
  
      mascotaCard.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${mascota.nombreApodo}</h5>
            <p class="card-text">Especie: ${mascota.especie}</p>
            <p class="card-text">Raza: ${mascota.raza}</p>
            <p class="card-text">Color: ${mascota.color}</p>
            <p class="card-text">Año de Nacimiento: ${mascota.anioNacimiento}</p>
            <p class="card-text"><strong>Centro:</strong> ${mascota.centro}</p>
          </div>
        </div>
      `;
  
      // Agregar la tarjeta al contenedor
      mascotasContainer.appendChild(mascotaCard);
    });
  });
  