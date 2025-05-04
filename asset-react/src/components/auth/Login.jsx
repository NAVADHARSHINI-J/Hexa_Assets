import { useState } from "react"
import users from "../../data/users"; 
import { Link, useNavigate } from "react-router";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [msgUsername, setMsgUsername] = useState(null);
    const [msgPassword, setMsgPassword] = useState(null); 
    const navigate = useNavigate();

    const login = () => { 
        if (username === null || username === "" || username === undefined) {
            setMsgUsername("username should not be blank")
            return
        }
        if (password === null || password === "" || password === undefined) {
            setMsgPassword("password should not be blank")
            return
        }
        //get the token
        axios.post("http://localhost:8081/api/user/token/generate",
            {
                "username": username,
                "password": password
            }
        ).then(response => {
            // console.log(response)
            //store them in a local storage
            let token = response.data.token
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            //call the api to get userdetails
            axios.get("http://localhost:8081/api/user/user/details",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            ).then(resp => { 
                const userId=resp.data.id; 
                axios.get(`http://localhost:8081/api/employee/getbyuser/${userId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                ).then(empResp=>{
                    let employeeId = empResp.data.id;
                    console.log(employeeId);
                    localStorage.setItem("employeeId", employeeId);
                })
                switch (resp.data.role) {
                    case 'EMPLOYEE':
                        //navigate to employee dashboard
                        navigate("/employee")
                        break;
                    case 'ADMIN':
                        //navigate to admin dashboard
                        navigate("/admin")
                        break;
                    case 'MANAGER':
                        //navigate to manager dashboard
                        navigate("/manager")
                        break;
                    default:
                        break;
                }

            })
                .catch(err => console.log(err))
        }).catch(err => console.log(err)) 
     
    }
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#f4f4f4" }}>
                <div className="container-fluid">


                    <div className="row mt-4">
                        <div className="col-sm-4">

                        </div>
                        <div className="col-sm-4">
                            <div className="card" >
                                <div className="card-header text-center" style={{ backgroundColor: "#2E7893" }}>
                                    <h3 style={{ color: "white", fontFamily: 'Georgia' }}>Hexa Assets</h3><br />
                                    <h5 style={{ color: "white" }}>Asset Management System</h5>
                                </div>
                                <div className="card-body">
                                    {
                                        msgUsername === null ? "" :
                                            <div className="mb-4">
                                                {msgUsername}
                                            </div>
                                    }
                                    {
                                        msgPassword === null ? "" :
                                            <div className="mb-4">
                                                {msgPassword}
                                            </div>
                                    }
                                    <div className="mb-4">
                                        <label>Username: </label>
                                        <input type="text" className="form-control"
                                            onChange={($event) => {
                                                setUsername($event.target.value);
                                                setMsgUsername(null)
                                            }} />
                                    </div>
                                    <div className="mb-4">
                                        <label>Password: </label>
                                        <input type="password" className="form-control"
                                            onChange={($event) => {
                                                setPassword($event.target.value);
                                                setMsgPassword(null)
                                            }} />
                                    </div>
                                    <div className="mb-4 text-center">
                                        <button type="button" className="btn btn-primary "
                                            onClick={() => { login() }}>Login</button>
                                    </div>
                                </div>
                                <div className="card-footer" style={{ backgroundColor: "#2E7893", color: "white" }}>
                                    <p > Don't have an Account? </p> 
                                    <Link to={"/employee/signup"}>Sign Up </Link><br />
                                      <p> <a href="#" style={{ color: "white" }}>Reset Password</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login