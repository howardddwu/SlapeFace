import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"

const Session = mongoose.Schema({
    refreshToken: {
        type: String,
        default: "",
    },
}
)

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        displayname: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            default: null
        },
        postsCreated: {
            type: Array,
        },
        votes: {
            type: Array,
        },
        points: {
            type: Number, default: 0
        },
        allTimePoint: {
            time: {
                type: String,
            },
            highestPoints: {
                type: Number,
                default: 0
            }
        },
        likedPost: {
            type: Array,
        },
        likedCategory: {
            type: Array,
        },
        viewHistory: {
            type: Array,
        },
        notfirstLogin: {
            type: Boolean,
            default: false
        },



        isAdmin: {
            type: Boolean,
            default: false
        },
        //used to store oauth info:
        provider: {
            type: String,
            default: null
        },
        providerProfile: {},
        providerUserId: {
            type: String,
            default: null
        },

        refreshToken: {
            type: [Session],
        },

    },

    { timestamps: true }

);


//remove the refresh token from the toJSON function, 
//so that we don't expose user's refresh tokens 
//whenever we serialize the model and send the data in the API response.
UserSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})

UserSchema.plugin(passportLocalMongoose)


const userModel = mongoose.model("User", UserSchema);
export default userModel