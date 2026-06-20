import nodemailer from "nodemailer";

export async function sendVerificationMessage(
  email: string,
  resetToken: string,
) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000,
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"ELITE HUB GLOBAL" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Email",
      html: `<div style="width: 100%; display: block; padding-bottom: 20px; height: fit-content; align-items: center;"><h2 style="font: bold; font-size: 30px; border: 3px solid white; margin: 0px auto;  margin-bottom: 60px; border-radius: 8px; padding: 30px 0px; text-align: center; width: 90%; color: #03a3ff;">ELITE HUB</h2>
      <h3 style="margin-bottom: 20px; text-align: center; width: 100%;">Your verification link</h3>
      <p style="margin-bottom: 5px; font-size: 16px; text-align: center; width: 100%;">This is your verification link <a style="color: #03a3ff;" href="${
        process.env.BASE_URL
      }/auth/user/verify?token=${resetToken}">Verify Email</a></p> 
      <p style="margin-bottom: 50px; text-align: center; width: 100%;">(Expires in 1 hour)</p>
      <p style="text-align: center; width: 100%;">Contact 09045342672 on WhatsApp for help info</p><p style="font-size: 8px; opacity: 0; width: 100%; text-align: center;">Mail Id: ${Date.now()}</p></div>`,
      headers: {},
    });
  } catch (error) {
    console.error("error in sending message", error);
  }
}
