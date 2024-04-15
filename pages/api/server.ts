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
  const { fName, lName, email, password } = req.body;

  await prisma.user.create({
    data: {
      firstName: fName,
      lastName: lName,
      email: email,
      password: password,
    },
  });
}
