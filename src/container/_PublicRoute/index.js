import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

export default class index extends Component {
    render() {
        return (
            <Fragment>
                <Route
                    {...this.props}
                    render={props=><Component {...props}/>}
                />
            </Fragment>
        )
    }
}
