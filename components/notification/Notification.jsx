import React, { useEffect } from 'react';
import Style from './notification.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setLoader } from '../../store/default/defaultSlice';

const Notification = () => {
    const dispatch = useDispatch();
    const { loader } = useSelector((state) => state.default);

    useEffect(() => {
        if (loader.show) {
            setTimeout(() => {
                dispatch(setLoader({ show: false, message: '' }));
            }, 2500)
        }
    }, [loader]);

    return <>
        {loader.show && <div className={Style.notification}>❌
            <span className={Style.notification_text}>{loader.message}</span></div>}
    </>
}

export default Notification;