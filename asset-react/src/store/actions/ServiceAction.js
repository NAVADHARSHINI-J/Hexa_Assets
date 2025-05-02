import axios from "axios"
import { setService } from "../ServiceSlice"

const fetchService = () => async(dispatch) =>{
    let token = localStorage.getItem("token")
    let headers = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await axios.get(`http://localhost:8081/api/servicerequest/getall`, headers);
        dispatch(setService({ser:response.data}));
    } catch (error) {
        console.log(error);
    }
}

export default fetchService