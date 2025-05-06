import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import AssetList from "./components/admin/AssetList"
import EmployeeList from "./components/admin/EmployeeList"
import Profile from "./components/admin/Profile"
import Login from "./components/auth/Login"
import AdminDashboard from "./components/admin/AdminDashboard"
import RequestList from "./components/admin/RequestList"
import SignupAdmin from "./components/auth/SignupAdmin"
import fetchProfile from "./store/actions/ProfileAction"
import LiquidAssetDashboard from './components/manager/LiquidAssetDashboard';
import LiquidAssetPage from './components/manager/LiquidAssetPage';
import LiquidAssetRequest from './components/manager/LiquidAssetRequest';
import LiquidAssetAllocation from './components/manager/LiquidAssetAllocation';
import LiquidAssetUnallocated from './components/manager/LiquidAssetUnallocated';
import ManagerSignUp from "./components/auth/ManagerSignUp";
import HomeAsset from "./components/employee/HomeAsset"
import AssetDetails from "./components/employee/AssetDetails"
import NewAssetRequest from "./components/employee/NewAssetRequest"
import EmployeeSignUp from "./components/auth/EmployeeSignUp"; 
import fetchAssetAllocation from "./employeeStore/actions/assetAllocationActions";
import AllocatedAssets from "./components/employee/AllocatedAssets";
import LiquidAsset from "./components/employee/LiquidAsset";
import TrackingRequest from "./components/employee/TrackingRequest";
import LiquidAssetDetails from "./components/employee/LiquidAssetDetails";
import fetchLiquidAssetAllocation from "./employeeStore/actions/liquidAssetAllocationActions";
import Profile from "./components/employee/Profile";
import fetchProfileEmployee from "./employeeStore/actions/profileAction";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProfile())
    dispatch(fetchAssetAllocation());
    
    dispatch(fetchLiquidAssetAllocation());

    dispatch(fetchProfileEmployee());
  }, [])
  return (
     <Routes>
        <Route index path="" element={<Login />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/employeelist" element={<EmployeeList />} />
        <Route path="admin/assetlist" element={<AssetList />} />
        <Route path="admin/request" element={<RequestList />} />
        <Route path="admin/profile" element={<Profile />} />
        <Route path="signupadmin" element={<SignupAdmin />} />
        <Route path="manager" element={<LiquidAssetDashboard/>} />
        <Route path="/dashassetpage" element={<LiquidAssetPage/>}/>
        <Route path="/dashassetreq" element={<LiquidAssetRequest/>}/>
        <Route path="/dashassetall" element={<LiquidAssetAllocation/>}/>
        <Route path="/dashassetunall" element={<LiquidAssetUnallocated/>}/>
        <Route path="employee" element={<HomeAsset />} />
        <Route path="employee/viewdetails/:assetId" element={<AssetDetails />} />
        <Route path="employee/newassetrequest/:assetId" element={<NewAssetRequest />} />
        <Route path="employee/newassetrequest" element={<NewAssetRequest />} />
        <Route path="employee/signup" element={<EmployeeSignUp />} /> 
        <Route path="employee/allocatedassets" element={<AllocatedAssets />} /> 
        <Route path="employee/liquidassets" element={<LiquidAsset />} /> 
        <Route path="employee/viewassetdetails/:liquidAssetId" element={<LiquidAssetDetails />} /> 
        <Route path="employee/trackingrequest" element={<TrackingRequest />} />  
        <Route path="employee/profile" element={<Profile />} />
      </Routes>
  );
 
}

export default App;
