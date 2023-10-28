import React from 'react';
import Style from './profile-navigation.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { clearTeachableData } from '../../store/teachable/teachableSlice';

const ProfileNavigation = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isBrowser = typeof window !== "undefined";
    const { user } = useSelector((state) => state.auth);

    const logout = () => {
        if (isBrowser) {
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
            dispatch(clearTeachableData())
            router.push('/login');
        }
    }

    return (
        <div>
            {!user ? <Link href="/login">
                <a className={Style.header_link}>sign in</a>
            </Link> : <div className={Style.profile_information}>
                {(user && user?.avatar) && <Image
                    src={user.avatar}
                    alt="Picture of the author"
                    width={36}
                    height={36}
                />}
                <p className={Style.header_link} onClick={logout}>
                    sign out
                </p>
            </div>}
        </div>
    )
}

export default ProfileNavigation