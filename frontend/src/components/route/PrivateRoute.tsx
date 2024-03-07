import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { authService } from '../../services/auth/auth.service';

type props = {
    children: JSX.Element;
    // user: UserAuth;
};

function PrivateRoute({ children }: props) {
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const result: boolean = await authService.checkUser();
            if (!result) {
                return navigate('/login', { replace: true });
            }
        };

        checkSession();
    }, [children]);

    return children;
}

export default PrivateRoute;
