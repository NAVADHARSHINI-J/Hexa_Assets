import "./HomeAsset.css"; 

function HomeAsset() {
    return (
        <div className="container-fluid">
            <div className="row">
                {/*<!-- Sidebar -->*/}
                <div className="col-md-2 sidebar text-white">
                    <div className="text-center mb-4">
                        <h3>HexaAssets</h3>
                    </div>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" href="home-assets.html">
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
                            <a className="nav-link" href="new-asset-request.html">
                                <i className="bi bi-plus-circle me-2"></i>New Asset Request
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="tracking-request.html">
                                <i className="bi bi-truck me-2"></i>Tracking Request
                            </a>
                        </li>
                    </ul>
                </div>

                {/* <!-- Main Content -->*/}

                <div className="col-md-10 p-4">
                    <div className="card">
                        <div className="card-header  text-white">
                            Company Assets
                        </div>
                        <div className="card-body">
                            <div className="asset-grid">
                                {/*<!-- Existing Assets -->  */}

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">MS Office</h5>
                                        <p className="card-text"> MS office software license</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 45</span>
                                            <div>
                                                <a href="asset-details.html?id=toyota-cabriolet" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=toyota-cabriolet" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*<!-- Laptops --> */}

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">MacBook Pro</h5>
                                        <p className="card-text">16" M2 Pro Laptop</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 12</span>
                                            <div>
                                                <a href="asset-details.html?id=macbook-pro" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=macbook-pro" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">Dell XPS</h5>
                                        <p className="card-text">Developer Edition Laptop</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 8</span>
                                            <div>
                                                <a href="asset-details.html?id=dell-xps" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=dell-xps" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">Lenovo ThinkPad</h5>
                                        <p className="card-text">X1 Carbon Gen 10</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 15</span>
                                            <div>
                                                <a href="asset-details.html?id=lenovo-thinkpad" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=lenovo-thinkpad" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*<!-- Mobile Devices -->*/}
                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">iPhone 14 Pro</h5>
                                        <p className="card-text">256GB Space Black</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 20</span>
                                            <div>
                                                <a href="asset-details.html?id=iphone-14-pro" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=iphone-14-pro" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">Samsung Galaxy S23</h5>
                                        <p className="card-text">Ultra 512GB</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 15</span>
                                            <div>
                                                <a href="asset-details.html?id=galaxy-s23" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=galaxy-s23" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">Google Pixel 7 Pro</h5>
                                        <p className="card-text">128GB Obsidian</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 10</span>
                                            <div>
                                                <a href="asset-details.html?id=pixel-7-pro" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=pixel-7-pro" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<!-- IT Infrastructure -->*/}

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">Dell PowerEdge</h5>
                                        <p className="card-text">R740 Rack Server</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 5</span>
                                            <div>
                                                <a href="asset-details.html?id=dell-poweredge" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=dell-poweredge" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">Cisco Catalyst</h5>
                                        <p className="card-text">9300 Network Switch</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 7</span>
                                            <div>
                                                <a href="asset-details.html?id=cisco-switch" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=cisco-switch" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">Seagate HardDisk</h5>
                                        <p className="card-text">Seagate 4TB External Hard Drive</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 3</span>
                                            <div>
                                                <a href="asset-details.html?id=palo-alto-firewall" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=palo-alto-firewall" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<!-- Additional Specialized Equipment -->*/}

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">LG UltraFine</h5>
                                        <p className="card-text">5K 27" Display</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 25</span>
                                            <div>
                                                <a href="asset-details.html?id=lg-ultrafine" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=lg-ultrafine" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">CalDigit TS3</h5>
                                        <p className="card-text">Thunderbolt 3 Dock</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 30</span>
                                            <div>
                                                <a href="asset-details.html?id=caldigit-dock" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=caldigit-dock" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">Meta Quest Pro</h5>
                                        <p className="card-text">Professional VR Headset</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 8</span>
                                            <div>
                                                <a href="asset-details.html?id=meta-quest-pro" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=meta-quest-pro" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">Formlabs Form 3</h5>
                                        <p className="card-text">Professional 3D Printer</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 4</span>
                                            <div>
                                                <a href="asset-details.html?id=formlabs-3d-printer" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=formlabs-3d-printer" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">Ubiquiti Dream</h5>
                                        <p className="card-text">Dream Machine Pro Router</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 6</span>
                                            <div>
                                                <a href="asset-details.html?id=ubiquiti-router" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=ubiquiti-router" className="btn btn-sm btn-success">Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card asset-card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">Samsung Signage</h5>
                                        <p className="card-text">55" 4K Digital Display</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="badge bg-info">Available: 10</span>
                                            <div>
                                                <a href="asset-details.html?id=samsung-signage" className="btn btn-sm btn-primary me-2">View Details</a>
                                                <a href="new-asset-request.html?asset=samsung-signage" className="btn btn-sm btn-success">Request</a>
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

    )
}

export default HomeAsset