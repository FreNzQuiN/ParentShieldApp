import { UserChild, UserParent } from '@/models';

const setUser = (set: any, user?: UserParent) => set(() => ({ user: user }));

const setChildrenList = (set: any, childrenList: UserChild[]) =>
  set(() => ({ childrenList }));

const setIsBannerOpen = (set: any, status: boolean) =>
  set(() => ({ isBannerOpen: status }));

const setIsAuthenticating = (set: any, status: boolean) =>
  set(() => ({ isAuthenticating: status }));

const setSelectedChildId = (set: any, selectedChildId: string) =>
  set(() => ({ selectedChildId }));

export {
  setUser,
  setIsBannerOpen,
  setChildrenList,
  setIsAuthenticating,
  setSelectedChildId,
};
