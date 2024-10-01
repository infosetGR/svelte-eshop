import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async () => {
    try {
        const categories = await prisma.category.findMany();
        //     { select: { 
        //         name:true, description:true
        // }});

        return new Response(
            JSON.stringify({
                categories
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    }
    catch (e) {
        return new Response(
            JSON.stringify({
                message: "Something went wrong while trying to fetch category",
                error: e
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    }
}
