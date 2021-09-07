const express = require('express');
const topicController = require("../controllers/TopicController");

const router = express.Router();

router.post("/savetopic", topicController.saveTopic);
router.put("/updatetopic", topicController.updateTopic);
router.get("/gettopic", topicController.findTopicById);
router.delete("/deletetopic", topicController.deleteTopicById);
router.get("/getalltopics", topicController.getAllTopics);



module.exports = router;