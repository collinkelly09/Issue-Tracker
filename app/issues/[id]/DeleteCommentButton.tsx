import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import axios from "axios";

const DeleteCommentButton = () => {
  const DeleteComment = async () => {
    try {
      await axios.delete();
    } catch (error) {}
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="ghost" size="1">
          <Text color="red">Delete</Text>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>
        <Flex gap="3" mt="4">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={DeleteComment}>
              Delete Comment
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteCommentButton;
