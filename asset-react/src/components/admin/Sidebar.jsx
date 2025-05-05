import { Link } from "react-router";
import './css/Sidebar.css'
function Sidebar() {
    return (
        <div className="col-md-2 sidebar flex-column py-4">
            <div className="text-center mb-4">
                <h3 className="text-white">HexaAssets Admin</h3>
            </div>
            <ul className="nav flex-column flex-grow-1">
                <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                        <i className="bi bi-speedometer2 me-2"></i>Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/admin/employeelist"} className="nav-link">
                        <i className="bi bi-people me-2"></i>Employees
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/admin/assetlist"} className="nav-link">
                        <i className="bi bi-laptop me-2"></i>Assets
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/admin/request"} className="nav-link">
                        <i className="bi bi-file-earmark-text me-2"></i>Requests
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/admin/audit"} className="nav-link">
                        <i className="bi bi-shield-check me-2"></i>Audit
                    </Link>
                </li>
                <li class="nav-item mt-auto profile">
                    <Link to={"/admin/profile"} className="nav-link">
                        <i class="bi bi-person me-2"></i>Profile
                    </Link>
                </li>
            </ul>
        </div>
    )

}
export default Sidebar;