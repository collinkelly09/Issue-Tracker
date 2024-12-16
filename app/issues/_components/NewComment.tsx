"use client";

import { ErrorMessage } from "@/app/components";
import { commentFormSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Avatar, Box, Button, Flex, Spinner, TextArea } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CommentFormData = z.infer<typeof commentFormSchema>;

const NewComment = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const { data: users, isLoading } = useUsers();

  if (status === "unauthenticated") {
    return null;
  }

  let user: User | undefined;
  if (!isLoading) {
    user = users?.find((user) => user.email === session?.user?.email);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (data: CommentFormData) => {
    try {
      setSubmitting(true);
      const submissionData = {
        ...data,
        userId: user?.id,
        issueId,
      };
      await axios.post("/api/comments", submissionData);
      router.refresh();
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  };

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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-2/5 w-full space-y-2"
          >
            <TextArea
              placeholder="New Comment"
              radius="full"
              size="2"
              {...register("comment")}
            />
            <ErrorMessage>{errors.comment?.message}</ErrorMessage>

            <Button disabled={isSubmitting}>
              Post
              {isSubmitting && <Spinner />}
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
