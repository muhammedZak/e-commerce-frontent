import React from 'react';
import Carousel from '../components/Home/Carousel';

import CardHome from '../components/Home/Card-home';

const Home = () => {
  return (
    <>
      <div className="bg-white">
        <Carousel />
      </div>
      <div className="p-4">
        <header className="pt-4 pb-3 text-3xl text-center">
          <p>BEST SELLERS</p>
        </header>
        <div className="grid md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          <CardHome />
        </div>
      </div>
    </>
  );
};

export default Home;
