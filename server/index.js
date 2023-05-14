
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
import RankRoute from "./Routers/RankRouter.js"
import UserRoute from "./Routers/UserRouter.js"
import SearchRoute from "./Routers/SearchRouter.js"
//Controllers:
import ProphecyController from './Controllers/ProphecyController.js'
import CommentController from './Controllers/CommentController.js'


import * as News from "./News/NewsController.js"


//socket
import http from "http" //module from nodejs
import { Server } from "socket.io"
import sockets from "./Socket/socket.js"

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
// mongoose.connect(DBurl, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// }).then(() => app.listen(port, () => console.log("Listening at " + port)))
// 	.catch((error) => console.log(error)
// 	)

mongoose.connect(DBurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB Connected."))



//============================================================================================

//create a server for http to link this server to socket server:
const httpServer = http.createServer(app)


//create a socket server: link socket server to http server
const io = new Server(httpServer, {
    //prevent cor error
    cors: {
        origin: [process.env.CLIENT_URL],
        credentials: true
    }
})

//create a connection between client and server
io.on('connection', sockets)


//user httpserver instead of plain express server
httpServer.listen(port, () => {
    console.log("Listening at " + port)
})



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
app.use('/news', News.NewsRouter)
app.use('/search', SearchRoute)




// News.firstTimeFetch();

// var hours = 6;
// var the_interval = hours * 60 * 60 * 1000;

// setInterval( async function() {
//   console.log("Six hour fetch news. ");
//   await News.fetchData();
// }, the_interval);



import { CronJob } from "cron"
import { updatePoints } from "../server/Controllers/RankController.js"

// update the user point at every monday, 3:00 AM New York Time zone
var job = new CronJob(
    '0 0 3 * * 1',
    function () {
        updatePoints()
    },
    null,
    true,
    'America/New_York'
);

News.firstTimeFetch();
var newsJob = new CronJob(
    '00 00 7 * * 0-6',
    () => News.fetchData(),
    null,
    true,
    'America/New_York'
);
