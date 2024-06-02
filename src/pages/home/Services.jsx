import skills from "../../assets/skills.jpg"
import jobfair from "../../assets/jobfair.jpg"
import freelance from "../../assets/freelance.jpg"

const Services = () => {
    return (
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-3 font-bold">
            <div className=" bg-cover bg-center  border shadow-lg" style={{ backgroundImage: `url(${skills})`, }}>
                <div className="h-full w-full p-4 bg-black bg-opacity-40 text-white space-y-4">
                    <h1 className=" text-xl">Skill Development and Certification Programs</h1>
                    <p>Talent Syncro offers a range of courses and certifications to help professionals upgrade their skills and stay competitive in the job market, fostering continuous career growth and development.</p>
                </div>
            </div>
            <div className="bg-cover bg-center  border shadow-lg" style={{ backgroundImage: `url(${jobfair})`, }}>
                <div className="h-full w-full p-4 bg-black bg-opacity-40 text-white space-y-4">
                    <h1 className=" text-xl">Virtual Job Fairs and Networking Events</h1>
                    <p>Talent Syncro organizes online job fairs and networking events, providing a platform for employers and job seekers to connect in real-time, discover new opportunities, and build professional relationships.</p>
                </div>
            </div>
            <div className="bg-cover bg-center  border shadow-lg" style={{ backgroundImage: `url(${freelance})`, }}>
                <div className="h-full w-full p-4 bg-black bg-opacity-40 text-white space-y-4">
                    <h1 className=" text-xl">Freelancer and Project-Based Work Platform</h1>
                    <p>Talent Syncro connects freelancers with businesses seeking project-based work, offering a platform for short-term contracts and gig opportunities in various industries.</p>
                </div>
            </div>
        </div>
    );
};

export default Services;