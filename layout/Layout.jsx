import React, { useEffect } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/auth/authSlice';
import { useRouter } from 'next/router';
import { authenticationService } from '../services/authService';
import { clearPredictTime, setSampleResult } from '../store/predictman/predictmanSlice';

const layout = ({ children }) => {
    const isBrowser = typeof window !== "undefined";
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isBrowser) {
            const user = localStorage.getItem('user');
            if (user) {
                dispatch(setUser(JSON.parse(user)));
            } else {
                const token = localStorage.getItem('authToken');
                if (token) {
                    authenticationService.getUserData(token).then(response => {
                        dispatch(setUser(response));
                    });
                } else {
                    router.push('/login');
                }
            }
        }
    }, []);

    useEffect(() => {
        dispatch(clearPredictTime());
        dispatch(setSampleResult(null));
    }, [router])

    return <>
        <Header />
        {children}
        <Footer />
    </>

}

export default layout