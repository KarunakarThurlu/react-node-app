const Question = require("../models/QuestionsModel");
const Exam = require("../models/ExamModel");
const Topic = require("../models/TopicsModel");
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
        const questions = await Question.find({})
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

exports.getQuestionsForExam = async (request, response, next) => {
    try {
        const pageNumber = request.query.pageNumber || 0;
        const pageSize = request.query.pageSize || 20;
        const questions = await Question.find({ topic: request.query.topicId}, { answer: false }).skip(pageNumber).limit(pageSize);
        if (questions)
            return response.json({ data: questions, statusCode: 200, message: "OK" });
        else
            return response.json({ data: {}, statusCode: 400, message: "Not Found" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}
exports.totalQuestionsCountOfTopic = async (request, response, next) => {
    try {
        const questions = await Question.find({ topic: request.query.id }).count();
        if (questions)
            return response.json({ data: questions, statusCode: 200, message: "OK" });
        else
            return response.json({ data: {}, statusCode: 400, message: "Not Found" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}
//getquestionsforexam

exports.getQuestionsForExam = async (request, response, next) => {
    try {
        if (request.query.topicId === undefined) {
            return response.json({ data: {}, statusCode: 400, message: "Topic Id is required" });
        } else {
            const pageNumber = request.query.pageNumber || 0;
            const pageSize = request.query.pageSize || 20;
            const questions = await Question.find({ topic: request.query.topicId}, { answer: false }).skip(parseInt(pageNumber)).limit(parseInt(pageSize));
            if (questions)
                return response.json({ data: questions, statusCode: 200, message: "OK" });
            else
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
    let user = await GetUserFromToken.getUserDetailsFromToken(request);
    try {
        let data = {};
        let chartData = {};
        let questions = await Question.aggregate([
            { $match: { creator: user._id } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        questions.map((v, i) => { data[v._id] = v.count });
        let totalcount = questions.reduce((accumulator, question) => accumulator + question.count, 0);
        data["totalCount"] = totalcount;

        let topicsCount = await Question.aggregate([
            { $match: { creator: user._id } },
            { $group: { _id: "$topic", count: { $sum: 1 } } }
        ]);
        let topics = await Topic.find({}).select("topicName _id");


        data["topics"] = topics;
        data["topicCount"] = topicsCount;

        data["chartData"] = chartData;

        if (questions) {
            return response.json({ data: data, statusCode: 200, message: "OK" });
        } else {
            return response.json({ data: {}, statusCode: 400, message: "Not Found" });
        }
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}

exports.getTestScore = async (request, response, next) => {
    let user = await GetUserFromToken.getUserDetailsFromToken(request);
    try {
        if (request.query.id === undefined) {
            return response.json({ "data": {}, "statusCode": 400, "message": "Required Parameter topicId is not present" });
        } else {
            const pageNumber = request.query.pageNumber || 0;
            const pageSize = request.query.pageSize || 20;
            const questions = await Question.find({ topic: request.query.id }).skip(parseInt(pageNumber)).limit(parseInt(pageSize));
            if (questions) {
                const answeredQuestions = request.body;

                //Finding the correct answer
                let testScore = 0;
                questions.map((question, index) => {
                    answeredQuestions.map((answeredQuestion, answeredQuestionsindex) => {
                        if (answeredQuestion._id === question._doc._id.toString()) {
                            if (answeredQuestion.answer === question.answer) {
                                testScore++;
                            }
                        }
                    })
                });
                //Saving Exam Details
                const topic = await Topic.findOne({ _id: request.query.id });
                const examResults = new Exam({
                    Name: user.firstName+" "+user.lastName,
                    Email: user.email,
                    TestScore: testScore,
                    TopicName: topic.topicName,
                    Date: Date.now()
                });
                await examResults.save();


                return response.json({ testScore: testScore, statusCode: 200, message: "OK" });
            } else {
                return response.json({ data: {}, statusCode: 400, message: "Not Found" });
            }
        }
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}