import axios from "axios";
import { useEffect, useState } from "react"

import { Link } from "react-router-dom";

function EmployeeSignUp() {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [contact, setContact] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [address, setAddress] = useState(null);

    const [department, setDepartment] = useState([]);
    const [departId, setDepartmentId] = useState(null);

    useEffect(() => {

        const getDepartment = async () => {

            await axios.get(`http://localhost:8081/api/department/getall`)
                .then(response => {
                    console.log(response.data);
                    setDepartment(response.data)
                })
        }
        getDepartment();
    }, [])
    const signUp = async ($event) => {
        $event.preventDefault();

        let body = {
            "name": name,
            "email": email,
            "contact": contact,
            "address": address,
            "user": {
                "username": username,
                "password": password
            }
        }

        try {
            const response = await axios.post(`http://localhost:8081/api/employee/add-employee/${departId}`, body);

            console.log('sign Up success....')
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center mt-5">
                    <div className="col-md-8 col-lg-6"> {/* Increased width for better horizontal stretch */}
                        <div className="card">
                            <div className="card-header text-center" style={{ backgroundColor: "#2E7893" }}>
                                <h3 style={{ color: "white", fontFamily: 'Georgia' }}>Hexa Assets</h3>
                                <h5 style={{ color: "white" }}>Asset Management System</h5>
                            </div>
                            <div className="card-body">
                                <form className="row g-3" onSubmit={($event) => signUp($event)}>
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
                                        <label className="form-label">Username</label>
                                        <input type="text" className="form-control"
                                            onChange={($event) => { setUsername($event.target.value) }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control"
                                            onChange={($event) => { setPassword($event.target.value) }} />
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
                                        <button type="submit" className="btn btn-primary">Sign Up</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-center" style={{ backgroundColor: "#2E7893", color: "white" }}>
                                <p className="mb-1">Already have an Account?</p>
                                <Link to={"/"} style={{ color: "white", textDecoration: "underline" }}>Sign In</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeSignUp;