import { Link } from "react-router";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";


function Profile() {

    //state.<sliceName>.<key-In-InitialState>
    const profile = useSelector(state => state.profile.profile);

    console.log("profile " + profile.name);

    const [department, setDepartment] = useState([]);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [contact, setContact] = useState(null);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [departmentId, setDepartmentId] = useState(null);
    const [departmentName, setDepartmentName] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {

        setName(profile.name)
        setEmail(profile.email)
        setContact(profile.contact)
        setUsername(profile.user.username)
        setUserId(profile.user.id)
        setDepartmentName(profile.department.name)
        setAddress(profile.address)

        const getDepartment = async () => {

            await axios.get(`http://localhost:8081/api/department/getall`)
                .then(response => {
                    console.log(response.data);
                    setDepartment(response.data)
                })
        }
        getDepartment();
    }, [profile])

    const editProfile = async ($event) => {

        $event.preventDefault();
        let employeeId = localStorage.getItem('employeeId');
        let body = {
            "name": name,
            "email": email,
            "contact": contact,
            "address": address,
            "department": {
                "id": departmentId
            }
        }
        let token = localStorage.getItem('token')

        let headers = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        //console.log("Sending PUT with", body, "to employee ID", employeeId);

        await axios.put(`http://localhost:8081/api/employee/update/${employeeId}`, body, headers)
            .then((response) => {
                setName(response.data.name)
                setEmail(response.data.email)
                setContact(response.data.contact)
                setUsername(response.data.user.username)
                setUserId(response.data.user.id)
                setDepartmentName(response.data.department.name)
                setAddress(response.data.address)

            })

        const modalElement = document.getElementById(`profile-${profile.id}`)
        const modal = bootstrap.Modal.getInstance(modalElement) 

        //for resetting the fields in ediit profile modal to have no values whenever openoing
        modalElement.addEventListener('hidden.bs.modal', function () { 
            const inputFields = modalElement.querySelectorAll('input, textarea, select');
            inputFields.forEach(field => field.value = ''); 
        });
        modal.hide()
        alert("Edit profile of " + name + " success!")
    }
    return (
        <div className="container-fluid">
            <div className="row">
                { /* <!-- Sidebar --> */}
                <Sidebar />
                {/* <!-- Main Content --> */}
                <div className="col-md-10 p-4">
                    <div className="card">
                        <div className="card-header secondary-bg text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Employee Profile</h5>
                            <Link to="/" className="text-white" title="Logout">
                                <i className="bi bi-box-arrow-right fs-5"></i>
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <h4 className="fw-bold text-primary">Welcome, {name}!</h4>
                                    <hr />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Name</label>
                                    <div className="form-control bg-light">{name}</div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Username</label>
                                    <div className="form-control bg-light">{username}</div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Employee Id</label>
                                    <div className="form-control bg-light">{profile.id}</div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">User Id</label>
                                    <div className="form-control bg-light">{userId}</div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Department</label>
                                    <div className="form-control bg-light">{departmentName}</div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Email</label>
                                    <div className="form-control bg-light">{email}</div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Contact</label>
                                    <div className="form-control bg-light">{contact}</div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Address</label>
                                    <div className="form-control bg-light">{address}</div>
                                </div>

                                <br /> <br /> <br /><br />
                                <div className="col-md-12 mb-3 text-center">
                                    <a className="btn btn-primary px-4 py-2 fs-6"
                                        data-bs-toggle="modal" data-bs-target={`#profile-${profile.id}`}>
                                        Edit Profile
                                    </a>
                                </div>


                                {/* Modal for Edit Profile */}
                                <div className="modal fade" id={`profile-${profile.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" key={profile.id}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header secondary-bg text-white">
                                                <h5 className="modal-title">Edit Profile</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form className="row g-3" onSubmit={($event) => editProfile($event)}>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Name</label>
                                                        <input type="text" className="form-control"
                                                            onChange={($event) => { setName($event.target.value) }} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Email</label>
                                                        <input type="text" className="form-control"
                                                            onChange={($event) => { setEmail($event.target.value) }} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Contact</label>
                                                        <input type="number" className="form-control"
                                                            onChange={($event) => { setContact($event.target.value) }} />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label for="inputState" className="form-label">Department</label>
                                                        <select id="inputState" className="form-select" onChange={($event) => { setDepartmentId($event.target.value) }}>
                                                            <option value="" selected>Choose...</option>
                                                            {
                                                                department.map((d, index) => (
                                                                    <option key={index} value={d.id}>{d.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6"></div>
                                                    <div className="col-md-12">
                                                        <label className="form-label">Address</label>
                                                        <textarea className="form-control" rows="3"
                                                            onChange={($event) => { setAddress($event.target.value) }}></textarea>
                                                    </div>
                                                    <div className="text-center mb-3">
                                                        <button type="submit" className="btn btn-primary">Save</button>
                                                    </div>
                                                </form>

                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                            </div>
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

export default Profile;
