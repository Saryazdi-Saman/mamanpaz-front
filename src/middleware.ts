import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    
    const code = req.nextUrl.pathname.split("/r/")[1];
    try {
        const response = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/shortlink/${code}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
            },
        });

        if (!response.ok) {
            return NextResponse.redirect(new URL('/', req.url))
        };

        const { url } = await response.json();
        return NextResponse.redirect(new URL(url, req.url));
    } catch (error) {
        console.error("Shortlink redirection error:", error);
        return NextResponse.redirect(new URL('/', req.url))
    }
}

// Apply the middleware only to /r/[shortlink] routes
export const config = {
    matcher: "/r/:code*",
};