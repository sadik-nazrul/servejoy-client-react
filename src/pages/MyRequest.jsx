import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosCommon from "../hooks/useAxiosCommon";
import toast from "react-hot-toast";
import RingLoader from "react-spinners/RingLoader";


const MyRequest = () => {
    const axiosCommon = useAxiosCommon()
    const { user } = useAuth();
    const [requests, setRequest] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(user){
            getData();
        }
    }, [user])

    const getData = async () => {
        setLoading(true)
        try {
            const { data } = await axiosCommon(`request/${user?.email}`)
            console.log(data);
            setRequest(data)
        }
        catch (err) {
            console.log(err.message);
            toast.error(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    const handleStatus = async(id, status) => {
        const {data} = await axiosCommon.patch(`/request/${id}`, {status})
        if(data.modifiedCount){
            toast.success('Your request updated')
        }
        getData()
    }
    return (
        <section className='container px-4 mx-auto pt-12'>
            <div className='flex items-center gap-x-3'>
                <h2 className='text-lg font-medium text-gray-800 '>My Requests</h2>

                <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                    {requests.length} request
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
                                            Description
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
                                            {requests.map(request => <tr key={request._id}>
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
                                                    title={request.description}
                                                    className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'
                                                >
                                                    {request.description.substring(0, 18)}...
                                                </td>
                                                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                    {request.status}
                                                </td>
                                                <td className='px-4 py-4 text-sm whitespace-nowrap'>

                                                    {/* Status change button */}
                                                    <button
                                                        disabled={request.status !== 'In Progress'}
                                                        onClick={() => handleStatus(request._id, 'Complete')}
                                                        title='Mark Complete'
                                                        className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none disabled:cursor-not-allowed'
                                                    >
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
                                                                d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75'
                                                            />
                                                        </svg>
                                                    </button>
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

export default MyRequest;