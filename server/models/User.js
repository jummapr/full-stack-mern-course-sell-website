import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import crypto from "crypto";

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please Enter Your Name'],

    },
    email: {
        type: String,
        required:[true,'Please Enter Your Email'],
        index: true,
        unique: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required:[true,'Please Enter Your Password'],
        minLength: [6,"password must be at least 6 characters"],
        select: false,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],        
        default: 'user',

    },
    subscription: {
        id: String,
        status: String,

    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },

    },
    playlist: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            },
            poster: String
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now,
    },

    ResetPasswordToken: String,
    ResetPasswordExpire: String
});

Schema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
  this.password= await bcrypt.hash(this.password,10);

  next();
});
Schema.methods.comparePassword = async function(password) {
    // console.log(this.password)
    return await bcrypt.compare(password,this.password)
}

Schema.methods.getJWTToken = function() {
    return jwt.sign({ _id: this._id}, process.env.JWT_SECRET,  {
       expiresIn: "15d" 
    })
}

Schema.methods.getResetToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

   this.ResetPasswordToken = crypto.createHash("sha256").update(resetToken);
   this.ResetPasswordExpire = Date.now() + 15* 60 *1000

    return resetToken;
}



const User = new mongoose.model("User",Schema)

export default User;