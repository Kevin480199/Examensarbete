import axios from "axios"

const API_URL = "http://localhost:8080/api/user";

export async function getAllUsers(){
    const response = await axios.get(API_URL);
    return response.data
}