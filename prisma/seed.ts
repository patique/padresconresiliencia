import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BLOG_POSTS = [
    {
        slug: "carga-mental-maternidad",
        title: "La Carga Mental: El trabajo invisible que agota a las madres",
        excerpt: "¿Sientes que tu cerebro tiene 50 pestañas abiertas a la vez? No estás sola. Analizamos qué es la carga mental y 3 estrategias prácticas para reducirla hoy mismo.",
        author: "Máximo",
        date: new Date("2024-01-07"),
        category: "Bienestar",
        readTime: "5 min",
        imageUrl: "/images/blog/carga-mental.jpg",
        content: `
            <p>Es martes por la noche. Estás agotada en el sofá, pero tu cerebro no para: "¿He descongelado el pollo? ¿Mañana tienen excursión? Tengo que pedir cita con el pediatra. Se está acabando el detergente".</p>
            
            <p>Esto no es simplemente "pensar cosas". Esto es la <strong>Carga Mental</strong>: el trabajo invisible de gestión, planificación y coordinación que, estadísticamente, recae desproporcionadamente sobre las madres.</p>

            <h2>¿Por qué nos pesa tanto?</h2>
            <p>El problema de la carga mental no es solo la ejecución de las tareas (hacer la cena), sino la gestión (pensar qué cenar, ver qué ingredientes faltan, calcular cuándo ir a comprar). Es un rol de "Project Manager" del hogar que nunca hemos pedido.</p>

            <blockquote>"La carga mental es tener la responsabilidad de que todo funcione, incluso cuando no lo estás haciendo tú."</blockquote>

            <h2>3 Estrategias para soltar lastre</h2>
            
            <h3>1. Haz visible lo invisible</h3>
            <p>Siéntate con tu pareja y escribe TODAS las tareas que implican pensar, no solo hacer. A veces, la otra persona no es consciente de todo lo que ocurre "entre bastidores" en tu mente.</p>

            <h3>2. Delega la responsabilidad completa, no la tarea</h3>
            <p>En lugar de decir "pon la lavadora", delega "la gestión de la ropa sucia". Quien se encarga de eso, debe pensar cuándo ponerla, tenderla y guardarla. Si tú tienes que recordarles que lo hagan, sigues llevando la carga mental.</p>

            <h3>3. El poder del "No lo sé"</h3>
            <p>Cuando te pregunten "¿Dónde están los zapatos azules?", resiste la urgencia de responder. Un "no lo sé, ¿dónde los viste por última vez?" entrena al resto de la familia a buscar sus propias soluciones.</p>

            <p>Recuperar tu espacio mental es vital no solo para tu salud, sino para poder disfrutar de la crianza. En nuestro ebook <em>Bienestar Emocional de los Padres</em> profundizamos en herramientas para desconectar y validar tus emociones.</p>
        `
    },
    {
        slug: "conectar-adolescente-sin-discutir",
        title: "5 Frases para conectar con tu adolescente (sin que te gire los ojos)",
        excerpt: "La comunicación con adolescentes puede parecer un campo minado. Descubre cómo cambiar el guion y pasar de los portazos a las conversaciones reales.",
        author: "Máximo",
        date: new Date("2024-01-04"),
        category: "Adolescencia",
        readTime: "7 min",
        imageUrl: "/images/blog/adolescente.jpg",
        content: `
            <p>¿Te suena esta escena? Tu hijo entra por la puerta, le preguntas con tu mejor intención "¿Qué tal el cole?" y recibes un gruñido o un "bien" seco mientras se encierra en su cuarto.</p>
            
            <p>La adolescencia es una etapa de individuación. Ellos necesitan separarse (es biológico), pero paradójicamente, te necesitan más que nunca como base segura.</p>

            <h2>Cambia tu estrategia de comunicación</h2>
            
            <p>Aquí tienes 5 frases que abren puertas en lugar de cerrarlas:</p>

            <h3>1. "Me encantaría saber tu opinión sobre esto..."</h3>
            <p>A los adolescentes les encanta sentirse validados como adultos. Pídeles consejo sobre algo real (una noticia, una decisión de compra, un problema laboral). Les demuestra respeto intelectual.</p>

            <h3>2. "Te he traído tu snack favorito" (y te vas)</h3>
            <p>A veces, el amor entra por el estómago y el respeto al espacio. No pidas nada a cambio. Es un acto de servicio que dice "te veo y te cuido" sin invadir.</p>

            <h3>3. "Veo que estás agobiado. ¿Quieres hablar o prefieres espacio?"</h3>
            <p>Darles la opción de NO hablar es, a menudo, la mejor forma de que acaben hablando. Les devuelves el control.</p>
            
            <p>Recuerda: tu objetivo no es ser su mejor amigo, es ser su padre/madre confiable. En nuestro próximo curso <em>Adolescencia sin Dramas</em>, trabajaremos a fondo estos guiones de comunicación.</p>
        `
    },
    {
        slug: "fe-en-familia-dia-a-dia",
        title: "Cómo transmitir la fe sin que sea 'aburrido' para los niños",
        excerpt: "Educar en la fe no tiene por qué ser una obligación pesada. Descubre pequeños rituales diarios que integran la espiritualidad de forma natural y alegre.",
        author: "Máximo",
        date: new Date("2023-12-28"),
        category: "Espiritualidad",
        readTime: "4 min",
        imageUrl: "/images/blog/fe-familia.jpg",
        content: `
            <p>Muchos padres católicos temen que obligar a sus hijos a rezar genere rechazo. Y es un miedo válido. La fe se contagia, no se impone.</p>

            <h2>Lo sagrado en lo cotidiano</h2>
            <p>No necesitas grandes liturgias diarias. Busca a Dios en lo pequeño:</p>

            <ul>
                <li><strong>Agradecer antes de cenar:</strong> Pero no con una fórmula repetitiva, sino pidiendo que cada uno diga una cosa buena de su día. Conectas la gratitud con Dios y con la alegría diaria.</li>
                <li><strong>La naturaleza:</strong> Cuando vayáis al parque o de excursión, maravillaos juntos. "¡Mira qué colores ha pintado Dios hoy en el cielo!".</li>
                <li><strong>Bendecirles al dormir:</strong> Una simple cruz en la frente antes de dormir es un gesto táctil de amor y protección que recordarán siempre.</li>
            </ul>

            <p>Haz que la fe sea sinónimo de hogar, de seguridad y de alegría, no de normas rígidas. Ese es el corazón de nuestra guía <em>Educar en la Fe</em>.</p>
        `
    },
    {
        slug: "7-errores-transmitir-fe",
        title: "¿Por qué tus hijos se aburren en Misa? 7 Errores que alejan a los niños de la Fe",
        excerpt: "La fe no es una asignatura extraescolar. Descubre por qué el enfoque 'tradicional' suele fallar y cómo reconectar con el asombro.",
        author: "Máximo",
        date: new Date("2024-01-08"),
        category: "Espiritualidad",
        readTime: "6 min",
        imageUrl: "/images/blog/iglesia-ninos.jpg",
        content: `
            <p>¿Te suena esta batalla? Es domingo por la mañana. Tú intentas que se vistan rápido, ellos se quejan, llegáis tarde y pasas la hora de Misa chistándoles para que no se muevan.</p>
            <p>Al salir, piensas: <em>"Esto no sirve de nada. Solo estoy consiguiendo que odien venir"</em>.</p>

            <p>No estás solo. El problema no es la Misa, ni Dios, ni tus hijos. El problema son los "errores de traducción" que cometemos los padres sin querer.</p>

            <h2>Error #1: El Dios Policía</h2>
            <p>Si solo hablamos de Dios para corregir ("Pórtate bien que Jesús te ve"), convertimos la fe en un sistema de vigilancia. ¿Quién quiere amar a una cámara de seguridad?</p>
            <p><strong>El cambio:</strong> Habla de Dios cuando sean felices. "¡Qué helado tan rico! Gracias a Dios que inventó el sabor a chocolate". Asocia a Dios con el placer y la gratitud, no solo con la moral.</p>

            <h2>Error #2: La Fe de "Domingo"</h2>
            <p>Si Dios solo existe una hora a la semana, es irrelevante. Los niños detectan la incoherencia a kilómetros.</p>
            <p><strong>El cambio:</strong> Integra micro-liturgias en casa. Bendecir la mesa, pedir perdón (tú a ellos) cuando te equivocas, o admirar la naturaleza.</p>

            <h2>Error #3: Silenciar las preguntas incómodas</h2>
            <p>"No preguntes eso, es pecado" o "porque sí". Cuando un niño pregunta "¿Por qué Dios permite que muera gente?", te está invitando a profundizar. Si cierras la puerta, buscará respuestas en otro lado (o asumirá que no las hay).</p>

            <h2>La solución no es "hacer más", es "ser más"</h2>
            <p>Educar en la fe se trata de contagiar tu propio asombro. Si tú vives tu fe con alegría, ellos querrán saber el secreto de tu alegría.</p>
            
            <div style="background-color: #FDF4F0; padding: 2rem; border-radius: 1rem; border: 1px solid #E07A5F; margin-top: 2rem;">
                <h3 style="color: #E07A5F; margin-top: 0;">¿Quieres profundizar más?</h3>
                <p>He preparado una guía completa llamada <strong>Educar en la Fe: De la Obligación al Asombro</strong>. Es un manual sin juicios para padres reales.</p>
                <p>Te enseñaré a crear un hogar donde la fe respire y no asfixie. Aún no ha salido, pero puedes unirte a la lista de espera y ver el temario completo.</p>
                <p style="text-align: center; margin-top: 1.5rem;">
                    <a href="/#waitlist-educar-en-la-fe" style="background-color: #E07A5F; color: white; padding: 0.75rem 1.5rem; text-decoration: none; font-weight: bold; border-radius: 0.5rem; display: inline-block;">Ver Temario y Unirme a la Lista</a>
                </p>
            </div>
        `
    }
];

