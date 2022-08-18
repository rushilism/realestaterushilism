import React, { useState, useContext } from 'react';
// import icons
import { RiCalendar2Line, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
// import headless ui components
import { Menu } from '@headlessui/react';
// import context
import { HouseContext } from './HouseContext';

const DayDropdown = () => {
  const { day, setDay, days } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className='dropdown-btn w-full text-left'
      >
        <RiCalendar2Line className='dropdown-icon-primary' />
        <div>
          <div className='text-[13px] font-medium leading-tight'>
            {day}
          </div>
          <div className='text-[10px]'>Choose day</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className='dropdown-icon-secondary' />
        ) : (
          <RiArrowDownSLine className='dropdown-icon-secondary' />
        )}
      </Menu.Button>

      <Menu.Items className='dropdown-menu'>
        {days.map((day, index) => {
          return (
            <Menu.Item
              as='li'
              onClick={() => setDay(day)}
              key={index}
              className='cursor-pointer hover:text-violet-700 transition'
            >
              {day}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default DayDropdown;