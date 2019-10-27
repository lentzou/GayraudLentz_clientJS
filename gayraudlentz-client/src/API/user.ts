import {fetchWrapper} from "./fetch";
import {config} from "./config";

export interface userInfos {
    user: {
        id: number,
        firstname: string
        lastname: string
        email: string
        username: string
        password: string
        description: string
    },
    msg: string
}

export const getMyInfos = (token: string) : Promise<userInfos> => {
    return fetchWrapper("GET", config.apiUrl + "users/me", token)
        .then((ret) => {
            return {msg : ret.ret.msg, user: ret.ret.user};
        })
};

export const patchMyInfos = (token: string, username: string, description: string) : Promise<userInfos> => {
    const body = JSON.stringify({
        username: username,
        description: description
    });
    return fetchWrapper("PATCH", config.apiUrl + "users/me", token, body)
        .then((ret) => {
            return {msg : ret.ret.msg, user: ret.ret.user};
        })
};
