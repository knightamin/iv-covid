import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';

import { authService } from '../services/auth/auth.service';
import { sidebarList } from '../utils/sidebarList';
import { errorToast } from '../utils/toast';

type Props = {
    toggled: boolean;
    setBroken: (broken: boolean) => void;
    closeMenu: () => void;
};

function MySidebar({ toggled, setBroken, closeMenu }: Props) {
    const navigate = useNavigate();
    const data = localStorage.getItem('_user');
    let user = {} as UserResponse;
    if (data) {
        user = JSON.parse(data) as UserResponse;
    }

    const onLogout = async () => {
        const isLoggedOut = await authService.signout();

        if (isLoggedOut) {
            localStorage.removeItem('_user');
            navigate('/login', { replace: true });
        } else {
            errorToast('Error on singnout');
            return;
        }
    };

    return (
        <Sidebar
            toggled={toggled}
            customBreakPoint="800px"
            onBreakPoint={setBroken}
            onBackdropClick={closeMenu}
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: 'hsl(206, 70%, 96%)',

                    height: '100%',
                },
            }}
        >
            <div className="p-4 has-background-info has-text-white">
                <div className="is-flex is-align-items-start">
                    <img src="/images/user.png" width="48" className="ml-2" />
                    <div>
                        <div className="ml-2 is-size-5">{`${user.name}`}</div>
                    </div>
                </div>
            </div>
            <Menu
                menuItemStyles={{
                    button: {
                        [`&.active`]: {
                            backgroundColor: '#13395e',
                            color: '#b6c8d9',
                        },
                    },
                }}
            >
                {sidebarList.map((menu) => (
                    <MenuItem key={menu.id} component={<Link to={menu.link} />}>
                        {menu.title}
                    </MenuItem>
                ))}
                <MenuItem onClick={onLogout} className="has-text-danger ">
                    Signout
                </MenuItem>
            </Menu>
        </Sidebar>
    );
}

export default MySidebar;
