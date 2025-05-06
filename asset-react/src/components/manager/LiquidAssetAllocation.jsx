import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import './LiquidAsset.css';
import Navbar from './Navbar';

function LiquidAssetAllocation() {
  const location = useLocation();
  const [allocations, setAllocations] = useState([]);
  const [filteredAllocations, setFilteredAllocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Fetch all liquid asset allocations
  const fetchAllocations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8081/api/liquidassetallocation/getall', {
        params: {
          page: 0,
          size: 10
        }
      });
      setAllocations(response.data.content || response.data);
      setFilteredAllocations(response.data.content || response.data);
    } catch (error) {
      console.error('Error fetching allocations:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Search allocations by Employee Name or Asset Type
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = allocations.filter((alloc) =>
      (alloc.employee?.employeeName?.toLowerCase() || '').includes(value.toLowerCase()) ||
      (alloc.liquidAsset?.assetType?.toLowerCase() || '').includes(value.toLowerCase())
    );
    setFilteredAllocations(filtered);
  };

  // 3. Delete allocation by Liquid Asset ID
  const deleteAllocationByLiquidAsset = async (allocationId) => {
    try {
      await axios.delete(`http://localhost:8081/api/liquidassetallocation/delete/by-liquid-asset/${allocationId}`);
      fetchAllocations(); // Refresh the list after delete
    } catch (error) {
      console.error('Error deleting allocation:', error);
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        {/* Main Content */}
        <div className="col-md-10 p-4">
          <div className="card">
            <div className="card-header liquid-header d-flex justify-content-between align-items-center">
              <span>Liquid Asset Allocations</span>
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
                      <th>Allocated Amount</th>
                      <th>Allocated Date</th>
                      <th>Employee Id</th>
                      <th>Liquid Asset Id</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAllocations.length > 0 ? (
                      filteredAllocations.map((alloc) => (
                        <tr key={alloc.id}>
                          <td>{alloc.id}</td>
                          <td>{alloc.allocatedAmount}</td>
                          <td>{alloc.allocatedDate}</td>
                          <td>{alloc.employee?.id}</td>
                          <td>{alloc.liquidAsset?.id}</td>
                          <td>
                            <button
                              onClick={() => deleteAllocationByLiquidAsset(alloc.liquidAsset?.id)}
                              className="btn btn-sm btn-danger me-1"
                            >
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">No allocations found.</td>
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

export default LiquidAssetAllocation;
