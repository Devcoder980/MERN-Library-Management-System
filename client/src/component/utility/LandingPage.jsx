import React, { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
const images = [
    'https://www.bookswagon.com/bannerimages/79_inr.jpg?v=2.5',
    'https://www.bookswagon.com/bannerimages/81_inr.jpg?v=5.0',
    'https://www.bookswagon.com/bannerimages/83_inr.jpg?v=5.0'
];

const icons = [
    "https://www.bookswagon.com/Images/staticimages/icon1.png",
    "https://www.bookswagon.com/Images/staticimages/icon8.png",
    "https://www.bookswagon.com/Images/staticimages/icon4.png",
    "https://www.bookswagon.com/Images/staticimages/icon7.png",
    "https://www.bookswagon.com/Images/staticimages/icon2.png",
    "https://www.bookswagon.com/Images/staticimages/icon5.png",
    "https://www.bookswagon.com/Images/staticimages/tarot.png",
    "https://www.bookswagon.com/Images/staticimages/TodaysDeal.png"
];

const title = [
    "Award Winners",
    "Box Sets",
    "Best Seller",
    "New Arrivals",
    "Fictions Books",
    "Tarot Cards",
    "Deal of the Day"
]

const LandingPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentIconIndex, setCurrentIconIndex] = useState(1);
    const nextSlide = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextIcons = () => {
        setCurrentIconIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevIcons = () => {
        setCurrentIconIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <>
            <div className="relative">
                <button
                    className="absolute left-12 top-1/2  opacity-70 transform -translate-y-1/2 bg-blue-500 text-white  p-[2px]  rounded"
                    onClick={prevSlide}
                >
                    <ChevronLeftIcon />
                </button>
                <button
                    className="absolute right-12 top-1/2  opacity-70 transform -translate-y-1/2 bg-blue-600 text-white  p-[2px]  rounded"
                    onClick={nextSlide}
                >
                    <ChevronRightIcon />
                </button>
                <div className="row mt-1 mb-1 mobilemargin0">
                    <a href="https://www.bookswagon.com/promo-best-seller/best-seller/03AC998EBDC2">
                        <img className="mobilehide w-100" src="https://www.bookswagon.com/images/promotionimages/web/2_CuratedWeb1904.jpg" alt="Up to 60%" />
                    </a>
                </div>
                <div className="flex justify-center items-center ">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`slide${index}`}
                            className={`mx-auto rounded-lg ${index === currentImageIndex ? 'block' : 'hidden'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="relative">
              

                <div className='flex border-2 flex-wrap my-8 mx-4 text-center border-gray-600 text-wrap py-4 text-sm justify-center items-center gap-8'> {/* Increased gap */}
                    {icons.map((image, index) => (
                        <button type="button" className='flex flex-col justify-center items-center' key={index}>
                            <img src={image} width="100px" height="100px" alt={`slide${index}`} /> {/* Increased icon size */}
                            <span>{title[index]}</span>
                        </button>
                    ))}
                </div>
            </div>

        </>


    );
};

export default LandingPage;

