/*
 ** 全局的内存数据存储类
 ** @methods  put [更新／新建数据]  @return DataStore
 ** @methods  get [获取数据]  @return DataStore
 ** @methods  destroy [清空数据]  @return null
 */

class DataStore {
    static instance: DataStore;
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    private map: Map<any, any>;
    constructor() {
        this.map = new Map();
    }

    put(key:any, Value:any): DataStore {
        if (typeof Value === 'function') { // 保存构造函数实例
            Value = new Value();
        }
        this.map.set(key, Value);
        return this;
    }

    get(key:any): any {
        return this.map.get(key);
    }

    destroy(): void {
        this.map.clear();
    }
}

export default DataStore.getInstance();
