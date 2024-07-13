import NeedVolunteers from "../components/NeedVolunteers";


const NeedVolunteer = () => {
    return (
        <div>
            <NeedVolunteers showSearch={true} showSort={true} limit={0} />
        </div>
    );
};

export default NeedVolunteer;