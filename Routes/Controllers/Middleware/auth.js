const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "This is a secret key for JWT token generation. It should be kept private and secure.";



const jwtAuth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "No token provided"});
    }

    try{
        const verifiedToken = await jwt.verify(token, JWT_SECRET);
        req.user = verifiedToken;
        next();
}
    catch(err){
        return res.status(401).json({message: "Invalid token"});
    }
}

const generateToken = async (user) => {

  return jwt.sign(user, JWT_SECRET, { expiresIn: "1d" });
};

module.exports = { generateToken, jwtAuth };
