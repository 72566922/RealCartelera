import axios from 'axios';
import { urlServer } from "./urlServer.js";

const API_URL = `${urlServer}/api/usuarios`;

const UserService = {
    getAllUsers: () => {
        return axios.get(API_URL);
    },  
};

export default UserService;
