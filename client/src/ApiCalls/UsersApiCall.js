import axios from "axios";
import GetAuthToken from "../Utils/GetAuthToken";
import config from "./Config";

const UsersApiCalls = {

    getAllUsers: async () => {
        const token = await GetAuthToken();
        return  axios.get("/user/getallusers", {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    getUserById: async (id) => {
        const token = await GetAuthToken();
        return  axios.get(config.Base_URL + `/user/getuser?id=${id}`, {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    updateUser: async (data) => {
        const token = await GetAuthToken();
        return  axios.post(config.Base_URL + "/user/updateuser", data, {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    },
    deleteUser: async (UserId) => {
        const token = await GetAuthToken();
        return  axios.post(config.Base_URL + `/user/deleteuser?id=${UserId}`, {
            headers: {
                Authorization: `Bearer ` + token,
            },
        });
    }

}

export default UsersApiCalls