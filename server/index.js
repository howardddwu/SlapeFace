
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from "cors"
import passport from "passport"


dotenv.config()

import * as passportLocal from './Strategies/passportLocal.js'
import * as passportJWT from "./Strategies/jwtStrategy.js"

//routes:
import AuthRoute from './Routers/AuthRouter.js'
import CommentRoute from "./Routers/CommentRouter.js"
import RankRoute from "./Routers/RankRouter.js"
import UserRoute from "./Routers/UserRouter.js"
//Controllers:
import ProphecyController from './Controllers/ProphecyController.js'
import CommentController from './Controllers/CommentController.js'

//============================================================================================


// use of middleware
const app = express()

app.use(cookieParser(process.env.COOKIE_SECRET))
// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL)
// 	res.header('Access-Control-Allow-Credentials', true)
// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
// 	next()
// })
// app.set("trust proxy", 1)

app.use(
	cors({
		methods: "*",
		origin: true,
		credentials: true,
	})
)

app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(passport.initialize())





//============================================================================================

//connect to mongoDB and listen port
const port = process.env.PORT || 8080
const DBurl = process.env.MONGO_DB

mongoose.set("strictQuery", false)
mongoose.connect(DBurl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => app.listen(port, () => console.log("Listening at " + port)))
	.catch((error) => console.log(error)
	)




//============================================================================================


app.get("/", function (req, res) {
	res.send({ status: "success" })
}
)

app.use('/auth', AuthRoute)

app.use('/prophecy', ProphecyController)
app.use('/comment', CommentController)

app.use('/rank', RankRoute)
app.use('/user', UserRoute)


