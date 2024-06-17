export type RegisterParams = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type LoginParams = {
  username: string;
  password: string;
};

export type UpdateStatusParams = {
  statusMessage: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profile?: Profile;
  presence?: UserPresence;
  peer: UserPeer;
};

export type Profile = {
  id: number;
  about?: string;
  avatar?: string;
  banner?: string;
};

export type UserPresence = {
  id: number;
  statusMessage?: string;
  showOffline: boolean;
};

export type UserPeer = {
  id: string;
};
