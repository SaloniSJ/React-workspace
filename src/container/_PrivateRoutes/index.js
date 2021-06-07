import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import Sidenavigation from '../../components/layouts/Sidenavigation'
import Topnavigation from '../../components/layouts/Topnavigation'
import Quickbar from '../../components/layouts/Quickbar'

export default class index extends Component {
    render() {

        const Component = this.props.component
        this.props = { ...this.props, component: null }
        return (
            <Fragment>
                <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                    <Sidenavigation />
                    <main className="body-content">
                        <Topnavigation />
                        <div className="ms-content-wrapper">
                            <div className="row">
                                <div className="col-md-12">
                                    <Route
                                        {...this.props}
                                        render={props => <Component {...props} />}
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                    <Quickbar />
                </div>

            </Fragment>
        )
    }
}
