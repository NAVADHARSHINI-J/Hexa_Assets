import axios from "axios";
import { setProfile } from "../profileSlice";


const fetchProfile=()=>async(dispatch)=> {

    let employeeId=localStorage.getItem('employeeId');

    let token = localStorage.getItem('token');
    let headers = { headers: {
        "Authorization": `Bearer ${token}`
    }};

    try {
        //get the employee details by employee id -> api call
    const response = await axios.get(`http://localhost:8081/api/employee/getbyid/${employeeId}`, headers);

    dispatch(setProfile(response.data)) //need to import setProfile
    } catch (error) {
        console.log("Error inside Profile action "+ error);
    }
}

export default fetchProfile;