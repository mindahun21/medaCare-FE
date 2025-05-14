import { Link, useLocation } from 'react-router-dom';
import AuthBanner from '../../authentication/components/AuthBanner';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Role from '../../../ui/shared/Role';
import EventNoteIcon from '@mui/icons-material/EventNote';

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
          isActive={location.pathname.includes('/dashboard')}
          isOpen={isOpen}
          icon={<DashboardIcon />}
          text="Dashboard"
          to="/home/dashboard"
        />
        <Role allowedRoles={['ADMIN', 'ORG_ADMIN']} fallback={null}>
          {() => (
            <Item
              isActive={location.pathname.includes('/physicians')}
              isOpen={isOpen}
              icon={<EventNoteIcon />}
              text="Physicians"
              to="/home/physicians"
            />
          )}
        </Role>

        <Role allowedRoles={['ADMIN']} fallback={null}>
          {() => (
            <Item
              isActive={location.pathname.includes('/institutions')}
              isOpen={isOpen}
              icon={<EventNoteIcon />}
              text="Institutions"
              to="/home/institutions"
            />
          )}
        </Role>
        <Role allowedRoles={['ADMIN']} fallback={null}>
          {() => (
            <Item
              isActive={location.pathname.includes('/patients')}
              isOpen={isOpen}
              icon={<EventNoteIcon />}
              text="Patients"
              to="/home/patients"
            />
          )}
        </Role>
        <Role allowedRoles={['PHYSICIAN']} fallback={null}>
          {() => (
            <>
              <Item
                isActive={location.pathname.includes('/schedules')}
                isOpen={isOpen}
                icon={<EventNoteIcon />}
                text="Schedules"
                to="/home/schedules"
              />
              <Item
                isActive={location.pathname.includes('/appointments')}
                isOpen={isOpen}
                icon={<EventNoteIcon />}
                text="appointments"
                to="/home/appointments"
              />
            </>
          )}
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
