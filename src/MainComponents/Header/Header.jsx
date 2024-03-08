import { Link } from 'react-router-dom';
import style from './Header.module.css';
import { useAuthVisible } from '../../contexts/LoginContext';
import Login from '../../Components/Login/Login';
import Register from '../../Components/Register/Register';
import { logout, register } from '../../Middleware/auth'
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../contexts/AuthProvider';
import Path from '../../paths';
import { QueryContext } from '../../contexts/QueryContext';


export default function Header({disabled=true}) {
    const { isLoginVisible, isRegisterVisible, toggleLoginVisible, toggleRegisterVisible } = useAuthVisible();
    const { username, isAuthenticated, setAuth } = useContext(AuthContext);
    const {query, setQuery} = useContext(QueryContext);
    const [hide, setHide] = useState(true)


    useEffect(() => {
        const closeDropdown = (event) => {
            if (!hide && !event.target.closest(`.${style.profile}`)) {
                setHide(true);
            }
        };

        if (!hide) {
            document.addEventListener('click', closeDropdown);
        }

        return () => document.removeEventListener('click', closeDropdown);
    }, [hide]);

    const toggleDropdown = () => {
        setHide(!hide);
    }

    const logoutHandler = async () => {
        logout();
        setAuth({});
    }


    return (
        <div className={style.header}>
            <div className={style.wrapper}>
                <div className={style.logo}>
                    <Link to={'/'}>
                        <span className={style.vegie}>Vegie</span>
                        <span className={style.cook}>Cook</span>
                    </Link>
                </div>

                <nav className={style.nav}>
                    <ul className={style.ul}>
                        <li><Link to={'/recipes/'}>Recipes</Link></li>
                        <li><Link to={'/leaderboards/'}>Leaderboards</Link></li>
                        <li><Link to={'/forum/'}>Forum</Link></li>
                    </ul>
                </nav>

                <input className={style.query} type="text" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
                {!isAuthenticated ?
                    <div className={style.buttonWrapper}>
                        <button onClick={toggleLoginVisible} className={style.login}>Log in</button>
                        <button onClick={toggleRegisterVisible} className={style.signin}>Sign in</button>
                    </div>

                    : isAuthenticated && (
                        <>
                            <div className={style.horizontalBreak}></div>
                            <div className={style.profile}>
                                <ul className={style.father}>
                                    <li onClick={toggleDropdown} className={`${style.heading} ${!hide && style.selected}`}>{username}</li>
                                    <div className={`${style.dropdown} ${hide ? style.hide : style.show}`}>
                                        <li><Link>My Page</Link></li>
                                        <div className={style.verticalBreak}></div>
                                        <li><Link>Favorites</Link></li>
                                        <li><Link>My Recipes</Link></li>
                                        <li><Link to={Path.CreateRecipe}>Create</Link></li>
                                        <div className={style.verticalBreak}></div>
                                        <li onClick={logoutHandler}><Link>Logout</Link></li>
                                    </div>
                                </ul>
                            </div>
                        </>
                    )}
            </div>
            {isLoginVisible && <Login />}
            {isRegisterVisible && <Register />}
        </div>
    )
}