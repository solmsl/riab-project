const btn = document.getElementById('btn-logout');
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
const token=getCookie("userInfo");
console.log(token);
// const token = localStorage();
const app = "https://riab-api.vercel.app";

function verificar(){
    if (!token) {
        alert("Acceso Denegado. Inicia Sesión para acceder a esta ruta.");
        window.location.href = 'https://riab-project.vercel.app';
        return;
    }

    //evento del btn Cerrar Sesión
    btn.addEventListener('click', logout);
}

async function logout() {
    try { //luego cambiar el localhost a riab-api.vercel.app, por el momento dejarlo asi
        const response = await fetch(`https://riab-api.vercel.app/rescatistas/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                // "Access-Control-Allow-Origin": "https://localhost:5500",
                "Access-Control-Allow-Credentials": true,
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido en el servidor.');
        }
        document.cookie=`userInfo=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        const data = await response.json();
        alert(data.message);
        console.log(data.message, "aca se borra");
        
        // localStorage.removeItem('token');
        window.location.href = 'https://riab-project.vercel.app';

    } catch (error) {
        console.error('Error: ', error);
    }

}

verificar();
