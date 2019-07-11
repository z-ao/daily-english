import Schema from '../plugins/async-validator';

/*
 ** 表单验证 参考[https://github.com/tmpfs/async-validate]
 ** @init   初始化是传入验证规则  e.g new validator(rules)
 ** @prop _schema { Object }   async validator实例
 ** @methods validate   调用验证方法,传入数据.  @returm { Object / null } errs e.g validator.validate(data, opt)
 ** @methods validateSingle   调用验证方法,传入数据,失败返回一个错误  @returm { string / null } err
 */

class validator {
    constructor(rules) {
        this._schema = new Schema(rules);
    }

    validate(data, opt) {
        return new Promise((reslove, reject) => {
            this._schema.validate(data, opt, (err, stat) => {
                err && reject(stat);
                !err && reslove();
            });
        });
    }

    validateSingle(data, opt) {
        return this.validate(data, opt).catch(errs => {
            let ret;
            for (const value of Object.values(errs)) {
                ret = value[0].message;
                break;
            }
            return Promise.reject(ret);
        });
    }
}

export default validator;
