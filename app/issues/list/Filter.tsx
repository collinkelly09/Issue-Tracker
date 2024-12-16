"use client";

import React, { useState } from "react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex } from "@radix-ui/themes";
import IssueStatusFilter from "./IssueStatusFilter";

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
      {isVisible && <IssueStatusFilter />}
    </Flex>
  );
};

export default Filter;
