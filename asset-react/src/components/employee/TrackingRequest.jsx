import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./css/TrackingRequest.css";
import axios from "axios";

function TrackingRequest() {
    const [activeTab, setActiveTab] = useState("asset");
    const [assetTracking, setAssetTracking] = useState([]);
    const [serviceTracking, setServiceTracking] = useState([]);

    useEffect(() => {

        let empId = localStorage.getItem('employeeId')
        let token = localStorage.getItem('token')
        let headers = {headers : {"Authorization" : `Bearer ${token}`}}
        if (activeTab === "asset") {
            const getAssetTracking = async () => {

                try {
                    await axios.get(`http://localhost:8081/api/assetrequest/getbyempid/${empId}`, headers)
                        .then(response => {
                            console.log("asset tracking response "+ response.data);
                            setAssetTracking(response.data);
                        })
                }
                catch (error) {
                    console.log("Error in asset tracking " + error);
                }

            }
            getAssetTracking();
        }
        else if(activeTab==="service"){
            const getServiceTracking=async()=>{
                try {
                    await axios.get(`http://localhost:8081/api/servicerequest/byEmployeeId?empId=${empId}`, headers)
                .then(response=>{
                    console.log("service tracking response "+ response.data);
                    setServiceTracking(response.data);
                 
                })}catch (error) {
                   console.log("error in service tracking "+ error); 
                }
            }
            getServiceTracking();
        }

    }, [activeTab])


    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <Sidebar />
                <div className="col-md-10 p-4">
                    <div className="card">
                        <div className="card-header secondary-bg text-white">
                            <h5 className="mb-0">Tracking Asset Requests</h5>
                        </div>

                        {/* Tab Buttons */}
                        <div className="d-flex mt-3 ms-3 gap-3" role="group" aria-label="Request Type Tabs">
                            <button
                                type="button"
                                className={`btn ${activeTab === "asset" ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => setActiveTab("asset")}
                            >
                                Asset Request
                            </button>
                            <button
                                type="button"
                                className={`btn ${activeTab === "service" ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => setActiveTab("service")}
                            >
                                Service Request
                            </button>
                        </div>


                        {/* Tracking Section */}
                        <div className="card-body">
                            {activeTab === "asset" && (
                                <div>
                                    <h5>Asset Request Tracking</h5> 
                                    <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Request ID</th>
                                                <th>Asset ID</th>
                                                <th>Asset Name</th> 
                                                <th>Request Date</th> 
                                                <th>Status</th>
                                                <th>Reason</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assetTracking.map((asset, index) => (
                                                <tr key={index}>
                                                    <td>{asset.id}</td>
                                                    <td>{asset.asset.id}</td>
                                                    <td>{asset.asset.name}</td>
                                                    <td>{asset.requestDate}</td> 
                                                    <td>{asset.status}</td>
                                                    <td>{asset.reason}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === "service" && (
                                <div>
                                    <h5>Service Request Tracking </h5> 
                                    <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Request ID</th>
                                                <th>Asset ID</th>
                                                <th>Asset Name</th> 
                                                <th>Request Date</th> 
                                                <th>Status</th>
                                                <th>Reason</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {serviceTracking.map((service, index) => (
                                                <tr key={index}>
                                                    <td>{service.id}</td>
                                                    <td>{service.asset.id}</td>
                                                    <td>{service.asset.name}</td>
                                                    <td>{service.requestDate}</td> 
                                                    <td>{service.status}</td>
                                                    <td>{service.reason}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrackingRequest;
