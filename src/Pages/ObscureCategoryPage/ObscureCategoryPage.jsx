import LinkListcontainer from '../../Components/LinkListContainer/LinkListContainer';
import TagSummary from '../../Components/TagSummary/TagSummary';
import style from './ObscureCategoryPage.module.css';

export default function ObscureCategoryPage() {

    return (
        <div className={style.wrapper}>
            <h1>Discover the World of Vegan Categories</h1>
            <TagSummary heading='introduction' desc="Welcome to our vibrant collection of vegan recipes, designed to inspire and delight anyone on a plant-based journey. Whether you're a seasoned vegan or new to the lifestyle, our diverse categories promise to enrich your dining experience with an array of flavors, textures, and nutrients. Let's explore the exciting world of vegan cooking, one category at a time." />

            <div className={style.sectionWrapper}>
                <section className={style.section}>
                    <h2>Quick & Easy Vegan Meals</h2>
                    <p>Perfect for busy weeknights or when you're short on time, these recipes are about simplicity and speed without compromising on taste. Discover dishes that come together in a flash, providing nutritious and delicious meals for any day of the week.</p>
                </section>
                <section className={style.section}>
                    <h2>Vegan Comfort Foods</h2>
                    <p>Who says comfort food can't be vegan? Dive into a world where your favorite hearty dishes are reimagined with plant-based ingredients. From creamy pastas to savory pies, these recipes prove that comfort food is still on the menu in a vegan diet.</p>
                </section>
                <section className={style.section}>
                    <h2>Vegan Superfoods</h2>
                    <p>Boost your health with recipes centered around superfoods. These dishes are not only packed with flavor but also brimming with nutritional benefits. Incorporate the power of foods like kale, quinoa, berries, and nuts into your meals for an extra health kick.</p>
                </section>
                <section className={style.section}>
                    <h2>International Vegan Cuisine</h2>
                    <p>Explore global flavors with our International Vegan Cuisine. Experience the tastes of different cultures with recipes that bring the essence of world cuisine to your table, all while maintaining a vegan approach. It's a delicious way to travel the world from your kitchen.</p>
                </section>
                <section className={style.section}>
                    <h2>Seasonal Vegan Delights</h2>
                    <p>Celebrate the seasons with dishes that highlight the best of what nature offers throughout the year. Our Seasonal Vegan Delights focus on using fresh, local produce to create meals that are in harmony with the environment and your body's needs.</p>
                </section>
                <section className={style.section}>
                    <h2>Vegan Baking & Desserts</h2>
                    <p>Indulge your sweet tooth with our collection of vegan baking and dessert recipes. Discover a world where cakes, cookies, and desserts are made without eggs or dairy but are still utterly delicious. Perfect for any occasion, these treats will satisfy vegans and non-vegans alike.</p>
                </section>
                <section className={style.section}>
                    <h2>Vegan Breakfasts</h2>
                    <p>Start your day the right way with our Vegan Breakfasts. From smoothies and oatmeals to pancakes and avocado toasts, these recipes are designed to energize your mornings with plant-based goodness, ensuring you're ready to tackle the day ahead.</p>
                </section>
                <section className={style.section}>
                    <h2>Gluten-Free Vegan</h2>
                    <p>Navigating a vegan diet without gluten is easy with our Gluten-Free Vegan category. These recipes cater to those looking for plant-based dishes that are also free from gluten, ensuring everyone can enjoy delicious and safe meals.</p>
                </section>
                <section className={style.section}>
                    <h2>Conclusion</h2>
                    <p>Our vegan recipe categories offer a world of culinary possibilities, designed to cater to every taste, occasion, and dietary need. By exploring these diverse categories, you'll discover that vegan cooking is not only about making ethical and healthy choices but also about enjoying a rich and varied diet that delights the senses. Join us on this delicious adventure, and let the flavors of vegan cuisine inspire your journey.</p>
                </section>
            </div>
            <h3>Browse all the categories:</h3>
            <LinkListcontainer type='category' />
        </div>
    )
}