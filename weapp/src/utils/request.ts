const Methods = ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT'];

class SafeRequest {
    static instance: SafeRequest;
    static getInstance() {
        if (!SafeRequest.instance) {
            SafeRequest.instance = new SafeRequest();
        }
        return SafeRequest.instance;
    }

    constructor() {
        Methods.forEach(method => {
            const key = method.toLowerCase();
            this[key] = this._requestInit(method);
        });
    }

    _requestInit(method) {
        return function (url: string, data: any) {
            return new Promise((reslove, reject) => {
                wx.request({
                    url,
                    header: {},
                    data,
                    method,
                    dataType: 'json',
                    success: res => {
                        if (res.statusCode === 200) {
                            reslove(res.data);
                        } else {
                            reject(res);
                        }
                    },
                    fail: reject
                });
            });
        };
    }
}

export default SafeRequest.getInstance();
