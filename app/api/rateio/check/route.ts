// We impot our prisma client
import { getServerSession } from "next-auth/next";
import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/options";
import { Rateio } from "@prisma/client";

type RateioWithoutPassword = Omit<Rateio, "password">;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  let userId: string | null = null;

  const userIdParam = searchParams.get("userId");

  const id = searchParams.get("id");

  if (!userIdParam) {
    const data = await getServerSession(AuthOptions);
    userId = data?.user?.id;
  } else {
    userId = userIdParam;
  }

  if (!id) {
    console.error("Rateio ID not found.");
    return NextResponse.json(
      { message: "Rateio ID not found." },
      { status: 404 }
    );
  }

  if (!userId) {
    console.error("Unauthorized access to rateio.");
    return NextResponse.json(
      { message: "Unauthorized access to rateio." },
      { status: 403 }
    );
  }

  try {
    const rateio = await prisma.rateio.findUnique({
      where: {
        id,
      },
    });

    if (!rateio) {
      console.error("Unauthorized access to rateio.");
      return NextResponse.json(
        { message: "Unauthorized access to rateio." },
        { status: 403 }
      );
    }

    const hasPassword =
      rateio.password !== null && rateio.password !== undefined && rateio.password !== "";

    if (hasPassword) {
      const userInWhiteList = await prisma.rateioWhiteList.findFirst({
        where: {
          rateio_id: id,
          user_id: userId,
        },
      });

      if (!userInWhiteList && rateio.userId !== userId) {
        console.error("Unauthorized access to rateio.");
        return NextResponse.json(
          { message: "Unauthorized access to rateio." },
          { status: 403 }
        );
      }
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
