import TextType from "@/bits/TextType";
import Button from "./Button";

function ErrorView({
    error,
    onClick = null,
}: {
    error: string;
    onClick?: (() => void) | null;
}) {
    return (
        <div className="my-30 flex justify-center items-center">
            <div className="flex flex-col gap-5 justify-between items-center">
                <div className="text-center">
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
