require("dotenv").config();
const express=require('express')
const cors = require('cors')
const mongoose = require("mongoose");
const bodyParser =require('body-parser')
const multer = require('multer')

const router = require("./src/routes");
const path = require("path");
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended: true }));
app.use(cors());
const storage=multer.memoryStorage();
const upload=multer({
  storage:storage
})
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.json())
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET,POST");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type.Authorization");
//     next();
//   });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  "/upload/productData/",
  express.static(path.join(__dirname, "upload/productData"))
);
// app.use(upload.single("image"));
// app.use('/upload',express.static('C:/Testing/testing-api/src/upload/'))
app.use(router)


  const username = encodeURIComponent("");
const password = encodeURIComponent("");
const credentialSegment = (username && password) ? `${username}:${password}@` : '';

// const uri = `mongodb://${credentialSegment}${"127.0.0.1"}:${"27017"}`;
// const uri="const uri = 'mongodb://mongodb:27017/Testing';"
// const uri = `mongodb://${credentialSegment}${"yehtet"}.${"joq3baw"}/${"testing"}?authMechanism=DEFAULT`
const uri = `mongodb+srv://yemyinthtet:yehtet610999@yehtet.joq3baw.mongodb.net/`

mongoose.connect(uri, { useNewUrlParser: true, dbName: "Ecommerce" });
const db = mongoose.connection;
db.on("error", (error) => console.log("----->", error));
db.once("open", async () => {
  console.log("connection to db established");
});


app.listen(8080,console.log(`listening port 8080 new`))