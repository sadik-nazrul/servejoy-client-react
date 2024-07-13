import { Link } from "react-router-dom";
import { CarouselComponent } from "../components/Carousel";
import NeedVolunteers from "../components/NeedVolunteers";


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
        </div>
    );
};

export default Home;