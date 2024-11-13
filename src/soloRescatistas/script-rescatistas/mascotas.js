document.addEventListener('DOMContentLoaded', function() {
    // Obtener las mascotas almacenadas en localStorage
    const mascotasGuardadas = JSON.parse(localStorage.getItem('mascotas')) || [];
    
    const mascotasContainer = document.getElementById('mascotas-container');
    
    // Mostrar el centro almacenado en localStorage solo una vez en el encabezado
    const centro = localStorage.getItem('centro');
    const centroElement = document.getElementById('centro-info');
    if (centroElement && centro) {
      centroElement.textContent = `Centro: ${centro}`;
    }
    
    // Crear una tarjeta para cada mascota
    mascotasGuardadas.forEach(mascota => {
      const mascotaCard = document.createElement('div');
      mascotaCard.classList.add('col-12', 'col-md-4', 'mb-4');
      
      // Incluir el centro dentro de cada tarjeta de mascota
      mascotaCard.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${mascota.nombreApodo}</h5>
            <p class="card-text">Especie: ${mascota.especie}</p>
            <p class="card-text">Raza: ${mascota.raza}</p>
            <p class="card-text">Color: ${mascota.color}</p>
            <p class="card-text">Año de Nacimiento: ${mascota.anioNacimiento}</p>
            <p class="card-text">Centro: ${mascota.centro}</p> <!-- Mostrar el centro para cada mascota -->
          </div>
        </div>
      `;
    
      // Agregar la tarjeta al contenedor
      mascotasContainer.appendChild(mascotaCard);
    });
  });
  