import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Register Logic

export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters"});
        }

        const trimmedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email: trimmedEmail }); //query object
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //const saltRounds = 10;
        //const salt = await bcrypt.genSalt(saltRounds);
        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: trimmedEmail,
            password: hashed
        });

        res.status(201).json({ message: "User registered", userId: user._id });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server Error" });
    }
}

export const login = async (req, res) =>{

   const { email, password } = req.body;

   if(!email || !password){
    return res.status(400).josn({ message: "All fields are required" });
   }
   
   const trimmedEmail = email.trim().toLowerCase();

   const user = await User.findOne({ email: trimmedEmail });
   if(!user){
    return res.status(400).json({ message: "Invalid email or password" });
   }

   const isMatch = await bcrypt.compare(password, user.password);
   if(!isMatch){
    return res.status(400).json({ message: "Invalid email or password" });
   }

   const token = jwt.sign(
    {id: user._id},
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
   );

   res.status(201).json({
    message: "Login successfull",
    token
   });
}