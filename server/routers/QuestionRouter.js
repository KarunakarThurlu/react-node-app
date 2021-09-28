const express = require('express');
const router = express.Router();
const questionController = require("../controllers/QuestionController");
const JWTConfig = require("../config/JWTConfig");

router.post("/savequestion", questionController.saveQuestion);
router.put("/updatequestion", questionController.updateQuestion);
router.get("/getquestionscountfordashboard", questionController.getquestionscountforDashboard);
router.get("/getquestion", questionController.getQuestionById);
router.get("/getallquestions", questionController.getAllQuestions);
router.get("/getquestionsbytopicid", questionController.getAllQuestionsByTopicId);
router.delete("/deletequestion", JWTConfig.verify, [JWTConfig.Admin], questionController.deleteQuestionById);
router.post("/gettestscore", questionController.getTestScore);
router.get("/totalquestionscountoftopic", questionController.totalQuestionsCountOfTopic);
router.get("/getquestionsforexam", questionController.getQuestionsForExam);

module.exports = router