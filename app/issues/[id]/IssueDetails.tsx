import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import IssueStatusDropdown from "../_components/IssueStatusDropdown";
import authOptions from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import { IssueStatusBadge } from "@/app/components";

const IssueDetails = async ({ issue }: { issue: Issue }) => {
    const session = await getServerSession(authOptions);

    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" my="2">
                {session && <IssueStatusDropdown issue={issue} />}
                {!session && <IssueStatusBadge status={issue.status} />}
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose max-w-full" mt="4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    );
};

export default IssueDetails;
