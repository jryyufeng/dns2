import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';

import routerMap from '../router/router';

let menuData = [];
routerMap.forEach(function (parent) {
    let _parent = Object.assign({}, parent);
    if (parent.children) {
        _parent.children = parent.children.filter((item) => {
            return item.meta && item.meta.title && !item.meta.notMenu;
        });
    }
    if (_parent.children && _parent.children.length) {
        menuData.push(_parent);
    }
});

Vue.use(Vuex);

const state = {
    count: 0,
    userInfo: null,
    pageTitle: '',
    administrator: false,
    menuData
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
