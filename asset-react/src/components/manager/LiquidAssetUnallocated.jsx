function LiquidAssetUnallocated(){
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
                        <a class="nav-link" href="HexaAssets Liquid Asset Request Page.html">
                            <i class="bi bi-plus-circle me-2"></i>Liquid Asset Request
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="HexaAssets Liquid Asset Allocation Page.html">
                            <i class="bi bi-clipboard-check me-2"></i>Liquid Asset Allocation
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="HexaAssets Unallocated Liquid Assets Page.html">
                            <i class="bi bi-archive me-2"></i>Unallocated Liquid Assets
                        </a>
                    </li>
                </ul>
            </div>

            <div class="col-md-10 p-4">
                <div class="card">
                    <div class="card-header">
                        <span>Unallocated Liquid Assets</span>
                        <button class="btn btn-sm btn-light">Allocate Funds</button>
                    </div>
                    <div class="card-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Asset Type</th>
                                    <th>Total Amount</th>
                                    <th>Unallocated Amount</th>
                                    <th>Allocation Potential</th>
                                    <th>Unallocated Percentage</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cash Reserves</td>
                                    <td>$500,000</td>
                                    <td>$150,000</td>
                                    <td>Strategic Reserves</td>
                                    <td>30%</td>
                                    <td><span class="badge bg-warning">Underutilized</span></td>
                                </tr>
                                <tr>
                                    <td>Short-Term Investments</td>
                                    <td>$250,000</td>
                                    <td>$150,000</td>
                                    <td>Opportunistic Investments</td>
                                    <td>60%</td>
                                    <td><span class="badge bg-danger">Low Allocation</span></td>
                                </tr>
                                <tr>
                                    <td>Money Market Funds</td>
                                    <td>$350,000</td>
                                    <td>$150,000</td>
                                    <td>Liquidity Buffer</td>
                                    <td>43%</td>
                                    <td><span class="badge bg-warning">Partially Allocated</span></td>
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
export default LiquidAssetUnallocated