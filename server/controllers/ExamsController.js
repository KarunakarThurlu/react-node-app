const Exam = require("../models/ExamModel");
const GetUserFromToken = require("../utils/GetUserDetailsFromToken");

exports.getAllExamsDetails = async (request, response, next) => {
    try {
        const examsData = await Exam.find();
        return response.json({ data: examsData, statusCode: 200, message: "OK" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}