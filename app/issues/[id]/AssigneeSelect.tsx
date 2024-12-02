"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const {
        data: users,
        error,
        isLoading,
    } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
        staleTime: 60 * 1000,
        retry: 3,
    });

    if (isLoading) return <Skeleton />;

    if (error) return null;

    return (
        <Select.Root
            onValueChange={(userId: string) => {
                axios.patch(`/api/issues/${issue.id}`, {
                    userId: userId,
                });
            }}
        >
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Select</Select.Label>
                    {users?.map((user) => (
                        <Select.Item key={user.id} value={user.id}>
                            {user.name}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
