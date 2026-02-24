import jwt from "jsonwebtoken";
//editing for githance check
const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again..." });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode?.id) {
      // ✅ safely attach userId to request object (not req.body)
      req.userId = tokenDecode.id;
      next();
    } else {
      return res.json({ success: false, message: "Not Authorized, Login Again..." });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
