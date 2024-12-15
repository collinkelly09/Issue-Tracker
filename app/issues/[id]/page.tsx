import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

import authOptions from "@/app/api/auth/authOptions";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { cache } from "react";
import CommentsPage from "../_components/CommentsPage";
import NewComment from "../_components/NewComment";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const { id } = await params;
  const issue = await fetchUser(parseInt(id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id}></EditIssueButton>
            <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
          </Flex>
        </Box>
      )}
      <Box className="md:col-span-4">
        <CommentsPage />
        {session?.user && <NewComment issueId={issue.id} />}
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchUser(parseInt(id));

  return {
    title: issue?.title,
    description: `Details of issue ${issue?.id}`,
  };
}

export default IssueDetailPage;
