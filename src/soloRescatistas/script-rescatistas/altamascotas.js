form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const nombreApodo = document.getElementById('nombreApodo').value;
  const especie = document.getElementById('especie').value;
  const raza = document.getElementById('raza').value;
  const color = document.getElementById('color').value;
  const anioNacimiento = document.getElementById('anio_nacimiento').value;
  const centro = document.getElementById('centro').value; // Obtienes el centro seleccionado
  
  // Verificar que todos los campos estén completos
  if (!nombreApodo || !especie || !raza || !color || !anioNacimiento || !centro) {
    alert('Por favor, complete todos los campos del formulario.');
    return;
  }

  // Creamos el objeto para enviar a la API sin el campo centro
  const mascotaData = {
    nombreApodo,
    especie,
    raza,
    color,
    anioNacimiento
  };

  try {
    // Enviamos los datos a la API sin el campo centro
    const response = await fetch('https://riab-api.vercel.app/mascotas/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mascotaData)
    });

    const data = await response.json();

    if (data.success) {
      const mascota = data.data;

      // Guardamos los datos de la mascota en el localStorage, incluyendo el campo centro
      const mascotasGuardadas = JSON.parse(localStorage.getItem('mascotas')) || [];
      mascotasGuardadas.push({
        ...mascota,
        id: mascota.id.toString(),
        centro // Guardamos el campo centro solo en localStorage
      });

      // Guardamos los datos actualizados en el localStorage
      localStorage.setItem('mascotas', JSON.stringify(mascotasGuardadas));

      alert('Mascota registrada exitosamente');
      form.reset();
    } else {
      alert('Error al registrar la mascota');
    }
  } catch (error) {
    console.error('Error al enviar los datos:', error);
    alert('Hubo un problema al registrar la mascota.');
  }
});
