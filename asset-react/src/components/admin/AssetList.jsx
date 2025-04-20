import './AssetList.css'
function AssetList() {

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    {/* <!-- Sidebar Component --> */}
                    <div className="col-md-2 sidebar py-4">
                        <div className="text-center mb-4">
                            <h3 className="text-white">HexaAssets Admin</h3>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link" href="dashboard.html">
                                    <i className="bi bi-speedometer2 me-2"></i>Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="employees.html">
                                    <i className="bi bi-people me-2"></i>Employees
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="assets.html">
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
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center" style={{ backgroundColor: "#159895", color: "white" }}>
                                <span>Company Assets</span>
                                <button className="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#addAssetModal">
                                    <i className="bi bi-plus me-2"></i>Add Asset
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <div className="card hover-effect">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between mb-3">
                                                    <h5 className="card-title">Dell XPS Laptop</h5>
                                                    <span className="badge bg-secondary">Quantity: 5</span>
                                                </div>
                                                <p className="card-text">
                                                    <i className="bi bi-tag me-2"></i>AST001<br />
                                                    <i className="bi bi-briefcase me-2"></i>Laptop
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <button className="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#viewAssetModal">
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#allocateAssetModal">
                                                        <i className="bi bi-person-plus"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#editAssetModal">
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteAssetModal">
                                                        <i className="bi bi-trash"></i>
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
            {/* <!-- New Allocate Asset Modal --> */}
            <div className="modal fade" id="allocateAssetModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title">Allocate Asset</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Asset ID</label>
                                        <input type="text" className="form-control" value="AST001" readOnly />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Asset Name</label>
                                        <input type="text" className="form-control" value="Dell XPS Laptop" readOnly />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Employee ID</label><span style={{ color: "red" }}>*</span>
                                        <input type="text" className="form-control" placeholder="Enter Employee ID" required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Employee Name</label><span style={{ color: "red" }}>*</span>
                                        <input type="text" className="form-control" placeholder="Enter Employee Name" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Allocation Date</label><span style={{ color: "red" }}>*</span>
                                        <input type="date" className="form-control" required />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-success">Allocate Asset</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- View Asset Modal --> */}
            <div className="modal fade" id="viewAssetModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-info text-white">
                            <h5 className="modal-title">Asset Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><span className="detail-label">Asset Name:</span> Dell XPS Laptop</p>
                                    <p><span className="detail-label">Asset ID:</span> AST001</p>
                                    <p><span className="detail-label">Model:</span> SN-XYZ-123</p>
                                    <p><span className="detail-label">Type:</span> Laptop</p>
                                    <p><span className="detail-label">Status:</span> <span className="badge bg-success">Available</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p><span className="detail-label">Quantity:</span> 5</p>
                                    <p><span className="detail-label">Purchase Date:</span> January 15, 2023</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <h6 className="detail-label">Configurations:</h6>
                                    <ul className="list-group">
                                        <li className="list-group-item">Processor: Intel Core i7-11800H</li>
                                        <li className="list-group-item">RAM: 16GB DDR4</li>
                                        <li className="list-group-item">Storage: 512GB SSD</li>
                                        <li className="list-group-item">Graphics: NVIDIA GeForce RTX 3050</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Edit Asset Modal --> */}
            <div className="modal fade" id="editAssetModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-warning">
                            <h5 className="modal-title">Edit Asset</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Asset Name</label>
                                        <input type="text" className="form-control" value="Dell XPS Laptop" required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Asset ID</label>
                                        <input type="text" className="form-control" value="AST001" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Model</label>
                                        <input type="text" className="form-control" value="SN-XYZ-123" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Asset Type</label>
                                        <select className="form-select">
                                            <option value="Laptop" selected>Laptop</option>
                                            <option value="Desktop">Desktop</option>
                                            <option value="Monitor">Monitor</option>
                                            <option value="Printer">Printer</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Purchase Date</label>
                                        <input type="date" className="form-control" value="2024-03-09" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Quantity</label>
                                        <input type="number" className="form-control" value="1" min="1" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Configurations</label>
                                    <textarea className="form-control" rows="4">Processor: Intel Core i7-11800H
                                        RAM: 16GB DDR4
                                        Storage: 512GB SSD
                                        Graphics: NVIDIA GeForce RTX 3050</textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-warning">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Delete Asset Modal --> */}
            <div className="modal fade" id="deleteAssetModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-danger text-white">
                            <h5 className="modal-title">Confirm Asset Deletion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="alert alert-danger">
                                <strong>Warning:</strong> You are about to permanently delete the asset "Dell XPS Laptop".
                            </div>
                            <p>This action cannot be undone. The asset will be removed from the system.</p>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="confirmDelete" />
                                <label className="form-check-label" htmlFor="confirmDelete">
                                    I understand this action is irreversible
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" disabled id="deleteAssetBtn">Delete Asset</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Add Asset Modal --> */}
            <div className="modal fade" id="addAssetModal" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Add New Asset</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Asset Name</label><span style={{ color: "red" }}>*</span>
                                    <input type="text" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Asset Model</label><span style={{ color: "red" }}>*</span>
                                    <input type="text" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Purchase Date</label><span style={{ color: "red" }}>*</span>
                                    <input type="date" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label><span style={{ color: "red" }}>*</span>
                                    <select className="form-select" required>
                                        <option value="Available">Available</option>
                                        <option value="In Use">In Use</option>
                                        <option value="Maintenance">Maintenance</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Asset Type</label><span style={{ color: "red" }}>*</span>
                                    <select className="form-select" required>
                                        <option value="Laptop" selected>Laptop</option>
                                        <option value="Desktop">Desktop</option>
                                        <option value="Monitor">Monitor</option>
                                        <option value="Printer">Printer</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Configurations</label><span style={{ color: "red" }}>*</span>
                                    <textarea className="form-control" rows="4" required>Processor: Intel Core i7-11800H
                                        RAM: 16GB DDR4
                                        Storage: 512GB SSD
                                        Graphics: NVIDIA GeForce RTX 3050</textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows="4">Processor: Intel Core i7-11800H
                                        RAM: 16GB DDR4
                                        Storage: 512GB SSD
                                        Graphics: NVIDIA GeForce RTX 3050</textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Add Asset</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default AssetList;