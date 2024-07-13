import { Link } from "react-router-dom";
import { CarouselComponent } from "../components/Carousel";
import NeedVolunteers from "../components/NeedVolunteers";
import { FaEnvelope, FaLocationPin, FaPhone } from "react-icons/fa6";


const Home = () => {
    return (
        <div>
            <CarouselComponent />

            <div className="p-5">
                <div className="flex flex-col items-center justify-center gap-2 p-5 dark:text-white">
                    <h2 className="lg:text-titledex text-titlemob font-title">Need Volunteers</h2>
                    <p className="text-center lg:w-1/2 w-full">
                        Discover opportunities to make a difference in our community. Whether you have a few hours or want a regular role, join us in creating positive change. Your time and effort matter!
                    </p>
                </div>
                <NeedVolunteers sortOption="descending" limit={6} />
                <div className="flex items-center justify-center">
                    <Link
                        to="/need-volunteers"
                        type="button"
                        className="hover:scale-105 px-5 py-2 bg-secondary rounded-lg hover:border-b-4 hover:border-r-4 border-primary text-white hover:text-black font-medium"
                    >
                        View All Announcements
                    </Link>
                </div>
            </div>
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-12 mx-auto">
                    <div className="text-center">
                        <p className="font-medium text-secondary dark:text-blue-400">Contact us</p>

                        <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">Get in touch</h1>

                        <p className="mt-3 text-gray-500 dark:text-gray-400">Our friendly team is always here to chat.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-12 mt-10 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col items-center justify-center text-center">
                            <span className="p-3 text-secondary rounded-full bg-blue-100/80 dark:bg-gray-800">
                                <FaEnvelope/>
                            </span>

                            <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">Email</h2>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Our friendly team is here to help.</p>
                            <p className="mt-2 text-secondary dark:text-blue-400">hello@merakiui.com</p>
                        </div>

                        <div className="flex flex-col items-center justify-center text-center">
                            <span className="p-3 text-secondary rounded-full bg-blue-100/80 dark:bg-gray-800">
                                <FaLocationPin />
                            </span>

                            <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">Office</h2>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Come say hello at our office HQ.</p>
                            <p className="mt-2 text-secondary dark:text-blue-400">100 Smith Street Collingwood VIC 3066 AU</p>
                        </div>

                        <div className="flex flex-col items-center justify-center text-center">
                            <span className="p-3 text-secondary rounded-full bg-blue-100/80 dark:bg-gray-800">
                                <FaPhone />
                            </span>

                            <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">Phone</h2>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Mon-Fri from 8am to 5pm.</p>
                            <p className="mt-2 text-secondary dark:text-blue-400">+1 (555) 000-0000</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;