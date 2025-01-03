import prisma from "@/prisma/client";
import { Issue, User } from "@prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

interface IssueWithUser extends Issue {
  assignedUser: User | null;
}

const LatestIssues = async () => {
  const issues: IssueWithUser[] = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>

                  {issue.assignedUser && (
                    <Avatar
                      src={issue.assignedUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export const dynamic = "force-dynamic";

export default LatestIssues;
