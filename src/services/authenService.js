import { postFormAsync, getAsync } from "../helper/request";
const API_URL = process.env.REACT_APP_API_URL;
export const authenService = {
    login,
    logout,
    getAccountInfo,
    checkAuthen,
    // changePassword
}

function checkAuthen() {
    return true;
}

async function login(options) {
    const { username, password } = options;
    let bodyFormData = new FormData();
    bodyFormData.set('username', username);
    bodyFormData.set('password', password);
    bodyFormData.set('grant_type', "password");
    bodyFormData.set('client_id', process.env.REACT_APP_OIDC_CLIENT_ID);
    const response = await postFormAsync(process.env.REACT_APP_AUTHORIZATION_ISSUER + '/connect/token', bodyFormData);
    return response;
}

function logout() {

}

async function getAccountInfo() {
    const url = API_URL + '/me'
    const { status, data } = await getAsync(url)
    if (status !== 200 || !data?.data)
        return null;
    return data?.data;
}