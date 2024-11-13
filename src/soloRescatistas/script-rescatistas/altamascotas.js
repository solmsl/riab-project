document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formulario');

  // Llenar las razas según la especie seleccionada
  const especieSelect = document.getElementById('especie');
  const razaSelect = document.getElementById('raza');

  especieSelect.addEventListener('change', function () {
    const especieSeleccionada = especieSelect.value;

    // Limpiar el campo de raza antes de agregar nuevas opciones
    razaSelect.innerHTML = '<option value="">Seleccione una raza</option>';

    let razas = [];

    if (especieSeleccionada === 'perro') {
      razas = ['Labrador', 'Bulldog', 'Pastor Alemán', 'Beagle', 'Poodle'];
    } else if (especieSeleccionada === 'gato') {
      razas = ['Persa', 'Siamés', 'Bengalí', 'Ragdoll', 'Maine Coon'];
    } else if (especieSeleccionada === 'loro') {
      razas = ['Amazona', 'Cacatúa', 'Guacamayo', 'Perico'];
    } else if (especieSeleccionada === 'tortuga') {
      razas = ['Tortuga Marina', 'Tortuga de Tierra', 'Tortuga Leopardo'];
    } else if (especieSeleccionada === 'conejo') {
      razas = ['Mini Rex', 'Holland Lop', 'Angora', 'Chinchilla'];
    } else if (especieSeleccionada === 'pato') {
      razas = ['Pato Pekín', 'Pato Rouen', 'Pato Mandarín'];
    } else if (especieSeleccionada === 'otro') {
      razas = ['Otra'];
    }

    // Agregar las nuevas opciones al campo de raza
    razas.forEach(function (raza) {
      const option = document.createElement('option');
      option.value = raza;
      option.textContent = raza;
      razaSelect.appendChild(option);
    });
  });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const nombreApodo = document.getElementById('nombreApodo').value;
    const especie = document.getElementById('especie').value;
    const raza = document.getElementById('raza').value;
    const color = document.getElementById('color').value;
    const anioNacimiento = document.getElementById('anio_nacimiento').value;
    const centro = document.getElementById('centro').value; // Campo centro agregado en el formulario

    // Validar los campos del formulario
    if (!nombreApodo || !especie || !raza || !color || !anioNacimiento || !centro) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const nuevaMascota = {
      nombreApodo,
      especie,
      raza,
      color,
      anioNacimiento,
      centro
    };

    try {
      // Enviar los datos a la API
      const response = await fetch('https://riab-api.vercel.app/mascotas/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaMascota),
      });

      const data = await response.json();

      if (data.success) {
        // Limpiar el formulario después de enviar los datos
        form.reset();
      } else {
        alert('Hubo un error al registrar la mascota. Intenta de nuevo.');
      }

    } catch (error) {
      console.error('Error al registrar la mascota:', error);
      alert('Hubo un problema al registrar la mascota. Intenta de nuevo.');
    }
  });
});

