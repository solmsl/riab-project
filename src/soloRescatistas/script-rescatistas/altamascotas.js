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
  
      // Crear el objeto con los datos del formulario
      const mascotaData = {
        nombreApodo: nombreApodo,
        especie: especie,
        raza: raza,
        color: color,
        anioNacimiento: anioNacimiento
      };
  
      // Enviar los datos al servidor utilizando fetch
      try {
        const response = await fetch('http://localhost:3000/mascotas/registro', {
          method: 'POST', // Método para enviar los datos
          headers: {
            'Content-Type': 'application/json' // Especificamos que los datos están en formato JSON
          },
          body: JSON.stringify(mascotaData) // Convertir el objeto a JSON
        });
  
        // Manejar la respuesta del servidor
        if (response.ok) {
          const result = await response.json();
          alert('Mascota registrada exitosamente');
          // Opcional: Redirigir a otra página o limpiar el formulario
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
  