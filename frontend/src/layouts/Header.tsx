import { useLocation } from 'react-router-dom';
import { sidebarList } from '../utils/sidebarList';

type Props = {
    broken: boolean;
    setToggled: () => void;
};

function Header({ broken, setToggled }: Props) {
    const location = useLocation();

    return (
        <div className="has-text-center box has-background-light">
            <div className="is-flex is-align-items-center">
                <div>
                    {broken && (
                        <button
                            className="button is-primary mx-2"
                            onClick={setToggled}
                        >
                            ☰
                        </button>
                    )}
                </div>
                <h1 className="is-size-3 has-text-info">
                    {sidebarList.find((itmn) => itmn.link === location.pathname)
                        ? sidebarList.find(
                              (itmn) => itmn.link === location.pathname
                          )?.title
                        : location.pathname}
                </h1>
            </div>
        </div>
    );
}

export default Header;
