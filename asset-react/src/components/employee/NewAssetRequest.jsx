import "./NewAssetRequest.css"

function NewAssetRequest(){
    return(
        <div>
            <div className="container-fluid">
        <div className="row">
            {/* <!-- Sidebar --> */}
            <div className="col-md-2 sidebar text-white">
                <div className="text-center mb-4">
                    <h3>HexaAssets</h3>
                </div>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link" href="home-assets.html">
                            <i className="bi bi-house me-2"></i>Home Assets
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="liquid-assets.html">
                            <i className="bi bi-cash-coin me-2"></i>Liquid Assets
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="allocated-assets.html">
                            <i className="bi bi-clipboard-check me-2"></i>Allocated Assets
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="new-asset-request.html">
                            <i className="bi bi-plus-circle me-2"></i>New Asset Request
                        </a>
                    </li>
                    <li className="nav-item">
                    <a class="nav-link" href="tracking-request.html">
                            <i class="bi bi-truck me-2"></i>Tracking Request
                        </a>
                    </li>
                </ul>
            </div>

            {/* <!-- Main Content --> */}
            <div className="col-md-10 p-4">
                <div className="card">
                    <div className="card-header secondary-bg text-white">
                        New Asset Request
                    </div>
                    <div className="card-body">
                        <form id="assetRequestForm">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Asset Name</label>
                                    <input type="text" className="form-control" id="assetName" readonly/>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Asset Category</label>
                                    <select className="form-select" id="assetCategory" required>
                                        <option value="">Select Category</option>
                                        <option>Vehicle</option>
                                        <option>Laptop</option>
                                        <option>Mobile Device</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Justification</label>
                                <textarea className="form-control" rows="3" id="justification" placeholder="Explain why you need this asset" required></textarea>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Urgency Level</label>
                                    <select className="form-select" id="urgencyLevel" required>
                                        <option value="">Select Urgency</option>
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                        <option>Critical</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Expected Delivery Date</label>
                                    <input type="date" className="form-control" id="deliveryDate" required/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit Request</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- Success Modal -->
    <div className="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="successModalLabel">Request Submitted Successfully</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="text-center">
                        <i className="bi bi-check-circle text-success" style="font-size: 4rem;"></i>
                        <p className="mt-3">Your asset request has been submitted successfully. Our team will review your request and get back to you soon.</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div> */}
        </div>
    )
}

export default NewAssetRequest;