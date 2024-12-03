"use client";

import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "./components";

const NavBar = () => {
    const currentPath = usePathname();

    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Flex justify="between">
                <Flex align="center" gap="3">
                    <Link href="/">
                        <AiFillBug />
                    </Link>
                    <NavLinks currentPath={currentPath} />
                </Flex>
                <AuthStatus currentPath={currentPath} />
            </Flex>
        </nav>
    );
};

const NavLinks = ({ currentPath }: { currentPath: string }) => {
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" },
    ];
    return (
        <ul className="flex space-x-6">
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        className={classNames({
                            "nav-link": true,
                            "active-nav-link": link.href === currentPath,
                        })}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const AuthStatus = ({ currentPath }: { currentPath: string }) => {
    const { status, data: session } = useSession();

    const authLinks = [
        { label: "Login", href: "/api/auth/signin" },
        { label: "Register", href: "/users/new" },
    ];

    if (status === "loading")
        return (
            <Flex gap="3">
                <Skeleton width="3rem" />
                <Skeleton width="4rem" />
            </Flex>
        );

    if (status === "unauthenticated")
        return (
            <ul className="flex space-x-6">
                {authLinks.map((authLink) => (
                    <li key={authLink.href}>
                        <Link
                            className={classNames({
                                "nav-link": true,
                                "active-nav-link":
                                    authLink.href === currentPath,
                            })}
                            href={authLink.href}
                        >
                            {authLink.label}
                        </Link>
                    </li>
                ))}
            </ul>
        );

    return (
        <Box>
            {status === "authenticated" &&
                (session.user?.image ? (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Avatar
                                src={session.user.image!}
                                fallback={session.user.name![0]}
                                size="2"
                                radius="full"
                                className="cursor-pointer"
                                referrerPolicy="no-referrer"
                            ></Avatar>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Label>
                                <Text size="2">{session.user.email}</Text>
                            </DropdownMenu.Label>
                            <DropdownMenu.Item>
                                <Link href="/api/auth/signout">Log out</Link>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                ) : (
                    <Link href="/api/auth/signout">Log out</Link>
                ))}
        </Box>
    );
};

export default NavBar;
