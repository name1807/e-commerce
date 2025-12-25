import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
      role: string;
      accessToken: string;
      createdAt: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: string;
    accessToken: string;
    createdAt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    sub: string;
    name: string;
    email: string;
    picture: string | null;
    role: string;
    accessToken: string;
    createdAt: string;
  }
}