import { useEffect, useState } from "react";
import "./css/LiquidAsset.css"
import Sidebar from './Sidebar'
import axios from "axios";
import { Link } from "react-router";
function LiquidAsset() {

    const[liquidAssets, setLiquidAssets] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [pageArray, setPageArray] = useState([]);
    const [totalpage, setTotalpage] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState(null);

    useEffect(()=>{

        let response;
        let token = localStorage.getItem('token')
        let headers = {headers : {"Authorization" :`Bearer ${token}`}}
        const getLiquidAssets=async()=>{

         if(selectedStatus) {

            response =  await axios.get(`http://localhost:8081/api/liquidasset/bystatus/${selectedStatus}?page=${page}&size=${size}`, headers)
         }
         else{
            response =  await axios.get(`http://localhost:8081/api/liquidasset/getall?page=${page}&size=${size}`, headers)
         }
           
                //at the backend we are returning as a dto which as this list
                //so my response is typically a dto class 
                //inside the dto i have my list
                setLiquidAssets(response.data.list);
                setTotalpage(response.data.totalPages);

                let tp = response.data.totalPages;
                let temp = [];
                while (tp > 0) {
                    temp.push(1);
                    tp = tp - 1;
                }
                setPageArray(temp);
            }

        getLiquidAssets();
    }, [page, selectedStatus])
    return (
        <div>

            <div className="container-fluid">
                <div className="row">
                    {/* <!-- Sidebar --> */}
                    < Sidebar />
                    {/* <!-- Main Content --> */}
                    <div className="col-md-10 p-4">
                        <div className="card">
                        <div className="card-header secondary-bg text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-2 mb-md-0">Liquid Assets</h5>

                            <select
                                className="form-select form-select-sm ms-auto"
                                style={{ minWidth: '140px', maxWidth: '180px' }}
                                value={selectedStatus}
                                onChange={($event) => {
                                    setSelectedStatus($event.target.value);
                                    setPage(0);
                                }}
                            >
                                <option value="">Search by Status</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Reserved">Reserved</option>
                                 
                            </select>
                        </div>

                            <div className="card-body">
                            <div className="asset-grid row gap-3">
                                {liquidAssets.map((l, index) => (
                                    <div className="card col-lg-12 shadow rounded" key={index} style={{ minWidth: '200px' }}>
                                        <div className="card-body"> 
                                            <div className="text-center mb-2">
                                                <h5>{l.name}</h5>  
                                                <hr />
                                                <div className="text-start"> 
                                                <p><strong>Total Amount:</strong> {l.totalAmount}</p> 
                                                <p><strong>Status:</strong> {l.status}</p>  
                                                </div>
                                            </div> 
                                            <div className="text-center mt-3">
                                                <Link to={`/employee/viewassetdetails/${l.id}`}>
                                                    <button className="btn btn-outline-primary btn-sm">View Details</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            </div>
                            <div className="card-footer">
                            <div className="row">
                                <div className="col-sm-4"></div>
                                <div className="col-sm-6">
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination">
                                            {
                                                page === 0 ? <li className="page-item disabled">
                                                    <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Prev</a>
                                                </li> : <li className="page-item">
                                                    <a className="page-link" href="#" onClick={() => { setPage(page - 1) }}>Prev</a>
                                                </li>
                                            }
                                            {pageArray.map((e, index) => (
                                                <li key={index}
                                                    className={`page-item ${page === index ? "active" : ""}`}>
                                                    <a className="page-link" href="#"
                                                        onClick={() => { setPage(index) }}>{index + 1}</a></li>
                                            ))}
                                            {
                                                page === totalpage - 1 ? <li className="page-item disabled">
                                                    <a className="page-link" href="#" aria-disabled="true">Next</a>
                                                </li> : <li className="page-item">
                                                    <a className="page-link" href="#" onClick={() => { setPage(page + 1) }}>Next</a>
                                                </li>
                                            }
                                        </ul>
                                    </nav>
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

export default LiquidAsset;