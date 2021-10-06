const Exam = require("../models/ExamModel");
const GetUserFromToken = require("../utils/GetUserDetailsFromToken");

exports.getAllExamsDetails = async (request, response, next) => {
    try {
        const pageNumber = parseInt(request.query.pageNumber) - 1 || 0;
        const pageSize = parseInt(request.query.pageSize) || 5;
        const exams = await Exam.find({})
            .populate("TestQuestions")
            .skip(pageNumber * pageSize)
            .limit(pageSize);
        const totalCount = await Exam.find().countDocuments();

        const examsData = {
            data: exams,
            totalCount: totalCount,
            pageNumber: pageNumber,
            pageSize: pageSize
        }
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

exports.searchExam = async (request, response, next) => {
    //dynamic search with searchText , for name,topic,date, in mongoose
    try {
        const pageNumber = parseInt(request.query.pageNumber) - 1 || 0;
        const pageSize = parseInt(request.query.pageSize) || 5;
        const searchText = request.query.searchText;
        const exams = await Exam.find({ Name: { $regex: searchText ,options:'i'} })
        
            .populate("TestQuestions")
            .skip(pageNumber * pageSize)
            .limit(pageSize);
        const totalCount = await Exam.find({ $text: { $search: searchText } }).countDocuments();

        const examsData = {
            data: exams,
            totalCount: totalCount,
            pageNumber: pageNumber,
            pageSize: pageSize
        }
        return response.json({ data: examsData, statusCode: 200, message: "OK" });
   
    }catch(error){
        return response.json({ data: {}, statusCode: 500, message: error.message });
    }
}