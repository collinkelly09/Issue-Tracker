import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import Pagination from "@/app/components/Pagination";

interface Props {
    searchParams: Promise<{
        status: Status;
        orderBy: keyof Issue;
        page: string;
    }>;
}
const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
}[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const IssuesPage = async ({ searchParams }: Props) => {
    const awaitedParams = await searchParams;
    const statuses = Object.values(Status);
    const status = statuses.includes(awaitedParams.status)
        ? awaitedParams.status
        : undefined;

    const orderBy = columns
        .map((column) => column.value)
        .includes(awaitedParams.orderBy)
        ? { [awaitedParams.orderBy]: "asc" }
        : undefined;

    const where = { status };

    const page = parseInt(awaitedParams.page) || 1;
    const pageSize = 10;

    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const issueCount = await prisma.issue.count({ where });

    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) => (
                            <Table.ColumnHeaderCell
                                key={column.value}
                                className={column.className}
                            >
                                <NextLink
                                    href={{
                                        query: {
                                            status,
                                            orderBy: column.value,
                                        },
                                    }}
                                >
                                    {column.label}
                                </NextLink>

                                {column.value === awaitedParams.orderBy && (
                                    <>
                                        {" "}
                                        <ArrowUpIcon className="inline" />
                                        <NextLink
                                            href={{
                                                query: {
                                                    status,
                                                    orderBy: "",
                                                },
                                            }}
                                        >
                                            <Cross2Icon className="inline" />
                                        </NextLink>
                                    </>
                                )}
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {issue.createdAt.toDateString()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Pagination
                pageSize={pageSize}
                itemCount={issueCount}
                currentPage={page}
            />
        </div>
    );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
