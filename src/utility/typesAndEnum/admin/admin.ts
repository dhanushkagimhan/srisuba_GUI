type AdminLoginType = {
  email: string;
  password: string;
};

type AdminLoginVerifyType = {
  email?: string;
  code: string;
};

export type { AdminLoginType, AdminLoginVerifyType };
