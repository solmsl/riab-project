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
    const lista = document.getElementById('adopciones-list');
    if (!lista) {
      console.error("Error: Contenedor de lista de adopciones no encontrado.");
      return;
    }
  
    try {
      const response = await fetch('https://riab-api.vercel.app/adopcion');
      
      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Datos recibidos de la API:", data);
  
      // Accede a los datos de las mascotas desde `data.data`
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        data.data.forEach(adopcion => {
          const card = document.createElement('div');
          card.classList.add('col-md-4', 'mb-4');
          
          card.innerHTML = `
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${adopcion.dni}</h5>
                <p class="card-text">
                  <strong>ID:</strong> ${adopcion.nombre} <br>
                  <strong>Especie:</strong> ${adopcion.especie} <br>
                  <strong>Raza:</strong> ${mascota.raza} <br>
                  <strong>Color:</strong> ${mascota.color} <br>
                  <strong>Año de Nacimiento:</strong> ${mascota.anioNacimiento} <br>
                  <strong>Centro:</strong> ${mascota.centro} <br>
                </p>
              </div>
            </div>
          `;
          
          lista.appendChild(card);
        });
      } else {
        console.warn("No se encontraron adopciones registradas o el formato de los datos es incorrecto.");
        lista.innerHTML = `<p>No se encontraron adopciones registradas.</p>`;
      }
    } catch (error) {
      console.error("Error al obtener las adopciones:", error);
      lista.innerHTML = `<p>Hubo un problema al cargar la lista de adopciones.</p>`;
    }
  });
  