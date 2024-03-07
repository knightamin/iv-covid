import Header from './Header';
import MySidebar from './Sidebar';

type props = {
    children: JSX.Element;
};

function MainLayout({ children }: props) {
    return (
        <div className=" is-flex" style={{ height: '100vh' }}>
            <MySidebar />
            <div className="mt-2 mx-2 is-flex-grow-1">
                <Header />
                <main>
                    <div className="m-2">{children}</div>
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
