import TextType from "@/src/lib/bits/TextType";
import clsx from "clsx";

function ErrorText({
    message,
    className,
}: {
    message: string;
    className?: string | null;
}) {
    return (
        <h3 className={clsx("text-red-500", className ?? "text-2xl")}>
            <span className="font-bold mr-2">{"Error >"}</span>
            <TextType
                text={[message]}
                typingSpeed={75}
                pauseDuration={1000}
                showCursor
                cursorCharacter="_"
                deletingSpeed={40}
                cursorBlinkDuration={0.3}
                loop={false}
            />
        </h3>
    );
}

export default ErrorText;
