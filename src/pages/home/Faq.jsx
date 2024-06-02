import faq from "../../assets/faq.jpg"

const Faq = () => {
    return (
        <div className=" grid grid-cols-1 lg:grid-cols-2 justify-center items-center lg:gap-3">
            <img className=" object-cover object-center" src={faq} alt="" />
            <div className="join join-vertical w-full rounded-none">
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        How does Talent Syncro's AI matching system work?
                    </div>
                    <div className="collapse-content">
                        <p>Our AI matching system analyzes both job seeker profiles and job listings, taking into account factors such as skills, experience, location, and preferences. Using advanced algorithms, it identifies the most compatible matches, ensuring a higher likelihood of successful placements.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        What industries does Talent Syncro cater to?
                    </div>
                    <div className="collapse-content">
                        <p>Talent Syncro serves a wide range of industries, including technology, healthcare, finance, marketing, and more. Whether you're in IT, engineering, creative fields, or beyond, our platform connects talent with opportunities across diverse sectors.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        Can businesses customize their recruitment campaigns on Talent Syncro?
                    </div>
                    <div className="collapse-content">
                        <p>Absolutely! We offer flexible recruitment solutions tailored to the unique needs of each business. From employer branding and targeted advertising to virtual job fairs and networking events, we provide customizable options to help companies attract top talent efficiently.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;