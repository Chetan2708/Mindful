const express = require("express")

const app = express()

const dotenv = require("dotenv")

const connectDB = require("./config/db")

const userRoutes = require("./routes/userRoutes")

const cors = require('cors')
const path = require('path')

dotenv.config();
connectDB();


app.use(express.json())
const corsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204, 
  };
  
  app.use(cors(corsOptions));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use("/api/user" , userRoutes)


// --------------------Deployment
const __dirname1 = path.resolve(__dirname, '..')

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1, "/vite-project/dist")))
    
    app.get('*' ,(req,res)=>{
        console.log(__dirname1)
        res.sendFile(path.resolve(__dirname1, "vite-project" ,"dist" ,"index.html"))
    })
}
else{
    app.get("/", async function (req, res) {
        // if (!req.session.isLoggedIn) {
            res.send("Seriously")
            // res.redirect("/login");
            //   return;
            // }
        }
        )

}
// --------------------Deployment


    app.get("/login", async function (req, res) {
        res.send("Logged in ")
  }
  )


  const Port = process.env.PORT || 5000
app.listen(Port, console.log("Server started on port 5000 "))