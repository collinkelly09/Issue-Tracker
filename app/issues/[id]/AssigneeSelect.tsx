import { Select } from "@radix-ui/themes";
import axios from "axios";
import React from "react";

const AssigneeSelect = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Select</Select.Label>
                    <Select.Item value="1">meeee</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
