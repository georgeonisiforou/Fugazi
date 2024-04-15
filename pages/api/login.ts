import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const allEntries = await prisma.user.findMany();
    return allEntries;
  } catch (error) {
    console.error("Error fetching entries:", error);
    throw error;
  }
}
