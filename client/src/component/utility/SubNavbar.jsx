import React from 'react';
import { useState } from 'react';
export default function SubNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className='border-b flex justify-around mt-24 font-lato text-base leading-6 text-gray-800 cursor-pointer'>
            <ul className='flex text-sm  py-2  justify-start items-center gap-5'>
                <li

                    className='border-r-2 border-blue-600   pr-6 '>
                    <span onClick={toggleMenu} className='hover:font-bold'>Book</span>
                    
                    {isOpen && (
                        <div className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">
                                <a href="#" onClick={toggleMenu} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Account settings</a>
                                <a href="#" onClick={toggleMenu} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Support</a>
                                <a href="#" onClick={toggleMenu} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">License</a>
                                <form method="POST" action="#" role="none">
                                    <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
                                </form>
                            </div>
                        </div>
                    )}
                </li>

                <li className='border-r-2 border-blue-600 hover:font-bold  pr-6 '>Book New</li>
                <li className='border-r-2 border-blue-600 hover:font-bold  pr-6 '>ArrivalsBox</li>
                <li className='border-r-2 border-blue-600 hover:font-bold  pr-6 '>SetsBest</li>
                <li className='border-r-2 border-blue-600 hover:font-bold  pr-6 '>sellersFiction</li>
                <li className='border-r-2 border-blue-600 hover:font-bold  pr-6 '>BooksAward</li>
                <li className='border-r-2 border-blue-600 hover:font-bold  pr-6 '>WinnersFeatured</li>
                <li className='border-r-2 border-blue-600 hover:font-bold  pr-6 '>AuthorsToday's</li>
                <li className='border-r-2 mr-32 border-blue-600 hover:font-bold  pr-6 '>DealToday's</li>
            </ul>
        </div>
    );
}
