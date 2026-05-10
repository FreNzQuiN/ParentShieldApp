import LogsIcon from '@/assets/logs'
import { HomeIcon, KidsIcon, LockIcon, About, Settings } from '@/assets'

import { RouteProps } from './route/types'

export const Routes: RouteProps[] = [
    {
        path: '/dashboard',
        icon: <HomeIcon />,
        children: 'Dashboard',
    },
    {
        path: '/log-activity',
        icon: <LogsIcon />,
        children: 'Log Activity',
    },
    {
        path: '/children',
        icon: <KidsIcon />,
        children: 'Children',
    },
    {
        path: '/home',
        icon: <LockIcon />,
        children: 'Lock',
    },
    {
        path: '/about',
        icon: <About />,
        children: 'About',
    },
    {
        path: '/setting',
        icon: <Settings />,
        children: 'Setting',
    }
]