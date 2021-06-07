import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'

class GoogleMap extends Component {
   
    render() {
        const center={
            lat:this.props.state.latitude,
            lng:this.props.state.longitude 
        }
        return (
            
            <div className="google-map" >
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: this.props.state.key,
                        language: 'en'
                    }}
                    defaultCenter={center}
                    defaultZoom={this.props.state.zoom}
                    defaultDefaultUI="true"
                >
                    <Marker
                        lat={this.props.state.latitude}
                        lng={this.props.state.longitude}
                        name="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default GoogleMap;