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
document.getElementById("formulario").addEventListener("submit",async (e)=>{
    e.preventDefault();
    const dni=document.getElementById("dni");
    const nombre=document.getElementById("nombre").value;
    const apellido=document.getElementById("apellido").value;
    const telefono=document.getElementById("telefono").value;
    const direccion=document.getElementById("direccion").value;
    const genero=document.getElementById("genero").value;
    const email=document.getElementById("email").value;
    const passw=document.getElementById("passw").value;
    const re_passw=document.getElementById("re_passw").value;
    const form={
        dni,
        nombre,
        apellido,
        telefono,
        direccion,
        genero,
        email,
        passw
    };
    console.log(form);
        try {
          //luego cambiar el localhost a riab-api.vercel.app, por el momento dejarlo asi
            const response = await fetch(`${app}/rescatistas/registro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "https://riab-api.vercel.app",
                    "Access-Control-Allow-Credentials": true,
                },
                body:JSON.stringify(form)
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