"use client";

import { AlertDialog, Button, Flex, Spinner, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteButton = ({
  issueId,
  commentId,
  deleting,
}: {
  issueId: number;
  commentId?: number;
  deleting: string;
}) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      const forComment = deleting === "comment";
      const apiUrl = forComment
        ? `/api/issues/${issueId}/comments/${commentId}`
        : `/api/issues/${issueId}`;
      const clientUrl = forComment ? `/issues/${issueId}` : "/issues/list";

      setDeleting(true);
      await axios.delete(apiUrl);
      router.push(clientUrl);
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          {deleting === "comment" ? (
            <Button variant="ghost" size="1">
              <Text color="red">Delete</Text>
            </Button>
          ) : (
            <Button color="red" disabled={isDeleting}>
              Delete Issue
              {isDeleting && <Spinner />}
            </Button>
          )}
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this {deleting}? This action cannot
            be undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="4">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                disabled={isDeleting}
                variant="solid"
                color="red"
                onClick={handleDelete}
              >
                Delete {deleting.charAt(0).toUpperCase() + deleting.slice(1)}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This {deleting} could not be deleted.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="4"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
