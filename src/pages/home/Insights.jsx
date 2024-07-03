import insights from "../../assets/insights.webp"

const Insights = () => {
    return (
        <div className=" text-white py-32 px-10 bg-cover bg-center" style={{ backgroundImage: `url(${insights})`, }}>
            <div className=" bg-black bg-opacity-30 p-10 space-y-5">
                <h1 className=" text-3xl font-bold ">Industry Insights</h1>
                <p>Stay ahead of the curve with our comprehensive Industry Insights section. Discover the latest trends, market analysis, and expert advice tailored to your field. Whether you are a job seeker looking to understand hiring trends or a business owner seeking to stay competitive, our curated insights provide valuable knowledge to drive your success. From emerging technologies to market forecasts, unlock the strategic intelligence you need to make informed decisions and thrive in today is dynamic marketplace.</p>
            </div>
        </div>
    );
};

export default Insights;