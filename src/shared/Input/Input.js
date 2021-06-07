import React, { Fragment } from 'react'

export const Input = (props) => {
    return (
        <Fragment>
            <div className="form-group">
                <label>First name</label>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="First name" defaultValue="John" />
                </div>
            </div>
        </Fragment>
    )
}
