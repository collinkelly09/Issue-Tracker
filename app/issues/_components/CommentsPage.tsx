import prisma from "@/prisma/client";
import { Avatar, Box, Flex, Heading, Table, Text } from "@radix-ui/themes";

const CommentsPage = async ({ issueId }: { issueId: number }) => {
  const comments = await prisma.comment.findMany({
    where: { issueId },
    include: { user: true },
  });

  return (
    <Box>
      {comments.length > 0 && (
        <Heading size="4" ml="2" mb="3">
          Comments
        </Heading>
      )}
      <Table.Root>
        <Table.Body>
          {comments.map((comment) => (
            <Table.Row key={comment.id}>
              <Table.Cell>
                <Flex align="center" gap="4">
                  <Avatar
                    src={comment.user.image!}
                    size="2"
                    radius="full"
                    fallback="?"
                    referrerPolicy="no-referrer"
                  />
                  <Text>{comment.comment}</Text>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default CommentsPage;
