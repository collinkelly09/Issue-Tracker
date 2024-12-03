import prisma from "@/prisma/client";
import Pagination from "./components/Pagination";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Status } from "@prisma/client";

export default async function Home() {
    const open = await prisma.issue.count({ where: { status: "OPEN" } });
    const inProgress = await prisma.issue.count({
        where: { status: "IN_PROGRESS" },
    });
    const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
    const issueStats = { open, inProgress, closed };
    // const stats = await prisma.issue.groupBy({
    //     by: ["status"],
    //     _count: { status: true },
    // });

    // const issueStats = stats.reduce((acc, { status, _count }) => {
    //     acc[status] = _count.status;
    //     return acc;
    // }, {} as Record<Status, number>);
    // console.log(issueStats);

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Flex direction="column" gap="5">
                <IssueSummary stats={issueStats} />
                <IssueChart stats={issueStats} />
            </Flex>
            <LatestIssues />
        </Grid>
    );
}
