import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "jdoe@example.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword!
                );

                return passwordsMatch ? user : null;
            },
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            // You can customize the redirect URL here
            // Ensure that after successful login, we redirect to the correct place
            // Redirect to the home page or any page you'd like after Google login

            if (url.startsWith(baseUrl)) {
                return baseUrl; // Return the base URL or homepage
            }
            return url; // If not, just return the URL provided by NextAuth
        },
    },
});

export { handler as GET, handler as POST };
