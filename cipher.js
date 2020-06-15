// Cipher tool

function encrypt() {
    var cipherkeybox = document.getElementById("cipherkey")
    var ciphertextbox = document.getElementById("ciphertext")

    key = cipherkeybox.value
    plaintext = ciphertextbox.value

    var items = plaintext.split(" ")
    var reversed = []

    for (i = 0; i < items.length; i++){
        reversed.push(items[i].split("").reverse().join(""))
    }
    
    ciphertextbox.value = reversed.join(" ")

    
}