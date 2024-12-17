"use client";

import { Status } from "@prisma/client";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useUsers } from "../[id]/AssigneeSelect";
import IssueFilter from "./IssueFilter";

export type Statuses = { name: string; id: Status | "ALL" }[];

const statuses: Statuses = [
  { name: "All", id: "ALL" },
  { name: "Open", id: "OPEN" },
  { name: "In Progress", id: "IN_PROGRESS" },
  { name: "Closed", id: "CLOSED" },
];

const Filter = () => {
  const [isVisible, setVisible] = useState(false);
  const { data: users, isLoading } = useUsers();
  if (isLoading) return null;

  const handleVisibility = () => {
    if (!isVisible) setVisible(true);
    else setVisible(false);
  };

  return (
    <Flex gap="3" align="center">
      <Button variant="ghost" ml="4" onClick={handleVisibility}>
        <MixerHorizontalIcon />
      </Button>
      {isVisible && (
        <Flex gap="3">
          <IssueFilter data={statuses} filterBy="status" />
          <IssueFilter data={users!} filterBy="assignee" />
        </Flex>
      )}
    </Flex>
  );
};

export default Filter;
