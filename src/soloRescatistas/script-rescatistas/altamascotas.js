document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-login'); // Obtener el formulario
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevenir el envío del formulario por defecto
  
      // Obtener los valores de los campos del formulario
      const nombreApodo = document.getElementById('nombreApodo').value;
      const especie = document.getElementById('especie').value;
      const raza = document.getElementById('raza').value;
      const color = document.getElementById('color').value;
      const anioNacimiento = document.getElementById('anio_nacimiento').value;
  
      // Validar que todos los campos estén completos
      if (!nombreApodo || !especie || !raza || !color || !anioNacimiento) {
        alert('Por favor, complete todos los campos del formulario.');
        return;
      }
  
      const mascotaData = {
        nombreApodo: nombreApodo,
        especie: especie,
        raza: raza,
        color: color,
        anioNacimiento: anioNacimiento
      };
  
      try {
        const response = await fetch('https://riab-project.vercel.app/mascotas/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mascotaData)
        });
  

        if (response.ok) {
          const result = await response.json();
          alert('Mascota registrada exitosamente');
          form.reset();
        } else {
          const error = await response.json();
          alert(`Error: ${error.message}`);
        }
      } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Hubo un problema al registrar la mascota.');
      }
    });
  });
  