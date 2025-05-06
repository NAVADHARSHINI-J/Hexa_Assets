import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import './LiquidAsset.css';
import Navbar from './Navbar';

function LiquidAssetDashboard() {
    const location = useLocation();

    const [totalAssets, setTotalAssets] = useState(0);
    const [availableBalance, setAvailableBalance] = useState(0);
    const [pendingRequestCount, setPendingRequestCount] = useState(0);
    const [recentRequests, setRecentRequests] = useState([]);
    const [recentAssets, setRecentAssets] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token=localStorage.getItem('token');
            let headers = {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
            // Fetch all assets
            const assetResponse = await axios.get(`http://localhost:8081/api/liquidasset/getall?page=0&size=10`,headers);
            const assetData = assetResponse.data.content || [];
            const totalAssetsCount = assetResponse.data.totalElements || 0;

            // Fetch all requests
            const requestResponse = await axios.get(`http://localhost:8081/api/liquidassetreq/getall?page=0&size=10`,headers);
            const requestData = requestResponse.data.content || [];

            // Fetch total remaining amount
            const remainingAmountResponse = await axios.get(`http://localhost:8081/api/liquidasset/totalremainingamount`,headers);
            const totalRemainingAmount = remainingAmountResponse.data || 0;

            // Fetch pending request count
            let status = "Pending"
            const pendingCountResponse = await axios.get(`http://localhost:8081/api/liquidassetreq/countbystatus/${status}`,headers);
            const pendingCount = pendingCountResponse.data || 0;

            // Update state
            setTotalAssets(totalAssetsCount);
            setAvailableBalance(totalRemainingAmount); // Set the total remaining amount
            setPendingRequestCount(pendingCount); // Set the pending request count
            setRecentAssets(assetData.slice(0, 2));
            setRecentRequests(requestData.slice(0, 2));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Navbar />
                <div className="col-md-10 p-4">
                    <center><h1 className="mb-4">Liquid Assets Dashboard</h1></center>

                    {/* Quick Stats */}
                    <div className="quick-stats">
                        <div className="card stat-card bg-primary text-white">
                            <div className="card-body">
                                <h5>Total Liquid Assets</h5>
                                <h3>{totalAssets.toLocaleString()}</h3>
                            </div>
                        </div>
                        <div className="card stat-card bg-success text-white">
                            <div className="card-body">
                                <h5>Available Balance</h5>
                                <h3>₹ {availableBalance.toLocaleString()}</h3> {/* Display the available balance */}
                            </div>
                        </div>
                        <div className="card stat-card bg-warning text-white">
                            <div className="card-body">
                                <h5>Pending Requests</h5>
                                <h3>{pendingRequestCount}</h3> {/* Display the count of pending requests */}
                            </div>
                        </div>
                    </div>

                    {/* Asset Requests and Liquid Assets Sections */}
                    <div className="row">
                        {/* Recent Requests */}
                        <div className="col-md-6">
                            <div className="card dashboard-card">
                                <div className="card-header liquid-header d-flex justify-content-between">
                                    <span>Recent Requests</span>
                                    <Link to="/dashassetreq" className="btn btn-sm btn-light">View All</Link>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        {recentRequests.map(request => (
                                            <li className="list-group-item d-flex justify-content-between align-items-center" key={request.id}>
                                                {request.reason || 'Unnamed Request'}
                                                <span className={`badge ${request.status === 'Pending' ? 'bg-warning' : 'bg-success'}`}>
                                                    {request.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Recent Liquid Assets */}
                        <div className="col-md-6">
                            <div className="card dashboard-card">
                                <div className="card-header liquid-header d-flex justify-content-between">
                                    <span>Liquid Assets</span>
                                    <Link to="/dashassetpage" className="btn btn-sm btn-light">View All</Link>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        {recentAssets.map(asset => (
                                            <li className="list-group-item d-flex justify-content-between align-items-center" key={asset.id}>
                                                {asset.name || 'Unnamed Asset'}
                                                <span className={`badge ${asset.status === 'Available' ? 'bg-success' : 'bg-warning'}`}>
                                                    ${asset.remainingAmount?.toLocaleString() || 0}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LiquidAssetDashboard;
