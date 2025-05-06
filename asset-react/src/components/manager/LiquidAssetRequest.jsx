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

  // Fetch all liquid asset requests
  const fetchRequests = async () => {
    try {
      const token=localStorage.getItem('token');
        let headers = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      const response = await axios.get(`http://localhost:8081/api/liquidassetreq/getall?page=0&size=10`, headers);
      console.log('Fetched Requests:', response.data);
      setRequests(response.data.content || []);
      setFilteredRequests(response.data.content || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  // Search functionality
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = requests.filter((req) =>
      req.employee?.id?.toString().includes(value) ||
      req.liquidAsset?.id?.toString().includes(value)
    );
    setFilteredRequests(filtered);
  };

  const approveRequest = async (requestId) => {
    try {
      const token=localStorage.getItem('token');
        let headers = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      await axios.post(`http://localhost:8081/api/liquidassetreq/approve/${requestId}`,headers,);
      fetchRequests();
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      const token=localStorage.getItem('token');
        let headers = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      await axios.post(`http://localhost:8081/api/liquidassetreq/reject/${requestId}`,headers,);
      fetchRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const deleteRequest = async (requestId) => {
    try {
      const token=localStorage.getItem('token');
        let headers = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      await axios.delete(`http://localhost:8081/api/liquidassetreq/delete/${requestId}`,headers,);
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
        <Navbar />
        <div className="col-md-10 p-4">
          <div className="card">
            <div className="card-header liquid-header d-flex justify-content-between align-items-center">
              <span>Liquid Asset Requests</span>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search by Employee or Asset ID..."
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
                            <div className="d-flex flex-wrap gap-1">
                            {(req.status.toLowerCase() === 'pending') && (
                                <>
                                  <button onClick={() => approveRequest(req.id)} className="btn btn-sm btn-success">Approve</button>
                                  <button onClick={() => rejectRequest(req.id)} className="btn btn-sm btn-danger">Reject</button>
                                </>
                              )}
                              <button onClick={() => deleteRequest(req.id)} className="btn btn-sm btn-danger">
                                <i className="bi bi-trash"></i> Delete
                              </button>
                            </div>
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
