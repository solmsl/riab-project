document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-login');
    const submitButton = form.querySelector('button[type="submit"]');
    const volverBtn = form.querySelector('.btn-volver');

    volverBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'https://riab-project.vercel.app';
    });

    form.addEventListener('input', () => {
        const isValid = form.checkValidity();
        submitButton.disabled = !isValid;
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const dni = document.getElementById('dni').value;
        const passw = document.getElementById('passw').value;

        const rescatistaData = {
            dni,
            passw
        };

        try { //luego cambiar el localhost a riab-api.vercel.app, por el momento dejarlo asi
            const response = await fetch('https://riab-api.vercel.app/rescatistas/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "https://riab-api.vercel.app",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(rescatistaData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert(data.message);
                document.cookie=`userInfo=${data.data.token}; Path=/; expires=Sat, 15 Dec 2035 11:11:11 UTC;`;
                // localStorage.setItem('token', data.data.token);

                form.reset();

                window.location.href = 'https://riab-project.vercel.app/src/soloRescatistas/inicio-res.html';
        
            } else {
                alert('Error: ' + data.error || 'Error al iniciar sesion.');
            }
        } catch (error) {
            alert("Error con el servidor");
            console.error('Error al iniciar sesion :c ', error);
            // document.querySelector('.error').style.display = 'block';
        }
    });
});

// const veoContrasena = document.getElementById('mostrarPassw');
// const inputContrasena = document.getElementById("passw");
// let click = false;

// veoContrasena.addEventListener('click', (e) => {
//     if (!click) {
//         inputContrasena.type = 'text';
//         click = true;
//     } else {
//         inputContrasena.type = 'password';
//         click = false;
//     }
// });
