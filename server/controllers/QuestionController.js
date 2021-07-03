const Question = require("../models/QuestionsModel");
const GetUserFromToken = require("../utils/GetUserDetailsFromToken");


exports.saveQuestion = async (request, response, next) => {

    const requestUser = await GetUserFromToken.getUserDetailsFromToken(request);

    try {
        const question = new Question(request.body);
        question["creator"] = requestUser._id
        const savedQuestion = await question.save();
        return response.json({ data: savedQuestion, statusCode: 200, message: "Question Saved" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}

exports.deleteQuestionById = async (request, response, next) => {
    try {
        const question = await Question.findById({ _id: request.query.id });
        if (question)
            await Question.findByIdAndDelete({ _id: question.id }, (errror, doc, res) => response.json({ data: {}, statusCode: 200, message: "Question deleted" }));
        else
            return response.json({ data: {}, statusCode: 400, message: "Question Not Found" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}
exports.updateQuestion = async (request, response, next) => {

    try {
        const questionFromDB = await Question.findOne({ _id: request.body._id });
        if (questionFromDB) {
            let keys = Object.keys(request.body);
            keys.map((v, i) => {
                questionFromDB[keys[i]] = request.body[v];
            });
            questionFromDB["updatedOn"] = Date.now();
            const updatedQuestion = await Question.findByIdAndUpdate({ _id: request.body._id }, questionFromDB, (error, doc, res) => { });
            return response.json({ data: updatedQuestion, statusCode: 200, message: "Question updated" });
        } else {
            return response.json({ data: {}, statusCode: 400, message: "nottttttttt found" });
        }
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}
exports.getQuestionById = async (request, response, next) => {
    try {
        const question = await Question.findById({ _id: request.query.id }).populate("creator").populate("topic_id");
        if (question)
            return response.json({ data: question, statusCode: 200, message: "User Saved" });
        else
            return response.json({ data: {}, statusCode: 400, message: "not found" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}

exports.getAllQuestions = async (request, response, next) => {
    try {
        const pageNumber = request.body.pageNumber || 0;
        const pageSize = request.body.pageSize || 30;
        const totalCount = await Question.find().count();
        const questions = await Question.find({}, { answer: false })
            .populate({ path: "creator", select: ["name", "email"] })
            .populate({ path: "topic", select: "topicName" })
            .skip(pageNumber).limit(pageSize);
        if (questions) {
            return response.json({ data: questions, totalCount: totalCount, statusCode: 200, message: "OK" });
        } else {
            return response.json({ data: {}, statusCode: 400, message: "Not Found" });
        }
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}


exports.getAllQuestionsByTopicId = async (request, response, next) => {
    try {
        if (request.query.id === undefined) {
            return response.json({ "data": {}, "statusCode": "400", "message": "Required Parameter topicId is not present" });
        } else {
            const pageNumber = request.body.pageNumber || 0;
            const pageSize = request.body.pageSize || 20;
            const totalCount = await Question.find({ topic: request.query.id }, { answer: false }).count();
            const questions = await Question.find({ topic: request.query.id }, { answer: false }).skip(pageNumber).limit(pageSize);
            if (questions)
                return response.json({ data: questions, totalCount: totalCount, statusCode: 200, message: "OK" });
            else
                return response.json({ data: {}, statusCode: 400, message: "Not Found" });
        }
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}

exports.getquestionscountforDashboard = async (request, response, next) => {
    try {
        const totalQuestionsCount = await Question.find().count();
        const approvedQuestionsCount = await Question.find({ status: "APPROVED" }).count();
        const rejectedQuestionsCount = await Question.find({ status: "REJECTED" }).count();
        const pendingQuestionsCount = await Question.find({ status: "PENDING" }).count();

        if (totalQuestionsCount || approvedQuestionsCount || rejectedQuestionsCount || pendingQuestionsCount) {
            return response.json({ totalQuestionsCount: totalQuestionsCount, approvedQuestionsCount: approvedQuestionsCount, rejectedQuestionsCount: rejectedQuestionsCount, pendingQuestionsCount: pendingQuestionsCount, statusCode: 200, message: "OK" });
        } else {
            return response.json({ data: {}, statusCode: 400, message: "Not Found" });
        }
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}
