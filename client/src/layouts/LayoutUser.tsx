import { Outlet } from 'react-router';

import Navbar from '@/components/navbar/Navbar';

const LayoutUser = () => {
  return (
    <>
      <div className="container">
        <Navbar />
        <hr className="relative left-[calc(-50vw+50%)] m-0 w-screen" />
        <main>
          <Outlet />
        </main>
        <footer>📌 LayoutUser Footer</footer>
      </div>
    </>
  );
};

export default LayoutUser;
