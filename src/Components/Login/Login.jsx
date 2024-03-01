import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthVisible } from '../../contexts/LoginContext';

import {register, login, getUser}from '../../Middleware/auth';

import style from './Login.module.css';
import close from '../../assets/close2.svg';
import AuthContext from '../../contexts/AuthProvider';

const USERNAME_MAX_LENGTH = 50;
const PASSWORD_MAX_LENGTH = 250;

export default function Login() {

    const { isLoginVisible, toggleLoginVisible, toggleBoth } = useAuthVisible();
    const {username, setAuth, isAuthenticated} = useContext(AuthContext);

    const [uname, setUname] = useState('');
    const [passwd, setPasswd] = useState('');
    const [error, setError] = useState('');

    const unameValid = uname.length <= USERNAME_MAX_LENGTH && uname.length > 0;
    const passwdValid = passwd.length <= PASSWORD_MAX_LENGTH && passwd.length > 0;

    const closeHandler = () => {
        toggleLoginVisible(false);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            const result = await login(uname, passwd);
            setError('');

            if (result.success){
                setAuth(old => ({
                    ...old,
                    username: result.data.data.username,
                    id: result.data.data.id
                }))
                toggleLoginVisible(false);
            } else {
                setError(result.error)     
            }
        } catch (error_m) {
            setError('An unexpected error occurred.');
        }
    }

    const changeHandler = (e) => {
        if (e.target.name == 'username') {
            setUname(e.target.value);
        }

        else if (e.target.name == 'password') {
            setPasswd(e.target.value);
        }
    }

    return (

        <div className={style.backdrop} onClick={closeHandler}>
            <div className={style.loginModal} onClick={e => e.stopPropagation()}>

                <form onSubmit={submitHandler} className={style.login}>
                    <div className={style.wrapper}>
                        <img onClick={closeHandler} className={style.close} src={close} alt="" />
                        <h2 className={style.title}>Login</h2>
                        <div className={style.inputContainer}>
                            <input name='username' value={uname} onChange={changeHandler} className={style.input} type="text" placeholder='Username' />
                            <p className={`${style.charLength} ${unameValid ? style.valid : style.invalid}`} >{uname.length} / {USERNAME_MAX_LENGTH}</p>
                        </div>
                        <div className={style.inputContainer}>
                            <input name='password' value={passwd} onChange={e => setPasswd(e.target.value)} className={style.input} type="password" placeholder='Password' />
                            <p className={`${style.charLength} ${passwdValid ? style.valid : style.invalid}`}>{passwd.length} / {PASSWORD_MAX_LENGTH}</p>
                        </div>
                        <p className={style.wrong}>{error}</p>
                    </div>
                    <button className={style.loginButton} type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}