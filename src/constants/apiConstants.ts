export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/account'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorization/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorization/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorization/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
