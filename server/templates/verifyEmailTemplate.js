export const verifyEmailTemplate = (name = "User", otp) => `
  <div style="font-family:'Poppins',sans-serif;background-color:#f8f9f4;padding:25px;">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:14px;padding:30px;box-shadow:0 8px 25px rgba(0,0,0,0.12);">
      <div style="text-align:center;">
        <img src="https://i.imgur.com/dEyiRZT.png" alt="Rewire Logo" style="width:80px;margin-bottom:10px;">
        <h2 style="color:#636b2f;">Verify Your Email</h2>
      </div>
      <p style="font-size:16px;color:#333;text-align:center;line-height:1.6;">
        Hi ${name},<br/>
        Use the following OTP to verify your email address for your <b>Rewire</b> account.
      </p>
      <h1 style="text-align:center;letter-spacing:10px;color:#4e5526;margin:24px 0;">${otp}</h1>
      <p style="font-size:14px;color:#777;text-align:center;">
        This OTP will expire in <b>10 minutes</b>. Please don’t share it with anyone.
      </p>
      <hr style="margin:25px 0;border:none;border-top:1px solid #ddd;">
      <p style="text-align:center;color:#636b2f;font-size:13px;">Team Rewire 🌿</p>
    </div>
  </div>
`;
