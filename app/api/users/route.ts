import dbInstance from "@/util/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const DB_NAME = "users";

export const GET = async () => {
  const result = await dbInstance.query(
    `SELECT email, street, city, state, zip, birthdate, about FROM ${DB_NAME}`
  );

  return NextResponse.json(result.rows);
};

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Data missing" }, { status: 400 });
  }

  const exists = await dbInstance.query(
    `SELECT 1 FROM ${DB_NAME} WHERE email = $1 LIMIT 1`,
    [email]
  );

  if (exists.rowCount) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  await dbInstance.query(
    `INSERT INTO ${DB_NAME} (email, password) VALUES ($1, $2)`,
    [email, password]
  );

  const cookieStore = await cookies();
  cookieStore.set("step", "2");
  cookieStore.set("email", email);

  return NextResponse.redirect(`${process.env.URL}/onboarding/2`, 303);
};
