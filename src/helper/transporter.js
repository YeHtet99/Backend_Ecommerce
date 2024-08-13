const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yemyinthtet99999@gmail.com',
        pass: 'nmhq pwwm lssj sbml'
    }
});

const greetingMailOptions = (userInfo, subject, mailTexts) => {
    return {
        from: 'yemyinthtet99999@gmail.com',
        to: userInfo.email,
        subject: subject,
        html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h3 style="font-size: 25px; letter-spacing: 2px;">
          Hi ${userInfo.userName},
          </h3>
          <h1 style="font-size: 40px; letter-spacing: 2px;">
          Welcome!
          </h1>
          <h2>${mailTexts}</h2>
     </div>
      `
    };
  }

module.exports={transporter,greetingMailOptions}