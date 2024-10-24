const razasPermitidas = {
    perro: ['labrador', 'bulldog', 'beagle', 'poodle', 'chihuahua', 'otro'],
    gato: ['persa', 'siamés', 'bengalí', 'maine coon', 'cruza', 'otro'],
    loro: ['cacatúa', 'loro gris', 'amazonas', 'agaporni', 'loro de sol', 'otro'],
    tortuga: ['tortuga de tierra', 'tortuga de agua', 'tortuga de estanque', 'tortuga gigante', 'otro'],
    conejo: ['holland lop', 'rex', 'angora', 'mini rex', 'lionhead', 'otro'],
    pato: ['pato pekinés', 'pato muscovy', 'pato rizado', 'pato cayuga', 'pato rouen', 'otro']
};

const especieSelect = document.getElementById('especie');
const razaSelect = document.getElementById('raza');

especieSelect.addEventListener('change', function() {
    const especie = this.value;
    razaSelect.innerHTML = '<option value="">Seleccione una raza</option>';
    if (especie) {
        razasPermitidas[especie].forEach(raza => {
            const option = document.createElement('option');
            option.value = raza;
            option.textContent = raza;
            razaSelect.appendChild(option);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mascota-form');
    const submitButton = document.getElementById('btn-confirmar');

    form.addEventListener('input', () => {
        const isValid = form.checkValidity();
        submitButton.disabled = !isValid;

        Array.from(form.elements).forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3000/mascotas/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(getMascotaData())
            });
            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                alert(data.message);
                form.reset();
                window.location.href = './soloRescatistas/inicio-res.html'; 
            } else {
                alert('Error: ' + (data.message || 'Error en el registro.'));
            }
        } catch (error) {
            console.error('Error al registrar la mascota:', error);
            alert('Error en el registro. Por favor, inténtelo de nuevo más tarde.');
        }
    });

    document.getElementById('btn-eliminar').addEventListener('click', async () => {
        const id = prompt('Ingrese el ID de la mascota a eliminar:');
        if (id) {
            await eliminarMascota(id);
        }
    });

    document.getElementById('btn-actualizar').addEventListener('click', async () => {
        const id = prompt('Ingrese el ID de la mascota a actualizar:');
        if (id) {
            const mascotaData = getMascotaData();
            await actualizarMascota(id, mascotaData);
        }
    });

    document.getElementById('btn-buscar').addEventListener('click', async () => {
        const id = prompt('Ingrese el ID de la mascota a buscar:');
        if (id) {
            await buscarMascota(id);
        }
    });

    document.getElementById('btn-ver-todas').addEventListener('click', async () => {
        await verTodasLasMascotas();
    });

    async function eliminarMascota(id) {
        try {
            const response = await fetch(`http://localhost:3000/mascotas/${id}`, { method: 'DELETE' });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error al eliminar la mascota:', error);
            alert('Error al eliminar la mascota. Inténtelo de nuevo más tarde.');
        }
    }

    async function actualizarMascota(id, data) {
        try {
            const response = await fetch(`http://localhost:3000/mascotas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            alert(responseData.message);
        } catch (error) {
            console.error('Error al actualizar la mascota:', error);
            alert('Error al actualizar la mascota. Inténtelo de nuevo más tarde.');
        }
    }

    async function buscarMascota(id) {
        try {
            const response = await fetch(`http://localhost:3000/mascotas/${id}`);
            const data = await response.json();
            if (data) {
                alert(`Mascota encontrada: ${JSON.stringify(data)}`);
            } else {
                alert('Mascota no encontrada.');
            }
        } catch (error) {
            console.error('Error al buscar la mascota:', error);
            alert('Error al buscar la mascota. Inténtelo de nuevo más tarde.');
        }
    }

    async function verTodasLasMascotas() {
        try {
            const response = await fetch('http://localhost:3000/mascotas');
            const data = await response.json();
            alert(`Mascotas: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error('Error al obtener todas las mascotas:', error);
            alert('Error al obtener las mascotas. Inténtelo de nuevo más tarde.');
        }
    }

    function getMascotaData() {
        return {
            nombreApodo: document.getElementById('nombreApodo').value,
            especie: document.getElementById('especie').value,
            raza: document.getElementById('raza').value,
            color: document.getElementById('color').value,
            anioNacimiento: document.getElementById('anio_nacimiento').value
        };
    }
});
