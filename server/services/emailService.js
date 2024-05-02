import nodemailer from "nodemailer"

export const sendEmailService = async() => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "luongviethai12d@gmail.com",
          pass: "ejjq cylk ewrc bgou    ",
        },
      });


      const info = await transporter.sendMail({
        from: '"Hailv 👻" <luongviethai12d@gmail.com>', // sender address
        to: "hailv@magezon.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
      

      return info
}