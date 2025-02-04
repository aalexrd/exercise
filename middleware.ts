// app/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { VALID_STEPS } from "@/const/steps";

// Middleware to redirect user to the right onboarding page
export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const stepCookie = cookieStore.get("step");
  const step = Number(stepCookie?.value);

  const { url } = req;
  const requestedStep = Number(url.split("/").at(-1));

  // Redirect to first step if user has no step cookie or the cookie is invalid
  if (
    url.includes("onboarding") &&
    (!stepCookie || !VALID_STEPS.includes(step))
  ) {
    // Redirect to first step
    const res = NextResponse.redirect(`${process.env.URL}`, 303);

    // Clear cookie if it was an invalid step, if user manually edited cookie
    cookieStore.delete("step");
    cookieStore.delete("email");

    return res;
  }

  // Redirect to correct step if user tried to access to an invalid step
  if (
    step &&
    (!VALID_STEPS.includes(requestedStep) || step !== requestedStep)
  ) {
    return NextResponse.redirect(`${process.env.URL}/onboarding/${step}`, 303);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/onboarding/:step"],
};
