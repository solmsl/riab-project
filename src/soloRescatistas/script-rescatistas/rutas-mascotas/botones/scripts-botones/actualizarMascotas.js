document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-actualizar');
  const idMascota = document.getElementById('idMascota');
  const nombreApodoInput = document.getElementById('nombreApodo');
  const especieSelect = document.getElementById('especie');
  const razaSelect = document.getElementById('raza');
  const colorSelect = document.getElementById('color');
  const anioNacimientoSelect = document.getElementById('anio_nacimiento');
  const centroSelect = document.getElementById('centros');
  const imagenMascotaInput = document.getElementById('imagenMascota'); // Para la imagen

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
          
          // Si hay una imagen, mostrarla en la vista previa
          if (data.imagen) {
            const imagenMascotaElement = document.getElementById('imagenMascotaPreview');
            if (imagenMascotaElement) {
              imagenMascotaElement.src = data.imagen; // Mostrar la imagen actualizada
            }
          }
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
    const imagenFile = imagenMascotaInput.files[0]; // Obtener el archivo de imagen si existe
    if (id) {
      try {
        // Crear FormData para enviar la imagen y los datos de la mascota
        const formData = new FormData();
        formData.append('nombreApodo', nombreApodoInput.value);
        formData.append('especie', especieSelect.value);
        formData.append('raza', razaSelect.value);
        formData.append('color', colorSelect.value);
        formData.append('anioNacimiento', anioNacimientoSelect.value);
        formData.append('centro', centroSelect.value);

        if (imagenFile) {
          formData.append('imagen', imagenFile); // Agregar la imagen si está seleccionada
        }

        const response = await fetch(`https://riab-api.vercel.app/mascotas/${id}`, {
          method: 'PUT',
          body: formData
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.message || 'Mascota actualizada con éxito.');

          // Actualizar en localStorage
          let mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
          const index = mascotas.findIndex(m => m.id === id);
          if (index !== -1) {
            mascotas[index] = {
              id,
              nombreApodo: nombreApodoInput.value,
              especie: especieSelect.value,
              raza: razaSelect.value,
              color: colorSelect.value,
              anioNacimiento: anioNacimientoSelect.value,
              centro: centroSelect.value,
              imagen: imagenFile ? URL.createObjectURL(imagenFile) : null // Si hay imagen nueva, actualizarla
            };
            localStorage.setItem('mascotas', JSON.stringify(mascotas));
          }

          // Actualizar la vista en mascotas.html (si está abierto en el navegador)
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
              // Actualizar la imagen si existe
              const imgElement = mascotaElement.querySelector('.imagen');
              if (imgElement && imagenFile) {
                imgElement.src = URL.createObjectURL(imagenFile); // Actualizar la imagen en la vista
              }
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
