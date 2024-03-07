import { Blocks } from 'react-loader-spinner';
import { CenterBox } from './CenterBox';

const Loader = () => {
    return (
        <CenterBox>
            <Blocks
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
            />
        </CenterBox>
    );
};

export default Loader;
