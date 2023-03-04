import ProphecyModel from "../Models/prophecyModel.js";



//return the prophecies based on the selected cateories
//and search key. return prophecies with user info
export const searchProphecy = async (req, res) => {
    const { searchKey, category } = req.body;

    try {
        let result;
        //if category is given
        if (category.length > 0) {

            result = await ProphecyModel.aggregate([
                { $match: { category: { $in: category }, } },
                {
                    $lookup: {
                        from: "users",

                        let: { "searchId": "$author" },
                        "pipeline": [
                            { "$match": { "$expr": { "$eq": ["$_id", "$$searchId"] } } },
                            { "$project": { "username": 1, "displayname": 2, "icon": 3 } }
                        ],
                        as: "user"
                    }
                },
            ])
            //if both category and search key is given, 
            //filter the category result by search key
            if (result.length > 0 && searchKey) {

                result = result.filter((element) =>
                    element.title.includes(searchKey) ? true : false);
            }

            res.status(200).json(result)
        }

        //only search key is given
        else {

            const textRes = await ProphecyModel.aggregate([
                { $match: { title: { "$regex": searchKey, "$options": "i" } } },
                {
                    $lookup: {
                        from: "users",

                        let: { "searchId": "$author" },
                        "pipeline": [
                            { "$match": { "$expr": { "$eq": ["$_id", "$$searchId"] } } },
                            { "$project": { "username": 1, "displayname": 2, "icon": 3 } }
                        ],
                        as: "user"
                    }
                },
            ])

            res.status(200).json(textRes)
        }

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}





