const express = require("express");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const  path  = require("path");
const connectDB = require("./server/database/connection")

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'))

//mongoDB connection
connectDB();

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}))

//set view engine
app.set("view engine", "ejs") //ejs is engine name   
// app.set("views",path.resolve(__dirname,"views/ejs")) just for reference if you wish to change view engine folder


//load assets
app.use("/css",express.static(path.resolve(__dirname,"assets/css")))
//for above use it like css/style.css
app.use("/img",express.static(path.resolve(__dirname,"assets/img")))
app.use("/js",express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT, () => {
  console.log(`Server is running  . . . : http://localhost:${PORT}`);
});
