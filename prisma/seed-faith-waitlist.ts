
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const product = await prisma.product.upsert({
        where: { slug: 'educar-en-la-fe' },
        update: {
            price: 27,
            originalPrice: 37,
            imageUrl: '/images/educar-fe-cover.png',
        },
        create: {
            title: 'Educar en la Fe: De la Obligación al Asombro',
            slug: 'educar-en-la-fe',
            description: 'Cómo transmitir a Dios en casa de forma natural, alegre y sin peleas.',
            price: 27,
            originalPrice: 37,
            imageUrl: '/images/educar-fe-cover.png',
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
