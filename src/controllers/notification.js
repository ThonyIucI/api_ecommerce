const nodemailer = require('nodemailer')

const sendNotification = (req, res)=>{
    const { text , subject } = req.body

    var transporter = nodemailer.createTransport({
        host : "smtp.ethereal.email",
        post:587,
        secure:false,
        auth: {
            user: "corene59@ethereal.email", //NUESTRO MAIL DESDE DONDE MANDAREMOS EL MENSAJE
            pass: "KbRCP3GP5tX97QZB6t"  //nuestra contra
        },
    })

    var mailOptions = {
        from: "Remitente",
        to: "diego.cab.1016@gmail.com", // ESTE ES EL MAIL DEL USUARIO AL QUE LE VAMOS A ENVIAR Y VIENE CON REQ
        subject:subject, //  DEBERIA VENIR POR REQ
        text:text
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message)
         } else {
            console.log('enviado')
            res.status(200).json(req.body)
         }
    })
}
module.exports={
    sendNotification
}