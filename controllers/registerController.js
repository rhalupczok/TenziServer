const TenziUser = require("../model/TenziUser");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res
            .status(400)
            .json({ message: "Username and password are required" });
    //check for duplicate usernames
    const duplicate = await TenziUser.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //conflict
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store new user
        const result = await TenziUser.create({
            //instead of .... = New User.save()
            username: user,
            password: hashedPwd,
        });
        res.status(201).json({ success: `New user ${user} created` });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewUser };
