"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

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
            <Container>
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
                                                    authLink.href ===
                                                    currentPath,
                                                "text-zinc-500":
                                                    authLink.href !==
                                                    currentPath,
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
                        {status === "authenticated" && (
                            <Link href="/api/auth/signout">Log out</Link>
                        )}
                    </Box>
                </Flex>
            </Container>
        </nav>
    );
};

export default NavBar;
