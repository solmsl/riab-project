function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const token=getCookie("userInfo");
function verificar(){
  if (!token) {
      alert("Acceso Denegado. Inicia Sesión para acceder a esta ruta.");
      window.location.href = 'https://riab-project.vercel.app';
      return;
  }
}
document.addEventListener('DOMContentLoaded', function () {
    // const form = document.querySelector('.adopcionForm')
    const btnEnviar = document.querySelector('#btnBuscar');

    btnEnviar.addEventListener('click', async function (event) {
      event.preventDefault();
      const dni = document.getElementById('dni').value;
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const telefono = document.getElementById('telefono').value;
      const direccion = document.getElementById('direccion').value;
      const genero = document.getElementById('genero').value;
      const email = document.getElementById('email').value;
      const id_mascota = document.getElementById('id_mascota').value;
      const dni_rescatista = document.getElementById('dni_rescatista').value;
  
      if (!dni || !nombre || !apellido || !telefono|| !direccion || !genero || !email || !id_mascota || !dni_rescatista ) {
        alert('Por favor, complete todos los campos del formulario.');
        return;
      }
  
      const adopData = {
        dni,
        nombre,
        apellido,
        telefono,
        direccion,
        genero,
        email,
        id_mascota,
        dni_rescatista
      };
  
      try {
        const response = await fetch('https://riab-api.vercel.app/adopcion/crear', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(adopData)
        });
  
        // if (response.ok) {
          // const result = await response.json();
          // alert('Adopcion registrada exitosamente');
          // form.reset();
        // } else {
        //   const error = await response.json();
        //   alert(`Error: ${error.message}`);
        // }

        if (!response.ok) {
          const error = await response.json();
          if (error.errors) {
            alert(`Errores: ${error.errors.join(', ')}`);
          } else {
            alert(`Error: ${error.message}`);
          }
          return;
        }

        alert('Adopcion registrada exitosamente');
        
      } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Hubo un problema al crear la adopción');
      }
    });
  });  
verificar();