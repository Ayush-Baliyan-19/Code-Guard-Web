/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


export const authOptions= {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "email", type: "text", placeholder: "" },
          password: { label: "password", type: "password", placeholder: "" },
        },
        async authorize(credentials) {
          try {
            if (!credentials?.email || !credentials?.password) {
              return null;
            }
  
            const user = await prisma.user.findUnique({
              where: {
                email: credentials.email,
              },
            });
  
              if (!user) {
              const hashedPassword = await bcrypt.hash(credentials.password, 10);
              const newUser = await prisma.user.create({
                data: {
                email: credentials.email,
                password: hashedPassword,
                name: credentials.email.split('@')[0], // Default name from email
                },
              });
              return {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
              };
              }
  
              if (!user.password) {
              return null;
              }
  
            const passwordMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
  
            if (!passwordMatch) {
              return null;
            }
  
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          } catch (error) {
            console.error("Error authorizing user:", error);
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }: { token: any, user?: any }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }: { session: any, token: any }) {
        if (session.user) {
          session.user.name = token.id as string;
        }
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  }