export type Route = {
    url: string,
    label: string
}

export const routes: Route[] = [
    {
        label: "home",
        url: "/",
    },
    {
        label: "about_me",
        url: "/about",
    },
    {
        label: "certificates",
        url: "/certificates",
    },
];