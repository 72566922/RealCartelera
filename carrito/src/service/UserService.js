import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

const UserService = {
    getAllUsers: () => {
        return axios.get(API_URL);
    },  
};

export default UserService;
