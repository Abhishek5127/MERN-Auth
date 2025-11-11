import userModel from "../models/usermodel.js";
import userAuth from "../middleware/userAuth.js";

export const getUserData = async(req,res)=>{

    try {

        const userId = req.userId;
        const user = await userModel.findById(userId);
        
        if(!user){
            return res.json({success:false,message:"user not found"})
        }

        res.json({
            success:true,
            userData:{
                name:user.name,
                isAccountVerified:user.isAccountVerified,
                email:user.email
            }
        })

    } catch (error) {
        return res.json({success:false,message:error.message})
    }

}