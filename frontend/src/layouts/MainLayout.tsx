import { useState } from 'react';
import Header from './Header';
import MySidebar from './Sidebar';

type props = {
    children: JSX.Element;
};

function MainLayout({ children }: props) {
    const [toggled, setToggled] = useState<boolean>(false);
    const [broken, setBroken] = useState<boolean>(
        window.matchMedia('(max-width: 800px)').matches
    );

    const handleCloseMenu = () => {
        setToggled(false);
    };

    return (
        <div className=" is-flex" style={{ height: '100vh' }}>
            <MySidebar
                toggled={toggled}
                setBroken={setBroken}
                closeMenu={handleCloseMenu}
            />
            <div className="mt-2 mx-2 is-flex-grow-1">
                <Header
                    broken={broken}
                    setToggled={() => setToggled(!toggled)}
                />
                <main>
                    <div className="m-2">{children}</div>
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
