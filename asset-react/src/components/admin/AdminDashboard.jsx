import { useState } from "react";
import "./css/Dashboard.css"
//import Sidebar from "./Sidebar";
function AdminDashboard() {

    const [totalAsset, setTotalAsset] = useState(null);
    const [totalEmployee, setTotalEmployee] = useState(null);
    const [pendingRequest, setPendingRequest] = useState(null);
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    {/* <!-- Sidebar (Original) -->*/}
                    {/* <Sidebar /> */}
                    {/* <!-- Main Content Area --> */}
                    <div className="col-md-10 p-4">
                        <h1 className="mb-4">Dashboard</h1>
                        <div className="dashboard-stats">
                            <div className="col-md-4">
                                <div className="card dashboard card-total-employees text-center">
                                    <div className="card-body dashboard-body">
                                        <h5 className="card-title dashboard-title">Total Employees</h5>
                                        <p className="display-6">{totalEmployee}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card dashboard card-total-assets text-center">
                                    <div className="card-body dashboard-body">
                                        <h5 className="card-title dashboard-title">Total Assets</h5>
                                        <p className="display-6">{totalAsset}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card dashboard card-pending-requests text-center">
                                    <div className="card-body dashboard-body">
                                        <h5 className="card-title dashboard-title">Pending Requests</h5>
                                        <p className="display-6">{pendingRequest}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminDashboard;