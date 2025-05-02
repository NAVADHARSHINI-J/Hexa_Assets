import axios from "axios";
import './css/HomeAsset.css';
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';

import { useEffect, useState } from "react";
function HomeAsset() {

    const [assets, setAssets] = useState([]);
   // const [page, setPage] = useState(0);
   // const [size, setSize] = useState(6); 
    useEffect(() => {

        const getAllAssets = async () => {

            try {
                const response = await axios.get(`http://localhost:8081/api/asset/getall?page=0&size=6`)
                console.log(response.data)
                setAssets(response.data.list)
            } catch (error) {

            }
        }
        getAllAssets();
    }, [])

    
    return (
        <div className="container-fluid">
            <div className="row">
                {/*<!-- Sidebar -->*/}
                <Sidebar />
                {/* <!-- Main Content -->*/}

                <div className="col-md-10 p-4">
                    <div className="card">
                        <div className="card-header  text-white">
                            Company Assets
                        </div>
                        <div className="card-body">
                            <div className="asset-grid row gap-3">
                                {assets.map((a, index) => (
                                    <div className="card col-lg-12  shadow rounded" key={index} style={{ minWidth: '200px' }}>
                                        <div className="card-body"> 
                                            <div className="text-center mb-2">
                                                <h5>{a.name}</h5>  
                                                <hr />
                                                <div className="text-start">
                                                <p><strong>Model:</strong> {a.model}</p> 
                                                <p><strong>Quantity:</strong> {a.quantity}</p> 
                                                <p><strong>Status:</strong> {a.status}</p>  
                                                </div>
                                            </div> 
                                            <div className="text-center mt-3">
                                                <Link to={`/employee/viewdetails/${a.id}`}>
                                                    <button className="btn btn-outline-primary btn-sm">View Details</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-6">
                       {/*
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#"
                                    onClick={() => { page === 0 ? setPage(0) : setPage(page - 1) }}>Previous</a></li>


                                <li className="page-item"><a className="page-link" href="#"
                                    onClick={() => { page === totalPages - 1 ? setPage(page) : setPage(page + 1) }} >Next</a></li>
                            </ul>
                        </nav>
                       */}
                    </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomeAsset