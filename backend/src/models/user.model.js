import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: { 
            type: String, 
            required: true, 
            unique: true,
            lowercase: true,
            trim: true,  // Remove whitespace
            minlength: 1,
            maxlength: 30
        },

        password: { 
            type: String,
            required: true,
            minlength: 6,
            maxlength: 100
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address']
        }

    },

    {    
        timestamps: true 
    }
)

//before saving the user, hash the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) 
        return;
    this.password = await bcrypt.hash(this.password, 10);
});

//compare password method
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
