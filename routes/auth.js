import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs'

const router = express.Router();

//sign up
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body; // Corrected the destructuring
        const hashPassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashPassword });
        await user.save(); // Removed the unnecessary .then() chaining
        res.status(200).json({ message: "user signin successfully!!" }); // You can simplify this to just: res.status(200).json({ user });
    } catch (error) {
        res.status(200).json({ message: "user already existed!!" });
    }
});

//sign in
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(200).json({ message: "please signup first" });
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password);
        if(!isPasswordCorrect){
            res.status(200).json({ message: "incorrect password" });
        }
        const {password , ...others} = user._doc;
        res.status(200 ).json({ others });
    } catch (error) {
        res.status(200).json({ message: "user already existed" });
    }
});

export default router;
