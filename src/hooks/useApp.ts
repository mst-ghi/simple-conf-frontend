import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface States {
  isInvalidToken?: boolean;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  micStatus?: boolean;
  webcamStatus?: boolean;
  screenSharingStatus?: boolean;
  user?: IUser;
  joinedCommunities?: ICommunity[];
}

export interface Actions {
  setIsInvalidToken: (isInvalidToken?: boolean) => void;
  setIsLoggedIn: (isLoggedIn?: boolean) => void;
  setIsLoading: (isLoading?: boolean) => void;
  setMicStatus: (micStatus?: boolean) => void;
  setWebcamStatus: (webcamStatus?: boolean) => void;
  setScreenSharingStatus: (screenSharingStatus?: boolean) => void;
  setUser: (user?: IUser) => void;
  setJoinedCommunities: (joinedCommunities?: ICommunity[]) => void;
}

const InitStoreData: States = {
  isLoading: true,
  micStatus: false,
  webcamStatus: false,
  screenSharingStatus: false,
};

const useApp = create(
  immer<States & Actions>((set) => ({
    ...InitStoreData,
    setIsInvalidToken: (isInvalidToken) => set(() => ({ isInvalidToken })),
    setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
    setIsLoading: (isLoading) => set(() => ({ isLoading })),
    setMicStatus: (micStatus) => set(() => ({ micStatus })),
    setWebcamStatus: (webcamStatus) => set(() => ({ webcamStatus })),
    setScreenSharingStatus: (screenSharingStatus) =>
      set(() => ({ screenSharingStatus })),
    setUser: (user) =>
      set(() => {
        return {
          user,
          isLoggedIn: Boolean(user),
          isInvalidToken: !Boolean(user),
        };
      }),
    setJoinedCommunities: (joinedCommunities) =>
      set(() => ({ joinedCommunities })),
  })),
);

export default useApp;
