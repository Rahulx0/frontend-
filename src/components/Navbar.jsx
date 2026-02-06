import React from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';

const Navbar = () => {

const { currentUser } = useSelector((state) => state.user);

    return (
        <div className='flex items-center px-6 py-3 bg-[#2D73B9] shadow-md'>
            <div className="flex items-center gap-2 w-56">
                <img
                    className="w-10 h-10 rounded-full border border-white/90 shadow-sm"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWp1VH0chk5el7ykIOMp7p-7LdMJ1u3mBQOA&s' width='72' height='72' viewBox='0 0 72 72'><rect width='72' height='72' rx='36' fill='%23244f7a'/><circle cx='36' cy='28' r='14' fill='%23b9d4f1'/><path d='M12 66c4-14 20-18 24-18s20 4 24 18' fill='%23b9d4f1'/></svg>"
                    alt="user profile"
                />
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-medium text-white/95 shadow-sm">
                    {currentUser?.email || "Guest"}
                </span>
            </div>

            <div className="flex-1 flex justify-center">
                <div className="hidden items-center gap-2 rounded-md bg-white/15 px-3 py-2 md:flex">
                    <svg className="h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        className="w-64 bg-transparent text-sm text-white placeholder-white/70 outline-none"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 w-32">
                <IoNotificationsOutline className="text-white text-[24px] transition-transform duration-200 hover:scale-110 hover:text-white/80" />
                <div className="flex items-center gap-1.5">
                    <span className="text-white text-[16px] font-semibold tracking-wide leading-none">Linked</span>
                    <img
                        className="w-8 h-8 -translate-y-[1px] rounded-sm shadow-sm"
                        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                        alt="linkedin_logo"
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar