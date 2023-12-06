// We impot our prisma client
import prisma from "../../../../lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "argon2";
import { z } from "zod";

export async function POST(req: NextRequest) {
  let errors = [];

  const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = userSchema.parse(await req.json());

  const salt = "salt" + process.env.NEXTAUTH_SECRET;
  const saltBuffer = Buffer.from(salt);

  if (password.length < 6) {
    console.error("password length should be more than 6 characters");
    errors.push("password length should be more than 6 characters");
    return NextResponse.json({ errors }, { status: 400 });
  }

  try {
    const hashedPassword = await hash(password, { salt: saltBuffer });

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.error(e);
        return NextResponse.json(
          { message: "This e-mail is already in use." },
          { status: 400 }
        );
      }
      console.error(e);
      return NextResponse.json({ message: e.message }, { status: 400 });
    }
  }
}
