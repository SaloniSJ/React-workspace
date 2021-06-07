import React, { Fragment } from 'react';
import { Accordion, Card } from "react-bootstrap";

export const AppTiming = (props) => {
    const {
        delivery_timings,
        dine_in_timings,
        property_timing,
        take_away_timing,
    } = props.state
    return (

        <Fragment>
            {console.log("Property Timing :: ", property_timing, "Props : ", props)}
            <div className="ms-panel ms-panel-fh">
                <div className="ms-panel-body">
                    <Accordion defaultActiveKey="0" className="has-gap ms-accordion-chevron">
                        <Card>
                            <Accordion.Collapse className="collapseparent" eventKey="0">
                                <Card.Body>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <label>Day</label>
                                        </div>
                                        <div className="col-md-3">
                                            <label>Open/Close</label>
                                        </div>
                                        <div className="col-md-3">
                                            <label>Open Time</label>
                                        </div>
                                        <div className="col-md-3">
                                            <label>Close Time</label>
                                        </div>
                                    </div>
                                    {property_timing.map((property_timing, i) => (
                                        <div className="row" key={i}>
                                            <div className="col-md-3">
                                                <div className="form-group">

                                                    <div className="input-group">
                                                        <input type="text" value={property_timing.day} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3">

                                                <div className="input-group">
                                                    <select className="form-control" name="status" value={property_timing.status}
                                                        onChange={(e) => props.onPropertyChange(e.target.value, 'status', i)}>
                                                        <option value="">Select</option>
                                                        <option key="1" value="OPEN">OPEN</option>
                                                        <option key="2" value="CLOSE">CLOSE</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-group">

                                                    <div className="input-group">
                                                        <input type="time" disabled={property_timing.status == 'CLOSE'} value={property_timing.open_time} onChange={(e) => props.onPropertyChange(e.target.value, "open_time", i)} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-group">

                                                    <div className="input-group">
                                                        <input type="time" className="form-control"
                                                            onChange={(e) => props.onPropertyChange(e.target.value, "close_time", i)} disabled={property_timing.status == 'CLOSE'} value={property_timing.close_time} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button onClick={() => props.updatePropertyTime(property_timing)} className="btn btn-primary d-block float-right">Update</button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                <span className="has-icon"> <i style={{ marginTop: '5px' }} class="fas fa-building" /> Property Timing </span>
                            </Accordion.Toggle>
                        </Card>
                        <Card>
                            <Accordion.Collapse className="collapseparent" eventKey="3">
                                <Card.Body>
                                    {take_away_timing.map((tt, i) => (
                                        <div className="row" key={i}>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    {/* <label>Day</label> */}
                                                    <div className="input-group">
                                                        <input type="text" value={tt.day} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    {/* <label>Open Time</label> */}
                                                    <div className="input-group">
                                                        <input type="time" onChange={(e) => props.onTakeAwayTimingChange(e.target.value, "open_time", i)} value={tt.open_time} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    {/* <label>Close Time</label> */}
                                                    <div className="input-group">
                                                        <input type="time" className="form-control" onChange={(e) => props.onTakeAwayTimingChange(e.target.value, "close_time", i)} value={tt.close_time} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button className="btn btn-primary d-block float-right" onClick={() => props.updateTakeAwayTime(take_away_timing)}>Update</button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                                <span className="has-icon"> <i className="flaticon-conversation" /> Take Away Timing </span>
                            </Accordion.Toggle>
                        </Card>
                        <Card>
                            <Accordion.Collapse className="collapseparent" eventKey="1">
                                <Card.Body>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Day</label>
                                        </div>

                                        <div className="col-md-4">
                                            <label>Open Time</label>
                                        </div>
                                        <div className="col-md-4">
                                            <label>Close Time</label>
                                        </div>
                                    </div>
                                    {delivery_timings.map((dt, i) => (
                                        <div className="row" key={i}>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="text" value={dt.day} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="time" onChange={(e) => props.onDeliveryTimingChange(e.target.value, "open_time", i)} value={dt.open_time} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="time" className="form-control" onChange={(e) => props.onDeliveryTimingChange(e.target.value, "close_time", i)} value={dt.close_time} />
                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                    ))}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button onClick={() => props.updateDeliveryTime(delivery_timings)} className="btn btn-primary d-block float-right" type="button">Update</button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                <span className="has-icon"> <i className="flaticon-email" /> Delivery Timing </span>
                            </Accordion.Toggle>
                        </Card>
                        <Card>
                            <Accordion.Collapse className="collapseparent" eventKey="2">
                                <Card.Body>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Day</label>
                                        </div>

                                        <div className="col-md-4">
                                            <label>Open Time</label>
                                        </div>
                                        <div className="col-md-4">
                                            <label>Close Time</label>
                                        </div>
                                    </div>
                                    {dine_in_timings.map((dit, i) => (
                                        <div className="row" key={i}>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="text" value={dit.day} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="time" onChange={(e) => props.onDineInChange(e.target.value, "open_time", i)} value={dit.open_time} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="time" className="form-control" onChange={(e) => props.onDineInChange(e.target.value, "close_time", i)} value={dit.close_time} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="row">
                                        <div className="col-md-12">
                                            <button onClick={() => props.updateDineInTiming(dine_in_timings)} className="btn btn-primary d-block float-right">Update</button>
                                        </div>
                                    </div>

                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                <span className="has-icon"> <i style={{ marginTop: '5px' }} class="fab fa-first-order" /> Dine In Timing </span>
                            </Accordion.Toggle>
                        </Card>
                        
                    </Accordion>
                </div>
            </div>
        </Fragment>
    )
}

export default AppTiming;
