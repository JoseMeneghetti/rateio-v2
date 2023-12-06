// import prisma client
import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "argon2";
import { z } from "zod";
import { User } from "@prisma/client";

type UserWithoutPassword = Omit<User, "password">;

export async function POST(req: NextRequest) {
  const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const salt = "salt" + process.env.NEXTAUTH_SECRET;
  const saltBuffer = Buffer.from(salt);

  const { email, password } = userSchema.parse(await req.json());

  if (!email || !password) {
    console.error("invalid inputs");
    return NextResponse.json({ message: "invalid inputs" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user || !user?.password) {
      console.error("invalid credentials");
      return NextResponse.json(
        { message: "invalid credentials" },
        { status: 401 }
      );
    }

    const isValidPassword = await verify(user?.password, password, {
      salt: saltBuffer,
    });

    if (!isValidPassword) {
      console.error("invalid credentials");
      return NextResponse.json(
        { message: "invalid credentials" },
        { status: 401 }
      );
    }

    const userWithoutPassword: UserWithoutPassword = {
      ...user,
    };

    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(e, { status: 400 });
  }
}
