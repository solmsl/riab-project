form.addEventListener('submit', async function (event) {
  const form = document.getElementById('formulario');
  event.preventDefault();
  
  // Recoger valores del formulario
  const nombreApodo = document.getElementById('nombreApodo').value;
  const especie = document.getElementById('especie').value;
  const raza = document.getElementById('raza').value;
  const color = document.getElementById('color').value;
  const anioNacimiento = document.getElementById('anio_nacimiento').value;
  
  // Validación de campos
  if (!nombreApodo || !especie || !raza || !color || !anioNacimiento) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  
  const nuevaMascota = { nombreApodo, especie, raza, color, anioNacimiento };
  
  try {
    const response = await fetch('https://riab-api.vercel.app/mascotas/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaMascota),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Mostrar mensaje de éxito
      alert('Mascota registrada exitosamente.');
      form.reset();  // Limpiar el formulario
    } else {
      alert('Hubo un error al registrar la mascota. Intenta de nuevo.');
    }
  } catch (error) {
    console.error('Error al registrar la mascota:', error);
    alert('Hubo un problema al registrar la mascota. Intenta de nuevo.');
  }
});

