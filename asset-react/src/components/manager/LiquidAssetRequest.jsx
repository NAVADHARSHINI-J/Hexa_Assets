import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import './LiquidAsset.css';
import Navbar from './Navbar';

function LiquidAssetRequest() {
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);

  // 1. Fetch all liquid asset requests
  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/liquidassetreq/getall', {
        params: {
          page: 0,
          size: 10
        }
      });
      setRequests(response.data);
      setFilteredRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  // 2. Search functionality
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = requests.filter((req) =>
      (req.employee?.employeeName?.toLowerCase() || '').includes(value.toLowerCase()) ||
      (req.liquidAsset?.assetType?.toLowerCase() || '').includes(value.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  // 3. Approve request
  const approveRequest = async (requestId) => {
    try {
      await axios.post(`http://localhost:8081/api/liquidassetreq/approve/${requestId}`);
      fetchRequests();
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  // 4. Reject request
  const rejectRequest = async (requestId) => {
    try {
      await axios.post(`http://localhost:8081/api/liquidassetreq/reject/${requestId}`);
      fetchRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  // 5. Delete request
  const deleteRequest = async (liquidAssetId) => {
    try {
      await axios.delete(`http://localhost:8081/api/liquidassetreq/delete/by-liquid-asset/${liquidAssetId}`);
      fetchRequests();
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <Navbar />
        {/* Main Content */}
        <div className="col-md-10 p-4">
          <div className="card">
            <div className="card-header liquid-header d-flex justify-content-between align-items-center">
              <span>Liquid Asset Requests</span>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search..."
                style={{ maxWidth: "300px" }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Reason</th>
                      <th>Request Date</th>
                      <th>Requested Amount</th>
                      <th>Status</th>
                      <th>Employee Id</th>
                      <th>Liquid Asset Id</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((req) => (
                        <tr key={req.id}>
                          <td>{req.id}</td>
                          <td>{req.reason}</td>
                          <td>{req.requestDate}</td>
                          <td>{req.requestedAmount}</td>
                          <td>
                            <span className={`badge ${req.status === 'Approved' ? 'bg-success' : req.status === 'Rejected' ? 'bg-danger' : 'bg-warning'}`}>
                              {req.status}
                            </span>
                          </td>
                          <td>{req.employee?.id}</td>
                          <td>{req.liquidAsset?.id}</td>
                          <td>
                            {req.status === 'Pending' && (
                              <>
                                <button onClick={() => approveRequest(req.id)} className="btn btn-sm btn-success me-1">Approve</button>
                                <button onClick={() => rejectRequest(req.id)} className="btn btn-sm btn-danger me-1">Reject</button>
                              </>
                            )}
                            <button onClick={() => deleteRequest(req.id)} className="btn btn-sm btn-danger">
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">No requests found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiquidAssetRequest;
