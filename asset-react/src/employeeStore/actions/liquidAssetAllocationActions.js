import axios from "axios";
import { setLiquidAssetAllocation } from "../liquidAssetAllocationSlice";



const fetchLiquidAssetAllocation =()=>async(dispatch)=>{

    const employeeId = localStorage.getItem('employeeId')
    console.log("Employee ID inside liquid action: ", employeeId);
    let token = localStorage.getItem('token')
    if (!employeeId) {
        console.error("Employee ID not found in localStorage");
        return;
    }

    let head =  {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response =await axios.get(`http://localhost:8081/api/liquidassetallocation/employee/${employeeId}`, head)

        console.log("Fetched data: ", response.data);
        dispatch(setLiquidAssetAllocation({liquidAssetAllocation: response.data}))
    } catch (error) {
        console.log("error in liquid assect allocation action " + error);
    }
}

export default fetchLiquidAssetAllocation;