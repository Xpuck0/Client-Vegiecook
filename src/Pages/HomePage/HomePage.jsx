
import Footer from '../../MainComponents/Footer/Footer';
import Header from '../../MainComponents/Header/Header';
import HomeMain from '../../MainComponents/HomeMain/HomeMain';
import style from './HomePage.module.css';

export default function HomePage() {

    return (
        <div className={style.homePage}>
            <div className={style.wrapper}>
                <HomeMain />
            </div>
        </div>

    )
}