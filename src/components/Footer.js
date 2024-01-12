import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <footer className=" bg-gray-900 text-slate-400">
      <div className="border-t">
        <div className="p-10 md:flex md:justify-around flex-wrap sm:grid grid-cols-2 text-center">
          <div className="mb-5">
            <p className="font-bold">Discover more</p>
            <ul>
              <li>
                <a>insta</a>
              </li>
              <li>
                <a>facebook</a>
              </li>
              <li>
                <a>Twitter</a>
              </li>
              <li>
                <a>Youtube</a>
              </li>
            </ul>
          </div>
          <div className="mb-5">
            <p className="font-bold">Customer care</p>
            <ul>
              <li>
                <a>insta</a>
              </li>
              <li>
                <a>facebook</a>
              </li>
              <li>
                <a>Twitter</a>
              </li>
              <li>
                <a>Youtube</a>
              </li>
            </ul>
          </div>
          <div className="mb-5">
            <p className="font-bold">Contact us</p>
            <ul>
              <li>
                <a>insta</a>
              </li>
              <li>
                <a>facebook</a>
              </li>
              <li>
                <a>Twitter</a>
              </li>
              <li>
                <a>Youtube</a>
              </li>
            </ul>
          </div>
          <div className="mb-5">
            <p className="font-bold mb-2">Connect with us</p>
            <ul className="flex gap-5 justify-center">
              <li>
                <a>
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a>
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a>
                  <TwitterIcon />
                </a>
              </li>
              <li>
                <a>
                  <YouTubeIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
