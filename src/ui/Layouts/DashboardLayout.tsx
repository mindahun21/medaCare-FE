import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LeftSideBar from '../../features/dashboard/ui/LeftSideBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../features/authentication/AuthSelectors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const role = useSelector(selectUserRole);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-white ">
      <aside
        className={` border-r-[0.9px] border-secondary-gray-border ${
          isSidebarOpen ? 'w-[223px] xl:w-[300px]' : 'w-[80px]'
        }  fixed min-h-full bg-primary-teal-surface transition-all duration-500 ease-in-out `}
      >
        <div className="h-full w-full relative   ">
          <LeftSideBar isOpen={isSidebarOpen} />
          <button
            className="absolute top-[19px] -right-[15px] w-[25px] h-[26px] bg-secondary-gray-surface rounded-[10px] flex justify-between items-center z-40  "
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            {isSidebarOpen ? (
              <ChevronLeftIcon sx={{ height: 30, width: 25 }} />
            ) : (
              <ChevronRightIcon sx={{ height: 30, width: 25 }} />
            )}
          </button>
        </div>
      </aside>
      <div
        className={`w-full min-h-full overflow-y-auto overflow-x-hidden flex flex-col transition-all duration-500 ease-in-out ${
          isSidebarOpen ? 'ms-[223px] xl:ms-[300px]' : 'ms-[80px]'
        }`}
      >
        <div
          className={`fixed h-[65px] ms-[20px] border-b-[1px] border-secondary-gray-border px-[34px] py-[13px] flex items-center justify-between bg-white z-10 ${
            isSidebarOpen
              ? 'w-[calc(100%-228px)] xl:w-[calc(100%-300px)] '
              : 'w-[calc(100%-85px)]'
          }  `}
        >
          <div className="rounded-[3px] p-[1px] bg-gradient-to-r from-[#03A9F4] to-[#38AAD433] h-full ">
            <div className="h-full rounded-[3px] bg-white px-2 flex ">
              <IconButton size="medium">
                <SearchIcon />
              </IconButton>
              <div className="flex-1 h-full flex items-center">
                <input
                  ref={searchInputRef}
                  placeholder="Search"
                  className="outline-none border-none bg-transparent text-[13px] leading-[150px] "
                />
              </div>
              <div className="flex items-center gap-2 px-2 text-primary-teal">
                <span className="flex items-center bg-[#1D586E1C] w-[18px] h-[18px] ">
                  <KeyboardCommandKeyIcon sx={{ width: 17, height: 17 }} />
                </span>
                <div className="flex items-center justify-center text-center  bg-[#1D586E1C] w-[18px] h-[18px] ">
                  F
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-[16px] h-full items-center ">
            <button className="h-[32px] w-[32px] rounded-[8px] border-[1px] border-[#E7EAE9] flex items-center justify-center ">
              <NotificationsNoneIcon />
            </button>
            <Avatar sx={{ bgcolor: 'var(--color-primary-teal)' }}>
              {role?.charAt(0)}
            </Avatar>
            <span className="font-medium text-[13px] leading-[150%] ">
              {role}
            </span>
            <button className="">
              <KeyboardArrowDownIcon />
            </button>
          </div>
        </div>
        <div className="mt-[90px] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
