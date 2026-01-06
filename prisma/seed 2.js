const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const existing = await prisma.product.findFirst({
        where: { slug: 'bienestar-emocional-padres' }
    })

    if (!existing) {
        await prisma.product.create({
            data: {
                title: 'Bienestar Emocional de los Padres',
                description: 'Guía práctica para el bienestar emocional de los padres durante el primer año. Recupera el sueño, la calma y la conexión.',
                price: 7.99,
                imageUrl: '/ebook_cover_real.jpg',
                slug: 'bienestar-emocional-padres',
                fileUrl: '/documents/EBook.pdf' // Placeholder, normally protected
            }
        })
        console.log('Product created')
    } else {
        console.log('Product already exists')
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
