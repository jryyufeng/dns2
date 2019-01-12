import Vue from 'vue'
import Router from 'vue-router'
import routes from './router';
Vue.use(Router)

const router = new Router({
    routes
});
// 菜单选中状态
function updateActive (to) {
    let menuData = store.state.menuData;
    for (let i = 0, l = menuData.length; i < l; i++) {
        for (let j = 0, k = menuData[i].children.length; j < k; j++) {
            if (to.name === menuData[i].children[j].name || to.meta.activeMenu === menuData[i].children[j].name) {
                store.commit('SET_MENU_ACTIVE_STATUS', menuData[i].children[j].name);
            }
        }
    }
}
// console.log(router);
export default router;