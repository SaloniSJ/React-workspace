export const ADD_BUSINESS_PROPERTY='/test/business/property/add-business-property'
export const DELETE_BUSINESS_PROPERTY='/test/business/property/add-business-property'
export const FETCH_BUSINESS_PROPERTY='/test/business/property/fetch-business-property-details/'
export const UPDATE_BUSINESS_PROPERTY='/test/business/property/update-business-property'

// export const SIGNOUT='/test/business/authentication/signout'
export const VERIFY_TOKEN='/test/business/authentication/verify-token'

export const UPDATE_EMAIL='/test/business/authentication/update-business-user-email?new_email='
export const VERIFY_EMAIL='/test/business/authentication/verify-business-user-email?otp='
// export const ADD_PROFILE_DETAILS='/test/business/profile/upload-profile-data'
// export const UPDATE_PROFILE_DETAILS='/test/business/profile/upload-profile-data'
// export const UPDATE_PROFILE_PHOTO='/test/business/profile/upload-profile-data'
// export const DELETE_ADMIN_PROFILE_PHOTO='/test/business/profile/delete-profile-photo'
// export const UPLOAD_PROFILE_PHOTO='/test/business/profile/upload-profile-photo'
// export const UPLOAD_COVER_PHOTO='/test/business/profile/upload-cover-photo'
// export const FETCH_PROFILE_DETAILS='profile/fetch-profile-details/'
export const RESET_PASSWORD='/test/business/authentication/reset-password'
export const FETCH_MFA_DETAILS_BY_EMAIL='/test/business/authentication/fetch-mfa-details-by-email/'
export const NEED_PASSWORD_CHANGE_BY_EMAIL='/test/business/authentication/need-password-change/'
export const NEED_PASSWORD_CHANGE_UPDATE='/test/business/authentication/force-password-change-signin'

export const UPDATE_SUPER_ADMIN_PROFILE_DETAILS='/test/business/profile/upload-profile-data'
export const UPDATE_SUPER_ADMIN_PROFILE_PHOTO='/test/business/profile/upload-profile-photo'
export const DELETE_SUPER_ADMIN_PROFILE_PHOTO='/test/business/profile/delete-profile-photo'
export const FETCH_SUPER_ADMIN_PROFILE_DETAILS='/test/business/profile/fetch-profile-details/'

export const FETCH_ALL_CURRENCIES='/test/business/property/fetch-all-currencies'
export const FETCH_GOOGLE_API_KEY='/test/business/google/fetch-google-api-key'
export const FETCH_BUSINESS_TYPE='/test/business/property/fetch-all-business-type'
export const FETCH_LATITUDE_AND_LONGITUDE_BY_ADDRESS='/test/business/property/fetch-longitude-and-latitude-by-address?address='

export const ADD_MENU='/test/business/menu/add-menu'
export const UPDATE_MENU='/test/business/menu/update-menu'
export const FETCH_ALL_MENU='/test/business/menu/fetch-all-menu?property_id='
export const DELETE_MENU='/test/business/menu/delete-menu?menu_id='

export const ADD_CATEGORY='/test/business/category/add-category'
export const FETCH_CATEGORY='/test/business/category/fetch-all-categories?menu_id='
export const DELETE_CATEGORY='/test/business/category/delete-category?category_id='
export const UPDATE_CATEGORY='/test/business/category/update-category'

export const ADD_ITEM='/test/business/item/add-item'
export const UPDATE_ITEM='/test/business/item/update-item'
export const FETCH_ITEM='/test/business/item/fetch-all-item?category_id='
export const DELETE_ITEM='/test/business/item/delete-item?item_id='
export const FETCH_ITEM_BY_ITEM_ID='/test/business/item/fetch-item-by-item-id?item_id='

export const FETCH_ORDER='/test/business/order/fetch-orders?page='
export const SEARCH_ORDER='/test/business/order/filter-orders?page='
export const FETCH_TODAYS_ORDER='/test/business/order/fetch-todays-orders?page='
export const FETCH_ORDER_DETAILS_BY_ORDER_ID='/test/business/order/fetch-order-item-details?order_id='

export const CREATE_PAYMENT_ACCOUNT='/test/business/account/create-account'
export const FETCH_ACCOUNT_DETAILS='/test/business/account/fetch-account?property_id='
export const FETCH_ACCOUNT_ID='/test/business/property/fetch-account-id/'
export const UPDATE_BANK_DETAILS='/test/business/account/update-bank-details'
export const UPDATE_COMPANY_DETAILS='/test/business/account/update-company-details'
export const UPDATE_PERSONAL_DETAILS='/test/business/account/create-person-with-documents'
export const UPDATE_TERMS_AND_CONDITION='/test/business/account/update-tos-acceptance?property_id='
export const FETCH_MCC_MERCHANT_CATEGORY_CODE='/test/business/account/fetch-merchant-codes'
export const FETCH_STRIPE_TERMS_AND_CONDITION='/test/business/account/fetch-tos-details?country_code='

export const FETCH_PAYOUT_DETAILS='/test/business/account/fetch-payout-details?payout_id='
export const FETCH_PAYOUT='/test/business/account/fetch-payouts?property_id='
export const FETCH_ORDER_DETAILS_BY_PAYOUT_ID='/test/business/account/fetch-payment-details?payment_id='
export const UPDATE_TAX_DETAILS='/test/business/property/update-tax-details'

export const ADD_TABLE='/test/business/property/add-table-info'
export const FETCH_TABLE_DETAILS='/test/business/property/fetch-requested-table-info?page='
export const FETCH_VACANT_TABLE_DETAILS='/test/business/property/fetch-table-info?page='
export const APPROVE_TABLE_REQUEST='property/approve-table-request/'
export const REJECT_TABLE_REQUEST='/test/business/property/reject-table-request/'

export const FETCH_ALL_NOTIFICATION='/test/business/profile/fetch-all-notification?page='