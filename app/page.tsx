import Pagination from "./components/Pagination";

interface Props {
    searchParams: Promise<{ page: string }>;
}

export default async function Home({ searchParams }: Props) {
    const awaitedParams = await searchParams;
    return (
        <Pagination
            itemCount={100}
            pageSize={10}
            currentPage={parseInt(awaitedParams.page)}
        />
    );
}
