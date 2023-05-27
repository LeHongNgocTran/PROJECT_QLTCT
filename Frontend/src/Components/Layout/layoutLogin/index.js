import clsx from 'clsx';
import styles from './layoutLogin.module.scss';

import DefaultFooter from '~/Components/Layout/defaultLayout/defaultFooter/defaultFooter';
import LoginHeader from './loginHeader/loginHeader';
function layoutUser({ children }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <LoginHeader></LoginHeader>
            <div className={clsx(styles.children)}>{children}</div>
            <DefaultFooter></DefaultFooter>
        </div>
    );
}

export default layoutUser;
