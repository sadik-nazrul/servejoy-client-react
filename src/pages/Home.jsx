import useAuth from "../hooks/useAuth";


const Home = () => {
    const {logOut} = useAuth();
    return (
        <div>
            <button onClick={logOut} type="button">Logout</button>
        </div>
    );
};

export default Home;