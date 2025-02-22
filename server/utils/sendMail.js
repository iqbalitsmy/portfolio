const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.net",
    port: 465,
    secure: true,
    auth: {
        user: "saifhasanitsmy@gmail.com",
        pass: "icjtgvctdosmxiob",
    },
});


const sendMail = async (data) => {
    // console.log(data)
    const mailOptions = {
        from: {
            name: 'Portfolio Mail',
            address: `${data.email}`,
        }, // sender address
        to: `iqbalitsmy@gmail.com`, // receivers
        subject: `${data.name} sent a message from portfolio website.`, // Subject line
        text: "", // plain text body
        html: `<div><p>Dear Iqbal Hossain,<br /></p> <p>${data.name} sent a message from portfolio website. <br />Email: ${data.email}<br /><br />${data.message}</p></div>`, // html body
        priority: 'high', // Mark the email as important
    }

    // console.log(path)
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email has been send successfully");
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = sendMail;