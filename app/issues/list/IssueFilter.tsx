import { Status, User } from "@prisma/client";
import { Box, Flex, Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { Statuses } from "./Filter";

const IssueFilter = ({
  data,
  filterBy,
}: {
  data: Statuses | User[];
  filterBy: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (param: Status | any) => {
    const params = new URLSearchParams();
    const statuses = Object.values(Status);

    if (statuses.includes(param) || param === "ALL")
      params.append("status", param);
    else if (searchParams.get("status"))
      params.append("status", searchParams.get("status")!);

    if (!statuses.includes(param) && param !== "ALL")
      params.append("assignee", param);
    else if (searchParams.get("assignee"))
      params.append("assignee", searchParams.get("assignee")!);

    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);

    const query = params.size ? "?" + params.toString() : "";
    router.push(`/issues/list${query}`);
  };

  return (
    <Flex direction="column">
      <Text size="1" color="gray" className="capitalize">
        {filterBy}:
      </Text>
      <Box ml="2">
        <Select.Root
          defaultValue={searchParams.get(filterBy) || ""}
          onValueChange={handleValueChange}
        >
          <Select.Trigger placeholder="Select" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Select</Select.Label>
              {filterBy === "assignee" && (
                <>
                  <Select.Item value="All">All</Select.Item>
                  <Select.Item value="unassigned">Unassigned</Select.Item>
                </>
              )}
              {data.map((filterItem) => (
                <Select.Item key={filterItem.id} value={filterItem.id}>
                  {filterItem.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Box>
    </Flex>
  );
};

export default IssueFilter;
