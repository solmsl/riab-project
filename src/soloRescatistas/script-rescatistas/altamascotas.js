document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-login');
  const especieSelect = document.getElementById("especie");
  const razaSelect = document.getElementById("raza");

  const razasPorEspecie = {
    perro: ["Labrador", "Poodle", "Bulldog", "Chihuahua", "Otro"],
    gato: ["Siamés", "Persa", "Maine Coon", "Sphynx", "Otro"],
    loro: ["Guacamayo", "Cacatúa", "Periquito", "Amazonas", "Otro"],
    tortuga: ["Tortuga de Orejas Rojas", "Tortuga de Caja", "Tortuga Rusa", "Otro"],
    conejo: ["Angora", "Cabeza de León", "Mini Lop", "Holandés", "Otro"],
    pato: ["Ánade Real", "Pato Pekín", "Pato Moscovita", "Otro"],
    otro: ["Otro"]
  };

  especieSelect.addEventListener("change", function () {
    const especieSeleccionada = especieSelect.value;
    const razas = razasPorEspecie[especieSeleccionada] || ["Otro"];
    razaSelect.innerHTML = '<option value="">Seleccione una raza</option>';
    razas.forEach((raza) => {
      const option = document.createElement("option");
      option.value = raza.toLowerCase();
      option.textContent = raza;
      razaSelect.appendChild(option);
    });
  });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const nombreApodo = document.getElementById('nombreApodo').value;
    const especie = document.getElementById('especie').value;
    const raza = document.getElementById('raza').value;
    const color = document.getElementById('color').value;
    const anioNacimiento = document.getElementById('anio_nacimiento').value;

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
      const response = await fetch('https://riab-api.vercel.app/mascotas/registro', {
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
