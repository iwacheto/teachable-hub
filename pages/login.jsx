import React, { useState } from 'react';
import Style from './scss/login.module.scss';
import Input from '../components/form-elements/input/Input';
import Button from '../components/form-elements/button/Button';
import Loader from '../components/loader/Loader';
import Logo from '../components/logo/Logo';
import { useRouter } from 'next/router';
import { authenticationService } from '../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/auth/authSlice';

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);

    const onChangeHandler = (key, e) => {
        const value = e.target.value;

        switch (key) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }
    }

    const onKeyDownHandler = (e) => {
        if (e.keyCode === 13) login();
    }

    const login = () => {
        setIsLoaded(false);
        authenticationService.login({ email, password }).then(response => {
            if (response && response.username) {
                dispatch(setUser(response));
                router.push(`/${response.username}`);
            }
            setTimeout(() => {
                setIsLoaded(true);
            }, 100)
        });
    }

    return (
        <main className={Style.login}>
            <article className={Style.login_container}>
                <header className={Style.header}>
                    <Logo />
                </header>

                <section className={Style.login_content}>
                    <div className={Style.form}>
                        {isLoaded ? <div className={Style.form_content}>
                            <Input
                                id="email"
                                type="text"
                                label="E-mail"
                                isValidate={{ types: ['email'] }}
                                onChange={onChangeHandler.bind(this, 'email')}
                                onKeyDown={onKeyDownHandler}
                            />
                            <Input
                                id="password"
                                type="password"
                                label="Password"
                                onChange={onChangeHandler.bind(this, 'password')}
                                onKeyDown={onKeyDownHandler}
                            />
                            <Button
                                styleClass="default-button"
                                disabled={!email}
                                onClick={login}
                            >
                                Sign In
                            </Button>
                        </div> :
                            <Loader />}
                    </div>
                    <div className={Style.image}></div>

                </section>

                <footer></footer>
            </article>
        </main>
    )
}

export default Login