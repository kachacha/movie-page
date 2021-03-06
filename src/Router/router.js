import Vue from 'vue';
import VueRouter from 'vue-router';
import Content from '../components/Content'
import Play from '../components/Play'
// import Video from '../components/Video/Video'
import M3u8 from '../components/Video/M3u8'
import miss from '../components/404'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Content',
        component: Content
    },
    {
        path: '/play',
        name: 'Play',
        component: Play
    },
    {
        path: '/m3u8',
        name: 'M3u8',
        component: M3u8
    },
    {
        path: '*',
        name: '404',
        component: miss
    }
];

export default new VueRouter({
    mode: 'history',
    routes
})