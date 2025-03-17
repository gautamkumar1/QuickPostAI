import { createUser } from "../services/user-services.js";

const registerUser = async (req, res) => {
    try {
        const user = await createUser(req.body);
        return res.status(201).json({ message: "User created successfully",user});
    } catch (error) {
        console.log(`Error while registering user`);
        return res.status(500).json({ error: error.message });
        
    }
}

export { registerUser }