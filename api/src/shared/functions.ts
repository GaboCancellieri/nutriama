const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'Gmail',
    secure: true,
    auth: {
        user: 'cadena_campo_restauracion@gmail.com',
        pass: '123456789'
    }
});

export const sendEmail = async (email: string, codigo: string): Promise<void> => {
    try {
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Cadena Campo Restauración" <cadena_campo_restauracion@gmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject: 'RESTAURACIÓN DE CONTRASEÑA', // Subject line
            html: `
            <h1>Restauración de Contraseña</h1>
            <a href='localhost:4200/recuperacion/${codigo}/${email}' target="_blank"><button class="btn btn-primary"> RESTAURAR </button></a>
            ` // html body
        };

        // send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);
        console.log('Message %s sent: %s', info.messageId, info.response);
    } catch (error) {
        console.log(error)
    }
};