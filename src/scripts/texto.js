const div = document.querySelector("#letrero");
    texto = 'La misma chispa de vida que está dentro de ti, está dentro de todos nuestros amigos animales. El deseo de vivir es el mismo dentro de todos nosotros.';

function efectoTextTyping(elemento, texto, i=0){
    elemento.textContent = elemento.textContent + texto[i]; 
}

efectoTextTyping(div,texto);