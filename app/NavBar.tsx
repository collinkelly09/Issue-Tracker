"use client";

import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
    const { status, data: session } = useSession();
    const currentPath = usePathname();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" },
    ];

    const authLinks = [
        { label: "Login", href: "/api/auth/signin" },
        { label: "Register", href: "/users/new" },
    ];

    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Flex justify="between">
                <Flex align="center" gap="3">
                    <Link href="/">
                        <AiFillBug />
                    </Link>
                    <ul className="flex space-x-6">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    className={classNames({
                                        "text-zinc-900":
                                            link.href === currentPath,
                                        "text-zinc-500":
                                            link.href !== currentPath,
                                        "hover:text-zinc-800 transition-colors":
                                            true,
                                    })}
                                    href={link.href}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Flex>
                <Box>
                    {" "}
                    {status === "unauthenticated" && (
                        <ul className="flex space-x-6">
                            {authLinks.map((authLink) => (
                                <li key={authLink.href}>
                                    <Link
                                        className={classNames({
                                            "text-zinc-900":
                                                authLink.href === currentPath,
                                            "text-zinc-500":
                                                authLink.href !== currentPath,
                                            "hover:text-zinc-800 transition-colors":
                                                true,
                                        })}
                                        href={authLink.href}
                                    >
                                        {authLink.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
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
                                        <Text size="2">
                                            {session.user.email}
                                        </Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href="/api/auth/signout">
                                            Log out
                                        </Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        ) : (
                            <Link href="/api/auth/signout">Log out</Link>
                        ))}
                </Box>
            </Flex>
        </nav>
    );
};

export default NavBar;
