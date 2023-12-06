// We impot our prisma client
import { getServerSession } from "next-auth/next";
import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/options";
import { Rateio } from "@prisma/client";

type RateioWithoutPassword = Omit<Rateio, "password">;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  let userId = null;

  // Acesso aos parâmetros de consulta
  const userIdParam = searchParams.get("userId");

  if (!userIdParam) {
    const data = await getServerSession(AuthOptions);
    userId = data?.user?.id;
  } else {
    userId = userIdParam;
  }

  if (!userId) {
    console.error("You are not logged in.");
    return NextResponse.json(
      { message: "You are not logged in." },
      { status: 400 }
    );
  }

  try {
    const rateio = await prisma.rateio.findMany({
      where: {
        OR: [
          {
            userId: userId, // Rateios criados pelo usuário
          },
          {
            rateioWhiteList: {
              some: {
                user_id: userId, // Rateios em que o usuário está na White List
              },
            },
          },
        ],
      },
    });

    const rateioWithoutPassword: RateioWithoutPassword[] = rateio.map(
      ({ password, ...rest }) => rest
    );

    return NextResponse.json(rateioWithoutPassword, { status: 200 });
  } catch (e) {
    console.error(e);
    NextResponse.json({ message: e }, { status: 400 });
  }
}
