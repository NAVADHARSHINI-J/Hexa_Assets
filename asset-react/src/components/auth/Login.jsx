import { useState } from "react" 
import users from "../../data/users";
import { useNavigate } from "react-router";

function Login() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [msgUsername, setMsgUsername] = useState(null);
    const [msgPassword, setMsgPassword] = useState(null);
    const [userData, setUserData] = useState(users);
    const navigate=useNavigate();

    const login = () => {
        let isCorrect = false;
        if (username === null || username === "" || username === undefined) {
            setMsgUsername("username should not be blank")
            return
        }
        if (password === null || password === "" || password === undefined) {
            setMsgPassword("password should not be blank")
            return
        }
        userData.forEach(u => {
            if (u.username === username && u.password === password) {
                isCorrect = true;
                alert("alright u r legit, u role is  " + u.role)
                switch (u.role) {
                    case 'EMPLOYEE':
                        //navigate to employee dashboard
                    case 'CUSTOMER':
                        //navigate to customer dashboard
                        break;
                    case 'MANAGER':
                        //navigate to manager dashboard
                        navigate("/manager")
                        break;
                    case 'ADMIN':
                        //navigate to executive dashboard
                        break;
                    default:
                        break;
                }
            } 
            if(isCorrect === false){
                setMsgUsername("Invalid Credentials")
            }
        });
       
    }
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#f4f4f4" }}>
                <div className="container-fluid">


                    <div className="row mt-4">
                        <div className="col-sm-4">

                        </div>
                        <div className="col-sm-4">
                            <div class="card" >
                                <div className="card-header text-center" style={{ backgroundColor: "#2E7893" }}>
                                    <h3 style={{ color: "white", fontFamily: 'Georgia' }}>Hexa Assets</h3>
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
                                        <button type="button" class="btn btn-primary "
                                            onClick={() => { login() }}>Login</button>
                                    </div>
                                </div>
                                <div className="card-footer" style={{ backgroundColor: "#2E7893", color: "white" }}>
                                    <p > Don't have an Account? <a href="#" style={{ color: "white" }}>Sign Up </a><br />
                                        <a href="#" style={{ color: "white" }}>Reset Password</a></p>
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