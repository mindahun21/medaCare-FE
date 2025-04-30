import { Link, useLocation } from 'react-router-dom';
import AuthBanner from '../../authentication/components/AuthBanner';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Role from '../../../ui/shared/Role';

export default function LeftSideBar({ isOpen }: { isOpen: boolean }) {
  const location = useLocation();

  return (
    <div className={`flex flex-col`}>
      <div
        className={` flex justify-center items-center transition-all duration-500 ease-in-out${
          isOpen ? 'px-[25px]' : ' py-[10px] px-[10px] '
        }`}
      >
        <AuthBanner />
      </div>
      <div className={` flex flex-col gap-[4px] px-[14px] `}>
        <Item
          isActive={location.pathname.endsWith('/dashboard')}
          isOpen={isOpen}
          icon={<DashboardIcon />}
          text="Dashboard"
          to="/dashboard"
        />
        <Item
          isActive={location.pathname.endsWith('/physicians')}
          isOpen={isOpen}
          icon={<DashboardIcon />}
          text="Physicians"
          to="/physicians"
        />
        <Role allowedRoles={['ADMIN']} fallback={null}>
          <Item
            isActive={location.pathname.endsWith('/institutions')}
            isOpen={isOpen}
            icon={<DashboardIcon />}
            text="Institutions"
            to="/institutions"
          />
        </Role>
      </div>
    </div>
  );
}

function Item({
  isActive,
  isOpen,
  icon,
  text,
  to,
}: {
  isActive: boolean;
  isOpen: boolean;
  icon: React.ReactNode;
  text: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className={` w-full h-[40px] p-[7px] transition-all duration-300 cursor-pointer   ${
        isActive
          ? 'bg-primary-teal rounded-[4px] '
          : 'hover:bg-primary-teal-100'
      } `}
    >
      <div
        className={`flex items-center ${
          isOpen ? 'justify-start ' : 'justify-center'
        } gap-[7px] transition-all duration-300 ${
          isActive ? 'text-white' : 'text-[#727272]'
        } `}
      >
        <div
          className=""
          style={{
            color: isActive ? 'white' : '#727272',
            transition: 'color 0.3s ease-in-out',
          }}
        >
          {icon}
        </div>
        {isOpen && (
          <p
            className="six-[12px] leading-[150%] transition-all duration-500 font-medium font-inter "
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateX(0)' : 'translateX(-10px)',
            }}
          >
            {text}
          </p>
        )}
      </div>
    </Link>
  );
}
