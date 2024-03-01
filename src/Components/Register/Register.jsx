import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthVisible } from '../../contexts/LoginContext';

import {register, login, getUser}from '../../Middleware/auth';

import style from './Register.module.css';
import close from '../../assets/close2.svg';

const USERNAME_MAX_LENGTH = 50;
const PASSWORD_MAX_LENGTH = 250;

export default function Register() {

    const { isLoginVisible, isRegisterVisible, toggleLoginVisible, toggleRegisterVisible, toggleBoth } = useAuthVisible();

    const [uname, setUname] = useState('');
    const [passwd, setPasswd] = useState('');
    const [error, setError] = useState('');

    const unameValid = uname.length <= USERNAME_MAX_LENGTH && uname.length > 0;
    const passwdValid = passwd.length <= PASSWORD_MAX_LENGTH && passwd.length > 0;

    const closeHandler = () => {
        toggleRegisterVisible(false);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
       
        
        try {
            const result = await register(uname, passwd);
            if (result.success){
                console.log('Registration successful', result);
                toggleBoth();
                setError('');
            } else {
                console.error('Registration failed:', error.message);
                setError(result.error)     
            }
        } catch (error_m) {
            
            console.error('Unexpected error:', error_m);
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
                        <h2 className={style.title}>Register</h2>
                        <div className={style.inputContainer}>
                            <input name='username' value={uname} onChange={changeHandler} className={style.input} type="text" placeholder='Username' />
                            <p className={`${style.charLength} ${unameValid ? style.valid : style.invalid}`} >{uname.length} / {USERNAME_MAX_LENGTH}</p>
                        </div>
                        <div className={style.inputContainer}>
                            <input name='password' value={passwd} onChange={e => setPasswd(e.target.value)} className={style.input} type="password" placeholder='Password' />
                            <p className={`${style.charLength} ${passwdValid ? style.valid : style.invalid}`}>{passwd.length} / {PASSWORD_MAX_LENGTH}</p>
                        </div>
                        {error && <p className={style.error}>{error}</p>}
                    </div>
                    <button className={style.loginButton} type='submit'>Register</button>
                </form>
            </div>
        </div>
    )
}