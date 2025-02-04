import dbInstance from "@/util/db";
import { NextRequest, NextResponse } from "next/server";

const DB_NAME = "steps_config";

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ step: string }> }
) => {
  const { step } = await params;

  if (!step) {
    return NextResponse.json({ error: "Invalid step" }, { status: 400 });
  }

  const result = await dbInstance.query(
    `SELECT components FROM ${DB_NAME} WHERE step_number = $1 LIMIT 1`,
    [Number(step)]
  );

  return NextResponse.json(result.rows[0].components);
};
