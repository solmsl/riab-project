document.addEventListener("DOMContentLoaded", () => {
    const especieSelect = document.getElementById('especie');
    const razaSelect = document.getElementById('raza');
    const form = document.getElementById('mascota-form');
    const submitButton = document.getElementById('btn-confirmar');

    const razasPermitidas = {
        perro: ['labrador', 'bulldog', 'beagle', 'poodle', 'chihuahua', 'otro'],
        gato: ['persa', 'siamés', 'bengalí', 'maine coon', 'cruza', 'otro'],
        loro: ['cacatúa', 'loro gris', 'amazonas', 'agaporni', 'loro de sol', 'otro'],
        tortuga: ['tortuga de tierra', 'tortuga de agua', 'tortuga de estanque', 'tortuga gigante', 'otro'],
        conejo: ['holland lop', 'rex', 'angora', 'mini rex', 'lionhead', 'otro'],
        pato: ['pato pekinés', 'pato muscovy', 'pato rizado', 'pato cayuga', 'pato rouen', 'otro']
    };

    especieSelect.addEventListener('change', () => {
        const especie = especieSelect.value;
        razaSelect.innerHTML = '<option value="">Seleccione una raza</option>';
        
        if (especie && razasPermitidas[especie]) {
            razasPermitidas[especie].forEach(raza => {
                const option = document.createElement('option');
                option.value = raza;
                option.textContent = raza;
                razaSelect.appendChild(option);
            });
        }
    });

    form.addEventListener('input', () => {
        const isValid = form.checkValidity();
        submitButton.disabled = !isValid;

        Array.from(form.elements).forEach(input => {
            if (input.type !== "submit" && !input.checkValidity()) {
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
                alert(data.message);
                form.reset();
                window.location.href = './soloRescatistas/añadirMascotas.html'; 
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
    
    document.getElementById('btn-actualizar').addEventListener('click', () => {
        window.location.href = './script-rescatistas/rutas-mascotas/actualizarMascotas.html'; 
    });

    document.getElementById('btn-buscar').addEventListener('click', () => {
        window.location.href = './script-rescatistas/rutas-mascotas/buscarMascotas.html'; 
    });

    document.getElementById('btn-ver-todas').addEventListener('click', () => {
        window.location.href = './script-rescatistas/mascotas.html'; 
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

    function getMascotaData() {
        const nombreApodo = document.getElementById('nombreApodo');
        const especie = document.getElementById('especie');
        const raza = document.getElementById('raza');
        const color = document.getElementById('color');
        const anioNacimiento = document.getElementById('anio_nacimiento');
    
        return {
            nombreApodo: nombreApodo?.value || '',
            especie: especie?.value || '',
            raza: raza?.value || '',
            color: color?.value || '',
            anioNacimiento: anioNacimiento?.value || ''
        };
    }    
});
