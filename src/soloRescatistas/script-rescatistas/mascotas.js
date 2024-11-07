document.addEventListener('DOMContentLoaded', function () {
    // Obtener las mascotas desde la API (la URL es un ejemplo, usa la de tu servidor)
    fetch('https://tu-api.com/api/mascotas')
        .then(response => response.json())
        .then(mascotas => {
            const mascotasContainer = document.getElementById('mascotas-container');

            // Iterar sobre cada mascota y crear una tarjeta de Bootstrap para mostrarla
            mascotas.forEach(mascota => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('col-md-4', 'mb-4');
                tarjeta.innerHTML = `
                    <div class="card">
                        <img src="${mascota.imagen}" class="card-img-top" alt="Imagen de ${mascota.nombreApodo}">
                        <div class="card-body">
                            <h5 class="card-title">${mascota.nombreApodo}</h5>
                            <p class="card-text"><strong>Especie:</strong> ${mascota.especie}</p>
                            <p class="card-text"><strong>Raza:</strong> ${mascota.raza}</p>
                            <p class="card-text"><strong>Color:</strong> ${mascota.color}</p>
                            <p class="card-text"><strong>Año de Nacimiento:</strong> ${mascota.anioNacimiento}</p>
                            <p class="card-text"><strong>Descripción:</strong> ${mascota.descripcion}</p>
                            <a href="adopcion.html?mascotaId=${mascota.id}" class="btn btn-primary">Adoptar</a>
                        </div>
                    </div>
                `;
                mascotasContainer.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error('Error al cargar las mascotas:', error);
        });
});
