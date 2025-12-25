import NextAuth, { type AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null

        const { email, password } = credentials

        await new Promise((resolve) => setTimeout(() => resolve(true), 1000));

        if (email === "admin@gmail.com" && password === "Admin123.") {
          return {
            id: "1",
            name: "john joe",
            email: "admin@gmail.com",
            image: null,
            role: "ADMIN",
            accessToken: "123",
            createdAt: "12-12-2012",
          };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (!!user) {
        const { id, email, image, role, accessToken, createdAt } = user;

        token.sub = id;
        token.email = email;
        token.picture = image;
        token.role = role;
        token.accessToken = accessToken;
        token.createdAt = createdAt;
      }

      return token;
    },
    async session({ session, token }) {
      if (!!session.user) {
        const { sub, email, picture, role, accessToken, createdAt } = token;
        session.user.id = sub;
        session.user.email = email;
        session.user.image = picture;
        session.user.role = role;
        session.user.accessToken = accessToken;
        session.user.createdAt = createdAt;
      }

      return session;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }