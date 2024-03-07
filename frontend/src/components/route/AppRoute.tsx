import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { routeList } from '../../utils/routeList';

import Loader from '../common/Loader';

function AppRoutes() {
    return (
        <Suspense fallback={<Loader />}>
            <BrowserRouter>
                <Routes>
                    {routeList
                        .filter((route) => route.isPrivate === true)
                        .map((r) => (
                            <Route
                                key={r.name}
                                path={r.path}
                                element={
                                    <PrivateRoute>
                                        <r.component />
                                    </PrivateRoute>
                                }
                            ></Route>
                        ))}

                    {routeList
                        .filter((route) => route.isPrivate === false)
                        .map((r) => (
                            <Route
                                key={r.name}
                                path={r.path}
                                element={<r.component />}
                            />
                        ))}
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default AppRoutes;
