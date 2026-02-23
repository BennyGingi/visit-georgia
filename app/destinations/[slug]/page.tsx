'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import BackToTop from '@/components/BackToTop';

// Types
interface Destination {
    slug: string;
    name: string;
    tagline: string;
    heroImage: string;
    overview: string[];
    attractions: string[];
    bestTime: string;
    howToGetThere: string;
    gallery: string[];
    transferPrice: number;
}

// Destination Data
const destinationsData: Record<string, any> = {
    en: {
        tbilisi: {
            slug: 'tbilisi',
            name: 'Tbilisi',
            tagline: 'The soul of Georgia',
            heroImage: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=2000&q=80',
            overview: [
                'Tbilisi, the vibrant capital of Georgia, is a city where ancient history seamlessly blends with modern culture. Nestled in the valley of the Mtkvari River, this enchanting city has been a crossroads of civilizations for over 1,500 years.',
                'The Old Town captivates visitors with its narrow cobblestone streets, colorful balconies, and traditional sulfur baths that have been welcoming travelers since the 5th century. The city\'s architecture tells stories of Persian, Byzantine, and Soviet influences, creating a unique urban tapestry.',
                'Today\'s Tbilisi is a thriving cultural hub with world-class restaurants, trendy cafes, contemporary art galleries, and a vibrant nightlife scene. From the ancient Narikala Fortress overlooking the city to the ultra-modern Bridge of Peace, Tbilisi offers an unforgettable journey through time.',
            ],
            attractions: [
                'Narikala Fortress - Ancient citadel with panoramic city views',
                'Old Town - Labyrinth of narrow streets and traditional architecture',
                'Sulfur Baths District - Historic Abanotubani with natural hot springs',
                'Rustaveli Avenue - Main boulevard with theaters and museums',
                'Mtatsminda Park - Hilltop amusement park with stunning views',
                'Bridge of Peace - Modern pedestrian bridge over Mtkvari River',
                'Holy Trinity Cathedral - Largest Orthodox cathedral in Georgia',
                'Dry Bridge Flea Market - Antiques and Soviet memorabilia',
            ],
            bestTime: 'April to June and September to October offer pleasant weather and fewer crowds. Summer (July-August) is warm and lively with festivals, while winter brings a magical atmosphere with Christmas markets.',
            howToGetThere: 'Tbilisi International Airport is well-connected to major cities worldwide. Rati Tours offers comfortable private transfers from the airport to your hotel, as well as day trips to nearby attractions like Mtskheta and Jvari Monastery.',
            gallery: [
                'https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1555881675-4e9e1f8e3e6f?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
            ],
            transferPrice: 0,
        },
        kazbegi: {
            slug: 'kazbegi',
            name: 'Kazbegi',
            tagline: 'Where mountains touch heaven',
            heroImage: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=2000&q=80',
            overview: [
                'Kazbegi, officially known as Stepantsminda, is a breathtaking mountain town nestled in the Greater Caucasus range at 1,740 meters above sea level. Dominated by the majestic Mount Kazbek (5,047m), this region offers some of Georgia\'s most spectacular alpine scenery.',
                'The iconic Gergeti Trinity Church, perched at 2,170 meters with Mount Kazbek as its backdrop, is one of the most photographed landmarks in the Caucasus. The journey to reach it, whether by foot or 4WD, rewards visitors with panoramic views that seem to touch the heavens.',
                'Beyond its natural beauty, Kazbegi is a paradise for outdoor enthusiasts, offering hiking trails, mountaineering opportunities, and a chance to experience authentic mountain culture. The town serves as a gateway to numerous trekking routes and remote villages where time seems to stand still.',
            ],
            attractions: [
                'Gergeti Trinity Church - Iconic 14th-century church at 2,170m',
                'Mount Kazbek - One of the highest peaks in the Caucasus (5,047m)',
                'Gveleti Waterfall - Beautiful cascade accessible via short hike',
                'Dariali Gorge - Dramatic canyon on the Georgian Military Highway',
                'Truso Valley - Remote valley with abandoned villages and mineral springs',
                'Sno Valley - Traditional Khevsur villages and ancient towers',
                'Juta Village - Starting point for treks to Chaukhi Mountains',
                'Rooms Hotel Kazbegi - Stunning architecture with mountain views',
            ],
            bestTime: 'June to September for hiking and clear mountain views. Winter (December-March) offers snow-covered landscapes and a serene atmosphere, though some roads may be closed. Spring brings wildflowers and rushing waterfalls.',
            howToGetThere: 'Located 165km north of Tbilisi along the scenic Georgian Military Highway. Rati Tours provides comfortable private transfers with stops at Ananuri Fortress and Gudauri viewpoint. The 3-hour journey is an adventure in itself, passing through dramatic mountain scenery.',
            gallery: [
                'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
            ],
            transferPrice: 80,
        },
        gudauri: {
            slug: 'gudauri',
            name: 'Gudauri',
            tagline: 'Ski paradise of the Caucasus',
            heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=2000&q=80',
            overview: [
                'Gudauri is Georgia\'s premier ski resort, perched at 2,200 meters on the southern slopes of the Greater Caucasus Mountain Range. This modern resort has gained international recognition for its excellent snow conditions, affordable prices, and stunning mountain vistas.',
                'The resort offers over 70 kilometers of ski runs suitable for all levels, from beginners to advanced skiers. With a season running from December to April, Gudauri boasts reliable snow coverage and an average of 300 sunny days per year. The resort\'s high altitude and north-facing slopes ensure excellent powder snow throughout the winter.',
                'Beyond skiing, Gudauri is a year-round destination. Summer brings opportunities for paragliding, mountain biking, and hiking, with the alpine meadows bursting into colorful bloom. The resort\'s modern infrastructure includes comfortable hotels, restaurants, and après-ski entertainment.',
            ],
            attractions: [
                'Ski Slopes - 70km of runs for all skill levels',
                'Paragliding - Tandem flights with spectacular mountain views',
                'Kobi Ski Lift - Highest lift reaching 3,279 meters',
                'Cross Monument - Soviet-era monument with panoramic views',
                'Heli-skiing - Access to untouched powder in remote areas',
                'Snowmobiling - Explore the winter wonderland',
                'Mountain Biking - Summer trails through alpine terrain',
                'New Gudauri - Modern resort area with hotels and restaurants',
            ],
            bestTime: 'December to April for skiing and snowboarding, with January-February offering the best snow conditions. June to September for summer activities like paragliding and hiking. Avoid November and May during off-season transitions.',
            howToGetThere: 'Located 120km north of Tbilisi on the Georgian Military Highway, approximately 2 hours by car. Rati Tours offers daily transfers to Gudauri during ski season, with convenient pickup from Tbilisi hotels. Shared and private transfer options available.',
            gallery: [
                'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1418290232843-5d7a0bd93f7d?auto=format&fit=crop&w=800&q=80',
            ],
            transferPrice: 60,
        },
        batumi: {
            slug: 'batumi',
            name: 'Batumi',
            tagline: 'Black Sea pearl',
            heroImage: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=2000&q=80',
            overview: [
                'Batumi, Georgia\'s second-largest city, is a stunning Black Sea resort that perfectly blends subtropical charm with modern development. This coastal paradise has transformed into a vibrant destination featuring futuristic architecture, palm-lined boulevards, and a lively entertainment scene.',
                'The city\'s waterfront boulevard stretches for 7 kilometers along the coast, offering beaches, parks, cafes, and striking modern sculptures. Batumi\'s unique skyline includes the Alphabet Tower, the moving Ali and Nino statue, and numerous high-rise buildings that light up spectacularly at night.',
                'Beyond the glitz, Batumi retains its authentic charm in the Old Town, where 19th-century architecture tells stories of the city\'s past as a major port. The subtropical climate, with mild winters and warm summers, makes Batumi an ideal year-round destination for beach lovers and culture enthusiasts alike.',
            ],
            attractions: [
                'Batumi Boulevard - 7km waterfront promenade with beaches and parks',
                'Ali and Nino Statue - Moving sculpture symbolizing eternal love',
                'Alphabet Tower - 130m tower celebrating Georgian script',
                'Batumi Botanical Garden - 110 hectares of diverse plant species',
                'Old Town - Historic district with European architecture',
                'Batumi Dolphinarium - Shows and swimming with dolphins',
                'Piazza Square - Italian-style square with cafes and live music',
                'Batumi Cable Car - Panoramic views from Anuria Mountain',
            ],
            bestTime: 'May to October for beach weather and swimming. July-August are peak season with warm temperatures (25-30°C). Spring (April-May) and autumn (September-October) offer pleasant weather with fewer crowds. Winter is mild but rainy.',
            howToGetThere: 'Batumi International Airport serves domestic and international flights. By road, it\'s 370km from Tbilisi (5-6 hours). Rati Tours offers comfortable private transfers with scenic stops along the way, including Gori and Kutaisi. Overnight stops can be arranged for a more relaxed journey.',
            gallery: [
                'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1555881675-4e9e1f8e3e6f?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
            ],
            transferPrice: 150,
        },
        kakheti: {
            slug: 'kakheti',
            name: 'Kakheti',
            tagline: 'Birthplace of wine',
            heroImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=2000&q=80',
            overview: [
                'Kakheti, Georgia\'s premier wine region, is where viticulture has been practiced for over 8,000 years. This fertile valley in eastern Georgia produces 70% of the country\'s wine, using traditional qvevri (clay vessel) methods recognized by UNESCO as Intangible Cultural Heritage.',
                'Rolling hills covered with vineyards stretch as far as the eye can see, dotted with charming wine estates, ancient monasteries, and traditional villages. The region is home to over 500 indigenous grape varieties, with Saperavi and Rkatsiteli being the most famous.',
                'A visit to Kakheti is a journey through Georgian wine culture, where family-run wineries welcome guests with warm hospitality, traditional feasts (supra), and of course, endless wine tastings. The region also boasts stunning landscapes, from the Alazani Valley to the foothills of the Caucasus Mountains.',
            ],
            attractions: [
                'Sighnaghi - "City of Love" with stunning valley views and city walls',
                'Bodbe Monastery - Pilgrimage site with beautiful gardens',
                'Tsinandali Estate - Historic wine estate with museum and gardens',
                'Gremi Fortress - 16th-century architectural complex',
                'Alaverdi Cathedral - 11th-century monastery with winemaking tradition',
                'Telavi - Regional capital with Batonis Tsikhe fortress',
                'Kvareli Wine Tunnel - Underground wine storage in Khareba Winery',
                'Nekresi Monastery - Ancient monastery with panoramic views',
            ],
            bestTime: 'September to October for grape harvest (rtveli) and wine festivals. Spring (April-May) brings blooming landscapes. Summer offers warm weather for vineyard tours. Avoid winter (December-February) when some wineries close.',
            howToGetThere: 'Located 100-150km east of Tbilisi, depending on the destination within Kakheti. Rati Tours offers full-day wine tours visiting multiple wineries, including Sighnaghi and Bodbe Monastery. Private transfers allow flexible itineraries tailored to your wine preferences.',
            gallery: [
                'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1547481887-a26e2cacb37e?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80',
            ],
            transferPrice: 70,
        },
        borjomi: {
            slug: 'borjomi',
            name: 'Borjomi',
            tagline: 'Healing waters',
            heroImage: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?auto=format&fit=crop&w=2000&q=80',
            overview: [
                'Borjomi is a resort town famous worldwide for its natural mineral water, which has been bottled and exported since 1890. Nestled in the Borjomi Gorge at 800 meters above sea level, the town is surrounded by pristine forests and mountains, offering a perfect blend of wellness and nature.',
                'The town\'s centerpiece is Borjomi Central Park, where visitors can taste the warm mineral water directly from the source, stroll through beautiful gardens, and enjoy various recreational activities. The park\'s historic architecture and natural beauty make it a delightful place to spend a day.',
                'Borjomi also serves as the gateway to Borjomi-Kharagauli National Park, one of Europe\'s largest protected areas. The region offers excellent hiking trails, wildlife watching, and a chance to experience Georgia\'s pristine wilderness. The combination of therapeutic waters and outdoor adventures makes Borjomi a unique destination.',
            ],
            attractions: [
                'Borjomi Central Park - Historic park with mineral water springs',
                'Borjomi-Kharagauli National Park - Vast wilderness with hiking trails',
                'Green Monastery - 9th-century monastery in the forest',
                'Borjomi Cable Car - Panoramic views of the gorge',
                'Likani Palace - Former summer residence of Romanov family',
                'Mineral Water Park - Taste the famous Borjomi water at its source',
                'Petra Fortress - Ancient fortress ruins with valley views',
                'Mtsvane Monastery - Peaceful monastery accessible by cable car',
            ],
            bestTime: 'May to September for hiking and outdoor activities. Summer (June-August) offers warm weather perfect for park visits. Autumn (September-October) brings beautiful fall colors. Winter can be cold but offers a peaceful, snow-covered landscape.',
            howToGetThere: 'Located 160km west of Tbilisi, approximately 2.5-3 hours by car. Rati Tours provides comfortable transfers to Borjomi, often combined with visits to Vardzia cave monastery or Rabati Castle in Akhaltsikhe. Day trips or overnight stays can be arranged.',
            gallery: [
                'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
            ],
            transferPrice: 90,
        },
        mestia: {
            slug: 'mestia',
            name: 'Mestia',
            tagline: 'Gateway to Svaneti',
            heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80',
            overview: [
                'Mestia, the main town of the Svaneti region, is a UNESCO World Heritage site renowned for its medieval defensive towers and stunning mountain scenery. Located at 1,500 meters in the heart of the Greater Caucasus, this remote region preserves one of Georgia\'s most ancient and unique cultures.',
                'The iconic Svan towers, built between the 9th and 13th centuries, dot the landscape like stone sentinels. These defensive structures, combined with traditional stone houses and churches filled with ancient frescoes, create a living museum of medieval architecture.',
                'Mestia serves as a base for exploring the magnificent Svaneti region, offering access to some of the Caucasus\' most spectacular trekking routes, including the famous trek to Ushguli, Europe\'s highest continuously inhabited settlement. The region\'s isolation has preserved unique traditions, language, and customs that date back millennia.',
            ],
            attractions: [
                'Svan Towers - Medieval defensive towers throughout the town',
                'Svaneti Museum of History - Artifacts and icons from the region',
                'Hatsvali Ski Resort - Modern ski area with stunning views',
                'Chalaadi Glacier - Accessible glacier via scenic hike',
                'Ushguli - Europe\'s highest village (trek or 4WD)',
                'Koruldi Lakes - Alpine lakes with panoramic mountain views',
                'Laghami Church - Ancient church with beautiful frescoes',
                'Mestia-Ushguli Trek - Multi-day hiking adventure',
            ],
            bestTime: 'June to September for trekking and clear mountain views. July-August offer the warmest weather and best trail conditions. Winter (December-March) for skiing and snow-covered landscapes, though access can be challenging. Avoid April-May and October-November during muddy seasons.',
            howToGetThere: 'Mestia has a small airport with flights from Tbilisi (weather permitting). By road, it\'s 470km from Tbilisi (8-10 hours). Rati Tours offers multi-day trips to Svaneti with comfortable 4WD vehicles, including stops at Enguri Dam and scenic viewpoints. Overnight accommodation in Mestia or Ushguli can be arranged.',
            gallery: [
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
            ],
            transferPrice: 200,
        },
        bakuriani: {
            slug: 'bakuriani',
            name: 'Bakuriani',
            tagline: 'Year-round mountain resort',
            heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80',
            overview: [
                'Bakuriani is a charming mountain resort town located at 1,700 meters on the northern slopes of the Trialeti Range. Known as Georgia\'s family-friendly ski destination, Bakuriani offers a more relaxed atmosphere compared to Gudauri, making it perfect for beginners and families with children.',
                'The town has a rich history dating back to the late 19th century when it was developed as a resort for the Russian aristocracy. Today, it combines Soviet-era charm with modern ski facilities, offering a unique blend of nostalgia and contemporary comfort.',
                'Beyond winter sports, Bakuriani is a year-round destination. Summer brings opportunities for horseback riding, mountain biking, and hiking through pine forests. The town\'s cool climate makes it a popular escape from Tbilisi\'s summer heat, while spring showcases beautiful wildflower meadows.',
            ],
            attractions: [
                'Didveli Ski Resort - Modern ski area with varied slopes',
                'Kokhta Mountain - Skiing and summer hiking destination',
                'Bakuriani Botanical Garden - Alpine plants at 1,700m elevation',
                'Tskhratskaro Pass - Scenic viewpoint and hiking area',
                'Mitarbi Ski Area - Family-friendly slopes for beginners',
                'Narrow Gauge Railway - Historic train ride through forests',
                'Borjomi-Bakuriani Railway - Scenic journey through mountains',
                'Tba Lake - Small alpine lake for summer picnics',
            ],
            bestTime: 'December to March for skiing and snowboarding, with January-February offering the best snow. June to September for summer activities and pleasant weather. Avoid November and April during off-season transitions. Spring (May) brings blooming rhododendrons.',
            howToGetThere: 'Located 180km from Tbilisi, approximately 3 hours by car via Borjomi. Rati Tours offers transfers to Bakuriani, often combined with a stop in Borjomi to taste the famous mineral water. The scenic drive passes through beautiful mountain landscapes and forests.',
            gallery: [
                'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1418290232843-5d7a0bd93f7d?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80',
            ],
            transferPrice: 100,
        },
    },
    // Hebrew translations would go here (abbreviated for space)
    he: {
        // Similar structure with Hebrew translations
        // For brevity, I'll include just the structure
    },
    // Russian translations would go here (abbreviated for space)
    ru: {
        // Similar structure with Russian translations
    },
};

