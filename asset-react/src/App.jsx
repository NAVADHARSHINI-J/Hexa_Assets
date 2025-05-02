import { Route, Routes } from "react-router"; 
import Login from "./components/auth/Login"
import HomeAsset from "./components/employee/HomeAsset"
import AssetDetails from "./components/employee/AssetDetails"
import NewAssetRequest from "./components/employee/NewAssetRequest"
import EmployeeSignUp from "./components/auth/EmployeeSignUp"; 
import fetchAssetAllocation from "./employeeStore/actions/assetAllocationActions";
import { useDispatch } from "react-redux"
import { useEffect } from "react";
import AllocatedAssets from "./components/employee/AllocatedAssets";
import LiquidAsset from "./components/employee/LiquidAsset";
import TrackingRequest from "./components/employee/TrackingRequest";
import LiquidAssetDetails from "./components/employee/LiquidAssetDetails";
import fetchLiquidAssetAllocation from "./employeeStore/actions/liquidAssetAllocationActions";


function App() {

  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(fetchAssetAllocation());

    dispatch(fetchLiquidAssetAllocation());
  }, [])

  return (
    <div>
      <Routes>
        <Route index path="" element={<Login />} /> 
        <Route path="employee" element={<HomeAsset />} />
        <Route path="employee/viewdetails/:assetId" element={<AssetDetails />} />
        <Route path="employee/newassetrequest/:assetId" element={<NewAssetRequest />} />
        <Route path="employee/newassetrequest" element={<NewAssetRequest />} />
        <Route path="employee/signup" element={<EmployeeSignUp />} /> 
        <Route path="employee/allocatedassets" element={<AllocatedAssets />} /> 
        <Route path="employee/liquidassets" element={<LiquidAsset />} /> 
        <Route path="employee/viewassetdetails/:liquidAssetId" element={<LiquidAssetDetails />} /> 
        <Route path="employee/trackingrequest" element={<TrackingRequest />} />  

       

      </Routes>


    </div>
  )
}

export default App;
