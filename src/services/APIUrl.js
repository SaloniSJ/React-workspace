//Backend Connectivity URL

export const APIBaseURL='http://18.133.81.78:8086/business'
// export const APIBaseURL='https://backend.kayana.co.uk/business';

//Fetch Location-API URL
export const FETCH_LOCATION='https:/ipapi.co/json/'

// SIGN-IN Service Call URL
export const SIGNIN='/authentication/signin'
export const FORGOT_PASSWORD='/authentication/forgot-password/'
export const CONFIRM_FORGOT_PASSWORD='/authentication/confirm-forgot-password/'
export const SIGNUP='/authentication/signup'
export const CONFIRM_SIGNUP='/authentication/confirm-signup'
export const MFA_ENABLED='/authentication/fetch-mfa-details-by-username'
export const FETCH_TERMS_AND_CONDITION='/authentication/fetch-tnc'
export const RESEND_OTP='/authentication/resend-otp/'
export const SIGNOUT='/authentication/signout'
export const VERIFY_TOKEN='/authentication/verify-token'
export const UPDATE_EMAIL='/authentication/update-business-user-email?new_email='
export const RESET_PASSWORD='/authentication/reset-password'
export const FETCH_MFA_DETAILS_BY_EMAIL='/authentication/fetch-mfa-details-by-email/'
export const NEED_PASSWORD_CHANGE_BY_EMAIL='/authentication/need-password-change/'
export const NEED_PASSWORD_CHANGE_UPDATE='/authentication/force-password-change-signin'

export const ADD_BUSINESS_PROPERTY='/property/add-business-property'
export const DELETE_BUSINESS_PROPERTY='/property/add-business-property'
export const FETCH_BUSINESS_PROPERTY='/property/fetch-business-property-details/'
export const UPDATE_BUSINESS_PROPERTY='/property/update-business-property'

export const VERIFY_EMAIL='authentication/verify-business-user-email?otp='

export const ADD_PROFILE_DETAILS='/profile/upload-profile-data'
export const UPDATE_PROFILE_DETAILS='/profile/upload-profile-data'
export const UPDATE_PROFILE_PHOTO='/profile/upload-profile-data'
export const DELETE_ADMIN_PROFILE_PHOTO='/profile/delete-profile-photo'
export const UPLOAD_PROFILE_PHOTO='/profile/upload-profile-photo'
export const UPLOAD_COVER_PHOTO='/profile/upload-cover-photo'
export const FETCH_PROFILE_DETAILS='/profile/fetch-profile-details/'
export const UPDATE_SUPER_ADMIN_PROFILE_DETAILS='/profile/upload-profile-data'
export const UPDATE_SUPER_ADMIN_PROFILE_PHOTO='/profile/upload-profile-photo'
export const DELETE_SUPER_ADMIN_PROFILE_PHOTO='/profile/delete-profile-photo'
export const FETCH_SUPER_ADMIN_PROFILE_DETAILS='/profile/fetch-profile-details/'

export const FETCH_BUSINESS_TYPE='/property/fetch-all-business-type'
export const FETCH_LATITUDE_AND_LONGITUDE_BY_ADDRESS='/property/fetch-longitude-and-latitude-by-address?address='
export const FETCH_ALL_CURRENCIES='/property/fetch-all-currencies'
export const FETCH_GOOGLE_API_KEY='/google/fetch-google-api-key'

export const ADD_MENU='/menu/add-menu'
export const UPDATE_MENU='/menu/update-menu'
export const FETCH_ALL_MENU='/menu/fetch-all-menu?property_id='
export const DELETE_MENU='/menu/delete-menu?menu_id='

export const ADD_CATEGORY='/category/add-category'
export const FETCH_CATEGORY='/category/fetch-all-categories?menu_id='
export const DELETE_CATEGORY='/category/delete-category?category_id='
export const UPDATE_CATEGORY='/category/update-category'

export const ADD_ITEM='/item/add-item'
export const UPDATE_ITEM='/item/update-item'
export const FETCH_ITEM='/item/fetch-all-item?category_id='
export const DELETE_ITEM='/item/delete-item?item_id='
export const FETCH_ITEM_BY_ITEM_ID='/item/fetch-item-by-item-id?item_id='

export const FETCH_ORDER='/order/fetch-orders?page='
export const SEARCH_ORDER='/order/filter-orders?page='
export const FETCH_TODAYS_ORDER='/order/fetch-todays-orders?page='
export const FETCH_ORDER_DETAILS_BY_ORDER_ID='/order/fetch-order-item-details?order_id='
export const UPDATE_ORDER_STATUS='/order/update-order-status?order-id='
export const UPDATE_ORDER_ITEM_STATUS='/order/update-order-item-status?order-id='
export const FETCH_BUSINESS_TIMING='/timing/fetch-business-timings?property_id='

export const UPDATE_DELIVERY_TIMING='/timing/update-delivery-timings'
export const UPDATE_DINE_IN_TIMING='/timing/update-dine-in-timings'
export const UPDATE_TAKEAWAY_TIMING='/timing/update-take-away-timings'
export const UPDATE_PROPERTY_TIMING='/timing/update-property-timings'

export const CREATE_PAYMENT_ACCOUNT='/account/create-account'
export const FETCH_ACCOUNT_DETAILS='/account/fetch-account?property_id='
export const FETCH_ACCOUNT_ID='/property/fetch-account-id/'
export const UPDATE_BANK_DETAILS='/account/update-bank-details'
export const UPDATE_COMPANY_DETAILS='/account/update-company-details'
export const UPDATE_PERSONAL_DETAILS='/account/create-person-with-documents'
export const UPDATE_TERMS_AND_CONDITION='/account/update-tos-acceptance?property_id='
export const FETCH_MCC_MERCHANT_CATEGORY_CODE='/account/fetch-merchant-codes'
export const FETCH_STRIPE_TERMS_AND_CONDITION='/account/fetch-tos-details?country_code='

export const FETCH_PAYOUT_DETAILS='/account/fetch-payout-details?payout_id='
export const FETCH_PAYOUT='/account/fetch-payouts?property_id='
export const FETCH_ORDER_DETAILS_BY_PAYOUT_ID='/account/fetch-payment-details?payment_id='
export const UPDATE_TAX_DETAILS='/property/update-tax-details'

export const ADD_TABLE='/property/add-table-info'
export const FETCH_TABLE_DETAILS='/property/fetch-requested-table-info?page='
export const FETCH_VACANT_TABLE_DETAILS='/property/fetch-table-info?page='
export const APPROVE_TABLE_REQUEST='property/approve-table-request/'
export const REJECT_TABLE_REQUEST='/property/reject-table-request/'
export const UPDATE_TABLE_RESERVATION_DETAILS='/property/update-table-info-by-id'

export const FETCH_ALL_NOTIFICATION='/profile/fetch-all-notification?page='
export const PUSH_ORDER_NOTIFICATION_TO_USER='/notification/notify-user-on-order-update'
export const FETCH_ORDER_MESSAGES='/order/fetch-order-messages'
export const UPDATE_NOTIFICATION_SETTING='/notification/update-notification-settings'

export const FETCH_LOGIN_SESSION='/authentication/fetch-login-sessions/'
export const UPLOAD_FEATURED_IMAGE='/property/add-preferred-image-or-video'
export const DUPLICATE_ITEM='/item/clone-item?item_id='

export const GET_NOTIFICATION_SETTING='/notification/get-notification-settings?property_id='