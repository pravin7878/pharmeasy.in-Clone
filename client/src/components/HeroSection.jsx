import React from 'react';
import { FaPrescriptionBottleAlt, FaVial, FaUserMd, FaHeartbeat, FaBlog, FaGift } from 'react-icons/fa';
import { FaAngleRight } from "react-icons/fa";
import { catagores } from '../scripts/catagoryData';
import SearchInput from './SeachInput';


const HeroSection = () => {
    return (
        <section className="bg-[linear-gradient(160deg,_#bfdbfe_0%,_#fff_50%,_#fef3c7_100%)] py-8  md:px-0">
            <div className="flex flex-col justify-center gap-3 max-w-4xl mx-auto text-center">
                {/* top heading */}
                <div className='flex justify-center md:justify-between w-full md:w-[75%] m-auto'>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">What are you looking for?</h1>
                    <p className='hidden md:flex items-center md:pt-7 pb-3'>Order with prescription. <span><button className="flex cursor-pointer items-center font-bold text-[#10847e]">
                        Upload Now
                        <FaAngleRight className='pt-0.5' />
                    </button></span></p>
                </div>
                {/* search input */}
                <div className="flex bg-white rounded-full shadow hover:shadow-md p-2 items-center  gap-2 mb-4 mx-5">
                    <div className="flex items-center pl-2  w-full ">
                        <svg className="w-10 h-10 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <SearchInput/>
                    </div>
                    <button className="bg-[#10847e]  text-white px-6 py-2 md:px-12 cursor-pointer md:py-4 rounded-full shadow hover:bg-[#0e6d66] transition">
                        Search
                    </button>
                </div>



                {/* only sm */}
                <p className='border border-green-200 bg-100 py-1 flex justify-center'>Order with prescription. <span><button className="flex cursor-pointer items-center font-bold text-[#10847e]">
                    Upload Now
                    <FaAngleRight className='pt-0.5' />
                </button></span></p>

               
            </div>

            {/* catagories  */}
             <div className="flex w-full justify-center gap-4 mt-6 px-10">
                    {catagores.map((item, idx) => (
                        <div key={idx} className="flex p-2 gap-1 bg-white rounded-md hover:shadow-md flex-col items-center cursor-pointer">
                            <div className="">
                                <img className='w-full' src={item.icon} alt={item.label} />
                            </div>
                            <span className="text-sm font-medium">{item.label}</span>
                            {item.offer && (
                                <span className="text-xs text-red-500 font-semibold">{item.offer}</span>
                            )}
                        </div>
                    ))}
                </div>
        </section>
    );
};

export default HeroSection;