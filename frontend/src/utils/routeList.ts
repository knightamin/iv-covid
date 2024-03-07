import React from 'react';

const Login = React.lazy(() => import('../pages/login'));
const Home = React.lazy(() => import('../pages/home'));
const AggregateData = React.lazy(() => import('../pages/aggregateData'));

export const routeList: RouteType[] = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        isPrivate: false,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        isPrivate: true,
    },
    {
        path: '/locations/:locationId',
        name: 'Location',
        component: Home,
        isPrivate: true,
    },
    {
        path: '/aggregate-data',
        name: 'AggregateData',
        component: AggregateData,
        isPrivate: true,
    },
];
