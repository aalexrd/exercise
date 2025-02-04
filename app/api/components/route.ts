import dbInstance from "@/util/db";
import { NextRequest, NextResponse } from "next/server";

const DB_NAME = "steps_config";

export const GET = async () => {
  const result = await dbInstance.query(
    `SELECT step_number, components FROM ${DB_NAME}`
  );

  return NextResponse.json(result.rows);
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  if (!data || Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Data missing" }, { status: 400 });
  }

  const values: string[] = [];
  const paramsArray: (string | number)[] = [];

  Object.entries(data).forEach(([step_number, components], index) => {
    values.push(`($${index * 2 + 1}, $${index * 2 + 2})`);
    paramsArray.push(step_number, JSON.stringify(components));
  });

  const query = `
    INSERT INTO ${DB_NAME} (step_number, components)
    VALUES ${values.join(", ")}
    ON CONFLICT (step_number)
    DO UPDATE SET components = EXCLUDED.components
  `;

  await dbInstance.query(query, paramsArray);

  return new NextResponse(null, { status: 200 });
};
