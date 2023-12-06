const User = require("../model/User");

const handleLogout = async (req, res) => {
    //on client also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //successfull, no content
    const refreshToken = cookies.jwt;

    //is rftoken in db ?
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        return res.sendStatus(204); //successfull, no content
    }

    //delete rf token in db
    foundUser.refreshToken = foundUser.refreshToken.filter(
        (rt) => rt !== refreshToken
    );
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    });
    res.sendStatus(204); //successfull, no content
};

module.exports = { handleLogout };
