'use client';

import { Suspense } from 'react';
import { useTranslationWithLocale } from '@/hooks/useTranslation';
import { getCheckoutUrl, type Locale } from '@/config/i18n';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Star, X, ArrowRight, Home, ShieldCheck, Clock, Brain, Users, HelpCircle, Heart, MessageCircle, ShoppingBag, Sparkles, ExternalLink } from 'lucide-react';
import OfferCountdown from '@/components/ui/OfferCountdown';

export default function EducarFeClient({ locale }: { locale: Locale }) {
    const { t } = useTranslationWithLocale(locale, 'educar-fe');
    const { t: tCommon } = useTranslationWithLocale(locale, 'common');

    const checkoutUrl = getCheckoutUrl('educar-fe', locale);

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800">
            {/* Header con selector de idioma */}
            <div className="bg-gradient-to-r from-stone-50 to-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-base font-bold text-stone-700 hover:text-[#E07A5F] transition-colors group"
                    >
                        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>{t('header.backToHome')}</span>
                    </Link>
                    <Suspense fallback={<div className="w-24 h-10" />}>
                        <LanguageSwitcher locale={locale} />
                    </Suspense>
                </div>
            </div>

            {/* --- HERO SECTION --- */}
            <header className="relative pt-10 pb-20 md:pt-16 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-light.png')] opacity-50 z-0"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-[#E07A5F]/10 text-[#E07A5F] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-8 animate-pulse border border-[#E07A5F]/20">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{t('hero.badge')}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 mb-6 leading-tight">
                            {t('hero.title')}
                            <span className="block text-2xl md:text-4xl mt-4 text-stone-800 font-bold">
                                {t('hero.subtitle')}
                            </span>
                            <span className="block text-lg md:text-2xl mt-4 text-stone-500 font-normal">
                                {t('hero.subtitleNote')}
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-2xl mx-auto font-medium">
                            {t('hero.description')} <br />
                            <span className="text-stone-500 font-normal">{t('hero.descriptionSub')}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                        <div className="relative order-2 md:order-1">
                            <div className="relative z-10 transform rotate-[-2deg] hover:rotate-0 transition duration-500">
                                <Image
                                    src="/images/landing/educar-en-la-fe/educar-fe-cover.png"
                                    alt="Portada Ebook Educar en la Fe"
                                    width={600}
                                    height={800}
                                    className="rounded-2xl shadow-2xl border-8 border-white hover:scale-[1.02] transition duration-500"
                                    priority
                                />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#E07A5F]/20 blur-3xl rounded-full -z-10"></div>
                        </div>

                        <div className="order-1 md:order-2 flex flex-col gap-6">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-stone-900 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                    OFERTA FLASH
                                </div>

                                <div className="text-center pt-4">
                                    <h3 className="text-2xl font-bold text-stone-900 mb-2">{t('hero.cta.title')}</h3>
                                    <p className="text-stone-600 mb-6 text-sm">{t('hero.cta.subtitle')}</p>

                                    <div className="flex items-end justify-center gap-2 mb-6">
                                        <span className="text-5xl font-bold text-[#E07A5F]">{t('hero.cta.price')}</span>
                                        <span className="text-xl text-stone-400 line-through mb-1">{t('hero.cta.originalPrice')}</span>
                                    </div>

                                    <div className="flex justify-center mb-4">
                                        <OfferCountdown className="text-[#E07A5F] text-base" includeDays={true} cycleDays={3} />
                                    </div>

                                    <a
                                        href={checkoutUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => (window as any).fbq && (window as any).fbq('track', 'InitiateCheckout', {
                                            content_name: 'Educar en la Fe',
                                            value: locale === 'pt' ? 149 : 27,
                                            currency: locale === 'pt' ? 'BRL' : 'EUR',
                                            language: locale
                                        })}
                                        className="block w-full bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                    >
                                        {t('hero.cta.button')} <ArrowRight className="w-5 h-5" />
                                    </a>
                                    <p className="text-xs text-stone-400 mt-4">{t('hero.cta.guarantee')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- SECTION 1: PAIN (DOLOR) --- */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/landing/educar-en-la-fe/educar-fe-problem.png"
                                alt="Problema"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 text-white font-medium italic">
                                {t('pain.statistic')}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-stone-900 leading-tight">
                                {t('pain.title')}
                            </h2>
                            <ul className="space-y-4">
                                {((t('pain.points') || []) as any).map((point: string, idx: number) => (
                                    <li key={idx} className="flex gap-4">
                                        <div className="bg-red-100 p-2 rounded-lg h-fit text-red-500 shrink-0"><X className="w-5 h-5" /></div>
                                        <p className="text-lg text-stone-700">{point}</p>
                                    </li>
                                ))}
                            </ul>
                            <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-[#E07A5F] mt-6">
                                <h4 className="font-bold text-stone-900 mb-2">{t('pain.callout.title')}</h4>
                                <p className="text-stone-600" dangerouslySetInnerHTML={{ __html: t('pain.callout.description') }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: AGITATION (AGITACIÓN) --- */}
            <section className="py-20 bg-stone-900 text-stone-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                    <Image src="/images/pattern-light.png" alt="pattern" fill className="object-cover mix-blend-overlay" />
                </div>
                <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{t('agitation.title')}</h2>
                    <p className="text-xl mb-12 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t('agitation.subtitle') }}></p>

                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {((t('agitation.stats') || []) as any).map((stat: any, idx: number) => (
                            <div key={idx} className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                                <div className="text-4xl font-bold text-[#E07A5F] mb-2">{stat.value}</div>
                                <p className="text-white font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl max-w-3xl mx-auto">
                        <p className="text-lg md:text-xl leading-relaxed text-red-200">
                            {t('agitation.warning')}
                            <br /><br />
                            <span className="text-white font-bold">{t('agitation.warningBold')}</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: SOLUTION (SOLUCIÓN) --- */}
            <section className="py-24 bg-[#FDFBF7]">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">{t('solution.title')}</h2>
                        <p className="text-xl text-stone-600 max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: t('solution.subtitle') }}></p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div className="order-2 md:order-1 space-y-6">
                            {((t('solution.benefits') || []) as any).map((benefit: any, idx: number) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="bg-green-100 p-3 rounded-full h-fit text-green-600"><Check className="w-6 h-6" /></div>
                                    <div>
                                        <h4 className="text-xl font-bold text-stone-900">{benefit.title}</h4>
                                        <p className="text-stone-600">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="order-1 md:order-2 relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2">
                            <Image
                                src="/images/landing/educar-en-la-fe/educar-fe-dream.png"
                                alt="Solución"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* CTA Final */}
                    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-stone-200 text-center">
                        <h3 className="text-3xl font-bold text-stone-900 mb-4">{t('hero.cta.title')}</h3>
                        <div className="flex items-end justify-center gap-2 mb-6">
                            <span className="text-5xl font-bold text-[#E07A5F]">{t('hero.cta.price')}</span>
                            <span className="text-xl text-stone-400 line-through mb-1">{t('hero.cta.originalPrice')}</span>
                        </div>
                        <a
                            href={checkoutUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => (window as any).fbq && (window as any).fbq('track', 'InitiateCheckout', {
                                content_name: 'Educar en la Fe',
                                value: locale === 'pt' ? 149 : 27,
                                currency: locale === 'pt' ? 'BRL' : 'EUR',
                                language: locale
                            })}
                            className="block w-full bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            {t('hero.cta.button')} <ArrowRight className="w-5 h-5" />
                        </a>
                        <p className="text-xs text-stone-400 mt-4">{t('hero.cta.guarantee')}</p>
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: TANGIBLE BENEFITS (BENEFICIOS) --- */}
            <section className="py-20 bg-white border-y border-stone-100">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-bold text-center text-stone-900 mb-16">{t('benefits.title')}</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {((t('benefits.items') || []) as any).map((benefit: any, idx: number) => {
                            const icons = [Heart, MessageCircle, ShieldCheck, Clock, Brain, Users];
                            const Icon = icons[idx % icons.length];
                            return (
                                <div key={idx} className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-lg transition group">
                                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#E07A5F] mb-6 group-hover:scale-110 transition">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-3">{benefit.title}</h3>
                                    <p className="text-stone-600">
                                        {benefit.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- SECTION 5: SOCIAL PROOF (TESTIMONIO) --- */}
            <section className="py-24 bg-[#E07A5F]">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <Star className="w-12 h-12 text-white/80 mx-auto mb-6" fill="currentColor" />
                    <blockquote className="text-2xl md:text-4xl font-serif text-white leading-relaxed italic mb-8">
                        {t('testimonials.title')}
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl">ML</div>
                        <div className="text-left">
                            <cite className="block text-white font-bold not-italic text-lg">{t('testimonials.author')}</cite>
                            <span className="text-stone-200">{t('testimonials.role')}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 6: OFFER & GUARANTEE --- */}
            <section className="py-24 bg-[#FDFBF7]" id="offer">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-stone-100 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-2 bg-[#E07A5F]"></div>

                        <div className="text-center mb-10">
                            <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{t('offer.badge')}</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-6 mb-4">{t('offer.title')}</h2>
                            <p className="text-stone-500 text-lg">{t('offer.subtitle')}</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                            <div className="text-center">
                                <p className="text-stone-400 font-medium line-through text-2xl mb-1">{t('offer.originalPrice')}</p>
                                <p className="text-6xl font-bold text-[#E07A5F]">{t('offer.price')}</p>
                                <p className="text-stone-400 text-sm mt-2">{t('offer.priceNote')}</p>
                            </div>
                            <div className="h-16 w-px bg-stone-200 hidden md:block"></div>
                            <div className="text-left space-y-2">
                                {((t('offer.features') || []) as any).map((feature: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-2 text-stone-700">
                                        <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="max-w-md mx-auto">
                            <div className="flex justify-center mb-6">
                                <OfferCountdown className="text-[#E07A5F] text-xl font-bold" includeDays={true} cycleDays={3} />
                            </div>

                            <a
                                href={checkoutUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => (window as any).fbq && (window as any).fbq('track', 'InitiateCheckout', {
                                    content_name: 'Educar en la Fe',
                                    value: locale === 'pt' ? 69 : 27,
                                    currency: locale === 'pt' ? 'BRL' : 'EUR',
                                    language: locale
                                })}
                                className="block w-full bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-2xl py-5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 text-center mb-6"
                            >
                                {t('offer.cta')}
                            </a>

                            <div className="bg-stone-50 p-4 rounded-xl text-center border border-stone-100 flex items-center justify-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-[#E07A5F]" />
                                <div className="text-left">
                                    <p className="font-bold text-stone-900 text-sm">{t('offer.guaranteeTitle')}</p>
                                    <p className="text-xs text-stone-500">{t('offer.guaranteeText')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 7: FAQ --- */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center text-stone-900 mb-12">{t('faq.title')}</h2>

                    <div className="space-y-6">
                        {((t('faq.items') || []) as any).map((item: any, idx: number) => (
                            <div key={idx} className="bg-[#FDFBF7] p-6 rounded-xl border border-stone-100">
                                <h4 className="font-bold text-stone-900 flex items-center gap-3 mb-3"><HelpCircle className="w-5 h-5 text-[#E07A5F]" /> {item.question}</h4>
                                <p className="text-stone-600 ml-8">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 8: INTERNAL RECOMMENDATIONS --- */}
            <section className="py-20 bg-white border-t border-stone-100">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-stone-900 mb-3">
                            {t('internal_recommendations.title')}
                        </h2>
                        <p className="text-stone-600">
                            {t('internal_recommendations.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {((t('internal_recommendations.items') || []) as any).map((product: any, idx: number) => (
                            <div key={idx} className="group bg-stone-50 rounded-2xl overflow-hidden transition-all border border-stone-100 opacity-90">
                                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                                    {/* Placeholder simplificado ya que no tenemos imágenes traducidas cargadas, pero usamos las del sitio original si existen */}
                                    <div className="absolute inset-0 bg-stone-200/50 flex items-center justify-center text-stone-400">
                                        <ShoppingBag className="w-12 h-12 opacity-20" />
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                                        <span className="bg-[#f97316] text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                                            {locale === 'pt' ? 'Em Breve' : 'Próximamente'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-stone-900 mb-2">
                                        {product.title}
                                    </h3>
                                    <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-stone-400">
                                            {product.price}
                                        </span>
                                        <Link
                                            href={locale === 'pt' ? '/pt/educar-fe' : '/es/educar-fe'}
                                            className="flex items-center gap-2 text-sm font-semibold text-[#E07A5F] hover:text-[#D06950] transition-colors cursor-not-allowed opacity-50"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            {locale === 'pt' ? 'Entrar na lista de espera' : 'Apúntate al waitlist'} <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {t('internal_recommendations.cta')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- SECTION 9: EXTERNAL RECOMMENDATIONS --- */}
            <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
                            <Sparkles className="w-4 h-4" />
                            <span>{t('external_recommendations.badge')}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-stone-900 mb-3">
                            {t('external_recommendations.title')}
                        </h2>
                        <p className="text-stone-600">
                            {t('external_recommendations.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {((t('external_recommendations.items') || []) as any).map((product: any, idx: number) => {
                            // Imágenes estáticas hardcodeadas porque no vienen del JSON
                            const images = ["/images/tevasa-revoluciona.jpg", "/images/bebe-dormir-mejor.png"];
                            const imageUrl = images[idx % images.length];

                            return (
                                <a
                                    key={idx}
                                    href={product.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-white rounded-xl overflow-hidden border border-stone-100 hover:border-purple-200 hover:shadow-lg transition-all"
                                >
                                    <div className="relative w-full aspect-square overflow-hidden bg-stone-100">
                                        <Image
                                            src={imageUrl}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                                {product.category}
                                            </span>
                                            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-purple-600 transition-colors" />
                                        </div>

                                        <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-purple-600 transition-colors">
                                            {product.name}
                                        </h3>

                                        <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                                            {product.description}
                                        </p>

                                        <div className="text-xs text-purple-600 font-semibold">
                                            ✨ {product.highlight}
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-stone-600 font-medium">
                            {t('external_recommendations.footer')}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
