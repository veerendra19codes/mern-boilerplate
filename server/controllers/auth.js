const zod = require("zod");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerBody = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
    confirmPassword: zod.string()
})

const registerController = async(req, res) => {
    const {username, email, password, confirmPassword } = await req.body;
    console.log("username: ", username);

    try {
        //zod validation
        const { success } = registerBody.safeParse(req.body);

        if(!success) {
            console.log("invalid inputs");
            return res.status(411).json({message: "Invalid inputs"})
        }

        // check if password and confirmPasswords match

        if(password != confirmPassword) {
            console.log("passwords donot match");
            return res.status(411).json({message: "passwords do not match"})
        }

        // check if user already exists in db

        const exists = await User.findOne({username});

        if(exists) {
            console.log("exists: ", exists);
            return res.status(411).json({message: "User already exists"})
        }

        // add the user in db

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword: ", hashedPassword);

        const newUser = await User.create({
            username,
            email,
            password:hashedPassword
        })
        console.log("newUser: ", newUser);

        const token = await jwt.sign( {userId: newUser._id }, process.env.JWT_SECRET);
        console.log("token: ", token);

        return res.status(200).json({message: "User created successfully", token})

        // create jwt token and return it
    } catch (error) {
        console.log("error in registering: ", error);
        return res.status(411).json({message: "Something went wrong"})
    }
}

const loginBody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
})

const loginController = async(req, res) => {
    const { email, password } = await req.body;

    try {
        //zod validation
        const { success } = loginBody.safeParse(req.body);

        if(!success) {
            console.log("invalid inputs");
            return res.status(411).json({message: "Invalid inputs"})
        }

        // check if user already exists in db

        const exists = await User.findOne({email});

        if(!exists) {
            console.log("exists: ", exists);
            return res.status(411).json({message: "User does not already exists"})
        }

        //return token

        const token = await jwt.sign( {userId: exists._id }, process.env.JWT_SECRET);
        console.log("token: ", token);

        return res.status(200).json({message: "User logged in successfully", token})

        // create jwt token and return it
    } catch (error) {
        console.log("error in logging in: ", error);
        return res.status(411).json({message: "Something went wrong"})
    }
}

module.exports = { loginController, registerController };