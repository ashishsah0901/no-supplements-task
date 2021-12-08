import axios from "axios";

const placeholderInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

export default placeholderInstance;
