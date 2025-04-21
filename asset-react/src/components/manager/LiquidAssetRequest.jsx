import './LiquidAsset.css'

function LiquidAssetRequest(){
    return(
        <div class="container-fluid">
        <div class="row">
            {/* <!-- Sidebar --> */}
            <div class="col-md-2 sidebar">
                <div class="text-center text-white mb-4">
                    <h3>HexaAssets</h3>
                </div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link" href="HexaAssets Dashboard Page.html">
                            <i class="bi bi-speedometer2 me-2"></i>Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="HexaAssets Liquid Assets Page.html">
                            <i class="bi bi-cash-stack me-2"></i>Liquid Assets
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="HexaAssets Liquid Asset Request Page.html">
                            <i class="bi bi-plus-circle me-2"></i>Liquid Asset Request
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="HexaAssets Liquid Asset Allocation Page.html">
                            <i class="bi bi-clipboard-check me-2"></i>Liquid Asset Allocation
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="HexaAssets Unallocated Assets Page.html">
                            <i class="bi bi-archive me-2"></i>Unallocated Liquid Assets
                        </a>
                    </li>
                </ul>
            </div>

            <div class="col-md-10 p-4">
                <div class="card">
                    <div class="card-header">
                        <span>Liquid Asset Requests</span>
                        <button class="btn btn-sm btn-light">New Request</button>
                    </div>
                    <div class="card-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Asset Type</th>
                                    <th>Amount</th>
                                    <th>Purpose</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John Doe</td>
                                    <td>Cash Reserves</td>
                                    <td>$50,000</td>
                                    <td>Project Funding</td>
                                    <td><span class="badge bg-warning">Pending</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-success me-2">Approve</button>
                                        <button class="btn btn-sm btn-danger">Reject</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>Money Market Funds</td>
                                    <td>$25,000</td>
                                    <td>Maintainance Budget</td>
                                    <td><span class="badge bg-warning">Pending</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-success me-2">Approve</button>
                                        <button class="btn btn-sm btn-danger">Reject</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Mike Johnson</td>
                                    <td>Charges</td>
                                    <td>$100,000</td>
                                    <td>Flight Charges</td>
                                    <td><span class="badge bg-success">Approved</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-secondary" disabled>Actions</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default LiquidAssetRequest