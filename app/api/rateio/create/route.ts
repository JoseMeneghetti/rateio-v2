// We impot our prisma client
import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { resultSchema } from "../schema";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/options";
import { hash } from "argon2";

export async function POST(req: NextRequest) {
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

  if (body?.whoPaid) {
    console.log(body.whoPaid[0]?.names);
  }

  const handlePassword = async (password: string) => {
    const salt = "salt" + process.env.NEXTAUTH_SECRET;
    const saltBuffer = Buffer.from(salt);

    const hashedPassword = await hash(password, { salt: saltBuffer });

    return hashedPassword;
  };

  try {
    const rateio = await prisma.rateio.create({
      data: {
        nameRateio: body.nameRateio ?? "",
        whoPaid: JSON.stringify(body.whoPaid) ?? null,
        listForResult: JSON.stringify(body.listForResult) ?? null,
        onlyParticipants: JSON.stringify(body.onlyParticipants) ?? null,
        sumOfPaids: JSON.stringify(body.sumOfPaids) ?? null,
        total: JSON.stringify(body.total) ?? null,
        suggestion: JSON.stringify(body.suggestion) ?? null,
        userId: userId,
        password: body.password ? await handlePassword(body.password) : null,
        participants: JSON.stringify(body.participants) ?? null,
      },
    });

    return NextResponse.json(rateio, { status: 201 });
  } catch (e) {
    console.error(e);
    NextResponse.json({ message: e }, { status: 400 });
  }
}
