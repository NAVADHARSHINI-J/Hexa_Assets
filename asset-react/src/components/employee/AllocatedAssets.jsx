import axios from "axios";
import "./css/AllocatedAssets.css";
import Sidebar from "./Sidebar.jsx";
import { useSelector } from "react-redux";
import { useState } from "react";
import DatePicker from "react-datepicker";

function AllocatedAssets() {
    const assetAllocations = useSelector(state => state.assetAllocation.assetAllocation);
    const liquidAssetAllocations = useSelector(state => state.liquidAssetAllocation.liquidAssetAllocation);
   // console.log("State check", useSelector(state => state));

    const [reason, setReason] = useState(null);
    const [requestDate, setRequestDate] = useState(null);
    const [file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState("allocated");

    const postServiceRequest = async ($event, asset) => {
        $event.preventDefault();
        let assetId = asset.asset.id;
        let body = {
            "requestDate": requestDate,
            "reason": reason
        };
        let token = localStorage.getItem('token');
        let headers = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        try {
            const response = await axios.post(`http://localhost:8081/api/servicerequest/add/${assetId}`, body, headers);
            console.log("post success");
            let requestId = response.data.id;
            const formData = new FormData();
            formData.append("file", file);
            await axios.post(`http://localhost:8081/api/servicerequest/image/upload/${requestId}`, formData, headers);
        } catch (error) {
            console.log("error in posting service request" + error);
        }
    };
    //console.log("Liquid Asset Allocations:", liquidAssetAllocations);

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <div className="col-md-10 p-4">
                    <div className="card">
                        <div className="card-header secondary-bg text-white">
                            <h5 className="mb-0">My Allocated Assets</h5>
                        </div>

                        {/* Tabs */}
                        <div className="d-flex gap-3 mt-3 ms-3">
                            <button
                                className={`btn ${activeTab === "allocated" ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => setActiveTab("allocated")}
                            >
                                Allocated Asset
                            </button>
                            <button
                                className={`btn ${activeTab === "liquid" ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => setActiveTab("liquid")}
                            >
                                Allocated Liquid Asset
                            </button>
                        </div>

                        <div className="card-body">
                            {activeTab === "allocated" && (
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Allocation ID</th>
                                                <th>Asset ID</th>
                                                <th>Asset Name</th>
                                                <th>Allocation Date</th>
                                                <th>Return Date</th>
                                                <th>Status</th>
                                                <th>Reason</th>
                                                <th>Service Request</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assetAllocations.map((asset, index) => (
                                                <tr key={index}>
                                                    <td>{asset.id}</td>
                                                    <td>{asset.asset.id}</td>
                                                    <td>{asset.asset.name}</td>
                                                    <td>{asset.allocationDate}</td>
                                                    <td>{asset.returnDate}</td>
                                                    <td>{asset.status}</td>
                                                    <td>{asset.reason}</td>
                                                    <td>
                                                        <a className="btn btn-danger btn-sm"
                                                            data-bs-toggle="modal" data-bs-target={`#service-${asset.id}`}>
                                                            Service Request
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Modal for each asset */}
                                    {assetAllocations.map((asset) => (
                                        <div className="modal fade" id={`service-${asset.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" key={asset.id}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header secondary-bg text-white">
                                                        <h5 className="modal-title">Service Request</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form onSubmit={($event) => postServiceRequest($event, asset)}>
                                                            <div className="mb-4">
                                                                <label>Enter Request Date: </label>
                                                                <DatePicker
                                                                    selected={requestDate}
                                                                    onChange={(date) => setRequestDate(date)}
                                                                    className="form-control"
                                                                    dateFormat="yyyy-MM-dd"
                                                                    placeholderText="Select a date"
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label>Reason for Service: </label>
                                                                <input type="text" placeholder="Reason for request" className="form-control"
                                                                    onChange={($event) => { setReason($event.target.value) }} />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label>Upload Image:</label>
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    accept="image/*"
                                                                    onChange={($event) => setFile($event.target.files[0])}
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <input type="submit"
                                                                    value="Submit Request"
                                                                    className="btn btn-primary"
                                                                    data-bs-dismiss="modal" />
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === "liquid" && (
                                <div className="table-responsive mt-3">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Allocation ID</th>
                                                <th>Liquid Asset ID</th>
                                                <th>Liquid Asset Name</th>
                                                <th>Allocation Date</th>
                                                <th>Allocated Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {liquidAssetAllocations.map((liquid, index) => (
                                                <tr key={index}>
                                                    <td>{liquid.id}</td>  
                                                    <td>{liquid.liquidAsset.id}</td>  
                                                    <td>{liquid.liquidAsset.name}</td>
                                                    <td>{liquid.allocatedDate}</td>
                                                    <td>{liquid.allocatedAmount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllocatedAssets;
