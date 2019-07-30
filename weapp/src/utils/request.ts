const Methods = ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT'];

class SafeRequest {
    [propName: string]: Function;

    static instance: SafeRequest;
    static getInstance() {
        if (!this.instance) {
            this.instance = new SafeRequest();
        }
        return this.instance;
    }

    constructor() {
        Methods.forEach(method => {
            const key = method.toLowerCase();
            this[key] = this._requestInit(method);
        });
    }

    _requestInit(method) {
        return function (url: string, data?: any): Promise<string | object | ArrayBuffer> {
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
