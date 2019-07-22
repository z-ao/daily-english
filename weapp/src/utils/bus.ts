class Bus {
    static instance: Bus;
    static getInstance() {
        if (!Bus.instance) {
            Bus.instance = new Bus();
        }
        return Bus.instance;
    }

    private _watcher: {[propName: string]: Array<Function>} = {};

    constructor() {

    }

    on(name: string, handler: Function): Bus {

        if (this._watcher[name]) {
            this._watcher[name].push(handler);
        } else {
            this._watcher[name] = [handler];
        }
        return this;
    }

    emit(name: string, ...args: any): void {
        if (!this._watcher[name]) return;

        this._watcher[name].forEach(handler => {
            handler(...args);
        });
    }

    off(name: string, handler: Function): Bus {
        const index = this._watcher[name].indexOf(handler);

        if (index < 0) return this;
        this._watcher[name].splice(index, 1);
        return this;
    }
}


export default Bus.getInstance();
