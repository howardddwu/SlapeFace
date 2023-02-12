import userModel from "../Models/userModel.js";




export const getWeeklyRank = async (req, res) => {

    try {
        const result = await userModel.find({}).sort({ points: -1 })
        result.forEach((item, index) => {
            let temp = {
                username: item.username,
                displayname: item.displayname,
                points: item.points
            }
            result[index] = temp
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getAllRank = async (req, res) => {
    try {
        const result = await userModel.find({}).sort({ "allTimePoint.highestPoints": -1 })
        result.forEach((item, index) => {
            let temp = {
                username: item.username,
                displayname: item.displayname,
                highestPoints: item.allTimePoint.highestPoints
            }
            result[index] = temp
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}


export const changeWeekPoint = async (req, res) => {

    const { point } = req.body
    const userId = req.params.userId;

    try {

        await userModel.updateOne(
            { _id: userId },
            { $set: { points: (+point) } },
        );
        res.status(200).json("updated to " + point)
    } catch (err) {
        res.status(500).json(err)
    }
}


export const changeHighestPoint = async (req, res) => {

    const { point } = req.body
    const userId = req.params.userId;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    const allTimePoint = {
        time: today,
        highestPoints: (+point)
    }

    try {

        await userModel.updateOne(
            { _id: userId },
            { $set: { allTimePoint: allTimePoint } },
        );
        res.status(200).json("Highest Point is set to " + point + " at " + today)
    } catch (err) {
        res.status(500).json(err)
    }
}
