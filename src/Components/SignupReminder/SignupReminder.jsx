import style from './SignupReminder.module.css';
import button from './Button.module.css';

import broccoli from '../../assets/broccoli.svg';
import { useContext } from 'react';
import { useAuthVisible } from '../../contexts/LoginContext';


export default function SignupReminder () {
    const {isRegisterVisible, toggleRegisterVisible} = useAuthVisible();

    return (
        <div className={style.wrapper}>
            <div className={style.par}><p className={style.fancy}>Hungry </p><strong className={style.huge}>for more? </strong> Sign up to write in the forum, create recipes or save them as your favourite recipes.</div>
            <button onClick={() => toggleRegisterVisible(true)} className={style.signup}>Sign up</button>
            <img className={style.broccoli} src={broccoli} alt="" />
        </div>
    );
}