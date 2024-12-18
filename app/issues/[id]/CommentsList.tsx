import authOptions from "@/app/api/auth/authOptions";
import prisma from "@/prisma/client";
import { Avatar, Box, Flex, Heading, Table, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import DeleteButton from "../_components/DeleteButtons";

const CommentsPage = async ({ issueId }: { issueId: number }) => {
  const session = await getServerSession(authOptions);
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
                <Flex justify="between" align="baseline">
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
                  {session?.user?.email === comment.user.email && (
                    <DeleteButton
                      issueId={issueId}
                      commentId={comment.id}
                      deleting="comment"
                    />
                  )}
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
