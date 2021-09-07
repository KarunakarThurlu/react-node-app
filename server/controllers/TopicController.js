const Topic = require("../models/TopicsModel");
const Question = require("../models/QuestionsModel");
const User = require("../models/UserModel");
const GetUserFromToken = require("../utils/GetUserDetailsFromToken");


exports.saveTopic = async (request, response, next) => {
    const requestUser = await GetUserFromToken.getUserDetailsFromToken(request);
    try {
        const topic = new Topic({
            topicName: request.body.topicName,
            description: request.body.description,
            creator: requestUser._id,
        });
        const savedT = await topic.save();
        return response.json({ data: savedT, statusCode: 200, message: "Topic Saved" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }

}

exports.updateTopic = async (request, response, next) => {
    const requestUser = await GetUserFromToken.getUserDetailsFromToken(request);
    try {
        let topic = await Topic.findOne({ _id: request.body._id });
        if (topic) {
            let keys = Object.keys(request.body);
            keys.map((v, i) => {
                topic._doc[keys[i]] = request.body[v];
            });
            topic.creator=requestUser._id;
            const updatedTopic = await await Topic.findByIdAndUpdate({ _id: request.body._id }, topic, (error, doc, res) => { });
            return response.json({ data: updatedTopic, statusCode: 200, message: "Topic Updated Successfully." });
        } else {
            return response.json({ data: {}, statusCode: 400, message: "Not Found" });
        }
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }

}

exports.findTopicById = async (request, response, next) => {
    try {
        const t = await Topic.findOne({ _id: request.query.id }).populate({ path: "creator", select: ["name", "email"] });
        return response.json({ data: t, statusCode: 200, message: "OK" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}

exports.deleteTopicById = async (request, response, next) => {
    try {
        const topic = await Topic.findById({ _id: request.query.id });
        if (topic) {
            await Question.deleteMany({ topic: topic._id });
            await Topic.findByIdAndDelete({ _id: topic.id }, (errror, doc, res) => response.json({ data: {}, statusCode: "200", message: "Topic Deleted" }));
        }
        else
            return response.json({ data: {}, statusCode: 400, message: "Not Found" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}

exports.getAllTopics = async (request, response, next) => {
    try {
        const t = await Topic.find().populate({ path: "creator", select: ["name", "email"] });
        return response.json({ data: t, statusCode: 200, message: "OK" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}