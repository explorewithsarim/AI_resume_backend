const express = require("express");
const { signUp, login, home } = require("../Controller/auth");
const authrization = require("../Middleware/authentication");
const { upload, saveResume, getResume } = require("../Controller/gemini");
const { addJob, getJobs, updateJob, deleteJob,} = require("../Controller/jobController");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/home", authrization, home);
router.post("/upload", upload);
router.post("/saveResume", saveResume);
router.get("/getResume", getResume);

router.post("/jobs", authrization, addJob);         
router.get("/jobs", authrization, getJobs);         
router.put("/jobs/:id", authrization, updateJob);   
router.delete("/jobs/:id", authrization, deleteJob); 

router.get("/sar", (req, res) => {
  res.send("✅ Server & Router working fine");

});

router.get("/test", (req, res) => {
  res.send("API WORKING");
});


module.exports = router;
