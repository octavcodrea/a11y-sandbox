import { useState } from "react";
import { Info } from "lucide-react";
import { useHoverData, useStateStore } from "../lib/hooks";
import { cls, inputRootClass } from "../lib/utils";
import Button from "../components/button";
import Code from "../components/code";
import SDiv from "../components/s-div";

type FormData = {
    name: string;
    email: string;
    password: string;
    confirm: string;
};

type FormErrors = Partial<FormData>;

const fields: {
    key: keyof FormData;
    label: string;
    type: string;
    placeholder: string;
}[] = [
    { key: "name", label: "Name", type: "text", placeholder: "Your full name" },
    {
        key: "email",
        label: "Email",
        type: "email",
        placeholder: "you@example.com",
    },
    {
        key: "password",
        label: "Password",
        type: "password",
        placeholder: "Min. 8 characters",
    },
    {
        key: "confirm",
        label: "Confirm password",
        type: "password",
        placeholder: "Repeat your password",
    },
];

const validate = (form: FormData): FormErrors => {
    const errors: FormErrors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
        errors.email = "Enter a valid email address";
    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 8)
        errors.password = "Password must be at least 8 characters";
    if (!form.confirm) errors.confirm = "Please confirm your password";
    else if (form.confirm !== form.password)
        errors.confirm = "Passwords do not match";
    return errors;
};

const SignupForm = () => {
    const a11yOn = useStateStore((state) => state.a11yOn);

    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

    const [info, setInfo] = useState(false);
    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange =
        (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({ ...prev, [key]: e.target.value }));
        };

    const handleSubmit = (e: React.FormEvent | React.MouseEvent) => {
        e.preventDefault();
        const newErrors = validate(form);
        setErrors(newErrors);
        setSubmitted(true);
    };

    const isSuccess =
        submitted && Object.keys(validate(form)).length === 0;

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold sm:text-3xl">Sign-up form</h2>
            <p>
                An example of a sign-up form with client-side validation.
                Users should receive clear feedback when a field is invalid
                and understand what went wrong and how to correct it.
            </p>

            <div className="rounded-lg border border-gray-200 p-4 sm:p-6">
                <SDiv
                    tag={a11yOn ? "form" : "div"}
                    onSubmit={a11yOn ? handleSubmit : undefined}
                    className="flex max-w-md flex-col gap-4"
                    {...hoverProps}
                >
                    {fields.map(({ key, label, type, placeholder }) => {
                        const hasError = !!errors[key];
                        const inputId = `signup-${key}`;
                        const errorId = `signup-${key}-error`;

                        return (
                            <div key={key} className="flex flex-col gap-1">
                                {a11yOn ? (
                                    <label
                                        htmlFor={inputId}
                                        className="text-xs font-semibold text-gray-700 sm:text-sm"
                                        {...hoverProps}
                                    >
                                        {label}
                                    </label>
                                ) : (
                                    <p className="text-xs font-semibold text-gray-700 sm:text-sm">
                                        {label}
                                    </p>
                                )}
                                <div
                                    className={cls(
                                        inputRootClass,
                                        hasError ? "border-red-500" : "",
                                    )}
                                >
                                    <input
                                        id={a11yOn ? inputId : undefined}
                                        type={type}
                                        placeholder={placeholder}
                                        value={form[key]}
                                        onChange={handleChange(key)}
                                        className="w-full border-none text-xs outline-none sm:text-sm"
                                        aria-invalid={
                                            a11yOn && hasError
                                                ? true
                                                : undefined
                                        }
                                        aria-describedby={
                                            a11yOn && hasError
                                                ? errorId
                                                : undefined
                                        }
                                        aria-required={
                                            a11yOn ? true : undefined
                                        }
                                        {...hoverProps}
                                    />
                                </div>
                                {hasError && (
                                    <p
                                        id={a11yOn ? errorId : undefined}
                                        role={a11yOn ? "alert" : undefined}
                                        className="text-xs text-red-500"
                                    >
                                        {errors[key]}
                                    </p>
                                )}
                            </div>
                        );
                    })}

                    {isSuccess && (
                        <p
                            role={a11yOn ? "status" : undefined}
                            className="text-xs font-semibold text-green-600 sm:text-sm"
                        >
                            Account created successfully!
                        </p>
                    )}

                    <Button
                        type={a11yOn ? "submit" : "button"}
                        onClick={!a11yOn ? handleSubmit : undefined}
                        variant="primary"
                        className="mt-2 w-full"
                    >
                        Create account
                    </Button>
                </SDiv>
            </div>

            <div className="mt-6 flex flex-col gap-4">
                <button
                    onClick={() => setInfo(!info)}
                    className="mr-auto flex items-center gap-2 px-2 font-semibold text-blue-600"
                    aria-expanded={a11yOn ? info : undefined}
                    {...hoverProps}
                >
                    <Info className="h-5 w-5" /> {info ? "Hide" : "Show"} A11y
                    info - Sign-up form
                </button>

                {info && (
                    <p>
                        In this example, each field label is rendered as a{" "}
                        <Code>{"p"}</Code> tag by default — visually it looks
                        like a label, but it has no semantic association with
                        its input. A screen reader has no way to announce which
                        label belongs to which field.
                        <br />
                        <br />
                        With accessibility features enabled, each label is a
                        proper <Code>label</Code> element with a{" "}
                        <Code>htmlFor</Code> attribute matching its input's{" "}
                        <Code>id</Code>. The input also carries{" "}
                        <Code>aria-required</Code> so screen readers announce it
                        as required.
                        <br />
                        <br />
                        Error messages are the key difference. Without
                        accessibility features, errors are shown visually (red
                        border + red text), but a screen reader user submitting
                        the form receives no feedback. With accessibility
                        features, each error message has{" "}
                        <Code>role="alert"</Code> so it is announced immediately
                        when it appears, and <Code>aria-describedby</Code> on
                        the input links the field to its error so the message is
                        also read when the input is focused.{" "}
                        <Code>aria-invalid="true"</Code> signals the invalid
                        state to assistive technology.
                        <br />
                        <br />
                        The success message uses <Code>role="status"</Code>, a
                        polite live region that announces the confirmation
                        without interrupting whatever the screen reader is
                        currently reading.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SignupForm;
