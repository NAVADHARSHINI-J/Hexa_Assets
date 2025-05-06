import axios from "axios";
import './css/HomeAsset.css';
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';

import { useEffect, useState } from "react";
function HomeAsset() {

    const [assets, setAssets] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [pageArray, setPageArray] = useState([]);
    const [totalpage, setTotalpage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token');
        let headers = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
    
        const getCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/category/getall', headers);
                setCategory(response.data);
            } catch (error) {
                console.log("error in category get all " + error);
            }
        };
    
        const getAssets = async () => {
            try {
                let response;
                console.log("selected category " +selectedCategory);
                
                if (selectedCategory) {
                    response = await axios.get(`http://localhost:8081/api/asset/getbycategory?page=${page}&size=${size}&category=${selectedCategory}`, headers);
                } else {
                    response = await axios.get(`http://localhost:8081/api/asset/getall?page=${page}&size=${size}`, headers);
                }
    
                setAssets(response.data.list);
                setTotalpage(response.data.totalPages);
    
                let tp = response.data.totalPages;
                let temp = [];
                while (tp > 0) {
                    temp.push(1);
                    tp = tp - 1;
                }
                setPageArray(temp);
            } catch (error) {
                console.log("Error fetching assets: ", error);
            }
        };
    
        getCategories();
        getAssets();
    }, [page, selectedCategory]);
    



    
    return (
        <div className="container-fluid">
            <div className="row">
                {/*<!-- Sidebar -->*/}
                <Sidebar />
                {/* <!-- Main Content -->*/}

                <div className="col-md-10 p-4">
                    <div className="card">
                        <div className="card-header secondary-bg text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-2 mb-md-0">Company Assets</h5>

                            <select
                                className="form-select form-select-sm ms-auto"
                                style={{ minWidth: '140px', maxWidth: '180px' }}
                                value={selectedCategory}
                                onChange={($event) => {
                                    setSelectedCategory($event.target.value);
                                    setPage(0);
                                }}
                            >
                                <option value="">Search by Category</option>
                                {category.map((cat, index) => (
                                    <option key={index} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
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

    )
}

export default HomeAsset