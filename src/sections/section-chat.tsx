import { useEffect, useRef, useState } from "react";
import { Info, Mic, Paperclip, Send, Smile } from "lucide-react";
import { mockMessages, ChatMessageType } from "../lib/constants";
import { useHoverData, useStateStore } from "../lib/hooks";
import { inputRootClass } from "../lib/utils";
import Button from "../components/button";
import Code from "../components/code";
import IconButton from "../components/icon-button";
import SDiv from "../components/s-div";

const CONTACT_NAME = "Alex";

const Chat = () => {
    const a11yOn = useStateStore((state) => state.a11yOn);

    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

    const [info, setInfo] = useState(false);
    const [messages, setMessages] = useState<ChatMessageType[]>(mockMessages);
    const [inputValue, setInputValue] = useState("");

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        setMessages((prev) => [
            ...prev,
            {
                id: String(Date.now()),
                sender: "You",
                text: trimmed,
                time: new Date().toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                }),
            },
        ]);
        setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold sm:text-3xl">Direct message</h2>
            <p>
                An example of a direct message chat interface. Users should be
                able to follow the conversation, know who sent each message, and
                interact with the composer controls.
            </p>

            <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
                {/* Contact header */}
                <SDiv
                    tag={a11yOn ? "header" : "div"}
                    className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3"
                    {...hoverProps}
                >
                    <div
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-bold text-white"
                        aria-hidden="true"
                    >
                        {CONTACT_NAME[0]}
                    </div>
                    <SDiv
                        tag={a11yOn ? "h3" : "div"}
                        className="text-sm font-semibold text-gray-800 sm:text-base"
                        aria-label={
                            a11yOn
                                ? `Conversation with ${CONTACT_NAME}`
                                : undefined
                        }
                        {...hoverProps}
                    >
                        {CONTACT_NAME}
                    </SDiv>
                </SDiv>

                {/* Message list */}
                <div
                    ref={listRef}
                    role={a11yOn ? "log" : undefined}
                    aria-label={
                        a11yOn ? `Conversation with ${CONTACT_NAME}` : undefined
                    }
                    aria-live={a11yOn ? "polite" : undefined}
                    className="flex h-[400px] flex-col gap-3 overflow-y-auto p-4"
                    {...hoverProps}
                >
                    {messages.map((msg) => {
                        const isYou = msg.sender === "You";
                        return (
                            <div
                                key={msg.id}
                                className={`flex flex-col gap-1 ${isYou ? "items-end" : "items-start"}`}
                                aria-label={
                                    a11yOn
                                        ? `${msg.sender}: ${msg.text}`
                                        : undefined
                                }
                                {...hoverProps}
                            >
                                <div
                                    className={`max-w-[75%] rounded-2xl px-4 py-2 text-xs sm:text-sm ${
                                        isYou
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                                <span className="text-xs text-gray-400">
                                    {msg.time}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Composer */}
                <div className="flex items-center gap-2 border-t border-gray-200 px-3 py-2">
                    {/* Icon action buttons */}
                    <div className="flex gap-1">
                        {a11yOn ? (
                            <>
                                <IconButton
                                    aria-label="Attach file"
                                    className="h-9 w-9"
                                    {...hoverProps}
                                >
                                    <Paperclip size={18} />
                                </IconButton>
                                <IconButton
                                    aria-label="Add emoji"
                                    className="h-9 w-9"
                                    {...hoverProps}
                                >
                                    <Smile size={18} />
                                </IconButton>
                                <IconButton
                                    aria-label="Send voice message"
                                    className="h-9 w-9"
                                    {...hoverProps}
                                >
                                    <Mic size={18} />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <div
                                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-gray-600"
                                    {...hoverProps}
                                >
                                    <Paperclip size={18} />
                                </div>
                                <div
                                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-gray-600"
                                    {...hoverProps}
                                >
                                    <Smile size={18} />
                                </div>
                                <div
                                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-gray-600"
                                    {...hoverProps}
                                >
                                    <Mic size={18} />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Text input */}
                    <div className="flex flex-1 flex-col">
                        {a11yOn && (
                            <label
                                htmlFor="chat-input"
                                className="sr-only"
                                {...hoverProps}
                            >
                                Message {CONTACT_NAME}
                            </label>
                        )}
                        <div className={`${inputRootClass} flex-1`}>
                            <input
                                id={a11yOn ? "chat-input" : undefined}
                                placeholder={`Message ${CONTACT_NAME}`}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full border-none text-xs outline-none sm:text-sm"
                                {...hoverProps}
                            />
                        </div>
                    </div>

                    {/* Send button */}
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={handleSend}
                        aria-disabled={a11yOn ? !inputValue.trim() : undefined}
                        className={`flex items-center gap-1 ${a11yOn && !inputValue.trim() ? "opacity-50" : ""}`}
                        {...hoverProps}
                    >
                        <Send size={14} />
                        <span>Send</span>
                    </Button>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
                <button
                    onClick={() => setInfo(!info)}
                    className="mr-auto flex items-center gap-2 px-2 font-semibold text-blue-600"
                    aria-expanded={a11yOn ? info : undefined}
                    {...hoverProps}
                >
                    <Info className="h-5 w-5" /> {info ? "Hide" : "Show"} A11y
                    info - Direct message
                </button>

                {info && (
                    <p>
                        The most important element here is the message list.
                        Without accessibility features, it is a plain{" "}
                        <Code>div</Code> — a screen reader has no way to know it
                        is a conversation, and new messages that appear are
                        never announced.
                        <br />
                        <br />
                        With accessibility features enabled, the list has{" "}
                        <Code>role="log"</Code>, which is a live region
                        specifically designed for chat and sequential output. It
                        implicitly sets <Code>aria-live="polite"</Code>, so new
                        messages are announced after the user finishes their
                        current interaction rather than interrupting them.{" "}
                        <Code>aria-label</Code> gives the region a name so
                        screen readers announce "Conversation with Alex" when it
                        is focused.
                        <br />
                        <br />
                        Each message bubble gets an <Code>aria-label</Code> of
                        "Alex: …" or "You: …". Without this, messages from
                        different senders are visually distinct (left/right
                        alignment, different colors) but sound identical to a
                        screen reader — just raw text with no sender context.
                        <br />
                        <br />
                        The three icon buttons (attach, emoji, voice) follow the
                        same pattern as the conference controls: plain{" "}
                        <Code>div</Code>s with no label when off, proper{" "}
                        <Code>button</Code> elements with{" "}
                        <Code>aria-label</Code> when on. The text input gets a
                        visually hidden <Code>label</Code> linked via{" "}
                        <Code>htmlFor</Code>. The Send button uses{" "}
                        <Code>aria-disabled</Code> when the input is empty,
                        signalling the inactive state to assistive technology
                        without removing focus from the element.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Chat;
