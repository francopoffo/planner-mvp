import type { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth].js";
import { prisma } from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    // const session = await getServerSession(req, res, authOptions);
    // if (!session) {
    //   return res
    //     .status(401)
    //     .json({ message: "Please sign in to delete." });
    // }
    console.log(req.body);

    const id: any = req.body.id;
    const description: any = req.body.description;
    const valueAsNumber: number = Number(req.body.value);
    const situation: any = req.body.situation;

    if (!id.length) {
      return res.status(403).json({ message: "No id informed." });
    }

    try {
      const result = await prisma.expensesAndEarnings.update({
        data : {
            description,
            value: valueAsNumber,
            situation
        },
        where: {
          id: id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      console.log(req.query);

      res
        .status(403)
        .json({ err: "Error has occured while trying to edit." });
    }
  }
}
