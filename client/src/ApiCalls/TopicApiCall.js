import config from "./Config";
import GetAuthToken from "../Utils/GetAuthToken";
import axios from "axios"

const TopicApiCall = {
    getAllTopics: async (data) => {
        const token = await GetAuthToken();
        return  axios.get(config.Base_URL + "/topic/getalltopics",{
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    deleteTopic:  async (data) => {
        const token = await GetAuthToken();
        return  axios.delete(config.Base_URL + `/topic/deletetopic/?id=${data}`,{
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    addTopic: async (data) => {
        const token = await GetAuthToken();
        return  axios.post(config.Base_URL + "/topic/savetopic", data,{
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    updateTopic : async (data)=>{
        const token = await GetAuthToken();
        return  axios.put(config.Base_URL + "/topic/updatetopic", data,{
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    }

}


export default TopicApiCall