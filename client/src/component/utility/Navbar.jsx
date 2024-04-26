import React from 'react';
import logo from '../../assets/logo-removebg-preview.png';
import { Search } from '@mui/icons-material';
import { ShoppingCart } from '@mui/icons-material';
import { ExpandMore } from '@mui/icons-material';
import { AccountCircle } from '@mui/icons-material';
import SubNavbar from './SubNavbar';
export default function Navbar() {

  return (
    <>
      <div className='flex z-50 fixed py-3  justify-around items-center top-0 left-0 right-0 bg-white text-gray-700 h-60px w-1222px mx-auto px-15px py-5px z-103'>
        <div className='flex justify-between gap-2 items-center'>
          <div>
            <img src={logo} alt="" className=' w-16' />
          </div>
          <div className='ml-4'>
            <form className="flex justify-center items-center">
              <input type="search"
                name="" placeholder='Title,Author,Publicer And ISBN' id=""
                className="border border-blue-600 px-4 py-2 w-[464.792px] outline-none max-w-80% cursor-text" />
              <Search style={{ width: '42px', height: "43.33px" }} className=' border  p-2 bg-blue-600 text-white' />
            </form>

          </div>
        </div>
        <div className='ml-4 flex gap-4  justify-between items-center'>

          <div className='ml-4 flex gap-2  justify-center items-center'>
            <AccountCircle />
            <span>My Account
              <ExpandMore />
            </span>
          </div>
          <div>
            <ShoppingCart />
          </div>
        </div>
      </div>
      <SubNavbar />
    </>

  );
}
