import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    // const { pathname } = req.nextUrl;

    // Match URLs like /r/abc123
    // const shortlinkMatch = pathname.match(/^\/r\/([\w-]+)$/);
    // if (!shortlinkMatch) return NextResponse.next(); // Skip for non-matching routes

    // const medusaApiUrl = `${process.env.MEDUSA_BACKEND_URI}/store/shortlink/${shortlink}`;
    
    const shortlink = req.nextUrl.pathname.split("/r/")[1];
    try {
        const response = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/shortlink/${shortlink}`, {
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
        console.log("url", url)
        let urlObj = new URL('/', req.url).toString();
        console.log(url.length)
        console.log("urlObj", urlObj)
        return NextResponse.redirect(new URL('/?utm_source=saman', req.url));
        // if (!url) throw new Error("No URL returned from Medusa");

        // Build the final redirect URL (append to homepage)
        // const finalUrl = new URL(url, process.env.NEXT_PUBLIC_HOME_URL).toString();

        // return NextResponse.redirect(finalUrl, 301);
    } catch (error) {
        console.error("Shortlink redirection error:", error);
        return NextResponse.redirect(new URL('/', req.url))
    }
}

// Apply the middleware only to /r/[shortlink] routes
export const config = {
    matcher: "/r/:shortlink*",
};