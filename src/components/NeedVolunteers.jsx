import { useEffect, useState } from "react";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { toast } from "keep-react";
import { ThreeCardSkeleton } from "./ThreeCardSkeleton";
import { NeedVolunteerCard } from "./NeedVolunteerCard";

const NeedVolunteers = ({
    sortOption: initialSortOption = "nearest",
    limit: initialLimit = 10,
    showSearch = false,
    showSort = false,
}) => {
    const axiosCommon = useAxiosCommon();
    const [loading, setLoading] = useState(true);
    const [needVolunteers, setNeedVolunteers] = useState([]);
    const [sortOption, setSortOption] = useState(initialSortOption);
    const [limit, setLimit] = useState(initialLimit);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const needVolunteersData = async () => {
            setLoading(true);
            try {
                const { data } = await axiosCommon(
                    `/needvolunteers?sort=${sortOption}&limit=${limit}&search=${searchTerm}`
                );
                setNeedVolunteers(data);
            } catch (err) {
                toast('Data not loaded', err.message);
            } finally {
                setLoading(false);
            }
        };
        needVolunteersData();
    }, [axiosCommon, sortOption, limit, searchTerm]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-between">
                {showSearch && (
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="mt-4 p-2 border rounded"
                    />
                )}
                {showSort && (
                    <select onChange={handleSortChange} value={sortOption} className="mt-4 p-2 border rounded">
                        <option value="ascending">Ascending(deadline)</option>
                        <option value="descending">Dscending(deadline)</option>
                    </select>
                )}

            </div>
            {loading ? (
                <ThreeCardSkeleton />
            ) : (
                <div className="grid lg:grid-cols-3 gap-5 py-5">
                    {needVolunteers.map((needVolunteer) => (
                        <NeedVolunteerCard key={needVolunteer._id} needVolunteer={needVolunteer} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NeedVolunteers;
