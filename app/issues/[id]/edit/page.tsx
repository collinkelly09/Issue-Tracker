import prisma from "@/prisma/client";
// import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
// import IssueFormSkeleton from "./loading";

// const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
//     loading: () => <IssueFormSkeleton />,
// });
import { IssueForm } from "./dynamic";

interface Props {
    params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!issue) notFound();

    return <IssueForm issue={issue} />;
};

export default EditIssuePage;
