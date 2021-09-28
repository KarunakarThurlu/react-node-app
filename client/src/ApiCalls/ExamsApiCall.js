import config from "./Config";
import axios from "axios";
import GetAuthToken from "../Utils/GetAuthToken";

const ExamsApi = {
    getAllExamsDetails: async (data) => {
        const token = await GetAuthToken();
        return  axios.get(config.Base_URL + "/exams/getallexamsDetails", data, {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    deleteExam: async (id) => {
        const token = await GetAuthToken();
        return axios.delete(config.Base_URL + `/exams/deleteexam?id=${id}`, {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    }
}

export default ExamsApi