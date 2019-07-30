import request from '../utils/request';
import api from '../global/api';
import dataStore from '../utils/dataStore';

const commonModel = {
  login(data) {
    return request.post(api.common.login, data).then(res => {
      dataStore.put('token', res.data.userInfo.token);
      return res;
    }, err => err);
  },
  fetchUserInfo() {
    return new Promise((resolve, reject) => {
      const userInfo = dataStore.get('userInfo');
      if (userInfo) {
        resolve(userInfo);
        return;
      }

      wx.getUserInfo({
        success(res) {
          dataStore.put('userInfo', res);
          resolve(res);
        },
        fail: reject
      });
    })
  },
  fetchLoginInfo() {
    return new Promise((resolve, reject) => {
      wx.login({ //获取code
        success({code}) {
          if (code) {

            wx.getUserInfo({ //获取iv
              success({ encryptedData, iv }) {
                resolve({code, encryptedData, iv });
              },
              fail: reject
            });

            return;
          }

          reject()
        },
        fail: reject
      })
    })
  },
};

export default commonModel;