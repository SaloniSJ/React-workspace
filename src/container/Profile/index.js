import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import customerimg from '../../assets/img/costic/customer-5.jpg';
import * as ProfileServiceAPI from '../../services/profile/ProfileServiceAPI';
import * as SecurityServiceAPI from '../../services/user/SecurityServiceAPI'
import CommonModal from '../../shared/Modal/CommonModal'
import Profile from './Profile';
import './style.css';
import OTP from '../../shared/Otp/OTP'
import Password from '../../shared/Password/Password'
import ImageCropper from '../../shared/Cropper/ImageCropper';


class index extends Component {
    state = {
        name: '',
        email: '',
        phone_verification_status: '',
        phone: '',
        profileImagePreviewUrl: null,
        profile_image: null,
        cover_image: null,
        coverImagePreviewUrl: null,
        profile_photo_select: false,
        cover_photo_select: false,
        profile_image_url: customerimg,
        tab: 0,
        language: '',
        location: '',
        website: '',
        date_of_birth: '',
        about_me: '',
        account_status: '',
        email_verification_status: '',

        mValidation: false,
        showOtpBox: true,
        mfaImage: '',
        mfaFlag: false,
        totp: '',
        id1: '', id2: '', id3: '', id4: '',
        id5: '', id6: '',

        showEmailModal: false,
        new_email: '',
        email_updated: false,

        showPasswordModal: false,
        login_sessions: [],

        showCropperModal: false,
        loadSpinnerForCropper: false
    }

    componentDidMount = () => {
        const username = localStorage.getItem('username')
        this.setState({ username: username })
        this.fetchProfileDetails(username)
        this.fetchLoginSession(username)
    }

    fetchProfileDetails = (username) => {
        ProfileServiceAPI.fetchProfile(username).then(response => {
            if (response.data.status) {
                this.setState({
                    email: response.data.data.email,
                    name: response.data.data.name,
                    phone: response.data.data.phone,
                    profile_image_url: response.data.data.profile_image_url,
                })
            }
        })
    }

