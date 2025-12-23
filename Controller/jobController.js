    // const Job = require("../model/jobModel");

    // const createJob = async (req, res) => {
    //     try {
    //         const { userId, company, position, jobDescription, status, notes } = req.body;

    //         const newJob = new Job({
    //             userId,
    //             company,
    //             position,
    //             jobDescription,
    //             status,
    //             notes,
    //             createdAt: new Date(),
    //         });

    //         await newJob.save();
    //         res.status(201).json({ message: "Job added successfully", job: newJob });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: "Server error" });
    //     }
    // };

    // const getJobs = async (req, res) => {
    //     try {
    //         const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });
    //         res.status(200).json(jobs);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: "Server error" });
    //     }
    // };

    // module.exports = { createJob, getJobs };
const Job = require("../model/JobModel");

exports.addJob = async (req, res) => {
  try {
    const job = await Job.create({
      userId: req.user.id,
      company: req.body.company,
      position: req.body.position,
      jobDescription: req.body.jobDescription,
      appliedDate: req.body.appliedDate,
      status: req.body.status,
      notes: req.body.notes,
    });
 return res.send({
  status:200,
  message:"job update successfully",
  success: true,
    job,
  })
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      jobs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      job,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      message: "Job deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
