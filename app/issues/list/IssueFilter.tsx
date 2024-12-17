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
    const isStatus = statuses.includes(param);

    const status = searchParams.get("status");
    const assignee = searchParams.get("assignee");
    const orderBy = searchParams.get("orderBy");

    const newStatus = isStatus || param === "ALL" ? param : status;
    if (newStatus) params.append("status", newStatus!);

    const newAssignee = !isStatus && param !== "ALL" ? param : assignee;
    if (newAssignee) params.append("assignee", newAssignee);

    if (orderBy) params.append("orderBy", orderBy!);

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
