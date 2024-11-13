document.addEventListener('DOMContentLoaded', async () => {
  console.log("Cargando lista de mascotas...");  // Mensaje de verificación

  const mascotasList = document.getElementById('mascotas-list');
  if (!mascotasList) {
    console.error("Error: Contenedor de lista de mascotas no encontrado.");
    return;
  }v

  try {
    const response = await fetch('https://riab-api.vercel.app/mascotas');
    if (!response.ok) throw new Error("Error en la respuesta de la API.");

    const data = await response.json();
    console.log("Datos recibidos:", data);  // Imprime los datos para verificar su estructura

    if (data.success && Array.isArray(data.mascotas)) {
      data.mascotas.forEach(mascota => {
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
        mascotasList.appendChild(card);
      });
    } else {
      console.warn("No se encontraron mascotas registradas o el formato de datos es incorrecto.");
      mascotasList.innerHTML = `<p>No se encontraron mascotas registradas.</p>`;
    }
  } catch (error) {
    console.error("Error al obtener las mascotas:", error);
    mascotasList.innerHTML = `<p>Hubo un problema al cargar la lista de mascotas.</p>`;
  }
});
