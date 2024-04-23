import { Link } from 'react-router-dom';

import strawberry from '../../assets/strawberry.svg';
import trolley from '../../assets/troller.svg';
import style from './About.module.css';

export default function About() {

    return (
        <div className={style.about}>
            <div className={style.aboutwrapper}>
                <div className={style.imgContainer}>
                    <img src="/images/blogo.jpg" alt="" />
                </div>
                <div className={style.textContainer}>
                    <h3>About me</h3>
                    <h2>Hi, I'm Hristian, a former engineer turned vegan culinary enthusiast! Eager to share with you the joys of crafting delicious vegan meals right in your home kitchen.</h2>
                    <p>At VegieCook, dive into a world of delicious vegan recipes, captivating cooking videos, and practical tips to navigate and enjoy an easy, sustainable, and immensely rewarding vegan lifestyle.</p>
                    <Link to='/'><span>More About Me</span></Link>
                </div>
                <div className={style.svgContainer}>
                    <img src={strawberry} alt="" />
                    <img src={trolley} alt="" />
                </div>
            </div>
        </div>
    )
}