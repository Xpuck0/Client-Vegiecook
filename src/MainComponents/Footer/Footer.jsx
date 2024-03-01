import { Link } from 'react-router-dom';
import avocado from '../../assets/avocado.svg';
import carrot from '../../assets/carrot.svg';
import olive from '../../assets/olive.svg';
import style from './Footer.module.css';

export default function Footer() {

    return (
        <footer className={style.footerWrapper}>

            <div className={style.footer}>
                <ul className={style.navigation}>
                    <li><Link>All Recipes</Link></li>
                    <li><Link>Forum</Link></li>
                    <li><Link>About</Link></li>
                    <li><Link>Leaderboards</Link></li>
                    <li><Link>Stories</Link></li>
                </ul>
                <ul className={style.info}>
                    <li><Link>Contact</Link></li>
                    <li><Link>Privacy Policy</Link></li>
                    <li><Link>Accessability Management</Link></li>
                </ul>
                <div className={style.line}></div>
                <p className={style.copyright}>&copy; veganmaster</p>
                <div className={style.fruits}>
                    <img className={style.avocado} src={avocado} alt='' />
                    <img className={style.carrot} src={carrot} alt='' />
                    <img className={style.olive} src={olive} alt='' />
                </div>
            </div>
        </footer>
    )
}