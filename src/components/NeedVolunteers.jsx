import { useEffect, useState } from "react";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { toast } from "keep-react";
import { ThreeCardSkeleton } from "./ThreeCardSkeleton";
import { NeedVolunteerCard } from "./NeedVolunteerCard";


const NeedVolunteers = () => {
    const axiosCommon = useAxiosCommon();
    const [loading, setLoading] = useState(true)
    const [needVolunteers, setNeedVolunteers] = useState([]);

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
            {
                loading ? <ThreeCardSkeleton />
                    : <div className="grid lg:grid-cols-4 gap-5">
                        {
                            needVolunteers.map(needVolunteer => <NeedVolunteerCard
                                key={needVolunteer._id}
                                needVolunteer={needVolunteer}
                            />)
                        }
                    </div>
            }
        </div>
    );
};

export default NeedVolunteers;