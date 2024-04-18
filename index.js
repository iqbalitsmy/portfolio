// copy to clipboard
const copyToClipboard = async (copyText) => {
    try {
        await navigator.clipboard.writeText(copyText);
        console.log('Content copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

// snackbar 
const snackBar = (mes) => {
    const mesSnackbar = document.getElementById('snackbar');
    mesSnackbar.innerHTML = mes
    mesSnackbar.className = "show"
    setTimeout(() => {
        mesSnackbar.className = mesSnackbar.className.replace("show", "")
    }, 3000)
}

function emailCopied() {
    const copiedEmail = document.getElementById("copiedEmail");
    copyToClipboard(copiedEmail.innerHTML);
    snackBar("Email copied to clipboard");
}

function numberCopied() {
    const copiedNum = document.getElementById("copiedNum");
    copyToClipboard(copiedNum.innerHTML);
    snackBar("Text copied to clipboard");

}

const drawer = () => {
    const nav = document.getElementById("topnav");
    var firstChild = document.querySelector('.navigation .icon svg:first-child');
    var lastChild = document.querySelector('.navigation .icon svg:last-child');

    if (nav.className === "navigation") {
        nav.className += " responsive";
        firstChild.style.display = 'none';
        lastChild.style.display = 'block';
    } else {
        nav.className = "navigation"
        firstChild.style.display = 'block';
        lastChild.style.display = 'none';

    }
}

const btnDisable = (btnId) => {
    const btn = document.getElementById(btnId);
    if (btn.className === "submit-btn") {
        btn.className += " submit-btn-disable";
    } else {
        btn.className += "submit-btn";
    }
}

// send mail data
document.getElementById('mailForms').addEventListener('submit', async (e) => {
    e.preventDefault();

    // disable send mail button
    const btn = document.getElementById("submit-btn");
    btn.disabled = true;

    snackBar("Email is sending...");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mes = document.getElementById("message").value;
    console.log({
        name: name,
        email: email,
        message: mes
    })

    try {
        const res = await fetch('https://portfolio-6ecc.onrender.com/user-mail/', {
            // const res = await fetch('http://localhost:3000/user-mail', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: mes
            })
        })
        const resData = await res.json();

        if (res.ok) {
            snackBar("Email send successfully.");
            btn.disabled = false;
            document.getElementById('mailForms').reset();
        } else {
            btn.disabled = false;
            alert('Failed to send email. Please try again later.');
        }

        console.log(resData)

    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send email. Please try again later.');
        btn.disabled = false;
    }
})


