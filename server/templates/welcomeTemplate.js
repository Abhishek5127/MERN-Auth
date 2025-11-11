export const welcomeTemplate = (name = "User") => `
  <div style="font-family:'Poppins',sans-serif;background-color:#f8f9f4;padding:25px;">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:14px;padding:30px;box-shadow:0 8px 25px rgba(0,0,0,0.12);">
      <div style="text-align:center;">
        <img src="https://i.imgur.com/dEyiRZT.png" alt="Rewire Logo" style="width:80px;margin-bottom:10px;">
        <h2 style="color:#4e5526;margin:10px 0;">Welcome to <span style="color:#636b2f;">Rewire</span> 🌿</h2>
      </div>
      <p style="font-size:16px;color:#333;line-height:1.6;text-align:center;">
        Hey ${name},<br/>
        We’re thrilled to have you join <b>Rewire</b>! You’ve taken the first step towards a smarter way of learning and connecting.  
      </p>
      <p style="text-align:center;font-size:15px;color:#555;">
        Explore new tools, connect with developers, and grow your skills every day.
      </p>
      <div style="text-align:center;margin-top:25px;">
        <a href="https://rewire.com/login" style="background:#636b2f;color:#fff;text-decoration:none;padding:10px 24px;border-radius:8px;display:inline-block;font-weight:600;">
          Get Started
        </a>
      </div>
      <hr style="margin:25px 0;border:none;border-top:1px solid #ddd;">
      <p style="text-align:center;color:#777;font-size:13px;">Team Rewire © 2025</p>
    </div>
  </div>
`;
