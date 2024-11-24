"use client";

import { ErrorMessage } from "@/app/components";
import { userSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Label from "@radix-ui/react-label";
import { Box, Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UserFormData = z.infer<typeof userSchema>;

const NewUserPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>({ resolver: zodResolver(userSchema) });
    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data: UserFormData) => {
        try {
            setSubmitting(true);
            const response = await axios.post("/api/register", data);
            console.log("data", response.data, "response:", response);
            if (response.status === 201) {
                await signIn("credentials", {
                    redirect: false,
                    email: data.email,
                    password: data.password,
                });

                router.push("/");
                router.refresh();
            } else {
                throw new Error(response.data.error);
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || err.message;
            setError(errorMessage);
            setSubmitting(false);
        }
    });

    return (
        <div className="flex justify-center">
            <div className="mt-8 md:w-2/5 w-3/5">
                {error && (
                    <Callout.Root color="red" className="mb-5">
                        <Callout.Text>{error}</Callout.Text>
                    </Callout.Root>
                )}
                <form onSubmit={onSubmit} className="space-y-3">
                    <Box>
                        <Label.Root
                            className="text-[15px] font-medium leading-[35px]"
                            htmlFor="firstName"
                        >
                            First Name
                        </Label.Root>
                        <TextField.Root
                            id="firstName"
                            {...register("firstName")}
                        />
                        <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
                    </Box>
                    <Box>
                        <Label.Root
                            className="text-[15px] font-medium leading-[35px]"
                            htmlFor="lastName"
                        >
                            Last Name
                        </Label.Root>
                        <TextField.Root
                            id="lastName"
                            {...register("lastName")}
                        />
                        <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
                    </Box>
                    <Box>
                        <Label.Root
                            className="text-[15px] font-medium leading-[35px]"
                            htmlFor="email"
                        >
                            Email
                        </Label.Root>
                        <TextField.Root
                            id="email"
                            type="email"
                            {...register("email")}
                        />
                        <ErrorMessage>{errors.email?.message}</ErrorMessage>
                    </Box>
                    <Box>
                        <Label.Root
                            className="text-[15px] font-medium leading-[35px]"
                            htmlFor="password"
                        >
                            Password
                        </Label.Root>
                        <TextField.Root
                            id="password"
                            type="password"
                            {...register("password")}
                        />
                        <ErrorMessage>{errors.password?.message}</ErrorMessage>
                    </Box>
                    <Box>
                        <Label.Root
                            className="text-[15px] font-medium leading-[35px]"
                            htmlFor="confirmPassword"
                        >
                            Password (Re-enter)
                        </Label.Root>
                        <TextField.Root
                            id="confirmPassword"
                            type="password"
                            {...register("confirmPassword")}
                        />
                        <ErrorMessage>
                            {errors.confirmPassword?.message}
                        </ErrorMessage>
                    </Box>
                    <Button disabled={isSubmitting} type="submit">
                        Submit
                        {isSubmitting && <Spinner />}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default NewUserPage;
