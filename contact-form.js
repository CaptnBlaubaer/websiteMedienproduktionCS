// constants
const forbiddenCharactersText = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '{', '}', '[', ']', ':', ';', '"', "'", '<', '>', '/', '|', '\\','_'];
const forbiddenCharactersTel = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', , '=', '{', '}', '[', ']', ':', ';', '"', "'", '<', '>', '/', '|', '\\','_'];
const regExMail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const regExPhone = /^(\+|0)[0-9 ]/

// ****** DEFINING DOM ELEMENTS **********
const contact_form = document.getElementById("contact-form");

// ********* ADDING LOGIC ************
contact_form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (validateForm()){
        sendData();
    }
})

function validateForm(){
    let isValid = true;

    let str = contact_form.elements["name"].value;
    if (str.split("").some((char) => forbiddenCharactersText.includes(char)) 
            || str.trim().length === 0){
        isValid = false;
    }

    str = contact_form.elements["mail"].value;
    if (!regExMail.test(str)){
        isValid = false;
    }

    str = contact_form.elements["phone"].value;
    if (str && !regExPhone.test(str)){
        isValid = false;
    }

    str = contact_form.elements["subject"].value;
    if (str.split("").some((char) => forbiddenCharactersText.includes(char))
            || str.trim().length === 0){
        isValid = false;
    }

    str = contact_form.elements["message"].value;
    if (str.split("").some((char) => forbiddenCharactersText.includes(char)) 
            || str.trim().length === 0){
        isValid = false;
    }

    return isValid;
}

async function sendData(){
    const formData = new FormData(contact_form);
    
    const url = 'http://localhost/test.php';

    console.log(url);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            console.log(response.status);

            const result = await response.json();

            console.log(result);
        }

        console.log("success!");

    } catch (err){
        console.log(err.message);
    }
}

sendData();