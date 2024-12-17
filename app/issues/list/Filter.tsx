"use client";

import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueAssigneeFilter from "./IssueAssigneeFilter";

const Filter = () => {
  const [isVisible, setVisible] = useState(false);

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
          <IssueStatusFilter />
          <IssueAssigneeFilter />
        </Flex>
      )}
    </Flex>
  );
};

export default Filter;
