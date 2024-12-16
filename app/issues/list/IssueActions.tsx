import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import Filter from "./Filter";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Filter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
