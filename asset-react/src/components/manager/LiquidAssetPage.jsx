import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import './LiquidAsset.css';
import Navbar from './Navbar';

function LiquidAssetPage() {
  const location = useLocation();

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: '',
    remainingAmount: '',
    totalAmount: '',
    status: 'Available',
    description: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const token=localStorage.getItem('token');
      let headers = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
      const response = await axios.get(`http://localhost:8081/api/liquidasset/getall?page=0&size=10`, headers);
      setAssets(response.data.content || response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAsset = async () => {
    try {
      const token=localStorage.getItem('token');
      let headers = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
      await axios.post(`http://localhost:8081/api/liquidasset/add`, newAsset,headers);
      fetchAssets();
      resetForm();
    } catch (error) {
      console.error('Error adding asset:', error);
    }
  };

  const handleUpdateAsset = async () => {
    const token=localStorage.getItem('token');
    let headers = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    try {
      await axios.put(`http://localhost:8081/api/liquidasset/update/${newAsset.id}`, newAsset,headers)
      fetchAssets();
      resetForm();
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating asset:', error);
    }
  };

  const handleEditClick = (asset) => {
    setNewAsset(asset);
    setIsEditMode(true);
  };

  const handleDeleteAsset = async (assetId) => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;
    const token=localStorage.getItem('token');
    let headers = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    try {
      await axios.delete(`http://localhost:8081/api/liquidasset/delete/${assetId}`,headers);
      fetchAssets();
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const resetForm = () => {
    setNewAsset({
      name: '',
      remainingAmount: '',
      totalAmount: '',
      status: 'Available',
      description: '',
    });
    setIsEditMode(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-md-10 p-4">
          <div className="card liquid mt-4">
            <div className="card-header liquid-header d-flex justify-content-between align-items-center">
              <span>Liquid Assets</span>
              <button
                className="btn btn-sm btn-light"
                data-bs-toggle="modal"
                data-bs-target="#addAssetModal"
                onClick={resetForm}
              >
                Add New Liquid Asset
              </button>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status"></div>
                </div>
              ) : assets.length > 0 ? (
                <div className="row">
                  {assets.map((asset) => (
                    <div className="col-md-4 mb-4" key={asset.id}>
                      <div className="card h-100 shadow border-start border-4" style={{
                        borderLeftColor: asset.status === 'CRITICAL' ? '#dc3545' :
                          asset.status === 'LIMITED' ? '#fd7e14' :
                            asset.status === 'ALLOCATED' ? '#0d6efd' :
                              asset.status === 'PENDING' ? '#6c757d' : '#198754'
                      }}>
                        <div className="card-body">
                          <h5 className="card-title fw-bold text-primary mb-2">{asset.name}</h5>
                          <p className="card-text mb-1"><strong>Total:</strong> {asset.totalAmount}</p>
                          <p className="card-text mb-1"><strong>Remaining:</strong> {asset.remainingAmount}</p>
                          <p className="card-text mb-1">
                            <strong>Status:</strong>{' '}
                            <span className={`badge ${asset.status === 'CRITICAL' ? 'bg-danger' :
                              asset.status === 'LIMITED' ? 'bg-warning text-dark' :
                                asset.status === 'ALLOCATED' ? 'bg-primary' :
                                  asset.status === 'PENDING' ? 'bg-secondary' : 'bg-success'
                              }`}>
                              {asset.status}
                            </span>
                          </p>
                          <p className="card-text text-muted mt-2" style={{ minHeight: '40px' }}>{asset.description}</p>
                          <div className="d-flex justify-content-between mt-3">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleEditClick(asset)}
                              data-bs-toggle="modal"
                              data-bs-target="#addAssetModal"
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDeleteAsset(asset.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">No assets found.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Asset */}
      <div
        className="modal fade"
        id="addAssetModal"
        tabIndex="-1"
        aria-labelledby="addAssetModalLabel"
      >
        <div className="modal-dialog" style={{ margin: '0', maxWidth: '400px', position: 'absolute', left: 0 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addAssetModalLabel">
                {isEditMode ? 'Edit Liquid Asset' : 'Add New Liquid Asset'}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetForm}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Asset Name"
                  name="name"
                  value={newAsset.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Remaining Amount"
                  name="remainingAmount"
                  value={newAsset.remainingAmount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Total Amount"
                  name="totalAmount"
                  value={newAsset.totalAmount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select"
                  name="status"
                  value={newAsset.status}
                  onChange={handleInputChange}
                >
                  <option>AVAILABLE</option>
                  <option>LIMITED</option>
                  <option>CRITICAL</option>
                  <option>ALLOCATED</option>
                  <option>PENDING</option>
                </select>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={newAsset.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              {isEditMode ? (
                <>
                  <button className="btn btn-primary" onClick={handleUpdateAsset} data-bs-dismiss="modal">
                    Update Asset
                  </button>
                  <button className="btn btn-secondary" onClick={resetForm} data-bs-dismiss="modal">
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-success" onClick={handleAddAsset} data-bs-dismiss="modal">
                  Add Asset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiquidAssetPage;
