import { useEffect, useState } from 'react';
import style from './LinkListContainer.module.css';
import { getCategories } from '../../Middleware/categories';
import { FidgetSpinner } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Path from '../../paths';
import { getDiets } from '../../Middleware/diets';

export default function LinkListcontainer({
    type='',
}) {
    const [list, setList] = useState([]);


    useEffect(() => {
        (async type => {
            if (type == 'category') {
                const res = await getCategories();
                if (res.success){
                    setList(res.data)
                } else {
                    console.error(res.error);
                }
            } else if (type == 'diet') {
                const res = await getDiets();
                if (res.success){
                    setList(res.data)
                } else {
                    console.error(res.error);
                }
            }
        })(type)
    }, [type]) 

    if (!list.length) {
        return (
            <div className={style.wrapper}>
                <FidgetSpinner />
            </div>
        )
    }

    return (
        <div className={style.wrapper}>
            <ul className={style.ul}>
                {list.map((el, i) => (
                    <li key={el.id + '-' + i}><Link className={style.link} to={type == 'category' ? `${Path.Category}/${el.id}` : `${Path.Diet}/${el.id}`}>{el.name}</Link></li>
                ))}
            </ul>
        </div>
    )
}