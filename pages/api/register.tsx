import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, email, password } = req.body.registerData;

    console.log(req.body.registerData);

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Missing username, email or password." });
    }

    const exists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (exists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          name: username,
          email,
          password: hashedPassword,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(403).json({ message: "Error while trying to create user." });
    }
  }
}
