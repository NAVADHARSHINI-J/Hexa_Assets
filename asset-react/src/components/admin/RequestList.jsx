import './css/RequestList.css'
import Sidebar from './Sidebar';
function RequestList() {

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
                                        <a className="nav-link text-warning active" data-bs-toggle="tab" href="#service-requests">Service Requests</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-warning" data-bs-toggle="tab" href="#new-requests">New Requests</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body tab-content">
                                {/* <!-- Service Requests Tab --> */}
                                <div className="tab-pane active" id="service-requests">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Request ID</th>
                                                <th>Employee</th>
                                                <th>Request Type</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>SRV001</td>
                                                <td>John Doe</td>
                                                <td>Laptop Repair</td>
                                                <td>2024-03-15</td>
                                                <td><span className="badge bg-warning">Pending</span></td>
                                                <td className="table-actions">
                                                    <button className="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#serviceRequestDetailsModal1">
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#approveServiceRequestModal">
                                                        <i className="bi bi-check-circle"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#declineServiceRequestModal">
                                                        <i className="bi bi-x-circle"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* <!-- New Requests Tab --> */}
                                <div className="tab-pane " id="new-requests">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Request ID</th>
                                                <th>Employee</th>
                                                <th>Requested Asset</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>REQ001</td>
                                                <td>Jane Smith</td>
                                                <td>Dell XPS Laptop</td>
                                                <td>2024-03-14</td>
                                                <td><span className="badge bg-warning">Pending</span></td>
                                                <td className="table-actions">
                                                    <button className="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#newRequestDetailsModal1">
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#approveNewRequestModal">
                                                        <i className="bi bi-check-circle"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#declineNewRequestModal">
                                                        <i className="bi bi-x-circle"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Service Request Details Modals --> */}
            <div className="modal fade" id="serviceRequestDetailsModal1" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-info text-white">
                            <h5 className="modal-title">Service Request Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2">
                                <div className="col-6">
                                    <strong>Employee ID:</strong> EMP001
                                </div>
                                <div className="col-6">
                                    <strong>Employee Name:</strong> John Doe
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <strong>Asset ID:</strong> AST001
                                </div>
                                <div className="col-6">
                                    <strong>Asset Name:</strong> Dell XPS Laptop
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12">
                                    <strong>Request Date:</strong> 2024-03-15
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <strong>Reason for Service:</strong>
                                    <p>Laptop is not booting properly. Screen flickers and there might be a hardware issue with the motherboard.</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- New Request Details Modals --> */}
            <div className="modal fade" id="newRequestDetailsModal1" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-info text-white">
                            <h5 className="modal-title">New Request Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2">
                                <div className="col-6">
                                    <strong>Employee ID:</strong> EMP002
                                </div>
                                <div className="col-6">
                                    <strong>Employee Name:</strong> Jane Smith
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <strong>Requested Asset:</strong> Dell XPS Laptop
                                </div>
                                <div className="col-6">
                                    <strong>Asset Type:</strong> Laptop
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12">
                                    <strong>Request Date:</strong> 2024-03-14
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <strong>Justification:</strong>
                                    <p>Need a high-performance laptop for data analysis and reporting tasks. Current laptop is slow and outdated.</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Approve Service Request Modal --> */}
            <div className="modal fade" id="approveServiceRequestModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title">Approve Service Request</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to approve this service request?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Decline Service Request Modal --> */}
            <div className="modal fade" id="declineServiceRequestModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-danger text-white">
                            <h5 className="modal-title">Decline Service Request</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to decline this service request?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Approve New Request Modal --> */}
            <div className="modal fade" id="approveNewRequestModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title">Approve New Request</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to approve this new request?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Decline New Request Modal --> */}
            <div className="modal fade" id="declineNewRequestModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-danger text-white">
                            <h5 className="modal-title">Decline New Request</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to decline this new request?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RequestList;