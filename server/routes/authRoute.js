import express from 'express';
import { changeName, isAuthrized, login, logout, register, resetPassword, sendpassResetOtp, sendVerifyOtp, verifyEmail, verifyPassResetOtp } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp',userAuth, sendVerifyOtp);
authRouter.post('/verify-account',userAuth, verifyEmail);
authRouter.post('/is-auth',userAuth,isAuthrized)
authRouter.post('/reset-password',userAuth,resetPassword)
authRouter.post('/reset-password-otp',sendpassResetOtp)
authRouter.post('/verify-reset-otp',verifyPassResetOtp)
authRouter.post('/change-name',userAuth,changeName)





export default authRouter;