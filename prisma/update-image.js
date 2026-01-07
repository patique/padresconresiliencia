const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await prisma.product.update({
        where: { slug: 'bienestar-emocional-padres' },
        data: {
            imageUrl: '/pareja_frustrada_2.jpg'
        }
    })
    console.log('Product image updated')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
