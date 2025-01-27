import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosCommon from "../hooks/useAxiosCommon";
import toast from "react-hot-toast";
import RingLoader from "react-spinners/RingLoader";
import { Avatar } from "keep-react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Requesrted = () => {
    const axiosSecure = useAxiosSecure();
    const axiosCommon = useAxiosCommon()
    const { user } = useAuth();
    const [requested, setRequested] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(user){
            getData();
        }
    }, [user])

    const getData = async () => {
        setLoading(true)
        try {
            const { data } = await axiosSecure(`requested/${user?.email}`)
            console.log(data);
            setRequested(data)
        }
        catch (err) {
            console.log(err.message);
            toast.error(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    const handleStatus = async(id, prevStatus, status) => {
        console.log(id, prevStatus, status);
        if(prevStatus === status) return toast.error('You already take a action')
        const {data} = await axiosCommon.patch(`/request/${id}`, {status})
        if(data.modifiedCount){
            toast.success('Your action is updated')
        }
        getData()
    }
    return (
        <section className='container px-4 mx-auto pt-12'>
            <div className='flex items-center gap-x-3'>
                <h2 className='text-lg font-medium text-gray-800 dark:text-white'>Requested Post</h2>

                <span className='px-3 py-1 text-xs bg-secondary rounded-full '>
                    {requested.length} request
                </span>
            </div>

            <div className='flex flex-col mt-6'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                        <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-secondary'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-semibold text-left rtl:text-right'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Title</span>
                                            </div>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-semibold text-left rtl:text-right'
                                        >
                                            <span>Deadline</span>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-semibold text-left rtl:text-right'
                                        >
                                            Category
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-semibold text-left rtl:text-right'
                                        >
                                            Applicant
                                        </th>

                                        <th className='px-4 py-3.5 text-sm font-semibold text-left rtl:text-right'>
                                            Status
                                        </th>
                                        <th className='px-4 py-3.5 text-sm font-semibold text-left rtl:text-right'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                {
                                    loading ? <tbody>
                                        <tr>
                                            <td className="w-full flex justify-center items-center">
                                                <RingLoader
                                                    color="#67D407"
                                                    cssOverride={null}
                                                    loading
                                                    size={163}
                                                    speedMultiplier={1}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                        : <tbody className='bg-white divide-y divide-gray-200 '>
                                            {requested.map(request => <tr key={request._id}>
                                                <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                    {request.title}
                                                </td>

                                                <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                    {new Date(request.deadline).toLocaleDateString()}
                                                </td>
                                                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                    <div className='flex items-center gap-x-2'>
                                                        <p
                                                            className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
                         text-xs'
                                                        >
                                                            {request.category}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td
                                                    className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'
                                                >
                                                    <Avatar className='cursor-pointer' title={request.volunteer.name} size="lg" shape="circle" img={request.volunteer?.photo} />
                                                </td>
                                                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                    {request.status}
                                                </td>
                                                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                    <div className='flex items-center gap-x-6'>
                                                        {/* Accept button */}
                                                        <button
                                                            onClick={() =>
                                                                handleStatus(request._id, request.status, 'In Progress')
                                                            }
                                                            disabled={request.status === 'Complete'}
                                                            className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                fill='none'
                                                                viewBox='0 0 24 24'
                                                                strokeWidth='1.5'
                                                                stroke='currentColor'
                                                                className='w-5 h-5'
                                                            >
                                                                <path
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    d='m4.5 12.75 6 6 9-13.5'
                                                                />
                                                            </svg>
                                                        </button>

                                                        {/* Reject button */}
                                                        <button
                                                            onClick={() =>
                                                                handleStatus(request._id, request.status, 'Rejected')
                                                            }
                                                            disabled={request.status === 'Complete'}
                                                            className='text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'>
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                fill='none'
                                                                viewBox='0 0 24 24'
                                                                strokeWidth='1.5'
                                                                stroke='currentColor'
                                                                className='w-5 h-5'
                                                            >
                                                                <path
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>)}
                                        </tbody>
                                }

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Requesrted;