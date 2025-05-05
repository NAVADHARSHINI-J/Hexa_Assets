import './css/Audit.css'
import Sidebar from './Sidebar';
function Audit() {

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    {/* <!-- Sidebar Component --> */}
                    <Sidebar />
                    {/* <!-- Main Content Area --> */}
                    <div className="col-md-10 p-4">
                        <div className="card">
                            <div className="card-header" style={{ backgroundColor: "#159895" }}>
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item">
                                        <a className="nav-link text-warning active" data-bs-toggle="tab" href="#allocated-assets">Allocated Assets</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-warning" data-bs-toggle="tab" href="#unallocated-assets">Unallocated Assets</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-warning" data-bs-toggle="tab" href="#repaired-assets">Repaired Assets</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body tab-content">
                                {/* <!-- Allocated Assets Tab --> */}
                                <div className="tab-pane active" id="allocated-assets">
                                    <div className="row">
                                        {/* <!-- First Asset --> */}
                                        <div className="col-md-3 mb-3">
                                            <div className="card hover-effect">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <h5 className="card-title">Dell XPS Laptop</h5>
                                                        <span className="badge bg-success">Allocated</span>
                                                    </div>
                                                    <p className="card-text">
                                                        <i className="bi bi-person me-2"></i>John Doe<br />
                                                        <i className="bi bi-laptop me-2"></i>AST001<br />
                                                        <i className="bi bi-calendar me-2"></i>Allocated on 2024-03-15
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <button className="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#viewAssetModal1">
                                                            <i className="bi bi-eye me-1"></i>View
                                                        </button>
                                                        <button className="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#deallocateModal1">
                                                            <i className="bi bi-x-circle me-1"></i>Deallocate
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* <!-- Returned Assets Tab --> */}
                                <div className="tab-pane" id="returned-assets">
                                    <div className="row">
                                        {/* <!-- First Asset --> */}
                                        <div className="col-md-3 mb-3">
                                            <div className="card hover-effect">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <h5 className="card-title">HP Pavilion Laptop</h5>
                                                        <span className="badge bg-warning">Returned</span>
                                                    </div>
                                                    <p className="card-text">
                                                        <i className="bi bi-laptop me-2"></i>AST004<br />
                                                        <i className="bi bi-calendar me-2"></i>Returned on 2024-03-20
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <button className="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#returnedModal1">
                                                            <i className="bi bi-eye me-1"></i>View
                                                        </button>
                                                        <button className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#allocateModal1">
                                                            <i className="bi bi-check-circle me-1"></i>Allocate
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Repaired Assets Tab --> */}
                                <div className="tab-pane" id="repaired-assets">
                                    <div className="row">
                                        {/* <!-- First Asset --> */}
                                        <div className="col-md-3 mb-3">
                                            <div className="card hover-effect">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <h5 className="card-title">Lenovo ThinkPad</h5>
                                                        <span className="badge bg-info">Repaired</span>
                                                    </div>
                                                    <p className="card-text">
                                                        <i className="bi bi-laptop me-2"></i>AST009<br />
                                                        <i className="bi bi-calendar me-2"></i>Repaired on 2024-03-22
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <button className="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#viewRepairedModal1">
                                                            <i className="bi bi-eye me-1"></i>View
                                                        </button>
                                                        <button className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#returnRepairedModal1">
                                                            <i className="bi bi-check-circle me-1"></i>Return
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modals for Repaired Assets --> */}
            {/* <!-- View Repaired Asset Modal Template --> */}
            <div className="modal fade" id="viewRepairedModal1" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Repaired Asset Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <strong>Asset Details</strong>
                                    <p>
                                        <strong>Asset ID:</strong> AST009<br />
                                        <strong>Asset Name:</strong> Lenovo ThinkPad
                                    </p>
                                </div>
                                <div className="col-6">
                                    <strong>Employee Details</strong>
                                    <p>
                                        <strong>Employee ID:</strong> EMP023<br />
                                        <strong>Name:</strong> Sarah Johnson
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3">
                                <strong>Repair Details:</strong>
                                <ul className="list-unstyled">
                                    <li>• Motherboard Replacement</li>
                                    <li>• Screen Repair</li>
                                    <li>• Battery Replacement</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modals for Allocated Assets --> */}
            {/* <!-- View Asset Modal --> */}
            <div className="modal fade" id="viewAssetModal1" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Asset Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <h6>Asset Information</h6>
                            <p>
                                <strong>Name:</strong> Dell XPS Laptop<br />
                                <strong>Asset ID:</strong> AST001<br />
                                <strong>Purchase Date:</strong> 2024-01-15<br />
                                <strong>Specifications:</strong> Intel i7, 16GB RAM, 512GB SSD
                            </p>
                            <h6>Employee Information</h6>
                            <p>
                                <strong>Name:</strong> John Doe<br />
                                <strong>Employee ID:</strong> EMP001<br />
                                <strong>Department:</strong> IT<br />
                                <strong>Allocation Date:</strong> 2024-03-15
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Deallocate Modal --> */}
            <div className="modal fade" id="deallocateModal1" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Deallocate Asset</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to deallocate the Dell XPS Laptop (AST001) from John Doe?</p>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Reason for Deallocation</label>
                                    <select className="form-select">
                                        <option>Employee Left</option>
                                        <option>Asset Upgrade</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Additional Comments</label>
                                    <textarea className="form-control" rows="3"></textarea>
                                </div>
                                <button type="submit" className="btn btn-danger">Confirm Deallocate</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Returned Assets Modals --> */}
            {/* <!-- View Returned Asset Modal --> */}
            <div className="modal fade" id="returnedModal1" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Returned Asset Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <h6>Asset Information</h6>
                            <p>
                                <strong>Name:</strong> HP Pavilion Laptop<br />
                                <strong>Asset ID:</strong> AST004<br />
                                <strong>Purchase Date:</strong> 2024-03-20<br />
                                <strong>Specifications:</strong> AMD Ryzen 5, 8GB RAM, 256GB SSD
                            </p>
                            <h6>Employee Information</h6>
                            <p>
                                <strong>Name:</strong> Robert<br />
                                <strong> ID:</strong> AST004<br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Allocate Asset Modal --> */}
            <div className="modal fade" id="allocateModal1" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Allocate Asset</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Asset Name</label>
                                    <input type="text" className="form-control" value="HP Pavilion Laptop" readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Asset ID</label>
                                    <input type="text" className="form-control" value="AST004" readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Employee Id</label><span style={{ color: "red" }}>*</span>
                                    <input type="text" className="form-control" value="23" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Employee Name</label><span style={{ color: "red" }}>*</span>
                                    <input type="text" className="form-control" value="Robert" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Allocation Date</label><span style={{ color: "red" }}>*</span>
                                    <input type="date" className="form-control" value="2024-03-27" />
                                </div>
                                <button type="submit" className="btn btn-success">Allocate Asset</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Return Repaired Asset Modal--> */}
            <div className="modal fade" id="returnRepairedModal1" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Return Repaired Asset</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Asset Name</label>
                                    <input type="text" className="form-control" value="HP Pavilion Laptop" readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Asset ID</label>
                                    <input type="text" className="form-control" value="AST004" readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Employee ID</label>
                                    <input type="text" className="form-control" value="23" readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Employee Name</label>
                                    <input type="text" className="form-control" value="Robert" readOnly />
                                </div>
                                <button type="submit" className="btn btn-success">Confirm Return</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Audit;