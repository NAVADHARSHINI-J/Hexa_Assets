import { Route, Routes } from "react-router"
import AssetList from "./components/admin/AssetList"
import EmployeeList from "./components/admin/EmployeeList"
import Profile from "./components/admin/Profile"
import Login from "./components/auth/Login"
import AdminDashboard from "./components/admin/AdminDashboard"
import RequestList from "./components/admin/RequestList"
import Audit from "./components/admin/Audit"

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
      </Routes>
    </div>
  )
}

export default App
