import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export const signupSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name is invalid')
        .required('Name is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
    phone: Yup.string().required('Phone number is Required')
});

export const businessPlaceSchema = Yup.object().shape({
    property_name: Yup.string()
        .required('Property name is required'),
    property_address: Yup.string()
        .required('Property address is required'),
    second_line_address: Yup.string()
        .required('property address is required'),
    city: Yup.string().required('City is Required'),
    postal_code: Yup.string()
        .required('Postal Code is required'),
});

export const menuModalFormSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    description: Yup.string()
        .required('Description is required'),
    sort_order: Yup.string()
        .required('Total selectable items is required'),
    total_cost: Yup.string()
        .required('Total Cost is required'),
});

export const categoryModalFormSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    description: Yup.string()
        .required('Description is required'),
    sort_order: Yup.string()
        .required('Total selectable items is required'),
    total_selectable_items: Yup.string()
        .required('Total selectable items is required'),
});

export const tableReservationSettingSchema = Yup.object().shape({
    table_email: Yup.string()
        .email('Email is invalid')
        .required('Email is required.'),
    table_phone_number: Yup.number()
        .required('Phone number is required.'),
})

export const orderSettingSchema = Yup.object().shape({
    order_email: Yup.string()
        .email('Email is invalid')
        .required('Email is required.'),
    order_phone_number: Yup.number()
        .required('Phone number is required.'),
})

export const serviceSettingSchema = Yup.object().shape({
    service_email_setting: Yup.string()
        .email('Email is invalid')
        .required('Email is required.'),
    service_phone_number: Yup.number()
        .required('Phone number is required.'),
})