import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://nixfile.vanguard-store.ir/v2", 
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
