import axios from "axios";
import { useState } from "react";

function ManagerSignUp() {

    const [name, setName] = useState(null);
    const [contact, setContact] = useState(null);
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const signUp = async ($e) => {
        $e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/manager/add',
                {
                    "name": name,
                    "contact": contact,
                    "email": email,
                    "address": address,
                    "user": {
                        "username": username,
                        "password": password
                    }
                }
            )
            alert('SignUp Sucessful!! Please Login to continue')
            console.log('sign Up success....')
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-light bg-light">
                            <div className="container-fluid justify-content-center">
                                <span className="navbar-brand mb-0 h1 text-center">Sign Up with Us!</span>
                            </div>
                        </nav>
                    </div>
                    <br /><br /><br /><br />
                    <div className="col-sm-3">
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header liquid-header">
                                Manager SignUp
                            </div>
                            <div className="card-body">
                                <form className="row g-3" onSubmit={($e) => signUp($e)}>
                                    <div className="col-md-6">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control"
                                            onChange={($event) => { setName($event.target.value) }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Contact</label>
                                        <input type="number" className="form-control"
                                            onChange={($event) => { setContact($event.target.value) }} />
                                    </div>
                                    <div className="col-md-11">
                                        <label className="form-label">Email</label>
                                        <input type="text" className="form-control"
                                            onChange={($event) => { setEmail($event.target.value) }} />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control"
                                            onChange={($event) => { setAddress($event.target.value) }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label  className="form-label">Username</label>
                                        <input type="text" className="form-control"
                                            onChange={($event) => { setUsername($event.target.value) }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control"
                                            onChange={($event) => { setPassword($event.target.value) }} />
                                    </div>
                                    <center>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary">Sign Up</button>
                                        </div>
                                        </center>
                                    <div className="card-footer" style={{ backgroundColor: "#2E7893", color: "white" }}>
                                <p > Already have an Account? <a href="/" style={{ color: "white" }}>Sign In </a><br /></p>
                            </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ManagerSignUp;