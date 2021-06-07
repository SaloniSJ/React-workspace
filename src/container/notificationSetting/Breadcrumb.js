import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Breadcrumb extends Component {

    render() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb pl-0">
                    <li className="breadcrumb-item"><Link to="/dashboard"><i className="material-icons">home</i> Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/setting">Setting</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Notification</li>
                </ol>
            </nav>
        );
    }
}

export default Breadcrumb;