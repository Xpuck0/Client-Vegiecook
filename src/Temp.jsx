import { useEffect, useState } from "react";

export default function Temp () {
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8000/images')
        .then(data => data.json())
        .then(data => {
            setBrand(data.results[0].image);
            // setSize(data.results[0].size)
            console.log(data)
        });
    }, [])

    return (
        <div>
            {/* <p>Brand: {brand}</p> */}
            <img src={brand} alt="" />
            {/* <p>Size: {size}</p> */}
        </div>
    )
}