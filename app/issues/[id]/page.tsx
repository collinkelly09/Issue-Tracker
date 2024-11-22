import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

interface Props {
    params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className="md:col-span-4">
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <Flex direction="column" gap="4">
                    <EditIssueButton issueId={issue.id}></EditIssueButton>
                    <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
                </Flex>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;
