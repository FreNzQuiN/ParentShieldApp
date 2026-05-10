import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AboutPage from './pages/AboutPage';
import ChildrenPage from './pages/ChildrenPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LogActivityPage from './pages/LogActivityPage';
import LoginChildPage from './pages/LoginChildPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SettingPage from './pages/SettingPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/login-child" element={<LoginChildPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/log-activity" element={<LogActivityPage />} />
            <Route path="/children" element={<ChildrenPage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
