// We impot our prisma client
import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { resultSchema } from "../schema";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/options";
import { hash } from "argon2";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const id = searchParams.get("id");

  const body = resultSchema.parse(await req.json());
  const data = await getServerSession(AuthOptions);

  const userId = data?.user?.id;

  if (!userId) {
    console.error("You are not logged in.");

    return NextResponse.json(
      { message: "You are not logged in." },
      { status: 400 }
    );
  }

  if (!id) {
    console.error("Rateio ID not found.");
    return NextResponse.json(
      { message: "Rateio ID not found." },
      { status: 404 }
    );
  }

  const handlePassword = async (password: string) => {
    const salt = "salt" + process.env.NEXTAUTH_SECRET;
    const saltBuffer = Buffer.from(salt);

    const hashedPassword = await hash(password, { salt: saltBuffer });

    return hashedPassword;
  };

  try {
    const existingRateio = await prisma.rateio.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingRateio) {
      console.error("Rateio not found.");
      return NextResponse.json(
        { message: "Rateio not found." },
        { status: 404 }
      );
    }

    const rateio = await prisma.rateio.update({
      where: {
        id: id,
      },
      data: {
        nameRateio: body.nameRateio ?? "",
        whoPaid: JSON.stringify(body.whoPaid) ?? null,
        listForResult: JSON.stringify(body.listForResult) ?? null,
        onlyParticipants: JSON.stringify(body.onlyParticipants) ?? null,
        sumOfPaids: JSON.stringify(body.sumOfPaids) ?? null,
        total: JSON.stringify(body.total) ?? null,
        suggestion: JSON.stringify(body.suggestion) ?? null,
        participants: JSON.stringify(body.participants) ?? null,
        userId: existingRateio.userId,
        password: existingRateio.password,
      },
    });

    return NextResponse.json(rateio, { status: 200 });
  } catch (e) {
    console.error(e);
    NextResponse.json({ message: e }, { status: 400 });
  }
}
