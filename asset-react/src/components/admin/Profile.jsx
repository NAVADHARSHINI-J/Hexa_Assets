import Sidebar from "./Sidebar";

function Profile() {

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    {/* <!-- Sidebar (Original) --> */}
                    <Sidebar />
                    {/* Main Content */}
                    <div className="col-md-10 p-4">
                        <div className="card">
                            <div className="card-header" style={{ backgroundColor: "#159895" }}>
                                <div className="row">
                                    <div className="col-md-10"><h4>Profile</h4></div>
                                    <div className="col-md-2 text-end"><button className="btn btn-light" type="button">Sign out</button></div>
                                </div>
                            </div>
                            <div className="card-body" >
                                <div className="row">
                                    <div>
                                        <h6>Name</h6>
                                        <p>John Doe</p>
                                    </div>
                                    <div >
                                        <h6>Email</h6>
                                        <p>johndoe@gmail.com</p>
                                    </div>
                                    <div >
                                        <h6>Contact</h6>
                                        <p>9344650305</p>
                                    </div>
                                    <div >
                                        <h6>Address</h6>
                                        <p>4/124 Abc Street,
                                            xyz city,
                                            klmno.
                                        </p>
                                    </div>
                                    <div className="mt-3">
                                        <button className="btn btn-primary " type="button" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div >
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" value="John" required />
                                </div>
                                <div >
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" value="john.doe@hexaassets.com" required />
                                </div>
                                <div >
                                    <label className="form-label">Contact</label>
                                    <input type="tel" className="form-control" value="+1 (555) 123-4567" />
                                </div>
                                <div >
                                    <label className="form-label">Address</label>
                                    <textarea className="form-control" rows="4">4/124 Abc Street, xyz city, klmno.</textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;