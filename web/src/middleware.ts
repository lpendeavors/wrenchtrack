import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isPlaceholderKey = !publishableKey || publishableKey.includes("placeholder");

async function clerkMiddleware(req: NextRequest, event: NextFetchEvent) {
  const { authMiddleware } = await import("@clerk/nextjs/server");
  const handler = authMiddleware({
    publicRoutes: ["/", "/sign-in", "/sign-up", "/api/webhook(.*)"],
    ignoredRoutes: ["/api/webhook/stripe"],
  });
  return handler(req, event);
}

export default isPlaceholderKey
  ? () => NextResponse.next()
  : clerkMiddleware;

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
