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
exports.deleteExam = async (request, response, next) => {
    try {
        const exam = await Exam.findById({ _id: request.query.id });
        if (!exam) {
            return response.json({ data: {}, statusCode: 404, message: "Exam not found" });
        }
        await exam.remove();
        return response.json({ data: {}, statusCode: 200, message: "Exam deleted successfully" });
    } catch (error) {
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}