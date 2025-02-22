let goToTopBtnTimeOut;

window.addEventListener('scroll', () => {
    const goToTopBtn = document.getElementById('goToTop');

    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        goToTopBtn.style.display = "block";

        clearTimeout(goToTopBtnTimeOut);

        goToTopBtnTimeOut = setTimeout(() => {
            goToTopBtn.style.display = "none";
        }, 3000);
    } else {
        goToTopBtn.style.display = "none";
    }
});

// Smooth scroll to top
document.getElementById('goToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});






// copy to clipboard
const copyToClipboard = async (copyText) => {
    try {
        await navigator.clipboard.writeText(copyText);
        console.log('Content copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

let snackbarTimeout;

const snackBar = (mes, duration = 3000) => {
    const mesSnackbar = document.getElementById("snackbar");

    // If a snackbar is already visible, clear its timeout and hide it first.
    if (mesSnackbar.classList.contains("show")) {
        clearTimeout(snackbarTimeout);
        mesSnackbar.classList.remove("show");


        // Wait for the hide animation to complete before showing the new message.
        setTimeout(() => {
            showSnackbarMessage(mesSnackbar, mes, duration);
        }, 300); // Adjust delay to match your CSS transition timing.
    } else {
        showSnackbarMessage(mesSnackbar, mes, duration);
    }
};

const showSnackbarMessage = (mesSnackbar, mes, duration) => {
    mesSnackbar.innerHTML = mes;
    mesSnackbar.classList.add("show");

    // Only set the removal timer if duration is greater than 0.
    if (duration > 0) {
        snackbarTimeout = setTimeout(() => {
            mesSnackbar.classList.remove("show");
        }, duration);
    }
};

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

    snackBar("Email is sending...", -1);

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


