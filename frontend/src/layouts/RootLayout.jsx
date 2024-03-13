import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './RootLayout.css';
export default function RootLayout() {


    return (
        <div className='root-layout'>
            <header className='container-fluid'>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
};