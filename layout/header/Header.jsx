import React from 'react';
import Style from './header.module.scss';
import Logo from '../../components/logo/Logo';
import { useSelector } from 'react-redux';
import ProfileNavigation from '../../components/profile-navigation/ProfileNavigation';
import Link from 'next/link';

const Header = () => {
    const { user } = useSelector(state => state.auth);

    return <header className={Style.header}>
        <Link href={`/${user?.username ? user.username : ''}`}>
            <a><Logo /></a>
        </Link>
        <ProfileNavigation />
    </header>
}

export default Header