import { Route, Routes } from "react-router";
import Login from './components/auth/Login';
import LiquidAssetDashboard from './components/manager/LiquidAssetDashboard';
import LiquidAssetPage from './components/manager/LiquidAssetPage';
import LiquidAssetRequest from './components/manager/LiquidAssetRequest';
import LiquidAssetAllocation from './components/manager/LiquidAssetAllocation';
import LiquidAssetUnallocated from './components/manager/LiquidAssetUnallocated';
import ManagerSignUp from "./components/auth/ManagerSignUp";
import AssetList from "./components/admin/AssetList";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/manager/signup" element={<ManagerSignUp />} />
      <Route path="/manager" element={<LiquidAssetDashboard />} />
      <Route path="/dashassetpage" element={<LiquidAssetPage />} />
      <Route path="/dashassetreq" element={<LiquidAssetRequest />} />
      <Route path="/dashassetall" element={<LiquidAssetAllocation />} />
      <Route path="/dashassetunall" element={<LiquidAssetUnallocated />} />
      <Route path="admin/assetlist" element={<AssetList />} />
    </Routes>
  );
}

export default App;
