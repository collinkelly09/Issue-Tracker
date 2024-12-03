import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface IssueStats {
    open: number;
    inProgress: number;
    closed: number;
}

interface IssueProps {
    stats: IssueStats;
}

const IssueSummary = ({ stats }: IssueProps) => {
    const containers: { label: string; value: number; status: Status }[] = [
        { label: "Open Issues", value: stats.open, status: "OPEN" },
        {
            label: "In Progress Issues",
            value: stats.inProgress,
            status: "IN_PROGRESS",
        },
        { label: "Closed Issues", value: stats.closed, status: "CLOSED" },
    ];

    return (
        <Flex gap="4">
            {containers.map((container) => (
                <Card key={container.label}>
                    <Flex direction="column" gap="1">
                        <Link
                            href={`/issues/list?status=${container.status}`}
                            className="text-sm font-medium"
                        >
                            {container.label}
                        </Link>
                        <Text size="5" className="font-bold">
                            {container.value}
                        </Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    );
};

export default IssueSummary;
