import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/usermodel.js'
import transporter from '../config/nodeMailer.js'
import { resetPasswordTemplate } from '../templates/resetPasswordTemplate.js'
import { welcomeTemplate } from '../templates/welcomeTemplate.js'
import { verifyEmailTemplate } from '../templates/verifyEmailTemplate.js'



export const register = async (req, res) => {

  const { name, email, password } = req.body;
  console.log(req.body);

  if (!name || !email || !password) {
    return res.json({ success: false, message: 'Missing form Details' })
  }

  try {
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.json({ success: false, message: "User Already Exist" })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // sending welcome Email

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `Welcome to Rewire 🌿`,
      html: welcomeTemplate(user.name),
    }

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "user Created Succesfully" });

  } catch (error) {
    res.json({ success: false, message: error.message })

  }

}



export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ sucess: false, message: "Email and Password are required" })
  }

  try {

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not Found." })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ success: true });


  } catch (error) {
    res.json({ success: false, message: error.message })

  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.json({ success: true, message: "Logged Out" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// send varification OTP to users
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    if (user.isAccountverified) {
      return res.json({ success: false, message: "Account already varified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify Your Email Address 🌿",
      html: verifyEmailTemplate(user.name, otp),
    }

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Varificaton Otp has been sent" });
  } catch (error) {
    res.json({ successs: false, message: error.message });

  }
}


export const verifyEmail = async (req, res) => {
  const userId = req.userId;
  const { otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "missing details" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "user doesn't Exist" });
    }

    if (user.verifyOtp === '' || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Incorrect Otp" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Otp Expired" })
    }


    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({ success: true, message: "Account has been Verified" })



  } catch (error) {
    return res.json({ success: false, message: "missing details" })
  }

}
export const isAuthrized = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select('-password'); // exclude password
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const changeName = async (req, res) => {
  const { newName } = req.body;
  const userId = req.userId;

  if (!newName || newName.trim() === "") {
    return res.json({ success: false, message: "Please provide a new name" });
  }

  try {
    // Find the user using their ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Update and save
    user.name = newName;
    await user.save();

    return res.json({ success: true, message: "Name updated successfully", user });
  } catch (error) {
    return res.json({ success: false, message: "Name change failed", error: error.message });
  }
};

export const resetPassword = async (req, res) => {

  const { email, oldpassword, newpassword } = req.body;

  if (!email || !oldpassword || !newpassword) {
    return res.json({ success: false, message: "fill the missing details" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    const isMatch = await bcrypt.compare(oldpassword, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Wrong Password" });

    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.json({ success: true, message: "Password reset Succesfully" })




  } catch (error) {

    return res.json({ success: false, message: "Password Reset failed" });
  }



}


export const sendpassResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Prevent OTP spam within valid window
    if (user.resetOtpExpireAt > Date.now()) {
      return res.json({
        success: false,
        message: "OTP already sent. Please wait before requesting a new one."
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send OTP email
    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Password Reset Request 🌿",
        html: resetPasswordTemplate(user.name, otp),
      });
    } catch (mailError) {
      console.error("Mail sending failed:", mailError);
      return res.json({ success: false, message: "Failed to send OTP email" });
    }

    // Create a short-lived JWT (15 min)
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });

    res.json({
      success: true,
      message: "OTP sent to your email",
      resetToken,
    });

  } catch (error) {
    console.error("Reset OTP error:", error);
    res.json({ success: false, message: error.message });
  }
};


export const verifyPassResetOtp = async (req, res) => {
  const { otp, newPassword } = req.body;
  const resetToken = req.headers.authorization?.split(" ")[1]; //bearer token

  if (!resetToken) {
    return res.json({ success: false, message: "Missing reset token" });
  }

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });

    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.resetOtp !== otp)
      return res.json({ success: false, message: "Incorrect OTP" });

    if (user.resetOtpExpireAt < Date.now())
      return res.json({ success: false, message: "OTP expired" });

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }

}

