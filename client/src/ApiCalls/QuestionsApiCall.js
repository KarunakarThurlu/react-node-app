import axios from "axios";
import GetAuthToken from "../Utils/GetAuthToken";
import config from "./Config";

const QuestionsApiCall = {

    saveQuestion: async (data) => {
        const token = await GetAuthToken();
        return  axios.post(config.Base_URL + "/question/savequestion", data, {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    getAllQuestions: async () => {
        const token = await GetAuthToken();
        return  axios.get("/question/getallquestions", {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    getAllQuestionsByTopicId: async (id) => {
        const token = await GetAuthToken();
        return  axios.get(config.Base_URL + `/question/getquestionsbytopicid?id=${id}`, {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    getQuestionById: async (id) => {
        const token = await GetAuthToken();
        return  axios.get(config.Base_URL + `/question/getquestion?id=${id}`, {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    updateQuestion: async (data) => {
        const token = await GetAuthToken();
        return axios.put(config.Base_URL + "/question/updatequestion", data, {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    getQuestionsCountForDashBoard: async () => {
        const token = await GetAuthToken();
        return  axios.get(config.Base_URL + "/question/getquestionscountfordashboard", {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    deleteQuestion: async (QuestionId) => {
        const token = await GetAuthToken();
        return axios.delete(config.Base_URL + `/question/deletequestion?id=${QuestionId}`, {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    getTestResults: async (data,pageNumber,topicId) => {
        const token = await GetAuthToken();
        return  axios.post(config.Base_URL + `/question/gettestscore?pageNumber=${pageNumber}&id=${topicId}`, data, {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },

}

export default QuestionsApiCall