function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const token=getCookie("userInfo");
console.log(token);
const app = "https://riab-api.vercel.app";

function verificar(){
    if (!token) {
        alert("Acceso Denegado. Inicia Sesión para acceder a esta ruta.");
        window.location.href = 'https://riab-project.vercel.app';
        return;
    }
    console.log("Cookie verificada correctamente")
}
document.getElementById("botonListar").addEventListener("click",async (e)=>{
    e.preventDefault();
        try {
          //luego cambiar el localhost a riab-api.vercel.app, por el momento dejarlo asi
            const response = await fetch(`${app}/rescatistas/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "https://riab-api.vercel.app",
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
}) 
verificar();