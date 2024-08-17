const textArea = document.querySelector(".text__area");
const mensagem = document.querySelector(".mensagem");

// As "chaves" de criptografia que utilizaremos são:
// A letra "e" é convertida para "enter"
// A letra "i" é convertida para "imes"
// A letra "a" é convertida para "ai"
// A letra "o" é convertida para "ober"
// A letra "u" é convertida para "ufat"

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, "");
}
function verificarCaracteres(event) {
    const char = String.fromCharCode(event.keyCode || event.which);
    const regex = /^[a-zA-Z0-9 ]+$/;

    if (!regex.test(char)) {
        event.preventDefault();
        Swal.fire({
            title: 'Caractere Inválido!',
            text: 'Por favor, não digite acentos ou caracteres especiais.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }
}
textArea.addEventListener("keypress", verificarCaracteres);

function btnEncriptar() {
    const textoSemAcentos = removerAcentos(textArea.value);
    const textoEncriptado = encriptar(textoSemAcentos);
    mensagem.value = textoEncriptado;
    textArea.value = "";
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptada;
}

function btnDesencriptar() {
    const textoDesencriptado = desencriptar(textArea.value);
    mensagem.value = textoDesencriptado;
    textArea.value = "";
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return stringDesencriptada;
}

function btnCopiar() {
    navigator.clipboard.writeText(mensagem.value)
        .then(() => {
            Swal.fire({
                title: 'Texto Copiado!',
                text: 'O texto foi copiado para a área de transferência.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        })
        .catch(err => {
            console.error("Erro ao copiar texto: ", err);
        });
}

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, "");
}


