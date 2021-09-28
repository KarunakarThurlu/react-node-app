const express = require('express');
const examController = require("../controllers/ExamsController");

const router = express.Router();


router.get("/getallexamsDetails", examController.getAllExamsDetails);
router.delete("/deleteexam", examController.deleteExam);


module.exports = router;