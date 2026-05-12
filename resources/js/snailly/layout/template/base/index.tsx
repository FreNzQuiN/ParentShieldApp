import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { LogoSnaily } from '@/assets';
import { Paragraph } from '@/typography';
import { zustand } from '@/services';
import { axiosPost, ensureCsrfCookie } from '@/utils';

import Route from './route';
import { Routes } from './helpers';
import { BaseProps } from './types';
import {
  sBase,
  sBaseHeader,
  sBaseContent,
  sBaseNavigation,
  sBaseSidebarOpen,
  sBaseSidebarToggle,
  sBaseSidebarToggleBar,
  sBaseSidebarOverlay,
  sBaseHeaderTitle,
  sBaseNavigationLogo,
  sBaseNavigationList,
  sBaseChildrenWrapper,
  sBaseNavigationFooter,
  sBaseNavigationContent,
} from './styles';
import PageTitle from '@/components/pagetitle';
import ChildFace from '@/assets/childFace';
import SelectChild from '@/components/selectChild';

const Base = ({ title, children }: BaseProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setUser, setChildrenList, setSelectedChildId } = zustand();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logOutButtonHandler = async () => {
    try {
      await ensureCsrfCookie();
      await axiosPost('/auth/logout', {}, {});
    } finally {
      setUser(undefined);
      setChildrenList([]);
      setSelectedChildId('');
      navigate('/auth/login');
    }
  };

  return (
    <div className={sBase}>
      {isSidebarOpen && (
        <button
          type="button"
          className={sBaseSidebarOverlay}
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}
      <div className={`${sBaseNavigation} ${isSidebarOpen ? sBaseSidebarOpen : ''}`}>
        <div className={sBaseNavigationContent}>
          <div className={sBaseNavigationLogo}>
            <LogoSnaily />
          </div>
          <div className={sBaseNavigationList}>
            {Routes.map((item, index) => {
              return (
                <Route
                  key={index}
                  path={item.path}
                  icon={item.icon}
                  isActive={location.pathname === item.path}
                >
                  {item.children}
                </Route>
              );
            })}
          </div>
          <div>
            <Button
              onClick={logOutButtonHandler}
              type="button"
              variant="secondary"
              fullWidth
            >
              Log Out
            </Button>
          </div>
        </div>
        <div className={sBaseNavigationFooter}>
          <Paragraph variant="xs" white>
            Snailly Team &copy; 2024
          </Paragraph>
        </div>
      </div>
      <div className={sBaseContent}>
        <div className={sBaseHeader}>
          <button
            type="button"
            className={sBaseSidebarToggle}
            onClick={() => setIsSidebarOpen((previous) => !previous)}
            aria-label="Toggle sidebar"
          >
            <span className={sBaseSidebarToggleBar} />
            <span className={sBaseSidebarToggleBar} />
            <span className={sBaseSidebarToggleBar} />
          </button>
          <PageTitle title={title} />
          <SelectChild />
        </div>
        <div className={sBaseChildrenWrapper}>{children}</div>
      </div>
    </div>
  );
};

export default Base;
