import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosCommon from "../hooks/useAxiosCommon";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import useAxiosSecure from "../hooks/useAxiosSecure";


const ManageMyPost = () => {
    const axiosSecure = useAxiosSecure();
    const axiosCommon = useAxiosCommon()
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getData()
        }
    }, [user])

    const getData = async () => {
        setLoading(true)
        try {
            const { data } = await axiosSecure(`/needvolunteers/${user?.email}`);
            setPosts(data);
        }
        catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    };

    const handleDelete = async id => {
        try {
            const { data } = await axiosCommon.delete(`/needvolunteer/${id}`);
            if (data.deletedCount) {
                toast.success('Successfully Deleted')
            }
            //refresh ui
            getData()
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <section className='container px-4 mx-auto pt-12'>
            <div className='flex items-center gap-x-3'>
                <h2 className='text-lg font-medium text-gray-800 '>My Posted Announcement</h2>

                <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                    {posts.length} Posts
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
                                            Delete
                                        </th>

                                        <th className='px-4 py-3.5 text-sm font-semibold text-left rtl:text-right'>
                                            Edit
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
                                            {posts.map(post => <tr key={post._id}>
                                                <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                    {post.title}
                                                </td>

                                                <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                    {new Date(post.deadline).toLocaleDateString()}
                                                </td>
                                                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                    <div className='flex items-center gap-x-2'>
                                                        <p
                                                            className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
                         text-xs'
                                                        >
                                                            {post.category}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td
                                                    title={post.description}
                                                    className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'
                                                >
                                                    {post.description.substring(0, 18)}...
                                                </td>
                                                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                    <div className='flex items-center gap-x-6'>
                                                        <button
                                                            onClick={() => handleDelete(post._id)}
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
                                                                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                    <div className='flex items-center gap-x-6'>
                                                        <Link
                                                            to={`/updatevolunteerannounce/${post._id}`}
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
                                                                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                                                />
                                                            </svg>
                                                        </Link>
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

export default ManageMyPost;