// Common translations
const commonTranslations = {
    en: {
        bookTransfer: 'Book Transfer',
        overview: 'Overview',
        topAttractions: 'Top Attractions',
        bestTimeToVisit: 'Best Time to Visit',
        howToGetThere: 'How to Get There',
        photoGallery: 'Photo Gallery',
        transferFrom: 'Transfer from Tbilisi',
        bookNow: 'Book Now',
        perPerson: 'per vehicle',
        contactUs: 'Contact us for pricing and availability',
    },
    he: {
        bookTransfer: 'הזמן העברה',
        overview: 'סקירה כללית',
        topAttractions: 'אטרקציות מובילות',
        bestTimeToVisit: 'מתי כדאי לבקר',
        howToGetThere: 'איך להגיע',
        photoGallery: 'גלריית תמונות',
        transferFrom: 'העברה מטביליסי',
        bookNow: 'הזמן עכשיו',
        perPerson: 'לרכב',
        contactUs: 'צור קשר למחיר וזמינות',
    },
    ru: {
        bookTransfer: 'Заказать трансфер',
        overview: 'Обзор',
        topAttractions: 'Главные достопримечательности',
        bestTimeToVisit: 'Лучшее время для посещения',
        howToGetThere: 'Как добраться',
        photoGallery: 'Фотогалерея',
        transferFrom: 'Трансфер из Тбилиси',
        bookNow: 'Забронировать',
        perPerson: 'за автомобиль',
        contactUs: 'Свяжитесь с нами для уточнения цены',
    },
};

