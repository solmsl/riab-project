document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');
  const idMascota = document.getElementById('idMascota');
  const nombreApodoInput = document.getElementById('nombreApodo');
  const especieSelect = document.getElementById('especie');
  const razaSelect = document.getElementById('raza');
  const colorSelect = document.getElementById('color');
  const anioNacimientoSelect = document.getElementById('anio_nacimiento');
  const centroSelect = document.getElementById('centros');

  // Cargar razas dinámicamente por especie
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

  // Buscar mascota por ID y cargar sus datos
  idMascota.addEventListener('input', async () => {
    const id = idMascota.value.trim();
    if (id) {
      try {
        const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`);
        const data = await response.json();
        if (data) {
          nombreApodoInput.value = data.nombreApodo || '';
          especieSelect.value = data.especie || '';
          especieSelect.dispatchEvent(new Event("change"));
          razaSelect.value = data.raza || '';
          colorSelect.value = data.color || '';
          anioNacimientoSelect.value = data.anioNacimiento || '';
          centroSelect.value = data.centro || '';
        } else {
          alert('Mascota no encontrada.');
          form.reset();
        }
      } catch (error) {
        console.error('Error al buscar la mascota:', error);
        alert('Hubo un problema al buscar la mascota. Inténtelo de nuevo más tarde.');
      }
    } else {
      form.reset();
    }
  });

  // Enviar actualización de mascota y actualizar en el backend
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = idMascota.value.trim();
    if (id) {
      try {
        const datosMascota = {
          nombreApodo: nombreApodoInput.value,
          especie: especieSelect.value,
          raza: razaSelect.value,
          color: colorSelect.value,
          anioNacimiento: anioNacimientoSelect.value,
          centro: centroSelect.value,
        };

        const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datosMascota)
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message || 'Mascota actualizada con éxito.');

          // Actualizar la vista en mascotas.html (si está abierta)
          const mascotasHTML = document.querySelector('#mascotas-list');
          if (mascotasHTML) {
            const mascotaElement = mascotasHTML.querySelector(`#mascota-${id}`);
            if (mascotaElement) {
              mascotaElement.querySelector('.nombre-apodo').textContent = nombreApodoInput.value;
              mascotaElement.querySelector('.especie').textContent = especieSelect.value;
              mascotaElement.querySelector('.raza').textContent = razaSelect.value;
              mascotaElement.querySelector('.color').textContent = colorSelect.value;
              mascotaElement.querySelector('.anio-nacimiento').textContent = anioNacimientoSelect.value;
              mascotaElement.querySelector('.centros').textContent = centroSelect.value;
            }
          }

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
