import { useEffect, useState } from "react";
import "./css/LiquidAsset.css"
import Sidebar from './Sidebar'
import axios from "axios";
import { Link } from "react-router";
function LiquidAsset() {

    const[liquidAssets, setLiquidAssets] = useState([]);

    useEffect(()=>{

        const getLiquidAssets=async()=>{

            await axios.get('http://localhost:8081/api/liquidasset/getall?page=0&size=6')
            .then(response=>{
                console.log(response.data)
                setLiquidAssets(response.data)
            })

        }

        getLiquidAssets();
    }, [])
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
                                Liquid Assets
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
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default LiquidAsset;