// Animation variants
const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const stagger = {
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

// Hero Section with Parallax
function HeroSection({ destination, isRTL }: { destination: Destination; isRTL: boolean }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative h-[70vh] md:h-screen w-full overflow-hidden">
            {/* Parallax Background */}
            <motion.div className="absolute inset-0" style={{ y }}>
                <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-stone-800" />
                <img
                    src={destination.heroImage}
                    alt={destination.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
                style={{ opacity }}
                dir={isRTL ? 'rtl' : 'ltr'}
            >
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight"
                >
                    {destination.name}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-xl sm:text-2xl md:text-3xl text-amber-400 mb-8 italic font-light"
                >
                    {destination.tagline}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                >
                    <Link
                        href="/transfers"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg font-medium rounded-full shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300"
                    >
                        {commonTranslations.en.bookTransfer}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}

// Content Section
function ContentSection({ destination, common, isRTL }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="relative py-16 md:py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2" dir={isRTL ? 'rtl' : 'ltr'}>
                        <motion.div
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            variants={stagger}
                            className="space-y-12"
                        >
                            {/* Overview */}
                            <motion.div variants={fadeUp}>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
                                    {common.overview}
                                </h2>
                                <div className="space-y-4">
                                    {destination.overview.map((paragraph: string, index: number) => (
                                        <p key={index} className="text-white/70 text-base md:text-lg leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Top Attractions */}
                            <motion.div variants={fadeUp}>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
                                    {common.topAttractions}
                                </h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {destination.attractions.map((attraction: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3 text-white/70">
                                            <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>{attraction}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Best Time to Visit */}
                            <motion.div variants={fadeUp}>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
                                    {common.bestTimeToVisit}
                                </h2>
                                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                                    {destination.bestTime}
                                </p>
                            </motion.div>

                            {/* How to Get There */}
                            <motion.div variants={fadeUp}>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
                                    {common.howToGetThere}
                                </h2>
                                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                                    {destination.howToGetThere}
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Sidebar - Transfer Info */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="sticky top-24"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            <div className="bg-gradient-to-br from-stone-900 to-black border border-amber-400/20 rounded-2xl p-8 shadow-2xl">
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {common.transferFrom}
                                </h3>
                                {destination.transferPrice > 0 ? (
                                    <>
                                        <div className="mb-6">
                                            <div className="text-5xl font-bold text-amber-400 mb-2">
                                                €{destination.transferPrice}
                                            </div>
                                            <div className="text-white/50 text-sm">
                                                {common.perPerson}
                                            </div>
                                        </div>
                                        <Link
                                            href="/transfers"
                                            className="block w-full text-center px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-full shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300"
                                        >
                                            {common.bookNow}
                                        </Link>
                                    </>
                                ) : (
                                    <p className="text-white/70 mb-6">
                                        {common.contactUs}
                                    </p>
                                )}
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <a
                                        href="https://wa.me/995514048822"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 text-green-400 hover:text-green-300 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        <span className="font-medium">WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Photo Gallery
function PhotoGallery({ destination, common, isRTL }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="relative py-16 md:py-24 bg-stone-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-3"
                >
                    <span className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
                    {common.photoGallery}
                </motion.h2>

                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={stagger}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {destination.gallery.map((image: string, index: number) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            className="relative aspect-[4/3] overflow-hidden rounded-xl group cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-stone-800" />
                            <img
                                src={image}
                                alt={`${destination.name} ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// Main Page Component
export default function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
    const [lang, setLang] = useState<'en' | 'he' | 'ru'>('en');
    const isRTL = lang === 'he';

    // Unwrap params Promise
    const { slug } = React.use(params);

    // Load language preference
    useEffect(() => {
        const saved = localStorage.getItem('visitGeorgia_lang');
        if (saved && (saved === 'en' || saved === 'he' || saved === 'ru')) {
            setLang(saved);
        }
    }, []);

    useEffect(() => {
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }, [isRTL]);

    const destination = destinationsData[lang][slug];
    const common = commonTranslations[lang];

    if (!destination) {
        return <div>Destination not found</div>;
    }

    return (
        <main className="bg-black min-h-screen">
            {/* Navigation */}
            <Navigation lang={lang} setLang={setLang} />

            {/* Hero Section */}
            <HeroSection destination={destination} isRTL={isRTL} />

            {/* Content Section */}
            <ContentSection destination={destination} common={common} isRTL={isRTL} />

            {/* Photo Gallery */}
            <PhotoGallery destination={destination} common={common} isRTL={isRTL} />

            {/* Footer */}
            <Footer lang={lang} />

            {/* Floating Components */}
            <FloatingWhatsApp />
            <BackToTop />
        </main>
    );
}


