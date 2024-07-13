import { Input, Label } from "keep-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hooks/useAuth";
import useAxiosCommon from "../hooks/useAxiosCommon";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'

const AddVolunteerAnnounce = () => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate();

    // Datepicker state
    const [startDate, setStartDate] = useState(new Date());

    const handleAddAnnounce = async e => {
        e.preventDefault();
        const form = e.target;
        const thumbnail = form.thumbnail.value
        const title = form.title.value
        const description = form.description.value
        const location = form.location.value
        const numvolneed = form.numvolneed.value
        const deadline = startDate
        const category = form.category.value
        const name = form.name.value
        const email = form.email.value

        const newPost = {
            thumbnail,
            title,
            description,
            location,
            numvolneed,
            deadline,
            category,
            organizer: { name, email, photo: user?.photoURL }
        }
        console.table(newPost);
        try {
            const { data } = await axiosCommon.post(`/needvolunteerpost`, newPost)
            console.log(data);
            if (data.insertedId) {
                toast.success('Your post Successfully addeded')
                e.target.reset()
                navigate('/manage-my-post')
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.message)
        }
    }
    return (
        <div className="container mx-auto flex flex-col gap-4 items-center justify-center lg:p-10 p-5">
            <h2 className="text-titlemob lg:text-titledex font-title dark:text-white">Add your Announcement for Collect volunteer </h2>
            <form onSubmit={handleAddAnnounce}
                className='w-full space-y-4'>
                <div className='flex gap-4'>
                    <div className='w-1/2'>
                        <Label htmlFor="thumbnail" className='font-subtitle'>Tumbnail</Label>
                        <Input
                            placeholder="Photo url"
                            name='thumbnail' type="text" />
                    </div>
                    <div className='w-1/2'>
                        <Label htmlFor="title" className='font-subtitle'>Title</Label>
                        <Input
                            placeholder="title"
                            name='title' type="text" />
                    </div>
                </div>

                <div className='flex gap-4'>
                    <div className='w-full'>
                        <Label htmlFor="description" className='font-subtitle'>Description</Label>
                        <Input
                            placeholder="description"
                            name='description' type="text" />
                    </div>
                </div>

                <div className='flex gap-4'>
                    <div className='w-1/2'>
                        <Label htmlFor="location" className='font-subtitle'>Location</Label>
                        <Input
                            placeholder="NewYork, NY"
                            name='location' type="text" />
                    </div>
                    <div className='w-1/2'>
                        <Label htmlFor="numvolneed" className='font-subtitle'>Number of Volunteer needed</Label>
                        <input type="number" name="numvolneed" placeholder="10" className="block border py-2 rounded w-full px-2" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 align-middle">
                    <div className='w-full flex flex-col gap-1 dark:text-white'>
                        <Label htmlFor="deadline" className='font-subtitle'>Deadline</Label>
                        {/* Date Picker Input Field */}
                        <DatePicker
                            showIcon
                            closeOnScroll={true}
                            selected={startDate} onChange={(date) => setStartDate(date)}
                            className="border p-2 rounded w-full"
                            dateFormat="dd/MM/yyyy"
                            name="deadline"
                        />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="deadline" className='font-subtitle block'>Choose a Category</Label>
                        <select className="border py-2 rounded w-full px-2" name="category">
                            <option>Healthcare</option>
                            <option>Education</option>
                            <option>Environment</option>
                            <option>Social service</option>
                            <option>Animal Welfare</option>
                        </select>
                    </div>
                </div>

                <div className='flex gap-4'>
                    <div className='w-1/2'>
                        <Label htmlFor="email" className='font-subtitle'>Email</Label>
                        <Input

                            name='email' type="text" defaultValue={user?.email} readOnly />
                    </div>
                    <div className='w-1/2'>
                        <Label htmlFor="name" className='font-subtitle'>Name</Label>
                        <Input

                            name='name' type="text" defaultValue={user?.displayName} readOnly />
                    </div>
                </div>
                <input type="submit" value='Add Post' className='w-full text-center py-2 bg-secondary text-white rounded cursor-pointer' />
            </form>
        </div>
    );
};

export default AddVolunteerAnnounce;