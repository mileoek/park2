import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";


export async function GET(request: NextRequest) {
   
   const url = request.nextUrl;
    const name = url.pathname.split("/").pop() as string;
    // what it measns is that it takes the last part of the url and convert it to string
    // for second last part of the url it takes the second last part of the url and convert it to string
    // const name = url.pathname.split("/").slice(-2, -1)[0] as string;
    try {
        const araba = await prisma.auto.findUniqueOrThrow({
            where: {
                placeId: name as string,
            },
        });
        if (!araba) {
            return NextResponse.json({ message: "Araba bulunamadı" }, { status: 404 });
        } else {
            return NextResponse.json(araba, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Araba bulunamadı" }, { status: 404 });
    } finally {
        await prisma.$disconnect();
    }
} 