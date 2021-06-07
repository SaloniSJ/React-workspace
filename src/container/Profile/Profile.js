import React, { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';



const Profile = (props) => {
    return (
        <Fragment>

            <div className="row">
                <div className="col-xl-4 col-md-4 offset-2">
                    <div className="">
                        <div className="ms-panel-header">
                            <h6>General</h6>
                        </div>
                        <div className="ms-panel-body">
                            <h6>Details</h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-12">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header ">
                            <div className="row">
                                <div className="col-xl-2 col-md-2">
                                     {props.state.profileImagePreviewUrl ?<img className="ms-user-img ms-img-round ms-user-round-img" src={props.state.profileImagePreviewUrl} alt="people" />:<img className="ms-user-img ms-img-round ms-user-round-img" src={props.state.profile_image_url} alt="people" />}
                                </div>
                                <div className="col-xl-6 col-md-6 text-left">
                                    <button className="btn btn-primary"
                                    onClick={props.handleImageCropperModalChange}>Crop Profile Image</button>
                                    {/* {props.state.profileImagePreviewUrl ? <button className="btn btn-primary cover-image-button" onClick={props.uploadProfileImageHandler}>Upload</button> : <button className="btn btn-primary cover-image-button">
                                        <input className="upload-image-input"
                                            accept=".jpeg,.jpg,.png,.svg"
                                            type="file"
                                            id="choose-profile"
                                            name="profile_image"
                                            onChange={props.profilePictureHandler}
                                        />
                                        Edit
                                </button>} */}
                                    {/* <p className="btn btn-primary  mr-2" onClick={props.uploadProfileImageHandler}>Upload</p> */}
                                    {/* <a className="btn btn-primary " href="#">Remove</a> */}
                                </div>
                            </div>
                        </div>
                        <div className="ms-panel-body">
                            <div className="col-xl-12 col-md-12">
                                <form className="needs-validation clearfix" onSubmit={props.updateProfileData} noValidate>

                                    <div className="form-row">
                                        <div className="col-md-6 ">
                                            <label htmlFor="validationCustom01">Name</label>
                                            <div className="input-group">
                                                <input type="text"
                                                    className="form-control"
                                                    id="validationCustom01"
                                                    name="name"
                                                    value={props.state.name}
                                                    onChange={props.onChangeHandler}
                                                    required />
                                            </div>
                                        </div>


                                        <div className="col-md-6 ">
                                            <label htmlFor="validationCustom05">Contact Number</label>
                                            <div className="input-group">
                                                <input type="text"
                                                    className="form-control"
                                                    id="validationCustom01"
                                                    name="phone"
                                                    value={props.state.phone}
                                                    onChange={props.onChangeHandler}
                                                    required />

                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary d-block float-right" type="submit">Update Business Profile</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-xl-4 col-md-4 offset-2">
                    <div className="">
                        <div className="ms-panel-header">
                            <h6>Email</h6>
                        </div>
                        <div className="ms-panel-body">
                            <h6>A email can be used to restore access to your account. Security notifications are also sent to this email. </h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-12 ">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Email</h6>
                        </div>
                        <div className="ms-panel-body">
                            <div className="col-xl-12 col-md-12">
                                <p>Do you want to change email.?</p>
                                <a className="btn btn-primary" onClick={props.emailModalHandler}>Update Email</a>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="col-xl-4 col-md-4 offset-2">
                    <div className="">
                        <div className="ms-panel-header">
                            <h6>Security</h6>
                        </div>
                        <div className="ms-panel-body">
                            <h6>Password</h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-12">
                    <div className="ms-panel ms-panel-fh">

                        <div className="ms-panel-body">
                            <div className="col-xl-12 col-md-12">
                                <p>Want to changed your password ? </p>
                                <a className="btn btn-primary" onClick={props.passwordModalHandler}>Change Your Password</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-md-4 offset-2">
                    <div className="">
                        <div className="ms-panel-header">
                            <h6>Devices</h6>
                        </div>
                        <div className="ms-panel-body">
                            <h6>You're currently logged in to Kayana on these devices. If you don't recognize a device, Please Contact to admin. </h6>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-md-12">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Logged In</h6>
                        </div>
                        <div className="ms-panel-body">
                            <div className="col-xl-12 col-md-12">
                                <ul className="ms-followers ms-list ms-scrollable">
                                <Scrollbar className="ms-scrollable ms-dropdown-list">
                                {props.state.login_sessions.map((session, i) => (
                                    <li key={i} className="ms-list-item media">
                                        <div className="media-body mt-1"><h5>{session.os_detail}</h5>
                                            <h6>{session.browser_detail}</h6>
                                            <p className="fs-12">{session.date_and_time}</p>
                                            <p className="fs-12">{session.location}</p>
                                        </div>
                                        {/* <button type="button" className="btn btn-success" name="button">Logout</button> */}
                                    </li>
                                ))}
                                </Scrollbar>
                                </ul>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </Fragment>

    )

}

export default Profile