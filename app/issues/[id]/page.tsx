import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import delay from "delay";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    await delay(1000);

    if (!issue) notFound();

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" my="2">
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>{issue.description}</Card>
        </div>
    );
};

export default IssueDetailPage;
