import { VALID_STEPS } from "@/const/steps";
import dbInstance from "@/util/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const DB_NAME = "users";
const ALLOWED_FIELDS = [
  "email",
  "street",
  "city",
  "state",
  "zip",
  "birthdate",
  "about",
];

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) => {
  const { email } = await params;
  const data = await req.json();
  const cleanData = ALLOWED_FIELDS.reduce((newData, field) => {
    if (data[field] !== undefined) {
      return { ...newData, [field]: data[field] };
    }

    return newData;
  }, {});

  // Lets start index at 2, this way we can reserve index 1 for the WHERE statement
  const fields = Object.keys(cleanData).map(
    (field, i) => `${field} = $${i + 2}`
  );

  if (!fields.length) {
    return NextResponse.json({ error: "Data missing" }, { status: 400 });
  }

  const result = await dbInstance.query(
    `UPDATE ${DB_NAME} SET ${fields} WHERE email = $1`,
    [email, ...Object.values(cleanData)]
  );

  if (!result.rowCount) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Update step cookie
  const cookieStore = await cookies();
  const step = cookieStore.get("step");
  const nextStep = Number(step?.value) + 1;

  const finishedOnboarding = !VALID_STEPS.includes(nextStep);

  if (finishedOnboarding) {
    cookieStore.delete("step");
    cookieStore.delete("email");
  } else {
    cookieStore.set("step", `${nextStep}`);
  }

  return NextResponse.redirect(
    finishedOnboarding
      ? `${process.env.URL}`
      : `${process.env.URL}/onboarding/${nextStep}`,
    303
  );
};
