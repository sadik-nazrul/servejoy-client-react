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
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Title</span>
                                            </div>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <span>Deadline</span>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Category
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Description
                                        </th>

                                        <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Status
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