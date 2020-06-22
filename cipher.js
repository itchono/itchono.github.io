// Cipher tool

function encrypt(plaintext) {
    var cipherkeybox = document.getElementById("cipherkey")
    key = parseInt(cipherkeybox.value)

    var items = plaintext.split(" ")
    var reversed = []

    for (i = 0; i < items.length; i++){
        var intermediate = items[i].split("").reverse()

        if (key != 0) {

            for (j = 0; j < intermediate.length; j++) {
            
                var asc = intermediate[j].charCodeAt()
                
                if (asc >= 65 && asc <= 90) {
                    asc = 25 - (asc - 65 + key) % 26 + 65
                    intermediate[j] = String.fromCharCode(asc)
                }
                else if (asc >= 97 && asc <= 122) {
                    asc = 25 - (asc - 97 + key) % 26 + 97
                    intermediate[j] = String.fromCharCode(asc)
                }
            }
            // simple symmetrical cipher
        }

        reversed.push(intermediate.join(""))
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