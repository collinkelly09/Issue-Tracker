import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { useState } from "react";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  dir: "asc" | "desc";
  page: string;
  assignee: string;
  pageSize?: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
  status: Status;
}

const IssueTable = ({ searchParams, issues, status }: Props) => {
  return (
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

              {column.value === searchParams.orderBy && (
                <>
                  {" "}
                  <NextLink
                    href={{
                      query: {
                        status,
                        orderBy: column.value,
                        dir: searchParams.dir !== "desc" ? "desc" : "asc",
                      },
                    }}
                  >
                    {searchParams.dir !== "desc" && (
                      <ArrowUpIcon className="inline" />
                    )}
                    {searchParams.dir === "desc" && (
                      <ArrowDownIcon className="inline" />
                    )}
                  </NextLink>
                  <NextLink
                    href={{
                      query: {
                        status,
                        orderBy: null,
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
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
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
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
