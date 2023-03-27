import userModel from "../Models/userModel.js"


//update user's icon, displayname, likedCategory
export const editProfile = async (req, res) => {
    //front-end make sure all value in req.body is valid.
    const id = req.params.userId
    const { icon, displayname, likedCategory } = req.body

    try {
        const user = await userModel.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}



export const ChangePassord = async (req, res) => {

    try {
        const user = userModel.findOne({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    res.status(400).json('User not found')

                }

                user.changePassword(req.body.oldpassword, req.body.newpassword, function (err) {
                    if (err) {
                        if (err.name === 'IncorrectPasswordError') {
                            res.status(400).json({ success: false, message: 'Incorrect password' })
                        } else {
                            res.status(400).json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' })
                        }
                    }
                    else {
                        res.status(200).json({ success: true, message: 'Your password has been changed successfully' })
                    }
                })
            })

    } catch (error) {
        res.status(500).json(error)
    }
}



export const ForgetPassword = async (req, res) => {

    try {
        const user = userModel.findOne({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    res.status(400).json('User not found')
                }
                user.setPassword(req.body.newpassword, function (err) {
                    if (err) {
                        if (err.name === 'IncorrectPasswordError') {
                            res.status(400).json({ success: false, message: 'Incorrect password' })
                        } else {
                            res.status(400).json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' })
                        }
                    }
                    else {
                        res.status(200).json({ success: true, message: 'Your password has been changed successfully' })
                    }
                })
            })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const GetUserInfo = async (req, res) => {
    const userId = req.params.userId

    try {
        let user = await userModel.findById(userId)
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json(error)
    }
}