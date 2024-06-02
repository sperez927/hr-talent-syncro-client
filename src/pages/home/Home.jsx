import Banner from "./Banner";
import Services from "./Services";
import Testimonials from "./Testimonials";


const Home = () => {
    return (
        <div className=" space-y-20">
            <Banner></Banner>
            <Services></Services>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;