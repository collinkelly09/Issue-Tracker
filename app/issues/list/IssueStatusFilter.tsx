"use client";

import { Status } from "@prisma/client";
import { Flex, Text, Select, Box } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value: Status | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (status: string) => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);
    if (searchParams.get("assignee"))
      params.append("assignee", searchParams.get("assignee")!);

    const query = params.size ? "?" + params.toString() : "";
    router.push(`/issues/list${query}`);
  };

  return (
    <Flex direction="column">
      <Text size="1" color="gray">
        Status:
      </Text>
      <Box ml="2">
        <Select.Root
          defaultValue={searchParams.get("status") || ""}
          onValueChange={handleValueChange}
        >
          <Select.Trigger placeholder="Select" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Select</Select.Label>
              {statuses.map((status) => (
                <Select.Item key={status.value} value={status.value}>
                  {status.label}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Box>
    </Flex>
  );
};

export default IssueStatusFilter;
