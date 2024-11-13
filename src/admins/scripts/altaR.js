const token = document.cookie; 

const app = "https://riab-api.vercel.app";

function verificar(){
    if (!token) {
        alert("Acceso Denegado. Inicia Sesión para acceder a esta ruta.");
        window.location.href = 'https://riab-project.vercel.app';
        return;
    }
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
const dni=document.getElementById("dni");
const nombre=document.getElementById("nombre");
const apellido=document.getElementById("apellido");
const telefono=document.getElementById("telefono");
const direccion=document.getElementById("direccion");
const genero=document.getElementById("genero");
const email=document.getElementById("email");
const passw=document.getElementById("passw");
const re_passw=document.getElementById("re_passw");
const form={
    dni,
    nombre,
    apellido,
    telefono,
    direccion,
    genero,
    email,
    passw,
    re_passw
};
document.getElementById("formulario").addEventListener("submit",async (e)=>{
    e.preventDefault();
        try {
          //luego cambiar el localhost a riab-api.vercel.app, por el momento dejarlo asi
            const response = await fetch(`${app}/rescatistas/registro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    // "Access-Control-Allow-Origin": "https://localhost:5500",
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