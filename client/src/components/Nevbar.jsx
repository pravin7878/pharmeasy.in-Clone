import React from 'react';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { IoCartOutline } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { RiMenuFold2Line } from "react-icons/ri";
import { catagores } from '../scripts/catagoryData';
import MenuDropDoun from './MenuDropDoun';

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const Nevbar = () => {
    return (
        <div className='py-2'>
            <div className='flex justify-between px-5 pb-1'>
                <div className='flex items-center'>
                    <IconButton sx={{
                        display: {
                            xs: "block",
                            md: "none"
                        }
                    }} className='base:block md:hidden'>
                        <RiMenuFold2Line className='text-black' />
                    </IconButton>
                    <div className='border-r-1 md:pl-10 pr-2 flex justify-center items-center'>
                        <img className='base:w-1/4 md:w-3/4' src="https://assets.pharmeasy.in/apothecary/images/logo_big.svg?dim=360x0" alt="" />
                    </div>
                    <div className='px-3 hidden md:block'>
                        <p className='pl-2'><span>✔</span>Express delivery to</p>
                        <Button
                            variant="text"
                            color='black'
                            className='font-bold'
                            style={{ fontWeight: "bold", margin: "0px", padding: "0px" }}
                            size='large'
                        >Select Pincode
                            <ArrowDropDownIcon />
                        </Button>
                    </div>
                </div>
                <div className='flex items-center md:gap-5'>
                    <button className='hidden md:flex items-center gap-1 hover:border-b border-dashed cursor-pointer'>
                        <IconButton >
                            <PersonIcon className='text-black' />
                        </IconButton>
                        <p className='hidden lg:block'>Hello,</p>
                        <p className='hidden lg:block'>Log in</p>
                    </button>

                    <button className='flex gap-1 items-center hover:border-b border-dashed cursor-pointer'>
                        <IconButton>
                            <BiSolidOffer className='text-black' />
                        </IconButton>
                        <p className='hidden lg:block'>Offers</p>
                    </button>

                    <button className='flex items-center gap-1 hover:border-b border-dashed cursor-pointer'>
                        <IconButton>
                            {/* <ShoppingCartIcon fontSize="small" /> */}
                            <IoCartOutline className='text-black' />
                            <CartBadge badgeContent={2} color="primary" overlap="circular" />
                        </IconButton>
                        <p className='hidden lg:block'>Cart</p>
                    </button>
                </div>
            </div>

            {/* catagories */}
            <div className='border border-gray-400 py-2  hidden md:flex px-36 justify-around' >
                {catagores.map((catagory, idx) => {
                    if (catagory.label === "Health Blogs") {
                        return <MenuDropDoun key={idx}>
                            {catagory.label}
                        </MenuDropDoun>
                    }
                    return <h3
                        key={idx}
                        className='cursor-pointer hover:text-[#10847e] font-semibold text-sm'
                    >{catagory.label}</h3>
                })}
            </div>
        </div>
    );
};

export default Nevbar;