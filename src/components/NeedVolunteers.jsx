import { useEffect, useState } from "react";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { toast } from "keep-react";
import { ThreeCardSkeleton } from "./ThreeCardSkeleton";
import { NeedVolunteerCard } from "./NeedVolunteerCard";
import { Link } from "react-router-dom";


const NeedVolunteers = () => {
    const axiosCommon = useAxiosCommon();
    const [loading, setLoading] = useState(true)
    const [needVolunteers, setNeedVolunteers] = useState([]);
    // const sixNeedVolunteers = needVolunteers.slice(0, 4)

    useEffect(() => {
        const needVolunteersData = async () => {
            setLoading(true)
            try {
                const { data } = await axiosCommon('/needvolunteers')
                setNeedVolunteers(data)
            } catch (err) {
                toast('Data not loaded', err)
            } finally {
                setLoading(false)
            }
        }
        needVolunteersData()
    }, [axiosCommon]);

    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center gap-2 p-5 dark:text-white">
                <h2 className="lg:text-titledex text-titlemob font-title">Need Volunteers</h2>
                <p className="text-center lg:w-1/2 w-full">Discover opportunities to make a difference in our community. Whether you have a few hours or want a regular role, join us in creating positive change. Your time and effort matter!</p>
            </div>
            {
                loading ? <ThreeCardSkeleton />
                    : <div className="grid lg:grid-cols-4 gap-5 py-5">
                        {
                            needVolunteers.map(needVolunteer => <NeedVolunteerCard
                                key={needVolunteer._id}
                                needVolunteer={needVolunteer}
                            />)
                        }
                    </div>
            }
            <div className="flex items-center justify-center">
            <Link to='/need-volunteers' type="button" className="hover:scale-105 px-5 py-2 bg-secondary rounded-lg hover:border-b-4 hover:border-r-4 border-primary text-white hover:text-black font-medium">View All Annoucement</Link>
            </div>
        </div>
    );
};

export default NeedVolunteers;