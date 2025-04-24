import { Route, Routes } from "react-router";
import Login from './components/auth/Login';
import LiquidAssetDashboard from './components/manager/LiquidAssetDashboard';
import LiquidAssetPage from './components/manager/LiquidAssetPage';
import LiquidAssetRequest from './components/manager/LiquidAssetRequest';
import LiquidAssetAllocation from './components/manager/LiquidAssetAllocation';
import LiquidAssetUnallocated from './components/manager/LiquidAssetUnallocated';

function App() {
  return (
    <Routes>
    <Route index path="" element={<Login />} />
    <Route path="manager" element={<LiquidAssetDashboard/>} />
    <Route path="/dashassetpage" element={<LiquidAssetPage/>}/>
    <Route path="/dashassetreq" element={<LiquidAssetRequest/>}/>
    <Route path="/dashassetall" element={<LiquidAssetAllocation/>}/>
    <Route path="/dashassetunall" element={<LiquidAssetUnallocated/>}/>
  </Routes>
  )
}

export default App