const PRODUCTS = [
    {
        title: "Bienestar Emocional de los Padres",
        description: "Gestiona el estrés, la culpa y la carga mental para criar desde la calma.",
        price: 7.99,
        originalPrice: 89.90,
        imageUrl: "/pareja_frustrada_2.jpg",
        slug: "bienestar-emocional-padres",
    },
    {
        title: "Educar en la Fe",
        description: "Transmite tus valores y creencias de forma natural y alegre.",
        price: 0,
        originalPrice: 0,
        imageUrl: "/images/future_course_1.jpg",
        slug: "educar-en-la-fe",
    },
    {
        title: "Primeros Pasos: 0 a 3 años",
        description: "Guía completa para la etapa más crucial del desarrollo.",
        price: 0,
        originalPrice: 0,
        imageUrl: "/images/future_course_3.jpg",
        slug: "primeros-pasos",
    },
    {
        title: "Adolescencia sin Dramas",
        description: "Conecta con tu hijo y gestiona los conflictos desde el respeto.",
        price: 0,
        originalPrice: 0,
        imageUrl: "/images/future_course_2.jpg",
        slug: "adolescencia-sin-dramas",
    }
];

async function main() {
    console.log("Seeding Database...");

    // Seed Products
    for (const product of PRODUCTS) {
        const createdProduct = await prisma.product.upsert({
            where: { slug: product.slug },
            update: {
                title: product.title,
                description: product.description,
                price: product.price,
                originalPrice: product.originalPrice,
                imageUrl: product.imageUrl
            },
            create: {
                title: product.title,
                description: product.description,
                price: product.price,
                originalPrice: product.originalPrice,
                imageUrl: product.imageUrl,
                slug: product.slug
            },
        });
        console.log(`Created product: ${createdProduct.title}`);
    }

    // Seed Blog Posts
    for (const post of BLOG_POSTS) {
        const createdPost = await prisma.blogPost.upsert({
            where: { slug: post.slug },
            update: {},
            create: post,
        });
        console.log(`Created post: ${createdPost.title}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
