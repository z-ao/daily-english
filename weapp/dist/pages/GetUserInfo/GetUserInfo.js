import dataStore from '../../utils/dataStore';
import commonModel from '../../models/common';

Page({
    onLoad() {
        commonModel.fetchUserInfo().then(() => {
            wx.reLaunch({url: '/pages/index/index'})
        });
    },
    onGotUserInfo: function (evt) {
        const {userInfo} = evt.detail;
        dataStore.put('userInfo', userInfo);
        wx.reLaunch({url: '/pages/index/index'});
    }
});
