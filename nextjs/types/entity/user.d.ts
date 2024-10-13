export enum UserStatus {
  UNVERIFY = "unverify",
  VERIFY = "verify",
  LOCKED = "locked",
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  roleId: number;
  status: UserStatus;
  avatar?: string;
}
