import userModel from "../Models/userModel.js";




export const getWeeklyRank = async (req, res) => {

    try {
        const result = await userModel.find({}).sort({ points: -1 })
        result.forEach((item, index) => {
            let temp = {
                username: item.username,
                displayname: item.displayname,
                icon: item.icon,
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
                icon: item.icon,
                points: item.allTimePoint.highestPoints
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




//================================== for update points use=========================
// set week point to 0
export const changeWeekPoint2 = async (userId) => {

    try {
        await userModel.updateOne(
            { _id: userId },
            { $set: { points: (+0) } },
        );
    } catch (err) {
        res.status(500).json(err)
    }
}

// set add week point to total point
export const changeHighestPoint2 = async (userId, weekPoint, CurrentTotalPoint) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    const allTimePoint = {
        time: today,
        highestPoints: ((+CurrentTotalPoint)+(+weekPoint))
    }

    try {
        await userModel.updateOne(
            { _id: userId },
            { $set: { allTimePoint: allTimePoint } },
        );
    } catch (err) {
        res.status(500).json(err)
    }
}





// weekly update user points: add the week points to total points.
// save this week point to temp, add temp to total points, set week point to 0, save
export const updatePoints = async (req, res) => {

    try {
        const result = await userModel.find({})
        result.forEach((item, index) => {
            let temp = {
                username: item.username,
                userId : item._id,
                weeklyPoints: item.points,
                points: item.allTimePoint.highestPoints
            }
            changeHighestPoint2(temp.userId, temp.weeklyPoints, temp.points);
            changeWeekPoint2(temp.userId)
        })

        // res.status(200).json(await userModel.find({}))
        console.log("User Point updated at " + new Date())

    } catch (error) {
        // res.status(500).json(err)
        console.log(err)

    }

}