import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import IssueStatusDropdown from "../_components/IssueStatusDropdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" my="2">
                <IssueStatusDropdown issue={issue} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose max-w-full" mt="4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    );
};

export default IssueDetails;
