import TextType from "@/src/lib/bits/TextType";
import Container from "@/src/lib/components/common/Container";
import Slash from "@/src/lib/components/common/Slash";
import clsx from "clsx";

function NotFound() {
    return (
        <Container className="">
            <h1 className={clsx("text-5xl", "font-bold")}><Slash className="text-primary" />not found</h1>
            <h2 className="">status: 404</h2>
            <div className="flex gap-2">
                <div>{"$"}</div>
                <div>
                    <TextType 
                        text={"The page you’re looking for doesn’t exist. It may have been moved or deleted. Please return to the homepage or check the URL."}
                        loop={false}
                    />
                </div>

            </div>
        </Container>
    )
}

export default NotFound;