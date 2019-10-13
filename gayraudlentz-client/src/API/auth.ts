import {fetchWrapper} from "./fetch";
import {config} from "./config";

export interface loginResp {
    token: string,
    msg: string
}

export interface error {
    value: string,
    msg: string,
    param: string,
    location: string
}

export interface registerResp {
    msg: string,
    errors?: error[],
}

export const login = (email: string, password: string) : Promise<loginResp> => {
    const body = JSON.stringify({
        email: email,
        password: password
    });
    return fetchWrapper("POST", config.apiUrl + "auth/login", "", body)
        .then((ret) => {
            return {token: ret.ret.token, msg: ret.ret.msg, errors: ret.ret.errors}
        })
};

export const register = (email: string, password: string, username: string) : Promise<registerResp> => {
    const body = JSON.stringify({
        email: email,
        password: password,
        username: username
    });
    return fetchWrapper("POST", config.apiUrl + "auth/register", "", body)
        .then((ret) => {
            return {msg: ret.ret.msg, errors: ret.ret.errors}
        })
};
