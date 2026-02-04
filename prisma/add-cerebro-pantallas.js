const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addCerebroPantallasProduct() {
    try {
        const product = await prisma.product.upsert({
            where: { slug: 'cerebro-pantallas' },
            update: {
                title: 'El Cerebro de tu Hijo en Pantallas',
                description: 'Guía de desintoxicación digital: Cómo recuperar su atención, proteger su mente y poner límites sin dramas.',
                price: 27.00,
                originalPrice: 67.00,
                imageUrl: '/images/cerebro-pantallas/ebook_mockup.png',
                affiliateLink: 'https://pay.hotmart.com/R104271494E',
                isActive: true, // Producto listo para lanzamiento
            },
            create: {
                slug: 'cerebro-pantallas',
                title: 'El Cerebro de tu Hijo en Pantallas',
                description: 'Guía de desintoxicación digital: Cómo recuperar su atención, proteger su mente y poner límites sin dramas.',
                price: 27.00,
                originalPrice: 67.00,
                imageUrl: '/images/cerebro-pantallas/ebook_mockup.png',
                affiliateLink: 'https://pay.hotmart.com/R104271494E',
                isActive: true, // Producto listo para lanzamiento
            },
        });

        console.log('✅ Producto "El Cerebro de tu Hijo en Pantallas" creado/actualizado:', product);
    } catch (error) {
        console.error('❌ Error al crear el producto:', error);
    } finally {
        await prisma.$disconnect();
    }
}

addCerebroPantallasProduct();
