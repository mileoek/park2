import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { connect } from 'http2';



export async function DELETE(request: Request) {
    const data = await request.json();
    const { name, payment } = data;
    console.log("Silme işlemi başlatıldı", name, payment);
    
if (!name || isNaN(payment) ) {
        return NextResponse.json({ message: "Name and payment are required" }, { status: 400 });
    }
    
    try {
        console.log("Silme işlemi başlatıldı", name);
        
        // Find the parking place
        const parkToDel = await prisma.parkPlace.findUniqueOrThrow({
            where: {
                name: name as string,
            },
        });
        console.log("Park yeri bulundu", parkToDel);

        // Find the car in that parking place
        const araba = await prisma.auto.findUnique({
            where: {
                placeId: name as string,
            },
        });

        if (!araba) {
            console.log("Araba bulunamadı");
            return NextResponse.json({ message: "Araba bulunamadı" }, { status: 404 });
        }
        console.log("Araba bulundu", araba);



        const paymentValue = Number(payment); // Ensure payment is a number
        console.log("Ödeme miktarı", paymentValue);
        
        // Calculate duration in minutes
        const duration = Math.floor((new Date().getTime() - araba.timeOcupied.getTime()) / (1000 * 60));
        console.log("Süre", duration);
        // find the user 
        const user = await prisma.user.findUnique({
            where: {
                name: araba.owner,
            },
        });
        if (!user) {
            console.log("Kullanıcı bulunamadı");
            return NextResponse.json({ message: "Kullanıcı bulunamadı" }, { status: 404 });
        }
        console.log("Kullanıcı bulundu", user);
        if (user.payment === null) {
            const updatedUserPay = await prisma.user.update({
                where: {
                    name: araba.owner,
                },
                data: {
                    payment: paymentValue,
                },
            });
            console.log("Kullanıcı ödeme bilgisi güncellendi", updatedUserPay);
            if (!updatedUserPay) {
                console.log("Kullanıcı ödeme bilgisi güncellenemedi");
                return NextResponse.json({ message: "Kullanıcı ödeme bilgisi güncellenemedi" }, { status: 404 });
            }

        }

        if (user.duration === null) {
            const updatedUserDur = await prisma.user.update({
                where: {
                    name: araba.owner,
                },
                data: {
                    duration: duration,
                },
            });
            console.log("Kullanıcı süre bilgisi güncellendi", updatedUserDur);
            if (!updatedUserDur) {

            return NextResponse.json({ message: "Kullanıcıda süre bilgisi yok" }, { status: 404 });
        }}

        const updatedUser = await prisma.user.update({
            where: {
                name: araba.owner,
            },
            data: {
                payment: {
                    increment: payment,
                },
                duration: {
                    increment: duration,
                },
            },
        });
        if (!updatedUser) {
            console.log("Kullanıcı güncellenemedi");
            return NextResponse.json({ message: "Kullanıcı güncellenemedi" }, { status: 404 });
        }
        console.log("Kullanıcı güncellendi", updatedUser);


        // Create the deleted auto record
        const silinenAuto = await prisma.deletedAuto.create({
            data: {
                plateNum: araba.plateNum,
                owner: araba.owner,
                timeOcupied: new Date(araba.timeOcupied),
                payment: paymentValue, // Make sure payment is a number
                duration: duration,
                placeId: parkToDel.name,
            },
        });
        console.log("Silinen araba bilgileri", silinenAuto);

        // Delete the car from the database
        const deletedAraba = await prisma.auto.delete({
            where: {
                placeId: araba.placeId,
            },
        });
        console.log("Silme işlemi tamamlandı", deletedAraba);
        
        // Update the parking place to be free again
        await prisma.parkPlace.update({
            where: {
                name: araba.placeId,
            },
            data: {
                free: true,
            },
        });
        console.log("Otopark yeri güncellendi", araba.placeId);
        
        // Respond with the deleted record
        return NextResponse.json(silinenAuto, { status: 200 });
    }
    catch (error) {
        console.error("Error during deletion process:", error);
        return NextResponse.json({ message: "İşlem sırasında hata oluştu" }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
}
 

export async function POST(request: Request) {
    const data = await request.json();
    console.log("sadas",data);
    const { plateNum, owner, parkPlace } = data;

   
        // const  parkPLACEdata= await prisma.parkPlace.upsert({
        //     where: { name: parkPlace },
        //     update: {}, // varsa güncelle (boşsa dokunmaz)
        //     create: {
        //         name: parkPlace,
        //         free: false,
        //     },
        //   });
        try {



        const parkPLACEdata = await prisma.parkPlace.findUnique({
            where: {
                name: parkPlace as string,
                free: true,
            },
        });
        if (!parkPLACEdata) {
            console.log("Otopark yeri bulunamadı");
            return NextResponse.json({ message: "Otopark yeri bulunamadı" }, { status: 404 });
        }

        // find or create a user    
        const user = await prisma.user.upsert({
            where: { name: owner },
            update: {}, // varsa güncelle (boşsa dokunmaz)
            create: {
                name: owner,
            },
        });
        console.log("Kullanıcı bulundu veya oluşturuldu", user);
   
    // Perform your database operation here, e.g., using Prisma 
    const auto = await prisma.auto.create({
        data: {
            plateNum,
            owner,
            placeId: parkPlace,      // Use the ID of the parking place
        },
    });
    const placeId = auto.placeId;
    console.log("Araba oluşturuldu", auto);
    await prisma.parkPlace.update({
        where: {
            name: placeId,
        },
        data: {
            free: false,
        },
    });
    console.log("Otopark yeri güncellendi", placeId);

    console.log(auto);
    // Respond with the created record
    return NextResponse.json({ received: data });
 }catch (error) {
        console.log("Otopark yeri bulunamadı", error);
        return NextResponse.json({ message: "Otopark yeri bulunamadı" }, { status: 404 });
    }finally {
        await prisma.$disconnect();
    }
}