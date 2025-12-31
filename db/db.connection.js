// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();


// async function dbCon() {

//     try {

//         const db = await mongoose.connect(process.env.db)
//             .then(() => console.log("Database Connected"))
//             .catch((err) => console.log(`Connection Faild ${err}`))

//         mongoose.connection.on('connected', () =>
//             console.log('DATABASE SUCCESSFULLY CONNECTED...!')
//         );

//         mongoose.connection.on('disconnected', () =>
//             console.log('DATABASE CONNECTION TERMINATED...!')
//         );

//     }
//     catch (err) {
//         console.log(err, "here in an error");
//     }
// }


// module.exports = dbCon;

const mongoose = require("mongoose");

const dbCon = async () => {

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // 👈 VERY IMPORTANT (prevents 502)
  }
};

module.exports = dbCon;
