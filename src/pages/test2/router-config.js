const test21 = () => import('./children/test21.vue');
const test22 = () => import('./children/test22.vue');
const router = [
    {
        path: 'test21',
        name: 'test21',
        component: test21,
        meta: {
            title: '测试21'
        }
    },
    {
        path: 'test22',
        name: 'test22',
        component: test22,
        meta: {
            title: '测试22'
            // notMenu: true
        }
    }
];

export default router;
