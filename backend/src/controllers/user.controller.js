import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input 
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // Check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = await User.create ({ 
            username,  
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({ message: 'User registered successfully',
            user: { id: user._id, email: user.email, username: user.username }
         });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message }); 
    }
};

const loginUser = async (req, res) => {
    try {
        //check if user exists
        const { email, password } = req.body;

        const user = await User.findOne({ 
            email: email.toLowerCase()
        });

        if (!user)
            return res.status(400).json({
                 message: 'User not found' });

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid Password'
            });
        }
        //successful login, update loggedIn status
                             
        res.status(200).json({
            message: 'Login successful',
            user: { 
                id: user._id, 
                email: user.email, 
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in user" }); 
    }
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.loggedIn = false;
        await user.save();
        res.status(200).json({ message: 'Logout successful' });

    } catch (error) {
        res.status(500).json({ message: 'Error logging out user', error: error.message });
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
};