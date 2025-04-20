import './EmployeeList.css'

function EmployeeList() {
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
                                <a className="nav-link active" href="employees.html">
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
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <span>Employee List</span>
                                <div>
                                    <input type="text" className="form-control form-control-sm me-2 d-inline-block" style={{ width: 200 }} placeholder="Search employees..." />
                                    <button className="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">
                                        <i className="bi bi-plus me-2"></i>Add Employee
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <div className="card employee-card hover-effect">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between mb-3">
                                                    <h5 className="card-title">John Doe</h5>
                                                    <span className="badge bg-primary">IT</span>
                                                </div>
                                                <p className="card-text">
                                                    <i className="bi bi-envelope me-2"></i>john.doe@hexaassets.com<br />
                                                    <i className="bi bi-telephone me-2"></i>+1 (555) 123-4567
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <button className="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#viewEmployeeModal">
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- New Asset Details Modal --> */}
                        <div className="modal fade" id="assetDetailsModal" tabIndex="-1">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Asset Details</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="detail-label">Asset Information</h6>
                                                <p><strong>Asset Name:</strong> MacBook Pro 16"</p>
                                                <p><strong>Asset Number:</strong> Asset #1234</p>
                                                <p><strong>Model:</strong> MacBook Pro 16-inch, M1 Pro</p>
                                                <p><strong>Purchase Date:</strong> February 1, 2023</p>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="detail-label">Allocation Details</h6>
                                                <p><strong>Allocation Date:</strong> February 1, 2023</p>
                                                <p><strong>Quantity:</strong> 1</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-12">
                                                <h6 className="detail-label">Additional Specifications</h6>
                                                <ul>
                                                    <li>Processor: Apple M1 Pro</li>
                                                    <li>RAM: 16GB</li>
                                                    <li>Storage: 512GB SSD</li>
                                                    <li>Screen: 16-inch Liquid Retina XDR display</li>
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
                        {/* <!-- New Asset Return Modal --> */}
                        <div className="modal fade" id="assetReturnModal" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header bg-warning">
                                        <h5 className="modal-title">Asset Return Request</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label className="form-label">Asset Details</label>
                                            <input type="text" className="form-control" value="MacBook Pro 16" readOnly />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Return Reason</label>
                                            <select className="form-select">
                                                <option>Select Reason</option>
                                                <option>Asset Replacement</option>
                                                <option>End of Project</option>
                                                <option>Employee Transfer</option>
                                                <option>Asset Repair</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Comments</label>
                                            <textarea className="form-control" rows="3" placeholder="Additional details about the return"></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Estimated Return Date</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="confirmReturn" />
                                            <label className="form-check-label" >
                                                I confirm the asset is in good condition
                                            </label>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-warning" disabled id="submitReturnBtn">Submit Return Request</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- View Employee Modal --> */}
                        <div className="modal fade" id="viewEmployeeModal" tabIndex="-1">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Employee Details</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h4>John Doe</h4>
                                                <p><span className="detail-label">Id:</span> 12</p>
                                                <p><span className="detail-label">Email:</span> john.doe@hexaassets.com</p>
                                                <p><span className="detail-label">Phone:</span> +1 (555) 123-4567</p>
                                                <p><span className="detail-label">Department:</span> IT</p>
                                                <p><span className="detail-label">Address:</span> 123 Tech Lane, Silicon Valley, CA 94000</p>
                                            </div>
                                        </div>

                                        <div className="row mt-4">
                                            <div className="col-12">
                                                <h6 className="d-flex justify-content-between align-items-center">
                                                    Allocated Assets
                                                    <button className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#allocateAssetModal">
                                                        <i className="bi bi-plus me-1"></i>Allocate Asset
                                                    </button>
                                                </h6>
                                                <div className="table-responsive">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Asset Name</th>
                                                                <th>Asset Id</th>
                                                                <th>Allocation Date</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>MacBook Pro 16"</td>
                                                                <td>Asset #1234</td>
                                                                <td>February 1, 2023</td>
                                                                <td>
                                                                    <div className="btn-group" role="group">
                                                                        <button className="btn btn-sm btn-info" title="View Asset" data-bs-toggle="modal" data-bs-target="#assetDetailsModal">
                                                                            <i className="bi bi-eye"></i>
                                                                        </button>
                                                                        <button className="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#assetReturnModal" title="Return Asset">
                                                                            <i className="bi bi-arrow-return-left"></i>
                                                                        </button>
                                                                        <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deallocateAssetModal" title="Deallocate">
                                                                            <i className="bi bi-x-circle"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Dell Monitor 27"</td>
                                                                <td>Asset #5678</td>
                                                                <td>February 1, 2023</td>
                                                                <td>
                                                                    <div className="btn-group" role="group">
                                                                        <button className="btn btn-sm btn-info" title="View Asset" data-bs-toggle="modal" data-bs-target="#assetDetailsModal">
                                                                            <i className="bi bi-eye"></i>
                                                                        </button>
                                                                        <button className="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#assetReturnModal" title="Return Asset">
                                                                            <i className="bi bi-arrow-return-left"></i>
                                                                        </button>
                                                                        <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deallocateAssetModal" title="Deallocate">
                                                                            <i className="bi bi-x-circle"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Add Employee Modal --> */}
                        <div className="modal fade" id="addEmployeeModal" tabIndex="-1">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header bg-success text-white">
                                        <h5 className="modal-title">Add New Employee</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Full Name</label>
                                                    <input type="text" className="form-control" required />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Username</label>
                                                    <input type="text" className="form-control" required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input type="email" className="form-control" required />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Phone</label>
                                                    <input type="tel" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Password</label>
                                                    <input type="password" className="form-control" />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Department</label>
                                                    <select className="form-select">
                                                        <option value="">Select Department</option>
                                                        <option value="IT">IT</option>
                                                        <option value="HR">HR</option>
                                                        <option value="Finance">Finance</option>
                                                        <option value="Marketing">Marketing</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Address</label>
                                                <textarea className="form-control" rows="3"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-success">Add Employee</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Edit Employee Modal --> */}
                        <div className="modal fade" id="editEmployeeModal" tabIndex="-1">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header bg-warning">
                                        <h5 className="modal-title">Edit Employee</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Full Name</label>
                                                    <input type="text" className="form-control" value="John" required />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input type="email" className="form-control" value="john.doe@hexaassets.com" required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Phone</label>
                                                    <input type="tel" className="form-control" value="+1 (555) 123-4567" />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Department</label>
                                                    <select className="form-select">
                                                        <option value="IT" selected>IT</option>
                                                        <option value="HR">HR</option>
                                                        <option value="Finance">Finance</option>
                                                        <option value="Marketing">Marketing</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Address</label>
                                                <textarea className="form-control" rows="3">123 Tech Lane, Silicon Valley, CA 94000</textarea>
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
                        {/* <!-- Delete Confirmation Modal --> */}
                        <div className="modal fade" id="deleteConfirmModal" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header bg-danger text-white">
                                        <h5 className="modal-title">Confirm Employee Deletion</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="alert alert-danger">
                                            <strong>Warning:</strong> You are about to permanently delete the employee record for John Doe.
                                        </div>
                                        <p>This action cannot be undone. All associated data will be removed from the system.</p>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="confirmDelete" />
                                            <label className="form-check-label" htmlFor="confirmDelete">
                                                I understand this action is irreversible
                                            </label>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-danger" disabled id="deleteEmployeeBtn">Delete Employee</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Allocate Asset Modal --> */}
                        <div className="modal fade" id="allocateAssetModal" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header bg-success text-white">
                                        <h5 className="modal-title">Allocate New Asset</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="mb-3">
                                                <label className="form-label">Asset</label>
                                                <input type="number" className="form-control" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Allocation Date</label>
                                                <input type="date" className="form-control" />
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
                        {/* <!-- Deallocate Asset Modal --> */}
                        <div className="modal fade" id="deallocateAssetModal" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header bg-warning">
                                        <h5 className="modal-title">Confirm Asset Deallocation</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="alert alert-warning">
                                            <strong>Warning:</strong> You are about to deallocate an asset from this employee.
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Asset Details</label>
                                            <input type="text" className="form-control" value="MacBook Pro 16" readOnly />
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="confirmDeallocation" />
                                            <label className="form-check-label" htmlFor="confirmDeallocation">
                                                I confirm this asset deallocation
                                            </label>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-warning" disabled id="deallocateAssetBtn">Deallocate Asset</button>
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
export default EmployeeList;