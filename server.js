const express = require("express");
const fileUpload = require("express-fileupload");
const dbCon = require("./db/db.connection");
const router = require("./Router/route");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors({
  
//   origin:"*",
//   credentials: true
// }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.use(cookieParser());
app.use(express.static("public"));

dbCon();

app.use("/api", router);
    console.log("MONGO URI:", process.env.MONGODB_URI);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
