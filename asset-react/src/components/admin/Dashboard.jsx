import { useState } from "react";
import "./Dashboard.css"
function Dashboard() {

    const [totalAsset, setTotalAsset] = useState(null);
    const [totalEmployee, setTotalEmployee] = useState(null);
    const [pendingRequest, setPendingRequest] = useState(null);
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    {/* <!-- Sidebar (Original) -->*/}
                    <div className="col-md-2 sidebar py-4">
                        <div className="text-center mb-4">
                            <h3 className="text-white">HexaAssets Admin</h3>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" href="dashboard.html">
                                    <i className="bi bi-speedometer2 me-2"></i>Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="employees.html">
                                    <i className="bi bi-people me-2"></i>Employees
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="assets.html">
                                    <i className="bi bi-laptop me-2"></i>Assets
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="requests.html">
                                    <i className="bi bi-file-earmark-text me-2"></i>Requests
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="audit.html">
                                    <i className="bi bi-shield-check me-2"></i>Audit
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- Main Content Area --> */}
                    <div className="col-md-10 p-4">
                        <h1 className="mb-4">Dashboard</h1>
                        <div className="dashboard-stats">
                            <div className="col-md-4">
                                <div className="card card-total-employees text-center">
                                    <div className="card-body">
                                        <h5 className="card-title">Total Employees</h5>
                                        <p className="display-6">{totalEmployee}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card card-total-assets text-center">
                                    <div className="card-body">
                                        <h5 className="card-title">Total Assets</h5>
                                        <p className="display-6">{totalAsset}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card card-pending-requests text-center">
                                    <div className="card-body">
                                        <h5 className="card-title">Pending Requests</h5>
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
export default Dashboard;