async function cargarMascotas() {
    try {
      const response = await fetch('https://riab-api.vercel.app/mascotas');
      
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error en el servidor: ${errorData.message}`);
        return;
      }
  
      const mascotas = await response.json();
  
      if (Array.isArray(mascotas)) {
        mascotasContainer.innerHTML = '';
        mascotas.forEach(mascota => {
          const mascotaCard = document.createElement('div');
          mascotaCard.classList.add('mascota-card');
          mascotaCard.innerHTML = `
            <h3>${mascota.nombreApodo}</h3>
            <p><strong>Especie:</strong> ${mascota.especie}</p>
            <p><strong>Raza:</strong> ${mascota.raza}</p>
            <p><strong>Color:</strong> ${mascota.color}</p>
            <p><strong>Año de Nacimiento:</strong> ${mascota.anioNacimiento}</p>
          `;
          mascotasContainer.appendChild(mascotaCard);
        });
      } else {
        mascotasContainer.innerHTML = '<p>No se encontraron mascotas registradas.</p>';
      }
    } catch (error) {
      console.error('Error al cargar las mascotas:', error);
      mascotasContainer.innerHTML = '<p>Hubo un problema al cargar las mascotas.</p>';
    }
  }
  
  
