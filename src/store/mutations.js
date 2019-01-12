import Vue from 'vue';

export default {
    // 记录用户信息
    RECORD_USERINFO (state, info) {
        state.userInfo = info;
    },
    // 改变访问权限
    SET_ADMIN_AUTH (state, haveAuth) {
        state.administrator = haveAuth;
    },

    // 更新菜单状态
    SET_MENU_ACTIVE_STATUS (state, key) {
        const menuData = state.menuData;
        const selectParent = menuData.some((parent) => {
            if (parent.name === key) {
                Vue.set(parent, 'active', !parent.active);
                return true;
            }
            return false;
        });

        if (!selectParent) {
            for (let j = 0, k = menuData.length; j < k; j++) {
                const parent = menuData[j];
                const children = parent.children;
                for (let i = 0, l = children.length; i < l; i++) {
                    if (children[i].name === key) {
                        Vue.set(children[i], 'active', true);
                        Vue.set(parent, 'active', true);
                    } else {
                        Vue.set(children[i], 'active', false);
                    }
                }
            }
        }
    }
};
