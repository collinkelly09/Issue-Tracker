import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Button, Flex, Popover, Radio, Text } from "@radix-ui/themes";

const IssueStatusDropdown = ({ issue }: { issue: Issue }) => {
    return (
        <Popover.Root>
            <Popover.Trigger>
                <Button variant="ghost">
                    <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                </Button>
            </Popover.Trigger>
            <Popover.Content size="1" maxWidth="300px">
                <Flex align="start" direction="column" gap="1">
                    <Flex asChild gap="2">
                        <Text as="label" size="2">
                            <Radio
                                name="example"
                                value="OPEN"
                                defaultChecked={issue.status === "OPEN"}
                            />
                            <IssueStatusBadge status="OPEN"></IssueStatusBadge>
                        </Text>
                    </Flex>

                    <Flex asChild gap="2">
                        <Text as="label" size="2">
                            <Radio name="example" value="IN_PROGRESS" />
                            <IssueStatusBadge status="IN_PROGRESS"></IssueStatusBadge>
                        </Text>
                    </Flex>

                    <Flex asChild gap="2">
                        <Text as="label" size="2">
                            <Radio name="example" value="3" />
                            <IssueStatusBadge status="CLOSED"></IssueStatusBadge>
                        </Text>
                    </Flex>
                </Flex>
            </Popover.Content>
        </Popover.Root>
    );
};

export default IssueStatusDropdown;
