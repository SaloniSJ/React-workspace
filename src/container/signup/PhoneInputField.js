import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import PropTypes from 'prop-types';
import { getIn, ErrorMessage } from 'formik';


const PhoneInputField = (props) => {
  const {
    field: { name, value },
    form: {
      errors, handleBlur, setFieldValue, touched,
      setFieldError,setFieldTouched
    },
    country,
    disabled,
    inputStyle
  } = props;

  const [isFocused, setFocused] = useState(false);
  const isError = getIn(touched, name) && getIn(errors, name);
  const errorStyle = isError ? 'error' : '';
  const filledStyle = (isFocused || value) ? 'filled' : '';
  const disabledStyle = disabled ? 'disabled' : '';

  const handleInputBlur = (e) => {
    setFocused(false);
    setFieldTouched(name,true,true)
    handleBlur(e);
  };

  // const handleInputFocus = () => setFocused(true);

  const onValueChange = (phoneNumber) => {
    setFieldValue(name, phoneNumber,true);
    if(phoneNumber===''){
      setFieldError(name,'Phone number is required')
    }
    // if (onChange !== null) {
    //   onChange(phoneNumber);
    // }
  };

  return (
    <div className={`${errorStyle} ${filledStyle} ${disabledStyle}`}>
      <PhoneInput
        placeholder="Enter phone number"
        name={name}
        value={value}
        onChange={onValueChange}
        country={country}
        onBlur={handleInputBlur}
        inputStyle={inputStyle}
      />
       <ErrorMessage name={name} className="invalid-feedback" />
    </div>
  );
};

PhoneInputField.propTypes = {
  className: PropTypes.string,
  form: PropTypes.any.isRequired,
  field: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  country: PropTypes.string,
  disabled: PropTypes.bool,
};

// PhoneInputField.defaultProps = {
//   className: '',
//   label: '',
//   onChange: null,
//   country: '',
//   disabled: false,
// };

export default PhoneInputField;
