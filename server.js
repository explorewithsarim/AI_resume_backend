// const express = require("express");
// const fileUpload = require("express-fileupload");
// const dbCon = require("./db/db.connection");
// const router = require("./Router/route");
// const cors = require("cors")


// const app = express()
// const PORT = process.env.PORT || 3000;
// // const PORT =  3000;



// app.use(cors())
// app.use(fileUpload());
// app.use(express.json());
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));
// app.use(require("cookie-parser"));

// app.use(cors({
//    origin: "http://127.0.0.1:5502",  
//   credentials: true
// }));

// dbCon();
// app.use("/api", router)

// app.listen(PORT, () => {
//     console.log(`Server is working successfuly on ${PORT}`);
// })
// // console.log(process.env.GEMINI_API_KEY);


const express = require("express");
const fileUpload = require("express-fileupload");
const dbCon = require("./db/db.connection");
const router = require("./Router/route");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  // origin: "http://127.0.0.1:5500",
  origin:"*",
  credentials: true
}));

app.use(fileUpload());

app.use(cookieParser());
app.use(express.static("public"));

dbCon();

app.use("/api", router);

/* ✅ TEST ROUTE (VERY IMPORTANT) */
app.get("/test", (req, res) => {
  res.send("SERVER OK");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
