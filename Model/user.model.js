const mongoose= require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        caseSensitive: false,
        minLength: 5,
        maxLength: 15
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 20,
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {timestamps: true});

userSchema.pre("save", async function(next){
    const user = this;
    if(!(user.isModified("password"))){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    }
    catch(err){
        console.log(err);
    }
})

userSchema.methods.comparePassword = async function(password){
    const user = this;
    try{ 
        return await bcrypt.compare(password, user.password);
    }
    catch(err){
        console.log(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;