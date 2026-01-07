// const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const pdfjs = require("pdfjs-dist");

const { GoogleGenAI } = require("@google/genai");
const saveResumes = require("../db/resume");

require("dotenv").config();

async function upload(req, res) {
  if (!req.files || !req.files.file) {
    return res
      .status(400)
      .send({ success: false, message: "No file uploaded" });
  }

  try {
    // 1️⃣ Extract text from PDF
    const data = new Uint8Array(req.files.file.data);
    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((i) => i.str).join(" ") + "\n\n";
    }

    // 2️⃣ Send extracted text to Gemini API
    if (!process.env.GEMINI_API_KEY) {
      return res
        .status(500)
        .send({ success: false, message: "GEMINI_API_KEY not set in env" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
        You are an AI resume expert.
        Analyze the resume text below and return JSON with:
        1. Resume Score (out of 100)
        2. ATS Score
        3. Missing Skills
        4. Suggestions
        5. Improved Resume Text

        Resume:
        ${text}`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ text: prompt }],
    });

    const aiText =
      result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No AI response";

    res.send({ success: true, extractedText: text, aiAnalysis: aiText });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error processing PDF or AI",
      details: err.message,
    });
  }
}

async function saveResume(req, res) {
  try {
    const { resumeText } = req.body;

    let response = await new saveResumes({ resumeText }).save();
    console.log("Resumeha bhai ye", response);

    return res.send({
      response,
      status: 200,
      message: "Your Resume data save successfuly...",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Resume not found",
      details: err.message,
    });
  }
}

// async function getResume(req, res) {
//   try {
//     const resume = await saveResumes.findOne().sort({ _id: -1 });

//     if (!resume || !resume.resumeText || resume.resumeText.trim() === "") {
//       return res.status(404).json({
//         success: false,
//         message: "No resume found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       resumeText: resume.resumeText,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       details: err.message,
//     });
//   }
// }


async function getResume(req, res) {
  try {
    const resume = await saveResumes.findOne().sort({ _id: -1 });

    console.log("👉 Resume from DB:", resume);

    if (!resume || !resume.resumeText) {
      console.log("❌ No resume or resumeText missing");
      return res.status(404).json({
        success: false,
        message: "No resume found",
      });
    }

    console.log("✅ ResumeText Length:", resume.resumeText.length);

    return res.json({
      success: true,
      resumeText: resume.resumeText,
    });

  } catch (err) {
    console.log("🔥 Backend Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      details: err.message,
    });
  }
}

module.exports = { upload, saveResume, getResume };
