const TenziUser = require("../model/TenziUser");

const updateUserScore = async (req, res) => {
    const foundUser = await TenziUser.findOne({
        username: req.body.user,
    }).exec();
    const userScoresArr = foundUser.scores ? foundUser.scores : [];
    userScoresArr.push({
        username: req.body.user,
        time: req.body.time,
        fouls: req.body.fouls,
    });
    userScoresArr.sort((a, b) => a.time - b.time).slice(0, 10);
    foundUser.scores = userScoresArr;
    const result = await foundUser.save();
};

const getScores = async (req, res) => {
    const foundAll = await TenziUser.find({}).exec();
    const resultsArr = foundAll.map((result) => result.scores);
    const mergedResultsArr = resultsArr.flat(1);
    const sortedMergedResultsArr = mergedResultsArr
        .sort((a, b) => a.time - b.time)
        .slice(0, 50);
    res.json(sortedMergedResultsArr);
};

const getUserScores = async (req, res) => {
    if (!req?.params?.userName)
        return res.status(400).json({ message: "Name is required" });
    const foundUser = await TenziUser.findOne({
        username: req.params.userName,
    }).exec();
    const userScores = foundUser.scores;
    if (!foundUser)
        return res
            .status(204)
            .json({ message: `User name ${req.params.userName} not found` });
    res.json(userScores);
};

const deleteUserScores = async (req, res) => {
    if (!req?.params?.userName)
        return res.status(400).json({ message: "Name is required" });
    const foundUser = await TenziUser.findOne({
        username: req.params.userName,
    }).exec();
    foundUser.scores = [];
    const result = await foundUser.save();
    res.json(result);
};

// const deleteUser = async (req, res) => {
//     if (!req?.body?.id)
//         return res.status(400).json({ message: "ID parameter is required" });
//     const user = await User.findOne({ _id: req.body.id }).exec();
//     if (!user)
//         return res
//             .status(204)
//             .json({ message: `User ID: ${req.body.id} - not found` });
//     const result = await User.deleteOne({ _id: req.body.id });
//     res.json(result);
// };

// const getUser = async (req, res) => {
//     if (!req?.params?.id)
//         return res.status(400).json({ message: "ID parameter is required" });
//     const user = await User.findOne({ _id: req.params.id }).exec();
//     if (!user)
//         return res
//             .status(204)
//             .json({ message: `User ID ${req.params.id} not found` });
//     res.json(user);
// };

module.exports = {
    updateUserScore,
    getUserScores,
    getScores,
    deleteUserScores,
};
