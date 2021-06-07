import React, { Fragment, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import ImgDialog from './ImgDialog'
import getCroppedImg from './cropImage'
import SimpleModal from '../Modal/SimpleModal'
import { Modal } from "react-bootstrap";
import './ImageCropper.css';
import * as DataURLtoFile from './dataToUrl'
import { FlapperSpinner } from "react-spinners-kit";

const styles = (theme) => ({
  cropContainer: {
    position: 'relative',
    width: '100%',
    height: '200',
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
  controls: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  sliderContainer: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
  },
  sliderLabel: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 65,
    },
  },
  slider: {
    padding: '22px 0px',
    marginLeft: 32,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 16px',
    },
  },
})


export const ImageCropper = (props) => {
  const inputRef = React.useRef();
  const triggerFileSelectPopup = () => inputRef.current.click();
  const [image, setImage] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', { croppedImage })
      var file = DataURLtoFile.dataURLtoFile(croppedImage,'image');
      console.log("File==>",file);
      props.uploadImageHandler(file);
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  const onImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  }

  return (
    <Fragment>
      <Modal className="modal-min" size='lg' show={props.show} onHide={props.modalChange} aria-labelledby="contained-modal-title-vcenter"
        centered>
        <div className="modal-header">
          <h1>IMAGE CROPPER</h1>
          <button type="button" className="close" onClick={props.modalChange}><span aria-hidden="true">×</span></button>
        </div>
        {props.loading?<FlapperSpinner size={90} color="#233cad" loading={props.loading} />:<Modal.Body>
          <div className="crop-upper">
            <div className={styles.cropContainer}>
              <Cropper
                image={image}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          </div>

        </Modal.Body>}
        <Modal.Footer>

          <div id="control_area" className={styles.controls}>
            <div className={styles.sliderContainer}>
              <Typography
                variant="overline"
                styles={{ root: styles.sliderLabel }}
              >
                Zoom
          </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                styles={{ root: styles.slider }}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <div className={styles.sliderContainer}>
              <Typography
                variant="overline"
                styles={{ root: styles.sliderLabel }}
              >
                Rotation
          </Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                styles={{ root: styles.slider }}
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </div>
            <div className='container-buttons'>
              <div className="ms-panel-header new">
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type='file'
                      accept='image/*'
                      ref={inputRef}
                      onChange={onImageChange}
                      style={{ display: "none" }}
                    />
                    <button
                      className="btn btn-primary d-block"
                      onClick={triggerFileSelectPopup}>
                      Select Image
              </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      className="btn btn-secondary d-block float-right"
                      onClick={showCroppedImage}
                    >
                      Crop Image
              </button>
                  </div>
                </div>

              </div>


            </div>
          </div>
          {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default ImageCropper;
