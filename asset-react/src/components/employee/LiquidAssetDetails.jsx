import { useEffect, useState } from "react";
import "./css/LiquidAssetDetails.css"
import Sidebar from './Sidebar'
import { useParams } from "react-router";
import axios from "axios";
import DatePicker from "react-datepicker";
function LiquidAssetDetails() {

    const { liquidAssetId } = useParams('liquidAssetId')
    console.log(useParams('liquidAssetId'))
    console.log(liquidAssetId);
    const [liquidAssetDetails, setLiquidAssetDetails] = useState([]);
    const [requestDate, setRequestDate] = useState(null);
    const [requestedAmount, setRequestedAmount] = useState(null);
    const [reason, setReason] = useState(null);

    useEffect(() => {

        let token = localStorage.getItem('token')
        let headers= {headers: {
            "Authorization": `Bearer ${token}`
        }}
        const getLiquidAssetsById = async () => {

            await axios.get(`http://localhost:8081/api/liquidasset/get/${liquidAssetId}`, headers)
                .then(response => {
                    console.log(response.data)
                    setLiquidAssetDetails(response.data)
                })
        }

        getLiquidAssetsById();
    }, [])

    const postLiquidAssetRequest = async ($event, liquidAssetDetails) => {
        $event.preventDefault();
        let liquidAssetId = liquidAssetDetails.id;
        let employeeId = localStorage.getItem('employeeId');
        let body = {

            "requestDate": requestDate,
            "requestedAmount": requestedAmount,
            "reason": reason

        } 
        let token = localStorage.getItem('token')
        let headers= {headers: {
            "Authorization": `Bearer ${token}`
        }}
        await axios.post(`http://localhost:8081/api/liquidassetreq/add/${employeeId}/${liquidAssetId}`, body, headers)
        console.log("post success!");
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    {/* <!-- Sidebar --> */}
                    <Sidebar />
                    {/* <!-- Main Content --> */}
                    <div className="col-md-10 p-4">
                        <div className="card">
                            <div className="card-header secondary-bg text-white">
                                Liquid Asset Details
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <a className="btn btn-success btn-sm " data-bs-toggle="modal" data-bs-target={`#request-${liquidAssetDetails.id}`}>
                                            Request Asset
                                        </a>
                                    </div>
                                    <div className="row mb-3">

                                    </div>
                                </div>
                                {/** Modal Box*/}
                                <div class="modal fade " id={`request-${liquidAssetDetails.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header secondary-bg text-white">
                                                <h5 className="modal-title" id="exampleModalLabel">Liquid Asset Request</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={($event) => postLiquidAssetRequest($event, liquidAssetDetails)}>

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
                                                        <label>Requested Amount: </label>
                                                        <input type="number" placeholder="Requested Amount" className="form-control"
                                                            onChange={($event) => { setRequestedAmount($event.target.value) }} ></input>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label>Reason for request: </label>
                                                        <input type="text-area" placeholder="Reason for request" className="form-control"
                                                            onChange={($event) => { setReason($event.target.value) }} ></input>
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
                                <div className="col-md-6">
                                    <h3 >{liquidAssetDetails.name}</h3>
                                    <hr />
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <strong>Liquid Asset ID:</strong> {liquidAssetDetails.id}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <strong>Liquid Asset Name:</strong> {liquidAssetDetails.name}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <strong>Total Amount:</strong> {liquidAssetDetails.totalAmount}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <strong>Remaining Amount:</strong> {liquidAssetDetails.remainingAmount}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <strong>Description:</strong> {liquidAssetDetails.description}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <strong>Status:</strong> {liquidAssetDetails.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default LiquidAssetDetails;