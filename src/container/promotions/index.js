import React, { Component, Fragment } from 'react'
import * as SettingServiceAPI from '../../services/setting/SettingServiceAPI'
import * as SecurityServiceAPI from '../../services/user/SecurityServiceAPI'
import { toast } from 'react-toastify'
import { FlapperSpinner } from "react-spinners-kit";
import Breadcrumb from './Breadcrumb'

export default class index extends Component {

    state = {
        hasfeaturedCoverImage: false,
        files: null,
        property_details: '',
        username: '',
        featured_image_or_video: [],
        loading: false
    }
    fileArray = [];
    fileObj = [];

    componentDidMount = () => {
        const username = localStorage.getItem('username')
        this.fetchBusinessPlace(username);
        this.setState({ username: username })
    }

    fetchBusinessPlace = (username) => {
        SecurityServiceAPI.fetchBusinessPlace(username).then(response => {
            if (response.data.status) {
                const property_details = response.data.data.property_details[0];
                if (property_details) {
                    if (property_details.featured_image_or_video) {

                        this.setState({ featured_image_or_video: property_details.featured_image_or_video, property_details: property_details })
                    }
                    this.setState({
                        property_details: property_details,
                        hasfeaturedCoverImage: false
                    })
                }
            }
        })
    }

    featuredImageHandler = (e) => {

        e.preventDefault();
        this.fileObj = []
        // FileList to Array
        const files = Array.from(e.target.files);
        files.forEach((file, i) => {
            this.fileArray.push(file)
            const multipleImageReader = new FileReader();

            multipleImageReader.onloadend = () => {
                this.fileObj.push(multipleImageReader.result)
                this.setState({
                    files: file,
                    hasfeaturedCoverImage: true
                });
            };
            multipleImageReader.readAsDataURL(file);
        });
        toast.info('Please click upload featured image button to upload images ')

    }


    uploadFeaturedImages = (event, value) => {
        event.preventDefault();
        this.setState({ loading: true })
        let formData = new FormData();
        console.log("File Array of Image===>",this.fileArray)
        formData.append('property_id', this.state.property_details.property_id)
        // formData.append("image-or-video", value);
        for (let i = 0; i < this.fileArray.length; i++) {
            formData.append("image-or-video", this.fileArray[i]);
        }
        formData.append("property_id", this.state.property_details.property_id)
        SettingServiceAPI.uploadFeaturedImages(formData).then(response => {
            if (response.data.status) {
                this.fetchBusinessPlace(this.state.username);
                this.fileObj = []
                this.setState({ loading: false })
            } else {
                this.setState({ loading: false })
            }
        })
    }
    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-10">
                        <Breadcrumb />
                    </div>
                    <div className="col-md-2">
                        {this.state.hasfeaturedCoverImage ? <button className="btn grid-btn mt-0 btn-primary cover-image-button" onClick={this.uploadFeaturedImages}>Upload Featured Images</button> : <button className="btn grid-btn mt-0 btn-primary cover-image-button">
                            <input className="upload-image-input"
                                accept=".jpeg,.jpg,.png,.svg"
                                type="file"
                                id="choose-profile"
                                name="featured_image"
                                onChange={this.featuredImageHandler}
                                multiple
                            />Select Featured Images
                            </button>}
                    </div>
                </div>

                {this.state.loading ?
                    <FlapperSpinner size={75} color="#233cad" loading={this.state.loading} /> :

                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="section-title">Featured Images</h2>
                        </div>
                        {this.state.featured_image_or_video.map((imageOrVideo, i) => (
                            <div key={i} className="col-lg-3 col-md-6 col-sm-6">
                                <div className="ms-card">
                                    <div className="ms-card-img" >
                                        <img src={imageOrVideo.path} alt="card_img" style={{ height: '120px' }} />
                                    </div>
                                    {/* <div className="ms-card-body">
                                        <h6>{item.title}</h6>
                                        <p>{item.para}</p>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>}
                <div className="row">

                    <div className="col-md-12">
                        {this.fileObj ? <h2 className="section-title">Selected Featured Images Preview</h2> : null}
                    </div>
                    {this.fileObj.map((imageOrVideo, i) => (
                        <div key={i} className="col-lg-3 col-md-6 col-sm-6">
                            <div className="ms-card">
                                <div className="ms-card-img">
                                    <img src={imageOrVideo} alt="card_img" style={{ height: '120px' }} />
                                </div>
                                <div className="ms-card-body">
                                    {/* <h6>{item.title}</h6>
                                <p>{item.para}</p> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Fragment>
        )
    }
}