    profilePictureHandler = (file) => {
        console.log(file)
        console.log(URL.createObjectURL(file));
        const files = Array.from(file);
        files.forEach((file, i) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    profile_image: file,
                    profileImagePreviewUrl: reader.result,
                    profile_photo_select: true
                });
            };
            reader.readAsDataURL(file);
        });
        // this.uploadProfileImageHandler();
    }
    uploadProfileImageHandler = (file) => {
        // e.preventDefault();
        this.setState({loadSpinnerForCropper:true})
        let formData = new FormData();
        console.log("Profile Image", file)
        // formData.append('profile_image', this.state.profile_image)
        formData.append('profile_image', file)
        formData.append('username', this.state.username)
        ProfileServiceAPI.uploadProfilePhoto(formData).then(response => {
            if (response.data.status) {
                this.setState({ showCropperModal: false, loadSpinnerForCropper:false })
                toast.success('Profile Picture Uploaded Successfully!!')
                this.setState({ profile_photo_select: false })
                window.location.reload();
            }else{
                this.setState({ showCropperModal: false, loadSpinnerForCropper:false })
                toast.error(response.data.message)
            }
        }).catch(error => {

        })
    }
    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateProfileData = (event) => {
        event.preventDefault();
        const payload = {
            name: this.state.name,
            phone: this.state.phone,
            username: this.state.username
        }

        ProfileServiceAPI.editProfileData(payload).then(response => {
            if (response.data.status) {
                toast.success('Profile Updated Successfully!!')
            }
        })
    }

    updateEmail = event => {
        event.preventDefault();
        const payload = {
            old_email: this.state.email,
            new_email: this.state.new_email
        }

        ProfileServiceAPI.updateEmail(payload).then(response => {
            if (response.data.status) {
                this.setState({ email_updated: true })
                this.fetchProfileDetails();
            } else {
                toast.error(response.data.message)
            }
        })
    }

    verifyEmail = event => {
        event.preventDefault();
        const payload = {
            otp: this.state.id1 + this.state.id2 + this.state.id3 + this.state.id4 + this.state.id5 + this.state.id6,
            username: this.state.username,
        }
        ProfileServiceAPI.verifyEmail(payload).then(response => {
            if (response.data.status) {
                this.setState({
                    id1: '', id2: '', id3: '', id4: '', id5: '', id6: '', email_updated: false,
                    showEmailModal: false, new_email: ''
                })
                this.fetchProfileDetails();
            } else {
                toast.error(response.data.message)
            }
        })
    }

    fetchLoginSession = (username) => {
        ProfileServiceAPI.fetchLoginSession(username).then(response => {
            if (response.data.status) {
                this.setState({ login_sessions: response.data.data.login_sessions })
            }
        })
    }

    resetPassword = value => {
        const payload = {
            new_password: value.password,
            old_password: value.old_password,
            username: this.state.username
        }
        SecurityServiceAPI.resetPassword(payload).then(response => {
            if (response.data.status) {
                toast.success('Password Changed Successfuly !!')
                this.setState({ showPasswordModal: false })
            } else {
                toast.warn(response.data.message)
            }
        })
    }

    handleChange = event => {
        toast.info('Kindly enter OTP for MFA Updation')
        this.setState({
            showOtpBox: !this.state.showOtpBox
        });
    };

    handleEmailChange = () => {
        this.setState({ showEmailModal: !this.state.showEmailModal })
    }

    handlePasswordChange = () => {
        this.setState({ showPasswordModal: !this.state.showPasswordModal })
    }

    handleIamgeCropperModalChange = () => {
        console.log('Clicked')
        this.setState({ showCropperModal: !this.state.showCropperModal })
    }


    render() {
        return (
            <Fragment>
                <Profile updateProfileData={this.updateProfileData}
                    uploadProfileImageHandler={this.uploadProfileImageHandler}
                    onChangeHandler={this.onChangeHandler}
                    profilePictureHandler={this.profilePictureHandler}
                    emailModalHandler={this.handleEmailChange}
                    passwordModalHandler={this.handlePasswordChange}
                    handleImageCropperModalChange={this.handleIamgeCropperModalChange}
                    state={this.state} />

                <ImageCropper show={this.state.showCropperModal}
                    loading={this.state.loadSpinnerForCropper}
                    uploadImageHandler={this.uploadProfileImageHandler}
                    modalChange={this.handleIamgeCropperModalChange} />

                <CommonModal show={this.state.showEmailModal} handleClose={this.handleEmailChange} Heading="UPDATE EMAIL">
                    {this.state.email_updated ? <form className="needs-validation clearfix" onSubmit={this.verifyEmail} noValidate>

                        <div className="form-row">
                            <div className="col-md-12 ">
                                <label htmlFor="validationCustom01">OTP</label>
                                <OTP state={this.state} onChange={this.onChangeHandler} />
                            </div>
                        </div>

                        <button className="btn btn-primary d-block float-right" type="submit">Verify Email</button>

                    </form> : <form className="needs-validation clearfix" onSubmit={this.updateEmail} noValidate>

                            <div className="form-row">
                                <div className="col-md-6 ">
                                    <label htmlFor="validationCustom01">Email</label>
                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            id="validationCustom01"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeHandler}
                                            required />
                                    </div>
                                </div>

                                <div className="col-md-6 ">
                                    <label htmlFor="validationCustom01">New Email</label>
                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            id="validationCustom01"
                                            name="new_email"
                                            value={this.state.new_email}
                                            onChange={this.onChangeHandler}
                                            required />
                                    </div>
                                </div>

                            </div>

                            <button className="btn btn-primary d-block float-right" type="submit">Update Email</button>
                        </form>}
                </CommonModal>

                <CommonModal show={this.state.showPasswordModal} handleClose={this.handlePasswordChange} Heading="Reset Password">
                    <Password state={this.state} button_text="Reset Password" needPasswordChangeUpdate={this.resetPassword} />
                </CommonModal>
            </Fragment>
        )
    }
}

export default index;
