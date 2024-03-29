const TenziUser = require("../model/TenziUser");

const getAllUsers = async (req, res) => {
    const users = await TenziUser.find();
    if (!users) return res.status(204).json({ message: "No users found" });
    res.json(users);
};

const deleteUser = async (req, res) => {
    if (!req?.body?.id)
        return res.status(400).json({ message: "ID parameter is required" });
    const user = await TenziUser.findOne({ _id: req.body.id }).exec();
    if (!user)
        return res
            .status(204)
            .json({ message: `User ID: ${req.body.id} - not found` });
    const result = await TenziUser.deleteOne({ _id: req.body.id });
    res.json(result);
};

const getUser = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({ message: "ID parameter is required" });
    const user = await TenziUser.findOne({ _id: req.params.id }).exec();
    if (!user)
        return res
            .status(204)
            .json({ message: `User ID ${req.params.id} not found` });
    res.json(user);
};

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
};
