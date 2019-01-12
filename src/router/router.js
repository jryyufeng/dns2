import test from '../pages/test1/router-config'
import test2 from '../pages/test2/router-config'
const routerMap = [
    // default
    {
        path: '/',
        redirect: {name: 'test1'}
    },
    // 测试模块
    {
        path: '/test',
        name: 'test',
        component: require('../pages/test1/index').default,
        meta: {
            title: '测试模块'
        },
        children: test
    },
    // 测试模块2
    {
        path: '/test2',
        name: 'test2',
        component: require('../pages/test2/index').default,
        meta: {
            title: '测试模块2'
        },
        children: test2
    }
];

export default routerMap;
