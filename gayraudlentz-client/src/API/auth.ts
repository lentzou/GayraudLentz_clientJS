import {fetchWrapper} from "./fetch";
import {config} from "./config";

export interface loginResp {
    token: string,
    error?: string,
    msg: string
}

export const login = (email: string, password: string) : Promise<loginResp> => {
    const body = JSON.stringify({
        email: email,
        password: password
    });
    return fetchWrapper("POST", config.apiUrl + "auth/login", "", body)
        .then((ret) => {
            return {token: ret.ret.token, msg: ret.ret.msg}
        })
};
