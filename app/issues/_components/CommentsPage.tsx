import prisma from "@/prisma/client";
import {
  Avatar,
  Box,
  Card,
  Flex,
  Heading,
  Table,
  Text,
} from "@radix-ui/themes";
import React from "react";

const CommentsPage = async () => {
  const comments = await prisma.comment.findMany({
    where: { issueId: 1 },
    include: { user: true },
  });

  return (
    <Box>
      <Heading size="4" ml="2" mb="3">
        Comments
      </Heading>
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
