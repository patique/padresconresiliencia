
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const product = await prisma.product.upsert({
        where: { slug: 'educar-en-la-fe' },
        update: {
            price: 0 // Set price to 0 to make it appear in 'Coming Soon' section
        },
        create: {
            title: 'Educar en la Fe: De la Obligación al Asombro',
            slug: 'educar-en-la-fe',
            description: 'Cómo transmitir a Dios en casa de forma natural, alegre y sin peleas.',
            price: 0,
            originalPrice: 19.00,
            imageUrl: '/images/educar-en-la-fe-portada.png',
        },
    })
    console.log({ product })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
