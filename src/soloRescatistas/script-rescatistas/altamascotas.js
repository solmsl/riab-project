document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formulario');
  
  // Verificar si el formulario existe
  if (!form) {
    console.error('Formulario no encontrado');
    return; // Detener el script si no se encuentra el formulario
  }

  // Llenar las razas según la especie seleccionada
  const especieSelect = document.getElementById('especie');
  const razaSelect = document.getElementById('raza');

  especieSelect.addEventListener('change', function() {
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
    razas.forEach(function(raza) {
      const option = document.createElement('option');
      option.value = raza;
      option.textContent = raza;
      razaSelect.appendChild(option);
    });
  });

  // Manejo del submit del formulario
  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const nombreApodo = document.getElementById('nombreApodo').value;
    const especie = document.getElementById('especie').value;
    const raza = document.getElementById('raza').value;
    const color = document.getElementById('color').value;
    const anioNacimiento = document.getElementById('anio_nacimiento').value;
    const centro = document.getElementById('centro').value; // Obtener el valor del centro

    // Validar los campos del formulario
    if (!nombreApodo || !especie || !raza || !color || !anioNacimiento || !centro) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Crear un objeto con los datos de la mascota SIN el campo centro
    const nuevaMascota = {
      nombreApodo,
      especie,
      raza,
      color,
      anioNacimiento
    };

    try {
      // Enviar los datos a la API SIN el campo centro
      const response = await fetch('https://riab-api.vercel.app/mascotas/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaMascota),
      });

      const data = await response.json();

      if (data.success) {
        // Si la API responde exitosamente, guardar los datos en localStorage (sin el campo centro)
        let mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
        mascotas.push(data.data);

        // Guardar las mascotas en localStorage
        localStorage.setItem('mascotas', JSON.stringify(mascotas));

        // Guardar el valor de centro en localStorage solo para mostrarlo en mascotas.html
        localStorage.setItem('centro', centro);

        alert('¡Mascota registrada correctamente!');
        
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
