document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-actualizar');
    const btnBuscarId = document.getElementById('btnBuscarId');
    const idMascota = document.getElementById('idMascota');
    const especieSelect = document.getElementById('especie');
    const razaSelect = document.getElementById('raza');
    const submitButton = document.querySelector('.btn-confirmar');
  
    btnBuscarId.addEventListener('click', async () => {
      const id = idMascota.value;
      if (id) {
        try {
          const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`);
          const data = await response.json();
          if (data) {
            document.getElementById('nombreApodo').value = data.nombreApodo;
            especieSelect.value = data.especie;
            razaSelect.value = data.raza;
          }
        } catch (error) {
          console.error('Error al buscar la mascota:', error);
        }
      }
    });
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      try {
        const response = await fetch(`https://riab-api.vercel.app/mascotas/${idMascota.value}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombreApodo: document.getElementById('nombreApodo').value,
            especie: especieSelect.value,
            raza: razaSelect.value,
            color: document.getElementById('color').value,
            anio_nacimiento: document.getElementById('anio_nacimiento').value
          })
        });
  
        const data = await response.json();
        alert(data.message);
        form.reset();
      } catch (error) {
        console.error('Error al actualizar la mascota:', error);
        alert('Error al actualizar la mascota. Inténtelo de nuevo más tarde.');
      }
    });
  });
  