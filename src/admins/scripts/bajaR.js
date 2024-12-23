function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const token=getCookie("userInfo");
const app = "https://riab-api.vercel.app";
document.getElementById('formulario').addEventListener("submit",async (e)=>{
    e.preventDefault();
    const dni=document.getElementById("dni").value;
    try {
        //luego cambiar el localhost a riab-api.vercel.app, por el momento dejarlo asi
        const response = await fetch(`${app}/rescatistas/${dni}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                "Access-Control-Allow-Origin": "https://riab-api.vercel.app",
                "Access-Control-Allow-Credentials": true,
            },
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
