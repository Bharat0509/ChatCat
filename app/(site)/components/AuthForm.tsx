"use client";

import { Button } from "@/app/components/Button";
import Input from "@/app/components/input/Input";
import { type } from "os";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [loading, setLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if (variant == "LOGIN") setVariant("REGISTER");
        else setVariant("LOGIN");
    }, [variant]);

    useEffect(() => {
        if (session?.status === "authenticated") {
            console.log("Authenticated");
            router.push("/users");
        }
    }, [router, session?.status]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);

        if (variant == "REGISTER") {
            axios
                .post("/api/register", data)
                .then(() => signIn("credentials", data))
                .catch(() => toast.error("Something went wrong!"))
                .finally(() => setLoading(false));
        } else {
            signIn("credentials", { ...data, redirect: false })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error("Invalid Credentials");
                    }
                    if (callback?.ok && !callback?.error) {
                        toast.success("Logged in!");
                        router.push("/users");
                    }
                })
                .finally(() => setLoading(false));
        }
    };
    const socialAction = (action: string) => {
        setLoading(true);

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid Credentials");
                }
                if (callback?.ok && !callback.error) {
                    toast.success("Logged in!");
                    router.push("/users");
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <div
            className='
    mt-8
    sm:w-full
    sm:mx-auto
    sm:max-w-md'
        >
            <div
                className='
                mx-4
            bg-white
            px-4
            py-8
            shadow
            rounded-lg
            sm:px-10'
            >
                <form className='space-y-6 ' onSubmit={handleSubmit(onSubmit)}>
                    {variant == "REGISTER" && (
                        <Input
                            id='name'
                            label='Name'
                            type='text'
                            register={register}
                            errors={errors}
                        />
                    )}
                    <Input
                        id='email'
                        label='Email'
                        type='email'
                        register={register}
                        errors={errors}
                    />
                    <Input
                        id='password'
                        label='Password'
                        type='password'
                        register={register}
                        errors={errors}
                    />
                    <div>
                        <Button disabled={loading} type='submit' fullWidth>
                            {variant == "LOGIN"
                                ? "Sign In"
                                : "Create an Account"}
                        </Button>
                    </div>
                </form>
                <div className='mt-6'>
                    <div className='relative'>
                        <div
                            className='
                        absolute
                        inset-0
                        flex
                        items-center'
                        >
                            <div
                                className='
                            w-full 
                            border-t 
                            border-gray-300'
                            ></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span
                                className='
                                bg-white
                                px-2
                                text-gray-500'
                            >
                                Or Continue with
                            </span>
                        </div>
                    </div>
                    <div className='mt-6 flex gap-6 items-center justify-center'>
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction("github")}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction("google")}
                        />
                    </div>
                </div>
                <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
                    <div>
                        {variant === "LOGIN"
                            ? "New to ChatCat?"
                            : "Already have an account?"}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className='underline text-primary-800 cursor-pointer'
                    >
                        {variant === "LOGIN" ? "Create an Account" : "Log in"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
