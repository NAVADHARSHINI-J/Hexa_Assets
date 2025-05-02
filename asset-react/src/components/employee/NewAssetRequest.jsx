import { useParams } from "react-router";
import "./css/NewAssetRequest.css";
import Sidebar from './Sidebar';
import axios from "axios";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Messages } from 'primereact/messages';

function NewAssetRequest() {
    const [requestDate, setRequestDate] = useState(null);
    const [reason, setReason] = useState("");
    const { assetId } = useParams();
    const [manualAssetId, setManualAssetId] = useState("");
    const msgs = useRef(null);

    const postRequest = async ($event) => {
        $event.preventDefault();
        const formattedDate = requestDate?.toLocaleDateString('en-CA');

        let obj = {
            'requestDate': formattedDate,
            'reason': reason
        };


        console.log("Request Payload:", obj);

        try {
            const response = await axios.post(`http://localhost:8081/api/assetrequest/add/${assetId || manualAssetId}`, obj);
            console.log(response);
            console.log("Asset request posted!")

            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'success', summary: 'Success', detail: 'Your request has been submitted successfully.' }

            ]);
        } catch (error) {
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <Sidebar />
                <div className="col-md-10 p-4">
                    <div className="card">
                        <div className="card-header secondary-bg text-white">
                            New Asset Request
                        </div>
                        <div className="card-body">
                           <div className="d-flex justify-content-center">
                           <Messages ref={msgs} />
                           </div>
                            <form onSubmit={($event) => { postRequest($event) }}>
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
                                    <label>Enter Reason for Request: </label>
                                    <textarea
                                        onChange={($event) => setReason($event.target.value)}
                                        value={reason}
                                        className="form-control"
                                        rows="5"
                                    />
                                </div>
                                {/* Conditionally render Asset ID input field */}
                                {!assetId && (
                                    <div className="mb-4">
                                        <label>Enter Asset ID: </label>
                                        <input
                                            type="text"
                                            value={manualAssetId}
                                            onChange={($event) => setManualAssetId($event.target.value)}
                                            className="form-control"
                                            placeholder="Enter Asset ID"
                                        />
                                    </div>
                                )}
                                <div className="mb-4">
                                    <input
                                        type="submit"
                                        value="Post Request"
                                        className="btn btn-primary"
                                    />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewAssetRequest;
