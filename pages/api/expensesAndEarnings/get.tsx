import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //Fetch expenses


    const type: boolean = req.body.type;

    try {
      const data = await prisma.expensesAndEarnings.findMany({
        where: {
           type
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error has occured while fetching expenses" });
    }
  }
}
