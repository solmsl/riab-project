const app = "https://riab-api.vercel.app";
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

    traerDatos();
}

//Decodifica el token y toma el sector donde se encuentra el DNI
const getDniFromToken = (token) => {
    try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));

        return decodedPayload.dni;
    } catch (error) {
        console.error('Error decodificando el token:', error);
        return null;
    }
};

async function traerDatos() {
    try {
      //luego cambiar el localhost a riab-api.vercel.app, por el momento dejarlo asi
        const response = await fetch(`${app}/rescatistas/${getDniFromToken(token)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                // "Access-Control-Allow-Origin": "https://localhost:5500",
                "Access-Control-Allow-Credentials": true,
            }
        });

        const data = await response.json();

        if (response.ok && data.success) {
            console.log(data.data);
        } else {
            alert('Error: ' + data.error);
            throw new Error(data.error || 'Error desconocido en el servidor.');
        }

    } catch (error) {
        console.error('Error: ', error);
    }
}
  
verificar();