"use client";

import { IssueStatusBadge } from "@/app/components";
import { issueStatusSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { CheckIcon } from "@radix-ui/react-icons";
import {
    Box,
    Button,
    Callout,
    DropdownMenu,
    Flex,
    Popover,
    RadioGroup,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type IssueStatusData = z.infer<typeof issueStatusSchema>;

const IssueStatusDropdown = ({ issue }: { issue: Issue }) => {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueStatusData>({
        resolver: zodResolver(issueStatusSchema),
        defaultValues: {
            // Initialize with the current status of the issue
            status: issue.status,
        },
    });
    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    // const [isOpen, setIsOpen] = useState(true);

    const onSubmit = handleSubmit(async (data) => {
        try {
            await axios.patch(`/api/issues/${issue.id}/status`, data);
            router.refresh();
        } catch (error) {
            setError("An unexpected error occurred.");
        }
    });
    return (
        <Popover.Root>
            <Popover.Trigger>
                <Button variant="ghost">
                    <IssueStatusBadge status={issue.status} />
                </Button>
            </Popover.Trigger>
            <Popover.Content size="1" maxWidth="300px">
                <div>
                    {error && (
                        <Callout.Root color="red" className="mb-5">
                            <Callout.Text>{error}</Callout.Text>
                        </Callout.Root>
                    )}
                    <form onSubmit={onSubmit}>
                        <Flex
                            className="pb-3"
                            direction="column"
                            justify="center"
                        >
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup.Root
                                        {...field}
                                        // Bind the value of the radio group to the form state
                                        value={field.value}
                                        // Update the form state when the radio value changes
                                        onValueChange={field.onChange}
                                    >
                                        <RadioGroup.Item value="OPEN">
                                            <IssueStatusBadge status="OPEN" />
                                        </RadioGroup.Item>
                                        <RadioGroup.Item value="IN_PROGRESS">
                                            <IssueStatusBadge status="IN_PROGRESS" />
                                        </RadioGroup.Item>
                                        <RadioGroup.Item value="CLOSED">
                                            <IssueStatusBadge status="CLOSED" />
                                        </RadioGroup.Item>
                                    </RadioGroup.Root>
                                )}
                            />
                            <Popover.Close>
                                <Box className="flex justify-center pt-2 px-3">
                                    <Button
                                        size="1"
                                        type="submit"
                                        className="mt-2"
                                    >
                                        <CheckIcon />
                                        Update
                                    </Button>
                                </Box>
                            </Popover.Close>
                        </Flex>
                    </form>
                </div>
            </Popover.Content>
        </Popover.Root>
    );
};

export default IssueStatusDropdown;
