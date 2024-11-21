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
  const form = document.getElementById('formulario');
  const especieSelect = document.getElementById('especie');
  const razaSelect = document.getElementById('raza');

  // Mapeo de especies a razas
  const razasPorEspecie = {
    perro: ['Labrador', 'Bulldog', 'Poodle', 'Golden Retriever','Caniche','Pekines','Salchicha', 'Bulldog Frances', 'Pitbull', 'Chihuahua', 'Pastor Aleman', 'No identifico', 'Otro'],
    gato: ['Siames', 'Persa', 'Bengala', 'Esfinge', 'Korat', 'Chausie', 'Habana Brown', 'Ocicat', 'Toyger', 'Somalí', 'No identifico','Otro'],
    loro: ['Amazónico', 'Cacatúa', 'Guacamayo', 'Perico', 'Rey', 'Amazonas Oratrix', 'Periquito', 'Guacamaya Azul y Amarillo', 'Frente Naranja', 'No identifico', 'Otro'],
    tortuga: ['Galápagos', 'Mora', 'Laúd', 'Rusa', 'Marina', 'Sulcata', 'Mediterranea', 'De laguna', 'Yacaré Overo', 'No identifico','Otro'],
    conejo: ['Angora', 'Mini Lop', 'Rex', 'Cabeza de León', 'Castillo', 'Blanco de Viena', 'No identifico', 'Otro'],
    pato: ['Mallard', 'Corredor Indio', 'Rouen', 'Cayuga', 'Enano', 'Aylesbury', 'Ancona duck', 'Grimaud', 'No identifico', 'Otro'],
    otro: ['Desconocido'],
  };

  especieSelect.addEventListener('change', function () {
    const especieSeleccionada = especieSelect.value;
    const razas = razasPorEspecie[especieSeleccionada] || [];
  
    // Limpiar y agregar el placeholder correctamente
    razaSelect.innerHTML = '<option value="" disabled selected>Seleccionar raza</option>';
  
    // Añadir las opciones de raza correspondientes
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
    const imagenMascota = document.getElementById('imagenMascota').files[0];
  
    // Validación de campos
    if (!nombreApodo || !especie || !raza || !color || !anioNacimiento || !centro || !imagenMascota) {
      alert('Por favor, complete todos los campos y asegúrese de subir una imagen.');
      return;
    }
  
    // Crear FormData para enviar datos
    const formData = new FormData();
    formData.append('imagen', imagenMascota);
    formData.append('nombreApodo', nombreApodo);
    formData.append('especie', especie);
    formData.append('raza', raza);
    formData.append('color', color);
    formData.append('anioNacimiento', anioNacimiento);
    formData.append('centro', centro);
  
    try {
      const response = await fetch('https://riab-api.vercel.app/mascotas/registro', {
        method: 'POST',
        body: formData, // Enviar el FormData directamente
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert('Mascota registrada exitosamente.');
        form.reset(); // Limpiar el formulario
      } else {
        alert('Hubo un error al registrar la mascota. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
      alert('Hubo un problema al registrar la mascota. Intenta de nuevo.');
    }
  });
});

verificar();