import './AssetDetils.css'
import MacbookPro from './images/MacbookPro.jpg'
function AssetDetails(){
    return (
        <div class="container-fluid">
        <div class="row">
          { /* <!-- Sidebar --> */ }
            <div class="col-md-2 sidebar text-white">
                <div class="text-center mb-4">
                    <h3>HexaAssets</h3>
                </div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link" href="home-assets.html">
                            <i class="bi bi-house me-2"></i>Home Assets
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="liquid-assets.html">
                            <i class="bi bi-cash-coin me-2"></i>Liquid Assets
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="allocated-assets.html">
                            <i class="bi bi-clipboard-check me-2"></i>Allocated Assets
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="new-asset-request.html">
                            <i class="bi bi-plus-circle me-2"></i>New Asset Request
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="tracking-request.html">
                            <i class="bi bi-truck me-2"></i>Tracking Request
                        </a>
                    </li>
                </ul>
            </div>

           {/* <!-- Main Content --> */}
            <div class="col-md-10 p-4">
                <div class="card">
                    <div class="card-header bg-secondary text-white">
                        Asset Details
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src={MacbookPro} class="img-fluid rounded mb-3" alt="MacBook Pro"/>
                                <div class="d-grid">
                                    <a href="new-asset-request.html?asset=macbook-pro" class="btn btn-success">Request Asset</a>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h3 id="assetName">MacBook Pro</h3>
                                <hr/>
                                <div class="row mb-3">
                                    <div class="col-6">
                                        <strong>Model:</strong> 16" M2 Pro
                                    </div>
                                    <div class="col-6">
                                        <strong>Year:</strong> 2023
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-6">
                                        <strong>Configuration:</strong> 32GB RAM, 1TB SSD
                                    </div>
                                    <div class="col-6">
                                        <strong>Available Units:</strong> 12
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-12">
                                        <strong>Description:</strong>
                                        <p>High-performance laptop ideal for creative professionals and developers. Featuring M2 Pro chip, stunning Retina display, and long battery life.</p>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-6">
                                        <strong>Current Location:</strong> IT Department
                                    </div>
                                    <div class="col-6">
                                        <strong>Condition:</strong> New
                                    </div>
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