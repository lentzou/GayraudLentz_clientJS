type methodType = "GET" | "POST" | "DELETE" | "PATCH"

interface generic {
    error?: string
    statusCode: number
    ret: any
}

export interface genericSuccess {
    success: boolean
    msg?: string
}

export async function fetchWrapper(method: methodType, url: string, token: string, body?: string): Promise<generic>{
    let toRet: generic;
    toRet = {statusCode: 0, ret: {}};
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        },
        body: body
    })
        .then(response => {
            toRet.statusCode = response.status;
            return response.json();
        })
        .then(responseJSON => {
            toRet.ret = responseJSON;
            return toRet;
        })
        .catch(error => {
            toRet.error = error;
            return toRet
        })
}
