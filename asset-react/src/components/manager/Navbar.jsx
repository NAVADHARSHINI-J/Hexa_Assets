import { Link, useLocation } from "react-router-dom";
import './LiquidAsset.css';

function Navbar(){
        const location = useLocation();
    
         return(
          <div className="col-md-2 sidebar flex-column py-4">
         <div className="text-center text-white mb-4">
            <h3>HexaAssets</h3>
          </div>
          <ul className="nav flex-column flex-grow-1">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/manager' ? 'active' : ''}`} to="/manager">
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/dashassetpage' ? 'active' : ''}`} to="/dashassetpage">
                <i className="bi bi-cash-stack me-2"></i> Liquid Assets
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/dashassetreq' ? 'active' : ''}`} to="/dashassetreq">
                <i className="bi bi-plus-circle me-2"></i> Liquid Asset Request
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/dashassetall' ? 'active' : ''}`} to="/dashassetall">
                <i className="bi bi-clipboard-check me-2"></i> Liquid Asset Allocation
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/dashassetunall' ? 'active' : ''}`} to="/dashassetunall">
                <i className="bi bi-archive me-2"></i> Unallocated Liquid Assets
              </Link>
            </li>
          </ul>
        </div>
    )   
}
export default Navbar;