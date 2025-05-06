import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import Navbar from './Navbar';

function LiquidAssetUnallocated() {
  const location = useLocation();
  const [allocations, setAllocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAllocations, setFilteredAllocations] = useState([]);

  // 1. Fetch liquid asset allocations from API
  useEffect(() => {
    const fetchAllocations = async () => {
      try {
        const token=localStorage.getItem('token');
        let headers = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        let status = "Pending"
        const response = await axios.get(`http://localhost:8081/api/liquidasset/bystatus/${status}`, headers)
        console.log(response.data)
        setAllocations(response.data);
        setFilteredAllocations(response.data);
      } catch (error) {
        console.error('Error fetching allocations:', error);
      }
    };

    fetchAllocations();
  }, []);

  // 2. Handle search filter
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    const filtered = allocations.filter((alloc) =>
      (alloc.id?.toString() || '').includes(value)
    );
    setFilteredAllocations(filtered);
  };
  
  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        {/* Main Content */}
        <div className="col-md-10 p-4">
          <div className="card">
            <div className="card-header liquid-header d-flex justify-content-between align-items-center">
              <span>Unallocated Liquid Assets</span>
              <div style={{ maxWidth: '300px' }}>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Total Amount</th>
                    <th>Remaining Amount</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAllocations.length > 0 ? (
                    filteredAllocations.map((alloc, index) => (
                      <tr key={index}>
                        <td>{alloc.id}</td>
                        <td>{alloc.name}</td>
                        <td>{alloc.totalAmount}</td>
                        <td>{alloc.remainingAmount}</td>
                        <td>{alloc.description}</td>
                        <td>
                          {alloc.status === 'Low Allocation' ? (
                            <span className="badge bg-danger">{alloc.status}</span>
                          ) : (
                            <span className="badge bg-warning">{alloc.status}</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No assets found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LiquidAssetUnallocated;
