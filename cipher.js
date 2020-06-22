// Cipher tool

function encrypt(plaintext) {
    var items = plaintext.split(" ")
    var reversed = []

    for (i = 0; i < items.length; i++){
        reversed.push(items[i].split("").reverse().join(""))
    }
    return reversed.join(" ")
}

async function pasteencrypt() {
    const text = await navigator.clipboard.readText();
    var ciphertextbox = document.getElementById("ciphertext")
    ciphertextbox.value = encrypt(text)
    copyToClipboard(ciphertextbox.value) 
}

function handleencrypt() {
    var ciphertextbox = document.getElementById("ciphertext")
    plaintext = ciphertextbox.value
    ciphertextbox.value = encrypt(plaintext)
    copyToClipboard(ciphertextbox.value) 
}

/*
async function paste(input) {
    const text = await navigator.clipboard.readText();
    input.value = text;
}
*/