document.addEventListener('DOMContentLoaded', () => {
  // Referencias a los elementos del formulario
  const form = document.getElementById('form-actualizar');
  const idMascota = document.getElementById('idMascota');
  const nombreApodoInput = document.getElementById('nombreApodo');
  const especieSelect = document.getElementById('especie');
  const razaSelect = document.getElementById('raza');
  const colorSelect = document.getElementById('color');
  const anioNacimientoSelect = document.getElementById('anio_nacimiento');

  // Detecta cuando se cambia el valor en el campo de ID
  idMascota.addEventListener('input', async () => {
      const id = idMascota.value.trim();
      if (id) {
          try {
              // Realiza la solicitud para obtener los datos de la mascota
              const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`);
              const data = await response.json();

              if (data) {
                  // Rellena los campos del formulario con los datos de la mascota
                  nombreApodoInput.value = data.nombreApodo || '';
                  especieSelect.value = data.especie || '';
                  razaSelect.value = data.raza || '';
                  colorSelect.value = data.color || '';
                  anioNacimientoSelect.value = data.anioNacimiento || '';
              } else {
                  alert('Mascota no encontrada.');
                  form.reset();
              }
          } catch (error) {
              console.error('Error al buscar la mascota:', error);
              alert('Hubo un problema al buscar la mascota. Inténtelo de nuevo más tarde.');
          }
      } else {
          // Si el campo de ID está vacío, resetea el formulario
          form.reset();
      }
  });

  // Maneja el envío del formulario para actualizar los datos de la mascota
  form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const id = idMascota.value.trim();

      if (id) {
          try {
              // Realiza la solicitud PUT para actualizar los datos de la mascota
              const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      nombreApodo: nombreApodoInput.value,
                      especie: especieSelect.value,
                      raza: razaSelect.value,
                      color: colorSelect.value,
                      anioNacimiento: anioNacimientoSelect.value
                  })
              });

              const data = await response.json();

              if (response.ok) {
                  alert(data.message || 'Mascota actualizada con éxito.');
                  form.reset();
              } else {
                  alert(data.message || 'Error al actualizar la mascota.');
              }
          } catch (error) {
              console.error('Error al actualizar la mascota:', error);
              alert('Hubo un problema al actualizar la mascota. Inténtelo de nuevo más tarde.');
          }
      } else {
          alert('Por favor, ingrese un ID válido para actualizar.');
      }
  });
});

  