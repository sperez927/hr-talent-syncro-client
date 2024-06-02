import { Navigation, A11y, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import people1 from "../../assets/people1.jpg"
import people2 from "../../assets/people2.jpg"
import people3 from "../../assets/people3.jpg"


const Testimonials = () => {
    return (
        <div className=' bg-gray-300 p-20'>
            <Swiper
                modules={[Navigation, A11y, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{ delay: 10000 }}
            >
                <SwiperSlide >
                    <div className=' grid grid-cols-3 gap-4 items-center justify-center'>
                        <img className=' object-cover object-center' src={people1} alt="" />
                        <div className=' col-span-2'>
                            <p className=' text-lg'>Talent Syncro has revolutionized our hiring process. The AI-powered matching system is incredibly accurate, saving us time and ensuring we find the best candidates. Highly recommend!</p>
                            <p>— Jane Doe, HR Manager at Tech Innovators Inc.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className=' grid grid-cols-3 gap-4 items-center justify-center'>
                        <img className=' object-cover object-center' src={people2} alt="" />
                        <div className=' col-span-2'>
                            <p className=' text-lg'>As a freelancer, Talent Syncro has been a game-changer for me. I have landed several high-quality projects through their platform, and the virtual networking events have helped me grow my professional connections significantly.</p>
                            <p>— John Smith, Freelance Graphic Designer</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className=' grid grid-cols-3 gap-4 items-center justify-center'>
                        <img className=' object-cover object-center' src={people3} alt="" />
                        <div className=' col-span-2'>
                            <p className=' text-lg'>Talent Syncro’s skill development programs have been instrumental in my career growth. The certifications I earned through their platform helped me secure a promotion at my company. Their commitment to user success is truly unmatched.</p>
                            <p>— Emily Brown, Marketing Specialist at Creative Solutions</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Testimonials;