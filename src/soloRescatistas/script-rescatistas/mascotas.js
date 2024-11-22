function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const token=getCookie("userInfo");
function verificar(){
  if (!token) {
      alert("Acceso Denegado. Inicia Sesión para acceder a esta ruta.");
      window.location.href = 'https://riab-project.vercel.app';
      return;
  }
}
document.addEventListener('DOMContentLoaded', async () => {
  console.log("Intentando cargar la lista de mascotas...");
  const mascotasList = document.getElementById('mascotas-list');
  const overlay=document.querySelector('.overlay');
  if (!mascotasList) {
    console.error("Error: Contenedor de lista de mascotas no encontrado.");
    return;
  }

  try {
    const response = await fetch('https://riab-api.vercel.app/mascotas');
    
    if (!response.ok) {
      throw new Error(`Error en la respuesta de la API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos recibidos de la API:", data);

    // Accede a los datos de las mascotas desde `data.data`
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      data.data.forEach(mascota => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');
        
        card.innerHTML = `
        <div class="wrapper1">
          <div class="card-area">
            <div class="card">
              <h5 class="card-title">${mascota.nombreApodo}</h5>
              <img src="${mascota.imagen}" alt="Mascota">  
              <div class="overlay">
                <p class="card-text">
                  <strong>ID:</strong> ${mascota.id} <br>
                  <strong>Especie:</strong> ${mascota.especie} <br>
                  <strong>Raza:</strong> ${mascota.raza} <br>
                  <strong>Color:</strong> ${mascota.color} <br>
                  <strong>Año de Nacimiento:</strong> ${mascota.anioNacimiento} <br>
                  <strong>Centro:</strong> ${mascota.centro} <br>
                </p>    
              </div>
            </div>
          </div>
        </div>
        `;
        
        mascotasList.appendChild(card);
      });
    } else {
      console.warn("No se encontraron mascotas registradas o el formato de los datos es incorrecto.");
      mascotasList.innerHTML = `<p>No se encontraron mascotas registradas.</p>`;
    }
  } catch (error) {
    console.error("Error al obtener las mascotas:", error);
    mascotasList.innerHTML = `<p>Hubo un problema al cargar la lista de mascotas.</p>`;
  }
});
verificar();