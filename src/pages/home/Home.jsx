import Banner from "./Banner";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Insights from "./Insights";
import Faq from "./Faq";


const Home = () => {
    return (
        <div className=" space-y-10">
            <Banner></Banner>
            <Services></Services>
            <Testimonials></Testimonials>
            <Insights></Insights>
            <Faq></Faq>
        </div>
    );
};

export default Home;