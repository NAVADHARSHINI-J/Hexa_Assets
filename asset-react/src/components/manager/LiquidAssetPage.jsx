import { useState, useEffect } from 'react';
import './LiquidAsset.css';
import axios from 'axios';

function LiquidAssetPage() {
    const [liquidAssets, setLiquidAssets] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [pageArray, setPageArray] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState({});
    const [disable, setDisable] = useState(true);
    const [newAsset, setNewAsset] = useState({});
    // Get all liquid assets
    const getLiquidAssets = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/liquidasset/getall?page=${page}&size=${size}`);
            setLiquidAssets(response.data.list);
            setTotalPages(response.data.totalPages);

            // Create pagination array
            let temp = [];
            for (let i = 0; i < response.data.totalPages; i++) {
                temp.push(i);
            }
            setPageArray(temp);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getLiquidAssets();
    }, [page]);

    // Add new asset
    const addLiquidAsset = async () => {
        try {
            const response = await axios.post('http://localhost:8081/api/liquidasset/add', newAsset);
            // Refresh the asset list
            getLiquidAssets();
            // Reset new asset form
            setNewAsset({
                name: "",
                amount: "",
                status: "Available",
                description: ""
            });
        } catch (err) {
            console.log(err);
        }
    };

    // Update asset
    const updateLiquidAsset = async (asset) => {
        try {
            const response = await axios.put(`http://localhost:8081/api/liquidasset/update/${asset.id}`, asset);
            // Update locally
            let temp = [...liquidAssets];
            temp = temp.filter(a => a.id !== asset.id);
            temp.push(asset);
            setLiquidAssets(temp);
        } catch (err) {
            console.log(err);
        }
    };

    // Delete asset
    const deleteLiquidAsset = async (asset) => {
        try {
            const response = await axios.delete(`http://localhost:8081/api/liquidasset/delete/${asset.id}`);
            // Update locally
            let temp = [...liquidAssets];
            temp = temp.filter(a => a.id !== asset.id);
            setLiquidAssets(temp);
        } catch (err) {
            console.log(err);
        }
    };

    // Get status badge color
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Available':
                return 'bg-success';
            case 'Limited':
                return 'bg-warning';
            case 'Critical':
                return 'bg-danger';
            case 'Allocated':
                return 'bg-primary';
            default:
                return 'bg-info';
        }
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    {/* <!-- Sidebar --> */}
                    <div class="col-md-2 sidebar">
                        <div class="text-center text-white mb-4">
                            <h3>HexaAssets</h3></div>
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link" href="manager">
                                    <i class="bi bi-speedometer2 me-2"></i>Dashboard
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" href="/dashassetpage">
                                    <i class="bi bi-cash-stack me-2"></i>Liquid Assets
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/dashassetreq">
                                    <i class="bi bi-plus-circle me-2"></i>Liquid Asset Request
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/dashassetall">
                                    <i class="bi bi-clipboard-check me-2"></i>Liquid Asset Allocation
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/dashassetunall">
                                    <i class="bi bi-archive me-2"></i>Unallocated Liquid Assets
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Main Content Area */}
                    <div className="col-md-10 p-4">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center" style={{ backgroundColor: "#159895", color: "white" }}>
                                <span>Liquid Assets</span>
                                <button className="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#addLiquidAssetModal">
                                    <i className="bi bi-plus me-2"></i>Add Liquid Asset
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {liquidAssets.map((asset, index) => (
                                        <div className="col-md-4 mb-3" key={index}>
                                            <div className="card asset-card hover-effect">
                                                <div className="card-body">
                                                    <h5 className="card-title">{asset.name}</h5>
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <span className={`badge ${getStatusBadgeClass(asset.status)}`}>
                                                            ${asset.amount.toLocaleString()} {asset.status}
                                                        </span>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <button className="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#viewAssetModal"
                                                            onClick={() => setSelectedAsset(asset)}>
                                                            <i className="bi bi-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#editAssetModal"
                                                            onClick={() => setSelectedAsset(asset)}>
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteAssetModal"
                                                            onClick={() => setSelectedAsset(asset)}>
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-sm-4"></div>
                                    <div className="col-sm-6">
                                        <nav aria-label="Page navigation">
                                            <ul className="pagination">
                                                {page === 0 ? (
                                                    <li className="page-item disabled">
                                                        <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Prev</a>
                                                    </li>
                                                ) : (
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" onClick={() => setPage(page - 1)}>Prev</a>
                                                    </li>
                                                )}

                                                {pageArray.map((e, index) => (
                                                    <li key={index} className={`page-item ${page === index ? "active" : ""}`}>
                                                        <a className="page-link" href="#" onClick={() => setPage(index)}>{index + 1}</a>
                                                    </li>
                                                ))}

                                                {page === totalPages - 1 ? (
                                                    <li className="page-item disabled">
                                                        <a className="page-link" href="#" aria-disabled="true">Next</a>
                                                    </li>
                                                ) : (
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" onClick={() => setPage(page + 1)}>Next</a>
                                                    </li>
                                                )}
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Asset Modal */}
            {selectedAsset && (
                <div className="modal fade" id="viewAssetModal" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h5 className="modal-title">Liquid Asset Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><span className="detail-label">Asset Name:</span> {selectedAsset.name}</p>
                                        <p><span className="detail-label">Asset ID:</span> {selectedAsset.id}</p>
                                        <p><span className="detail-label">Status:</span>
                                            <span className={`badge ms-2 ${getStatusBadgeClass(selectedAsset.status)}`}>
                                                {selectedAsset.status}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><span className="detail-label">Total Amount:</span> ${selectedAsset.amount?.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <h6 className="detail-label">Description:</h6>
                                        <div className="p-3 border rounded bg-light">
                                            <p className="mb-0">{selectedAsset.description}</p>
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
            )}

            {/* Edit Asset Modal */}
            {selectedAsset && (
                <div className="modal fade" id="editAssetModal" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-warning">
                                <h5 className="modal-title">Edit Liquid Asset</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Asset Name</label><span style={{ color: "red" }}>*</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={selectedAsset.name || ''}
                                                onChange={(e) => setSelectedAsset({ ...selectedAsset, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Asset ID</label>
                                            <input type="text" className="form-control" value={selectedAsset.id || ''} readOnly />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Amount</label><span style={{ color: "red" }}>*</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={selectedAsset.amount || ''}
                                                onChange={(e) => setSelectedAsset({ ...selectedAsset, amount: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Status</label><span style={{ color: "red" }}>*</span>
                                            <select
                                                className="form-select"
                                                value={selectedAsset.status || ''}
                                                onChange={(e) => setSelectedAsset({ ...selectedAsset, status: e.target.value })}
                                            >
                                                <option value="Available">Available</option>
                                                <option value="Limited">Limited</option>
                                                <option value="Critical">Critical</option>
                                                <option value="Allocated">Allocated</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            value={selectedAsset.description || ''}
                                            onChange={(e) => setSelectedAsset({ ...selectedAsset, description: e.target.value })}
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() => updateLiquidAsset(selectedAsset)}
                                    data-bs-dismiss="modal"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Asset Modal */}
            {selectedAsset && (
                <div className="modal fade" id="deleteAssetModal" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title">Confirm Asset Deletion</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <div className="alert alert-danger">
                                    <strong>Warning:</strong> You are about to permanently delete the liquid asset {selectedAsset.name}.
                                </div>
                                <p>This action cannot be undone. The asset will be removed from the system.</p>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="confirmDelete"
                                        onClick={() => setDisable(!disable)}
                                    />
                                    <label className="form-check-label" htmlFor="confirmDelete">
                                        I understand this action is irreversible
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    disabled={disable}
                                    onClick={() => deleteLiquidAsset(selectedAsset)}
                                    data-bs-dismiss="modal"
                                >
                                    Delete Asset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Asset Modal */}
            <div className="modal fade" id="addLiquidAssetModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-secondary text-white">
                            <h5 className="modal-title">Add New Liquid Asset</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Asset Name</label><span style={{ color: "red" }}>*</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter asset name"
                                        value={newAsset.name}
                                        onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Amount</label><span style={{ color: "red" }}>*</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter amount"
                                        value={newAsset.amount}
                                        onChange={(e) => setNewAsset({ ...newAsset, amount: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        value={newAsset.status}
                                        onChange={(e) => setNewAsset({ ...newAsset, status: e.target.value })}
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Limited">Limited</option>
                                        <option value="Critical">Critical</option>
                                        <option value="Allocated">Allocated</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter asset description"
                                        value={newAsset.description}
                                        onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                                    ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={addLiquidAsset}
                                data-bs-dismiss="modal"
                            >
                                Add Asset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LiquidAssetPage;