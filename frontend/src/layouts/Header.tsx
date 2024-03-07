import { useLocation } from 'react-router-dom';
import { sidebarList } from '../utils/sidebarList';

function Header() {
    const location = useLocation();

    return (
        <div className="has-text-center box has-background-light">
            <h1 className="is-size-3 has-text-info">
                {sidebarList.find((itmn) => itmn.link === location.pathname)
                    ? sidebarList.find(
                          (itmn) => itmn.link === location.pathname
                      )?.title
                    : location.pathname}
            </h1>
        </div>
    );
}

export default Header;
