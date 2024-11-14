document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formulario');
  const especieSelect = document.getElementById('especie');
  const razaSelect = document.getElementById('raza');

  // Mapeo de especies a razas
  const razasPorEspecie = {
    perro: ['Labrador', 'Bulldog', 'Poodle', 'Golden Retriever', 'Otro'],
    gato: ['Siames', 'Persa', 'Bengala', 'Esfinge', 'Otro'],
    loro: ['Amazónico', 'Cacatúa', 'Guacamayo', 'Perico', 'Otro'],
    tortuga: ['Galápagos', 'Mora', 'Laúd', 'Rusa', 'Otro'],
    conejo: ['Angora', 'Mini Lop', 'Rex', 'Cabeza de León', 'Otro'],
    pato: ['Mallard', 'Corredor Indio', 'Rouen', 'Cayuga', 'Otro'],
    otro: ['Desconocido'],
  };

  // Actualizar opciones de raza cuando cambie la especie seleccionada
  especieSelect.addEventListener('change', function () {
    const especieSeleccionada = especieSelect.value;
    const razas = razasPorEspecie[especieSeleccionada] || [];
    
    // Limpiar opciones de raza y añadir nuevas
    razaSelect.innerHTML = '<option value="">Seleccionar raza</option>';
    razas.forEach(raza => {
      const option = document.createElement('option');
      option.value = raza;
      option.textContent = raza;
      razaSelect.appendChild(option);
    });
  });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    
    // Recoger valores del formulario
    const nombreApodo = document.getElementById('nombreApodo').value;
    const especie = especieSelect.value;
    const raza = razaSelect.value;
    const color = document.getElementById('color').value;
    const anioNacimiento = document.getElementById('anio_nacimiento').value;
    const centro = document.getElementById('centros').value;
    
    // Validación de campos
    if (!nombreApodo || !especie || !raza || !color || !anioNacimiento || !centro) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    
    const nuevaMascota = { nombreApodo, especie, raza, color, anioNacimiento, centro};
    
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
});

