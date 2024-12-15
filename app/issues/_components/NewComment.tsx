"use client";

import { ErrorMessage, Skeleton } from "@/app/components";
import { commentSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Button, Flex, Spinner, TextArea } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";

type IssueFormData = z.infer<typeof commentSchema>;

const NewComment = ({ issueId }: { issueId: number }) => {
  const { status, data: session } = useSession();
  const { data: users, isLoading } = useUsers();
  const router = useRouter();

  if (status === "unauthenticated") {
    return null;
  }

  let user;
  if (!isLoading) {
    user = users?.find((user) => user.email === session?.user?.email);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: { userId: user?.id, issueId },
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log("here ***********************************");
    // try {
    //   setSubmitting(true);
    //   await axios.post("/api/comments", data);
    //   router.refresh();
    // } catch (error) {
    //   setSubmitting(false);
    //   setError("An unexpected error occurred.");
    // }
  });

  return (
    <Box mt="5">
      {status === "authenticated" && (
        <Flex gap="4" justify="center" width="full">
          <Avatar
            src={session.user?.image!}
            size="2"
            radius="full"
            fallback="?"
            referrerPolicy="no-referrer"
          />
          <form onSubmit={onSubmit} className="md:w-2/5 w-full space-y-2">
            <TextArea
              placeholder="New Comment"
              radius="full"
              size="2"
              {...register("comment")}
            />
            <ErrorMessage>{errors.comment?.message}</ErrorMessage>

            <Button
              //   disabled={isSubmitting}
              type="submit"
            >
              Post
              {/* {isSubmitting && <Spinner />} */}
            </Button>
          </form>
        </Flex>
      )}
    </Box>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 3600 * 1000,
    retry: 3,
  });

export default NewComment;
