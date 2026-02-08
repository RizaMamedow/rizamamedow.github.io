import { MouseEventHandler } from "react";
import TextType from "@/bits/TextType";
import Button from "./Button";

function ErrorView({
    error,
    onClick = null,
}: {
    error: string;
    onClick?: MouseEventHandler<HTMLButtonElement> | null;
}) {
    return (
        <div className="mt-30 flex justify-center items-center">
            <div className="w-50 flex flex-col gap-5 justify-between items-center">
                <div className="w-100 text-center">
                    <h3 className="text-2xl text-red-500">
                        <span className="font-bold mr-2">{"Error >"}</span>
                        <TextType
                            text={[error]}
                            typingSpeed={75}
                            pauseDuration={1000}
                            showCursor
                            cursorCharacter="_"
                            deletingSpeed={40}
                            cursorBlinkDuration={0.3}
                            loop={false}
                        />
                    </h3>
                </div>
                {onClick && (
                    <Button
                        onClick={onClick}
                    >
                        You can try again!
                    </Button>
                )}
            </div>
        </div>
    );
}

export default ErrorView;
