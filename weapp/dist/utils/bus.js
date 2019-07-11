class Bus {
    static getInstance() {
        if (!Bus.instance) {
            Bus.instance = new Bus();
        }
        return Bus.instance;
    }

    constructor() {
        this._watcher = {};
    }

    on(name, handler) {
        if (!(handler instanceof Function)) {
            throw Error('第二个参数应该是函数,但获取的是' + typeof handler);
        }

        if (this._watcher[name]) {
            this._watcher[name].push(handler);
        } else {
            this._watcher[name] = [handler];
        }
        return this;
    }

    emit(name, ...args) {
        if (!this._watcher[name]) return;

        this._watcher[name].forEach(handler => {
            handler(...args);
        });
    }

    off(name, handler) {
        const index = this._watcher[name].indexOf(handler);

        if (index < 0) return this;
        this._watcher[name].splice(index, 1);
        return this;
    }
}


export default Bus.getInstance();
