document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-adopciones');
    // const especieSelect = document.getElementById("especie");
    // const razaSelect = document.getElementById("raza");
  
    // especieSelect.addEventListener("change", function () {
    //   const especieSeleccionada = especieSelect.value;
    //   const razas = razasPorEspecie[especieSeleccionada] || ["Otro"];
    //   razaSelect.innerHTML = '<option value="">Seleccione una raza</option>';
    //   razas.forEach((raza) => {
    //     const option = document.createElement("option");
    //     option.value = raza.toLowerCase();
    //     option.textContent = raza;
    //     razaSelect.appendChild(option);
    //   });
    // });
  
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const dni = document.getElementById('dni').value;
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const telefono = document.getElementById('telefono').value;
      const direccion = document.getElementById('direccion').value;
      const genero = document.getElementById('genero').value;
      const email = document.getElementById('email').value;
      const id_mascota = document.getElementById('id_mascota').value;
      const dni_rescatistas = document.getElementById('dni_rescatistas').value;
  
      if (!dni || !nombre || !apellido || !telefono|| !direccion || !genero || !email || !id_mascota || !dni_rescatistas ) {
        alert('Por favor, complete todos los campos del formulario.');
        return;
      }
  
      const mascotaData = {
        dni,
        nombre,
        apellido,
        telefono,
        direccion,
        genero,
        email,
        id_mascota,
        dni_rescatistas
      };
  
      try {
        const response = await fetch('https://riab-api.vercel.app/adopcion/crear', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mascotaData)
        });
  
        if (response.ok) {
          const result = await response.json();
          alert('Adopcion registrada exitosamente');
          form.reset();
        } else {
          const error = await response.json();
          alert(`Error: ${error.message}`);
        }
      } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Hubo un problema al crear la adopción');
      }
    });
  });  