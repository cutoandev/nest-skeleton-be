export type JwtPayload = {
  sub: string;
  email: string;
  permissions: string[];
  iat?: number;
  exp?: number;
};
