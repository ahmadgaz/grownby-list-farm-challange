export type RegisterType = {
    email: string;
    password: string;
    confirmPassword: string;
};

export type LoginType = Omit<RegisterType, "confirmPassword">;
