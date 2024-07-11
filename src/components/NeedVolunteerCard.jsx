import { Card, CardContent, CardHeader, CardTitle } from 'keep-react'
import { FaCalendar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import image from '../assets/volunteer-banner.jpeg'

export const NeedVolunteerCard = ({ needVolunteer }) => {
    const { _id, announcement, category, Deadline } = needVolunteer;

    return (
        <Card>
            <CardHeader className='relative'>
                <img src={image} alt={announcement} />
                <h2 className='absolute top-2 left-2 px-4 py-1 bg-secondary rounded text-white'>{category}</h2>
            </CardHeader>
            <CardContent className="space-y-3">
                <CardTitle>{announcement}</CardTitle>
                <div className='flex items-center gap-1'>
                    <FaCalendar />
                    <h2 className='font-medium'>Deadline: </h2>
                    {new Date(Deadline).toLocaleDateString()}
                </div>
                <Link to={`needvolunteers/${_id}`}>View Details</Link>
            </CardContent>
        </Card>
    )
}
