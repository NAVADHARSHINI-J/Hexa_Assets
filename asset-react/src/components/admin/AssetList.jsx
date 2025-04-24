import { useState, useEffect } from 'react';
import './css/AssetList.css'
import axios from 'axios';
import Sidebar from './Sidebar';

function AssetList() {
    const [assets, setAssets] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);
    const [totalpage, setTotalpage] = useState(0);
    const [pageArray, setPageArray] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState({})
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [disable, setDisable] = useState(true);
    const [employee, setEmployee] = useState({});
    const [employeeId, setEmployeeId] = useState();
    const [allocationDate, setAllocationDate] = useState();
    // const [assetObj,setAssetObj] = useState()
    //to get all the records
    const getAsset = async () => {
        //call the api
        const response = await axios
            .get(`http://localhost:8081/api/asset/getall?page=${page}&size=${size}`);
        setAssets(response.data.list);
        setTotalpage(response.data.totalPages);
        setPageArray([]);
        let tp = response.data.totalPages;
        setPageArray([]);
        let temp = [];
        while (tp > 0) {
            temp.push(1);
            tp = tp - 1;
        }
        setPageArray(temp);
    }
    //to get all the category
    const getCategory = async () => {
        //call the api
        try {
            const response = await axios.get("http://localhost:8081/api/category/getall");
            setCategory(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getAsset();
        getCategory();

    }, [page])

    //function to update the object
    const updateAsset = async (asset) => {
        //call the api to update
        const response = await axios.put(`http://localhost:8081/api/asset/update-asset/${asset.id}`, asset)
        //delete the existing in asset
        let temp = [...assets]
        temp = temp.filter(a => a.id !== asset.id);
        //update the new record
        temp.push(asset);
        setAssets(temp);
    }

    //function to delete the asset
    const deleteAsset = async (asset) => {
        try {
            //call the api to delete
            const response = await axios.delete(`http://localhost:8081/api/asset/delete/${asset.id}`);
            //delete the record in ui
            let temp = [...assets]
            temp = temp.filter(a => a.id !== asset.id);
            setAssets(temp);
        }
        catch (err) {

        }
    }
    //function to get the employee
    const getEmployeeById = async (empId) => {
        //call the api to get employee
        if (empId === "") setEmployee({});
        if (empId !== "") {
            try {
                const response = await axios.get(`http://localhost:8081/api/employee/getbyid/${empId}`);
                setEmployee(response.data);
            }
            catch (err) {
                //console.log(err);
            }
        }
    }
    //function to allocate asset
    const allocateAsset = async (asset, emp, date) => {
        try {
            //call the api
            const response = await axios
                .post(`http://localhost:8081/api/assetallocation/add/${asset.id}/${emp.id}`,
                    { "date": date }
                )
            console.log(response)
            //delete the asset and update
            let temp = [...assets]
            temp = temp.filter(a => a.id !== asset.id)
            //add the new
            temp.push(response.data.asset)
            setAssets(temp)
        }
        catch (err) {
            console.log(err);
        }
    }
    //function to add the asset
    const addAsset = async (asset, catId) => {
        try {
            const response = await axios
                .post(`http://localhost:8081/api/asset/add/${catId}`, asset)
            //add the asset in the list
            let temp = [...assets]
            temp.push(response.data)
            setAssets(temp);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    {/* <!-- Sidebar Component --> */}
                    <Sidebar />
                    {/* <!-- Main Content Area --> */}
                    <div className="col-md-10 p-4">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center" style={{ backgroundColor: "#159895", color: "white" }}>
                                <span>Company Assets</span>
                                <button className="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#addAssetModal">
                                    <i className="bi bi-plus me-2"></i>Add Asset
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {
                                        assets.sort((a, b) => a - b).map((a, index) => (
                                            <div className="col-md-4 mb-3" key={index}>
                                                <div className="card hover-effect">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between mb-3">
                                                            <h5 className="card-title">{a.name}</h5>
                                                            <span className="badge bg-secondary">Quantity: {a.quantity}</span>
                                                        </div>
                                                        <p className="card-text">
                                                            <i className="bi bi-tag me-2"></i>{a.id}<br />
                                                            <i className="bi bi-briefcase me-2"></i>{a.category.name}
                                                        </p>
                                                        <div className="d-flex justify-content-between">
                                                            <button className="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#viewAssetModal"
                                                                onClick={() => { setSelectedAsset(a) }}>
                                                                <i className="bi bi-eye"></i>
                                                            </button>
                                                            <button className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#allocateAssetModal"
                                                                onClick={() => { setSelectedAsset(a) }}>
                                                                <i className="bi bi-person-plus"></i>
                                                            </button>
                                                            <button className="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#editAssetModal"
                                                                onClick={() => { setSelectedAsset(a) }}>
                                                                <i className="bi bi-pencil"></i>
                                                            </button>
                                                            <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteAssetModal"
                                                                onClick={() => { setSelectedAsset(a) }}>
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-sm-4"></div>
                                    <div className="col-sm-6">
                                        <nav aria-label="Page navigation">
                                            <ul class="pagination">
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
                                                        <a class="page-link" href="#"
                                                            onClick={() => { setPage(index) }}>{index + 1}</a></li>
                                                ))}
                                                {
                                                    page === totalpage - 1 ? <li class="page-item disabled">
                                                        <a class="page-link" href="#" aria-disabled="true">Next</a>
                                                    </li> : <li class="page-item">
                                                        <a class="page-link" href="#" onClick={() => { setPage(page + 1) }}>Next</a>
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
            {/* <!-- New Allocate Asset Modal --> */}
            {selectedAsset && <div className="modal fade" id="allocateAssetModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title">Allocate Asset</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Asset ID</label>
                                        <input type="text" className="form-control" value={selectedAsset.id} readOnly />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Asset Name</label>
                                        <input type="text" className="form-control" value={selectedAsset.name} readOnly />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Employee ID</label><span style={{ color: "red" }}>*</span>
                                        <div className='d-flex'>
                                            <input type="text" className="form-control me-2" placeholder="Enter Employee ID"
                                                onChange={(e) => {
                                                    const evl = e.target.value
                                                    if (evl === "") {
                                                        setEmployee({})
                                                        setEmployeeId("")
                                                    }
                                                    else { setEmployeeId(e.target.value) }
                                                }} required />

                                            <button type="button" className="form-control btn btn-sm btn-primary"
                                                onClick={() => { getEmployeeById(employeeId) }}
                                            > Get   </button>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Employee Name</label>
                                        <input type="text" className="form-control" value={employee.name || ""} readOnly />
                                    </div>
                                </div>
                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Allocation Date</label><span style={{ color: "red" }}>*</span>
                                        <input type="date" className="form-control"
                                            onChange={(e) => { setAllocationDate(e.value.target) }} required />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-success"
                                onClick={() => { allocateAsset(selectedAsset, employee, allocationDate) }} data-bs-dismiss="modal">Allocate Asset</button>
                        </div>
                    </div>
                </div>
            </div>}
            {/* <!-- View Asset Modal --> */}
            {selectedAsset && <div className="modal fade" id="viewAssetModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-info text-white">
                            <h5 className="modal-title">Asset Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><span className="detail-label">Asset Name:</span> {selectedAsset.name}</p>
                                    <p><span className="detail-label">Asset ID:</span> {selectedAsset.id}</p>
                                    <p><span className="detail-label">Model:</span> {selectedAsset.model}</p>
                                    <p><span className="detail-label">Type:</span> {selectedAsset.category?.name || ""}</p>
                                    <p><span className="detail-label">Status:</span> <span className="badge bg-success">Available</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p><span className="detail-label">Quantity:</span> {selectedAsset.quantity}</p>
                                    <p><span className="detail-label">Purchase Date:</span> {selectedAsset.date}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <h6 className="detail-label">Configurations:</h6>
                                    <div className="p-3 border rounded bg-light">
                                        <p className="mb-0">
                                            {selectedAsset.configuration}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>}
            {/* <!-- Edit Asset Modal --> */}
            {selectedAsset && <div className="modal fade" id="editAssetModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-warning">
                            <h5 className="modal-title">Edit Asset</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Asset Name</label><span style={{ color: "red" }}>*</span>
                                        <input type="text" className="form-control" value={selectedAsset.name}
                                            onChange={(e) => setSelectedAsset({ ...selectedAsset, "name": e.target.value })} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Asset ID</label>
                                        <input type="text" className="form-control" value={selectedAsset.id} readOnly />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Model</label><span style={{ color: "red" }}>*</span>
                                        <input type="text" className="form-control" value={selectedAsset.model}
                                            onChange={(e) => setSelectedAsset({ ...selectedAsset, "model": e.target.value })} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Asset Type</label><span style={{ color: "red" }}>*</span>
                                        <select value={selectedAsset.category?.name} className="form-select" onChange={(e) => {
                                            let found = e.target.value
                                            let temp = [...category];
                                            let cat = temp.find(c => c.name === found)
                                            setSelectedAsset({
                                                ...selectedAsset, "category": {
                                                    "name": cat.name,
                                                    "id": cat.id
                                                }
                                            })
                                        }} >
                                            {
                                                category.map((c, index) => (
                                                    <option value={c.name} key={index} >{c.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Purchase Date</label>
                                        <input type="date" className="form-control" value={selectedAsset.date}
                                            onChange={(e) => setSelectedAsset({ ...selectedAsset, "date": e.target.value })} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Quantity</label>
                                        <input type="number" className="form-control" value={selectedAsset.quantity} min="1"
                                            onChange={(e) => setSelectedAsset({ ...selectedAsset, "quantity": e.target.value })} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Configurations</label>
                                    <textarea className="form-control" rows="4" value={selectedAsset.configuration}
                                        onChange={(e) => setSelectedAsset({ ...selectedAsset, "configuration": e.target.value })} ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-warning"
                                onClick={() => { updateAsset(selectedAsset), setEditModal(false) }} data-bs-dismiss="modal">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>}
            {/* <!-- Delete Asset Modal --> */}
            {selectedAsset && <div className="modal fade" id="deleteAssetModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-danger text-white">
                            <h5 className="modal-title">Confirm Asset Deletion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="alert alert-danger">
                                <strong>Warning:</strong> You are about to permanently delete the asset {selectedAsset.name}.
                            </div>
                            <p>This action cannot be undone. The asset will be removed from the system.</p>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="confirmDelete"
                                    onClick={() => { disable ? setDisable(false) : setDisable(true) }} />
                                <label className="form-check-label" htmlFor="confirmDelete">
                                    I understand this action is irreversible
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            {disable === false ? <button type="button" className="btn btn-danger" id="deleteAssetBtn"
                                onClick={() => { deleteAsset(selectedAsset) }} data-bs-dismiss="modal">Delete Asset</button> :
                                <button type="button" className="btn btn-danger" disabled id="deleteAssetBtn">Delete Asset</button>}
                        </div>
                    </div>
                </div>
            </div>}
            {/* <!-- Add Asset Modal --> */}
            <div className="modal fade" id="addAssetModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Add New Asset</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Asset Name</label><span style={{ color: "red" }}>*</span>
                                    <input type="text" className="form-control"
                                        onChange={(e) => setSelectedAsset({ ...selectedAsset, "name": e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Asset Model</label><span style={{ color: "red" }}>*</span>
                                    <input type="text" className="form-control"
                                        onChange={(e) => setSelectedAsset({ ...selectedAsset, "model": e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Purchase Date</label><span style={{ color: "red" }}>*</span>
                                    <input type="date" className="form-control"
                                        onChange={(e) => setSelectedAsset({ ...selectedAsset, "date": e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Quantity</label><span style={{ color: "red" }}>*</span>
                                    <input type="number" min="1" className="form-control"
                                        onChange={(e) => setSelectedAsset({ ...selectedAsset, "quantity": e.target.value })} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Asset Type</label><span style={{ color: "red" }}>*</span>
                                    <select className="form-select"
                                        onChange={(e) => { setCategoryId(e.target.value) }}>
                                        {
                                            category.map((c, index) => (
                                                <option value={c.id} key={index} >{c.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Configurations</label><span style={{ color: "red" }}>*</span>
                                    <textarea className="form-control" rows="4"
                                        onChange={(e) => setSelectedAsset({ ...selectedAsset, "configuration": e.target.value })} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows="4"
                                        onChange={(e) => setSelectedAsset({ ...selectedAsset, "configuration": e.target.value })} required></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary"
                                onClick={() => { addAsset(selectedAsset, categoryId) }} data-bs-dismiss="modal">Add Asset</button>
                        </div>
                    </div>
                </div>
            </div >

        </div >
    )
}
export default AssetList;