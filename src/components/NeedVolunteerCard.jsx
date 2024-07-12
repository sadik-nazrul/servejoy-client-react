import { FaCalendar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';


export const NeedVolunteerCard = ({ needVolunteer }) => {
    const { _id, image_url, announcement, category, Deadline } = needVolunteer;

    return (
        <Link to={`needvolunteer/${_id}`} title='view details' type='button' className='border hover:shadow hover:shadow-secondary rounded-xl dark:text-white'>
            <div className='relative'>
                <img className='max-w-full h-52 object-cover rounded-t-xl' src={image_url} alt={announcement} />
                <h2 className="px-2 py-1 text-white absolute top-2 left-2 bg-secondary rounded">{category}</h2>
            </div>
            <div className='flex flex-col p-5'>
                <div>
                    <h2 className='lg:text-subtitledex text-subtitlemob font-subtitle'>{announcement}</h2>
                    <h2 className='flex items-center gap-1'><FaCalendar /> <span className='font-medium'>Deadline: </span>{new Date(Deadline).toLocaleDateString()}</h2>
                </div>
            </div>
        </Link>
    )
}
