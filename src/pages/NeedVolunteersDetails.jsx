'use client'
import { CaretRight, HouseLine } from 'phosphor-react'
import { Breadcrumb, BreadcrumbItem, Button, Input, Label, Modal, ModalAction, ModalBody, ModalClose, ModalContent, ModalHeader, ModalTitle } from 'keep-react'
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaCalendar, FaMapLocation } from 'react-icons/fa6';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosCommon from '../hooks/useAxiosCommon';


const NeedVolunteersDetails = () => {
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();
    const needVolunteerDetails = useLoaderData();
    const navigate = useNavigate();
    const { thumbnail, title, description, numvolneed, location, category, deadline } = needVolunteerDetails;

    // Be a volunteer request
    const handleBeAVolunteer = async e => {
        e.preventDefault();
        if (user?.email === needVolunteerDetails?.organizer?.email) return toast.error("You Don't have permission to apply your post")
        const form = e.target;
        const thumbnail = form.thumbnail.value;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const location = form.location.value;
        const numvolneed = form.numvolneed.value;
        const deadline = form.deadline.value;
        const organizer = form.organizer.value;
        const name = form.name.value;
        const email = form.email.value;
        const sug = form.sug.value;
        const status = 'Requested'

        const beAVolunteer = { thumbnail, title, description, category, location, numvolneed, deadline, organizer, status, volunteer: { name, email, sug, photo: user?.photoURL } }
        console.table(beAVolunteer);

        try {
            const { data } = await axiosCommon.post(`/beavolunteer`, beAVolunteer)
            console.log(data);
            if (data.insertedId) {
                toast.success('Your request Successfull')
                e.target.reset()
                navigate('/my-request')
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.message)
        }
    }
    return (
        <div>
            <div style={{ backgroundImage: `url(${thumbnail})` }} className="h-96 bg-cover bg-center flex items-center justify-center bg-scroll">
                <Breadcrumb borderType="border-xy" className='bg-secondary'>
                    <BreadcrumbItem>
                        <Link to='/' ><HouseLine size={18} color='#fff' /></Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <CaretRight size={18} color='#fff' />
                        <h2 className='text-white'>{title}</h2>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className='container mx-auto p-5 grid lg:grid-cols-3 gap-5 dark:text-white'>
                <div className='lg:col-span-2 space-y-4 p-5 shadow shadow-primary rounded lg:order-none order-2'>
                    <div className='flex flex-col gap-4'>
                        <p>{description}</p>
                        <h2 className='flex items-center gap-1'><FaMapLocation />{location}</h2>
                        <h2 className='flex items-center gap-1'><FaCalendar />{new Date(deadline).toLocaleDateString()}</h2>
                        <h2><span className='font-semibold'>Category: </span>{category}</h2>
                        <h2><span className='font-semibold'>Organizer: </span><a href={`mailto:${needVolunteerDetails?.organizer?.email}`}>{needVolunteerDetails?.organizer?.email}</a></h2>
                        <h2><span className='font-semibold'>Number of Volunteer need: </span>{numvolneed}</h2>
                    </div>
                </div>


                <div className='shadow shadow-primary p-5 rounded'>
                    <Modal>
                        <ModalAction asChild>
                            <Button className='bg-secondary w-full'>
                                Be a Volunteer
                            </Button>
                        </ModalAction>
                        <ModalBody>
                            <ModalContent className='w-1/2'>
                                <ModalClose className="absolute right-4 top-4" />
                                <ModalHeader className="mb-6 flex flex-col items-center justify-center space-y-3">
                                    <div className="text-center">
                                        <ModalTitle className='font-subtitle'>Apply On It</ModalTitle>
                                    </div>
                                    <form onSubmit={handleBeAVolunteer}
                                        className='w-full space-y-4'>
                                        <div className='flex gap-4'>
                                            <div className='w-1/2'>
                                                <Label htmlFor="thumbnail" className='font-subtitle'>Tumbnail</Label>
                                                <Input

                                                    name='thumbnail' defaultValue={thumbnail} type="text" readOnly />
                                            </div>
                                            <div className='w-1/2'>
                                                <Label htmlFor="title" className='font-subtitle'>Title</Label>
                                                <Input

                                                    name='title' defaultValue={title} type="text" readOnly />
                                            </div>
                                        </div>

                                        <div className='flex gap-4'>
                                            <div className='w-1/2'>
                                                <Label htmlFor="description" className='font-subtitle'>Description</Label>
                                                <Input

                                                    name='description' defaultValue={description} type="text" readOnly />
                                            </div>
                                            <div className='w-1/2'>
                                                <Label htmlFor="category" className='font-subtitle'>Category</Label>
                                                <Input

                                                    name='category' defaultValue={category} type="text" readOnly />
                                            </div>
                                        </div>

                                        <div className='flex gap-4'>
                                            <div className='w-1/2'>
                                                <Label htmlFor="location" className='font-subtitle'>Location</Label>
                                                <Input

                                                    name='location' defaultValue={location} type="text" readOnly />
                                            </div>
                                            <div className='w-1/2'>
                                                <Label htmlFor="numvolneed" className='font-subtitle'>Number of Volunteer needed</Label>
                                                <Input

                                                    name='numvolneed' defaultValue={numvolneed} type="text" readOnly />
                                            </div>
                                        </div>

                                        <div className='flex gap-4'>
                                            <div className='w-1/2'>
                                                <Label htmlFor="deadline" className='font-subtitle'>Deadline</Label>
                                                <Input

                                                    name='deadline' defaultValue={new Date(deadline).toLocaleDateString()} type="text" readOnly />
                                            </div>
                                            <div className='w-1/2'>
                                                <Label htmlFor="organizer" className='font-subtitle'>Organizer Email</Label>
                                                <Input

                                                    name='organizer' defaultValue={needVolunteerDetails?.organizer?.email} type="text" readOnly />
                                            </div>
                                        </div>

                                        <div className='flex gap-4'>
                                            <div className='w-1/2'>
                                                <Label htmlFor="email" className='font-subtitle'>Email</Label>
                                                <Input

                                                    name='email' defaultValue={user?.email} type="text" readOnly />
                                            </div>
                                            <div className='w-1/2'>
                                                <Label htmlFor="name" className='font-subtitle'>Name</Label>
                                                <Input

                                                    name='name' defaultValue={user?.displayName} type="text" readOnly />
                                            </div>
                                        </div>

                                        <div className='flex gap-4'>
                                            <div className='w-full'>
                                                <Label htmlFor="sug" className='font-subtitle'>Suggession</Label>
                                                <Input

                                                    name='sug' placeholder='write your suggession' type="text" />
                                            </div>
                                        </div>
                                        <input type="submit" value='Request' className='w-full text-center py-2 bg-secondary rounded cursor-pointer' />
                                    </form>
                                </ModalHeader>
                            </ModalContent>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default NeedVolunteersDetails;