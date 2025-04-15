import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authservice from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header , Footer} from "./components/index"
function App() {
    const [loading, setloading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authservice.GetCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));

                }
                else {
                    dispatch(logout());
                }
            })
            .finally(() => setloading(false))
    }, [])


    return !loading ? (
        <div className='min-h-screen w-xl flex flex-wrap content-between bg-gray-500'>
            <div className='w-full block'>
                <Header/>
                <main>
                {/* <Outlet> */}
                </main>
                <Footer/>
            </div>
        </div>
    ) : null
}

export default App
