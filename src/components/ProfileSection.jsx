import React from 'react'
import { useSelector } from 'react-redux'
import { IoIosSettings } from "react-icons/io";
import { TbPremiumRights } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
const ProfileSection = () => {

    const { currentUser } = useSelector((state) => state.user);

    return (
        <div>
            <div className='border-2 flex flex-col p-4 mt-4 rounded-lg gap-4 bg-black/5'>
                <NavLink to="/profile">
                    <div className='flex items-center gap-3'>
                        <img
                            className="w-10 h-10 rounded-full border border-white/90 shadow-sm"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWp1VH0chk5el7ykIOMp7p-7LdMJ1u3mBQOA&s' width='72' height='72' viewBox='0 0 72 72'><rect width='72' height='72' rx='36' fill='%23244f7a'/><circle cx='36' cy='28' r='14' fill='%23b9d4f1'/><path d='M12 66c4-14 20-18 24-18s20 4 24 18' fill='%23b9d4f1'/></svg>"
                            alt="user profile"
                        />
                        <div className='flex flex-col leading-tight'>
                            <h2 className='font-semibold text-lg'>{currentUser?.username || 'Guest'}</h2>
                            <h4 className='text-sm text-gray-500'>headline</h4>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <ul className='text-base font-semibold flex flex-col gap-3'>
                            <li className='cursor-pointer flex items-center gap-2 text-gray-800 hover:text-black'>
                                <span className='w-5 h-5 inline-flex items-center justify-center flex-shrink-0'>
                                    <FaUser className='w-4 h-4' />
                                </span>
                                <span>Profile views</span>
                            </li>
                            <li className='cursor-pointer flex items-center gap-2 text-gray-800 hover:text-black'>
                                <span className='w-5 h-5 inline-flex items-center justify-center flex-shrink-0'>
                                    <IoIosSettings className='w-4 h-4' />
                                </span>
                                <span>Account Settings</span>
                            </li>
                            <li className='cursor-pointer flex items-center gap-2 text-gray-800 hover:text-black'>
                                <span className='w-5 h-5 inline-flex items-center justify-center flex-shrink-0'>
                                    <TbPremiumRights className='w-4 h-4' />
                                </span>
                                <span>Upgrade to Premiuim</span>
                            </li>
                        </ul>
                    </div>
                </NavLink>
            </div>
        </div>
    )



}

export default ProfileSection