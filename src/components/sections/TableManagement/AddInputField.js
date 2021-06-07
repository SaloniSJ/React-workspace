import React, { useState, Fragment } from "react";


function AddInputField() {
    const [fields, setFields] = useState([{ value: null }]);

    function handleChange(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
    }

    function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    return (
        <Fragment>


            <button type="button" onClick={() => handleAdd()}>
                <i class="fa fa-plus-square" aria-hidden="true" style={{ 'fontSize': '20px', 'color': 'black' }}></i>
            </button>

            {fields.map((field, idx) => {
                return (
                    <div key={`${field}-${idx}`}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter text"
                            value={field.value || ""}
                            onChange={e => handleChange(idx, e)}
                        />
                        <button type="button" onClick={() => handleRemove(idx)}>
                            X
            </button>
                    </div>
                );
            })}
        </Fragment>
    );
}

export default AddInputField;
