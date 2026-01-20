const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Update the specific product
    await prisma.product.update({
        where: { slug: 'bienestar-emocional-padres' },
        data: {
            originalPrice: 89.90
        }
    })
    console.log('Product originalPrice updated to 89.90')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
