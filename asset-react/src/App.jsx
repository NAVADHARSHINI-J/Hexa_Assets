
import { Routes, Route } from "react-router"
import AssetList from "./components/admin/AssetList"
import EmployeeList from "./components/admin/EmployeeList"
import Profile from "./components/admin/Profile"
import Login from "./components/auth/Login"
// import HomeAsset from "./components/employee/HomeAsset"
// import AssetDetails from "./components/employee/AssetDetails"
// import NewAssetRequest from "./components/employee/NewAssetRequest"
import AdminDashboard from "./components/admin/AdminDashboard"
import RequestList from "./components/admin/RequestList"
import Audit from "./components/admin/Audit"
// import SignupAdmin from "./components/auth/SignupAdmin"


function App() {

  return (
    <div>
      <Routes>
        <Route index path="" element={<Login />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/employeelist" element={<EmployeeList />} />
        <Route path="admin/assetlist" element={<AssetList />} />
        <Route path="admin/request" element={<RequestList />} />
        <Route path="admin/audit" element={<Audit />} />
        <Route path="admin/profile" element={<Profile />} />
        {/* <Route path="employee/homeassets" element={<HomeAsset />} />
        <Route path="viewdetails/:assetId" element={<AssetDetails />} /> */}
        {/* <Route path="employee/newassetrequest/:assetId" element={<NewAssetRequest />} /> */}

      </Routes>
      {/* <SignupAdmin /> */}


    </div>
  )
}

export default App
