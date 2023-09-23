import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

const adapter = PrismaAdapter(prisma);

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: adapter,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "email"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        if (!credentials!.email || !credentials!.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials!.email,
          },
        });

        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          credentials!.password,
          user.password!
        );

        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
