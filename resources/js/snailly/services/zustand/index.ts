import { create } from 'zustand';

import { UserChild, UserParent } from '@/models';

import { State } from './types';
import {
    setUser,
    setIsBannerOpen,
    setChildrenList,
    setIsAuthenticating,
    setSelectedChildId,
} from './helpers';

const state = create<State>((set: any) => ({
    user: undefined,
    isBannerOpen: true,
    isAuthenticating: true,
    childrenList: [],
    selectedChildId: '',
    fcmToken: '',

    setUser: (value?: UserParent) => setUser(set, value),
    setIsBannerOpen: (value: boolean) => setIsBannerOpen(set, value),
    setChildrenList: (value: UserChild[]) => setChildrenList(set, value),
    setIsAuthenticating: (value: boolean) => setIsAuthenticating(set, value),
    setSelectedChildId: (value: string) => setSelectedChildId(set, value),
    setFcmToken: (value: string) => set({ fcmToken: value }),
}));

export default state;
