import { Select } from "@radix-ui/themes";
import React from "react";
import { useUsers } from "../[id]/AssigneeSelect";
import { useRouter, useSearchParams } from "next/navigation";
import NextLink from "next/link";

const IssueAssigneeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: users, isLoading } = useUsers();
  if (isLoading) return null;

  const handleValueChange = (assignee: string) => {
    const params = new URLSearchParams();
    if (assignee) params.append("assignee", assignee);
    if (searchParams.get("status"))
      params.append("status", searchParams.get("status")!);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);
    const query = params.size ? "?" + params.toString() : "";
    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("assignee") || ""}
      onValueChange={handleValueChange}
    >
      <Select.Trigger placeholder="Assignee..." />
      <Select.Content>
        <Select.Item value="all">All</Select.Item>
        <Select.Item value="unassigned">Unassigned</Select.Item>
        {users!.map((user) => (
          <Select.Item key={user.id} value={user.id}>
            {user.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueAssigneeFilter;
