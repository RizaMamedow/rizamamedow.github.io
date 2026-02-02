import ClickSpark from "@/lib/bits/ClickSpark";

function AppProvider({ children = null }: { children: React.ReactNode | null }) {
    return (
        <ClickSpark>
            {children}
        </ClickSpark>
    );
}

export default AppProvider;