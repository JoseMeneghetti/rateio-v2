// We impot our prisma client
import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "argon2";
import { rateioAuthSchema } from "../schema";
import { Rateio } from "@prisma/client";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/options";

type RateioWithoutPassword = Omit<Rateio, "password">;

export async function POST(req: NextRequest) {
  let user_id = null;

  const body = rateioAuthSchema.parse(await req.json());

  if (!body.id) {
    console.error("Rateio ID not found.");
    return NextResponse.json(
      { message: "Rateio ID not found." },
      { status: 404 }
    );
  }

  if (!body.password) {
    console.error("Password invalid!");
    return NextResponse.json({ message: "Password invalid!" }, { status: 404 });
  }

  if (body?.user_id) {
    user_id = body?.user_id;
  } else {
    const session = await getServerSession(AuthOptions);
    if (session?.user.id) {
      user_id = session?.user.id;
    }
  }

  const handlePassword = async (rateioPassword: string, password: string) => {
    const salt = "salt" + process.env.NEXTAUTH_SECRET;
    const saltBuffer = Buffer.from(salt);

    const isValidPassword = await verify(rateioPassword, password, {
      salt: saltBuffer,
    });

    return isValidPassword;
  };

  try {
    // Buscar o rateio do banco de dados
    const rateio = await prisma.rateio.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!rateio) {
      console.error("Rateio not found.");
      return NextResponse.json(
        { message: "Rateio not found." },
        { status: 404 }
      );
    }

    if (!rateio?.password) {
      return NextResponse.json(rateio, { status: 200 });
    }

    const isValidPassword = await handlePassword(
      rateio.password,
      body.password
    );

    if (!isValidPassword) {
      console.error("invalid credentials");
      return NextResponse.json(
        { message: "invalid credentials" },
        { status: 403 }
      );
    }

    if (user_id) {
      await prisma.rateioWhiteList.create({
        data: {
          user: {
            connect: {
              id: user_id, // Conectando o usuário à tabela RateioWhiteList
            },
          },
          rateio: {
            connect: {
              id: rateio.id, // Conectando o rateio à tabela RateioWhiteList
            },
          },
        },
      });
    }

    const rateioWithoutPassword: RateioWithoutPassword = {
      ...rateio,
    };

    return NextResponse.json(rateioWithoutPassword, { status: 200 });
  } catch (e) {
    console.error(e);
    NextResponse.json({ message: e }, { status: 400 });
  }
}
