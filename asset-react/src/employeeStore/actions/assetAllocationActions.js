import axios from "axios";
import { setAssetAllocation } from "../assetAllocationSlice"


const fetchAssetAllocation =()=>async(dispatch)=>{
 
    const employeeId = localStorage.getItem("employeeId");
    let token = localStorage.getItem("token")

    if (!employeeId) {
        console.error("Employee ID not found in localStorage");
        return;
    }

    let headers =  {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        //getting the asset allocation by get api
    const response = await axios.get(`http://localhost:8081/api/assetallocation/byEmpId?empId=${employeeId}`, headers)

    console.log("Allocated Assets Response: ", response.data);

    //dispatch the data fetched to reducer setAssetAllocation()
    //The dispatch function sends an action object to Redux, which looks like this:
    //{
 // type: 'assetAllocation/setAssetAllocation', 
  //payload: { assetAllocation: response.data }
//}
//if not exporting in slice then need to write
// Manually accessing and dispatching the action
//dispatch(assetAllocationSlice.actions.setAssetAllocation({ assetAllocation: response.data }));
 
    dispatch(setAssetAllocation({assetAllocation: response.data}))
    } catch (error) {
        console.log("error in assect allocation action " + error);
    }
}

export default fetchAssetAllocation