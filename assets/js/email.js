const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'labhistoriaDrm@gmail.com',
        pass: 'nkas dxen qgjt zvlx' 
    }
});

 async function enviarEmail(emailDestino) {
    const info = await transporter.sendMail({
        from: 'labhistoriaDrm@gmail.com',
        to: 'cavalcantedj9@gmail.com',
        subject: 'agendamento',
        text: 'teste test',
        html: '<b>Olá</b>',
    });

    console.log('Mensagem enviada: %s', info.messageId);
}

enviarEmail().catch(console.error);