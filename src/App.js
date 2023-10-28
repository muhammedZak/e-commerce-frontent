import { Outlet } from 'react-router-dom';
import NavigationBar from './components/Header/NavigationBar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div className="">
        <ToastContainer />
        <NavigationBar />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
