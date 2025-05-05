import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import './LiquidAsset.css';
import Navbar from './Navbar';

function LiquidAssetDashboard() {
    const location = useLocation();

    const [totalAssets, setTotalAssets] = useState(0);
    const [availableBalance, setAvailableBalance] = useState(0);
    const [pendingWithdrawals, setPendingWithdrawals] = useState(0);
    const [recentRequests, setRecentRequests] = useState([]);
    const [recentAssets, setRecentAssets] = useState([]);

    useEffect(() => {
        // Fetch statistics and data when the component is mounted
        fetchDashboardData();
    }, []);

    // Fetch statistics and recent data
    const fetchDashboardData = async () => {
        try {
            const response = await axios.get('/api/liquidasset/getall?page=0&size=100');
            const assetData = response.data.content; // important: .content

            const totalAssets = assetData.length;
            const availableAssets = assetData.filter(asset => asset.status === 'Available').length;
            const allocatedAssets = assetData.filter(asset => asset.status === 'Allocated').length;
            const criticalAssets = assetData.filter(asset => asset.status === 'Critical').length;

            const totalAmount = assetData.reduce((sum, asset) => sum + asset.amount, 0);

            setDashboardData({ totalAssets, availableAssets, allocatedAssets, criticalAssets, totalAmount });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <Navbar />
                {/* Main Content */}
                <div className="col-md-10 p-4">
                    <center><h1 className="mb-4">Liquid Assets Dashboard</h1></center>

                    {/* Quick Stats */}
                    <div className="quick-stats">
                        <div className="card stat-card bg-primary text-white">
                            <div className="card-body">
                                <h5>Total Liquid Assets</h5>
                                <h3>${totalAssets.toLocaleString()}</h3>
                            </div>
                        </div>
                        <div className="card stat-card bg-success text-white">
                            <div className="card-body">
                                <h5>Available Balance</h5>
                                <h3>${availableBalance.toLocaleString()}</h3>
                            </div>
                        </div>
                        <div className="card stat-card bg-warning text-white">
                            <div className="card-body">
                                <h5>Pending Withdrawals</h5>
                                <h3>${pendingWithdrawals.toLocaleString()}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Asset Requests and Liquid Assets Sections */}
                    <div className="row">
                        {/* Asset Requests Section */}
                        <div className="col-md-6">
                            <div className="card dashboard-card">
                                <div className="card-header">
                                    <span>Recent Requests</span>
                                    <Link to="/dashassetreq" className="btn btn-sm btn-light">View All</Link>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        {recentRequests.map(request => (
                                            <li className="list-group-item d-flex justify-content-between align-items-center" key={request.id}>
                                                {request.name}
                                                <span className={`badge ${request.status === 'Pending' ? 'bg-warning' : 'bg-success'}`}>
                                                    {request.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Liquid Assets Section */}
                        <div className="col-md-6">
                            <div className="card dashboard-card">
                                <div className="card-header">
                                    <span>Liquid Assets</span>
                                    <Link to="/dashassetpage" className="btn btn-sm btn-light">View All</Link>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        {recentAssets.map(asset => (
                                            <li className="list-group-item d-flex justify-content-between align-items-center" key={asset.id}>
                                                {asset.name}
                                                <span className={`badge ${asset.status === 'Available' ? 'bg-success' : 'bg-warning'}`}>
                                                    ${asset.amount.toLocaleString()}
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
