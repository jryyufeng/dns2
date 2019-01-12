const test1 = () => import('./children/test1.vue');
const test2 = () => import('./children/test2.vue');
const router = [
    {
        path: 'test1',
        name: 'test1',
        component: test1,
        meta: {
            title: '测试1'
        }
    },
    {
        path: 'test2',
        name: 'test2',
        component: test2,
        meta: {
            title: '测试2'
            // notMenu: true
        }
    }
];

export default router;
