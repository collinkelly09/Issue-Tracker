import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const awaitedParams = await searchParams;
  const { orderBy, assignee, status, dir } = awaitedParams;
  const statuses = Object.values(Status);

  const currentStatus = statuses.includes(status) ? status : undefined;

  const currentOrder = columnNames.includes(orderBy)
    ? { [orderBy]: dir ?? "asc" }
    : undefined;

  const currentAssignee = assignee !== "unassigned" ? assignee : null;

  const where =
    currentAssignee === "All"
      ? { status: currentStatus }
      : { status: currentStatus, assignedId: currentAssignee };

  const page = parseInt(awaitedParams.page) || 1;
  const pageSize = awaitedParams.pageSize
    ? parseInt(awaitedParams.pageSize)
    : 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: currentOrder,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable
        searchParams={awaitedParams}
        issues={issues}
        status={status!}
      />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View a all project issues",
};

export default IssuesPage;
