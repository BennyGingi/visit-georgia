'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import BackToTop from '@/components/BackToTop'

// ============================================
// TYPES
// ============================================
interface Tour {
  id: string
  name: string
  nameHe: string
  nameRu: string
  duration: string
  price: number
  image: string
  description: string
  descriptionHe: string
  descriptionRu: string
  highlights: string[]
  highlightsHe: string[]
  highlightsRu: string[]
  included: string[]
  includedHe: string[]
  includedRu: string[]
  itinerary: Array<{
    day: number
    title: string
    titleHe: string
    titleRu: string
    activities: string[]
    activitiesHe: string[]
    activitiesRu: string[]
  }>
  difficulty: 'easy' | 'moderate' | 'challenging'
  groupSize: string
  bestSeason: string
}

// ============================================
// TOUR DATA
// ============================================
const tours: Tour[] = [
  {
    id: 'highlights-of-georgia',
    name: 'Highlights of Georgia',
    nameHe: 'מיטב גאורגיה',
    nameRu: 'Лучшее Грузии',
    duration: '7 Days / 6 Nights',
    price: 850,
    image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=2000&q=80',
    description: 'Experience the best of Georgia - from ancient monasteries to wine regions, mountain peaks to Black Sea coast.',
    descriptionHe: 'חוו את מיטב גאורגיה - ממנזרים עתיקים לאזורי יין, מפסגות הרים לחוף הים השחור.',
    descriptionRu: 'Испытайте лучшее в Грузии - от древних монастырей до винных регионов, от горных вершин до побережья Черного моря.',
    highlights: ['Tbilisi Old Town', 'Kazbegi Mountains', 'Kakheti Wine Region', 'Batumi Black Sea', 'UNESCO Sites'],
    highlightsHe: ['העיר העתיקה טביליסי', 'הרי קזבגי', 'אזור היין קאחטי', 'הים השחור באטומי', 'אתרי UNESCO'],
    highlightsRu: ['Старый город Тбилиси', 'Казбегские горы', 'Винный регион Кахетия', 'Черное море Батуми', 'Объекты ЮНЕСКО'],
    included: ['Hotel accommodation', 'Daily breakfast', 'Private transfers', 'English-speaking guide', 'All entrance fees'],
    includedHe: ['לינה במלון', 'ארוחת בוקר יומית', 'הסעות פרטיות', 'מדריך דובר אנגלית', 'כל דמי כניסה'],
    includedRu: ['Проживание в отеле', 'Ежедневный завтрак', 'Частные трансферы', 'Англоговорящий гид', 'Все входные билеты'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Tbilisi',
        titleHe: 'הגעה לטביליסי',
        titleRu: 'Прибытие в Тбилиси',
        activities: ['Airport pickup', 'Hotel check-in', 'Evening walk in Old Town', 'Welcome dinner'],
        activitiesHe: ['איסוף משדה התעופה', 'צ\'ק-אין למלון', 'טיול ערב בעיר העתיקה', 'ארוחת ערב פתיחה'],
        activitiesRu: ['Трансфер из аэропорта', 'Заселение в отель', 'Вечерняя прогулка по Старому городу', 'Приветственный ужин'],
      },
      {
        day: 2,
        title: 'Tbilisi City Tour',
        titleHe: 'סיור בטביליסי',
        titleRu: 'Тур по Тбилиси',
        activities: ['Narikala Fortress', 'Sulfur baths district', 'Georgian National Museum', 'Rustaveli Avenue', 'Cable car ride'],
        activitiesHe: ['מבצר נריקלה', 'רובע מרחצאות הגופרית', 'המוזיאון הלאומי', 'שדרת רוסתוולי', 'רכבל'],
        activitiesRu: ['Крепость Нарикала', 'Серные бани', 'Национальный музей', 'Проспект Руставели', 'Канатная дорога'],
      },
      {
        day: 3,
        title: 'Kazbegi Mountains',
        titleHe: 'הרי קזבגי',
        titleRu: 'Казбегские горы',
        activities: ['Ananuri Fortress', 'Gudauri viewpoint', 'Gergeti Trinity Church', 'Mountain hiking', 'Return to Tbilisi'],
        activitiesHe: ['מבצר אנאנורי', 'נקודת תצפית גודאורי', 'כנסיית השילוש גרגטי', 'טיול הרים', 'חזרה לטביליסי'],
        activitiesRu: ['Крепость Ананури', 'Гудаурская смотровая', 'Церковь Гергети', 'Горный поход', 'Возвращение в Тбилиси'],
      },
      {
        day: 4,
        title: 'Kakheti Wine Region',
        titleHe: 'אזור היין קאחטי',
        titleRu: 'Винный регион Кахетия',
        activities: ['Sighnaghi town', 'Wine tasting at 3 wineries', 'Traditional qvevri winemaking', 'Bodbe Monastery', 'Georgian feast'],
        activitiesHe: ['עיר סיגנאגי', 'טעימות יין ב-3 יקבים', 'ייצור יין מסורתי בקווברי', 'מנזר בודבה', 'סעודה גאורגית'],
        activitiesRu: ['Город Сигнахи', 'Дегустация в 3 винодельнях', 'Традиционное виноделие квеври', 'Монастырь Бодбе', 'Грузинское застолье'],
      },
      {
        day: 5,
        title: 'Mtskheta & Uplistsikhe',
        titleHe: 'מצחתה ואופליסציחה',
        titleRu: 'Мцхета и Уплисцихе',
        activities: ['Jvari Monastery (UNESCO)', 'Svetitskhoveli Cathedral (UNESCO)', 'Uplistsikhe cave city', 'Gori Stalin Museum'],
        activitiesHe: ['מנזר ג\'וארי (UNESCO)', 'קתדרלת סווטיצחובלי (UNESCO)', 'עיר המערות אופליסציכה', 'מוזיאון סטלין בגורי'],
        activitiesRu: ['Монастырь Джвари (ЮНЕСКО)', 'Собор Светицховели (ЮНЕСКО)', 'Пещерный город Уплисцихе', 'Музей Сталина в Гори'],
      },
      {
        day: 6,
        title: 'Batumi Black Sea',
        titleHe: 'באטומי הים השחור',
        titleRu: 'Батуми Черное море',
        activities: ['Drive to Batumi', 'Batumi Boulevard', 'Ali and Nino statue', 'Botanical Garden', 'Beach time', 'Modern architecture tour'],
        activitiesHe: ['נסיעה לבאטומי', 'שדרת באטומי', 'פסל עלי ונינו', 'גן בוטני', 'זמן חוף', 'סיור ארכיטקטורה מודרנית'],
        activitiesRu: ['Поездка в Батуми', 'Батумский бульвар', 'Статуя Али и Нино', 'Ботанический сад', 'Время на пляже', 'Современная архитектура'],
      },
      {
        day: 7,
        title: 'Departure',
        titleHe: 'יציאה',
        titleRu: 'Отъезд',
        activities: ['Free morning', 'Last-minute shopping', 'Airport transfer', 'Farewell'],
        activitiesHe: ['בוקר חופשי', 'קניות רגע אחרון', 'הסעה לשדה התעופה', 'פרידה'],
        activitiesRu: ['Свободное утро', 'Последние покупки', 'Трансфер в аэропорт', 'Прощание'],
      },
    ],
    difficulty: 'easy',
    groupSize: '2-12 people',
    bestSeason: 'May-October',
  },
  {
    id: 'mountain-adventure',
    name: 'Caucasus Mountain Adventure',
    nameHe: 'הרפתקת הרי הקווקז',
    nameRu: 'Приключение в горах Кавказа',
    duration: '5 Days / 4 Nights',
    price: 650,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80',
    description: 'Hike through pristine valleys, visit remote mountain villages, and experience authentic Georgian highland culture.',
    descriptionHe: 'טיילו בעמקים בתוליים, בקרו בכפרי הרים נידחים, וחוו תרבות גאורגית אותנטית של הרמה.',
    descriptionRu: 'Походы по нетронутым долинам, посещение отдаленных горных деревень и знакомство с аутентичной грузинской высокогорной культурой.',
    highlights: ['Kazbegi hiking trails', 'Sno Valley', 'Juta alpine village', 'Chaukhi mountains', 'Traditional supra feast'],
    highlightsHe: ['שבילי קזבגי', 'עמק סנו', 'כפר האלפים ג\'וטה', 'הרי צ\'אוחי', 'סעודת סופרה מסורתית'],
    highlightsRu: ['Казбегские тропы', 'Долина Сно', 'Альпийская деревня Джута', 'Горы Чаухи', 'Традиционная супра'],
    included: ['Mountain lodge accommodation', 'All meals', '4x4 transfers', 'Professional guide', 'Hiking equipment', 'Insurance'],
    includedHe: ['לינה בבקתת הרים', 'כל הארוחות', 'הסעות ג\'יפים', 'מדריך מקצועי', 'ציוד טיולים', 'ביטוח'],
    includedRu: ['Горная база', 'Все питание', 'Джип-трансферы', 'Профессиональный гид', 'Походное снаряжение', 'Страховка'],
    itinerary: [
      {
        day: 1,
        title: 'Tbilisi to Kazbegi',
        titleHe: 'מטביליסי לקזבגי',
        titleRu: 'Тбилиси в Казбеги',
        activities: ['Morning departure', 'Ananuri stop', 'Gudauri panorama', 'Arrive Kazbegi', 'Easy acclimatization hike'],
        activitiesHe: ['יציאה בבוקר', 'עצירה באנאנורי', 'פנורמת גודאורי', 'הגעה לקזבגי', 'טיול אקלום קל'],
        activitiesRu: ['Утренний выезд', 'Остановка в Ананури', 'Панорама Гудаури', 'Прибытие в Казбеги', 'Акклиматизация'],
      },
      {
        day: 2,
        title: 'Gergeti & Sno Valley',
        titleHe: 'גרגטי ועמק סנו',
        titleRu: 'Гергети и долина Сно',
        activities: ['Hike to Gergeti Trinity', 'Kazbek mountain views', 'Sno Valley exploration', 'Village homestay experience'],
        activitiesHe: ['טיול לטריניטי גרגטי', 'נוף הר קזבק', 'חקירת עמק סנו', 'חוויה אצל משפחה בכפר'],
        activitiesRu: ['Поход к Гергети', 'Виды Казбека', 'Долина Сно', 'Сельский гостевой дом'],
      },
      {
        day: 3,
        title: 'Juta Alpine Village',
        titleHe: 'כפר האלפים ג\'וטה',
        titleRu: 'Альпийская деревня Джута',
        activities: ['4x4 ride to Juta', 'Chaukhi mountain hike', 'Alpine meadows', 'Horse riding option', 'Traditional supra dinner'],
        activitiesHe: ['נסיעת ג\'יפ לג\'וטה', 'טיול בהרי צ\'אוחי', 'כרי דשא אלפיניים', 'אופציית רכיבת סוסים', 'ארוחת סופרה מסורתית'],
        activitiesRu: ['Джип в Джуту', 'Поход к Чаухи', 'Альпийские луга', 'Конная прогулка', 'Традиционная супра'],
      },
      {
        day: 4,
        title: 'Truso Valley',
        titleHe: 'עמק טרוסו',
        titleRu: 'Долина Трусо',
        activities: ['Dariali Gorge', 'Truso Valley travertines', 'Abandoned villages', 'Mineral springs', 'Photography session'],
        activitiesHe: ['גאון דריאלי', 'טרוורטינים בעמק טרוסו', 'כפרים נטושים', 'מעיינות מינרליים', 'צילום'],
        activitiesRu: ['Ущелье Дарьяли', 'Травертины Трусо', 'Покинутые села', 'Минеральные источники', 'Фотосессия'],
      },
      {
        day: 5,
        title: 'Return to Tbilisi',
        titleHe: 'חזרה לטביליסי',
        titleRu: 'Возвращение в Тбилиси',
        activities: ['Morning mountain views', 'Scenic drive back', 'Stop at Zhinvali reservoir', 'Tbilisi drop-off'],
        activitiesHe: ['נוף הרים בבוקר', 'נסיעה נופית חזרה', 'עצירה במאגר ז\'ינוולי', 'הורדה בטביליסי'],
        activitiesRu: ['Утренние виды', 'Живописная дорога', 'Остановка у Жинвали', 'Возвращение в Тбилиси'],
      },
    ],
    difficulty: 'moderate',
    groupSize: '4-8 people',
    bestSeason: 'June-September',
  },
  {
    id: 'wine-gastronomy',
    name: 'Wine & Gastronomy Tour',
    nameHe: 'סיור יין וגסטרונומיה',
    nameRu: 'Винный и гастрономический тур',
    duration: '4 Days / 3 Nights',
    price: 550,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2000&q=80',
    description: 'Discover Georgia\'s 8,000-year winemaking tradition. Visit family-run wineries, learn qvevri methods, and feast on Georgian cuisine.',
    descriptionHe: 'גלו את מסורת ייצור היין בת 8,000 שנה של גאורגיה. בקרו ביקבים משפחתיים, למדו שיטות קווברי, והשתתפו בסעודה גאורגית.',
    descriptionRu: '8000-летняя винодельческая традиция Грузии. Семейные винодельни, квеври, грузинская кухня.',
    highlights: ['8+ wine tastings', 'Qvevri winemaking', 'Master cooking class', 'Cheese & churchkhela making', 'Chacha distillery'],
    highlightsHe: ['8+ טעימות יין', 'ייצור יין בקווברי', 'שיעור בישול', 'ייצור גבינה וצ\'ורצ\'חלה', 'מזקקת צ\'אצ\'ה'],
    highlightsRu: ['8+ дегустаций', 'Виноделие квеври', 'Мастер-класс готовки', 'Сыр и чурчхела', 'Винокурня чачи'],
    included: ['Boutique hotel stay', 'All meals with wine pairings', 'Private wine tours', 'Cooking class', 'Recipe book', 'Wine purchases assistance'],
    includedHe: ['מלון בוטיק', 'כל הארוחות עם יינות מותאמים', 'סיורי יין פרטיים', 'שיעור בישול', 'ספר מתכונים', 'סיוע ברכישת יינות'],
    includedRu: ['Бутик-отель', 'Все блюда с винами', 'Частные винные туры', 'Кулинарный класс', 'Книга рецептов', 'Помощь с покупками'],
    itinerary: [
      {
        day: 1,
        title: 'Tbilisi & Mtskheta',
        titleHe: 'טביליסי ומצחתה',
        titleRu: 'Тбилиси и Мцхета',
        activities: ['Mtskheta wine tasting', 'Chateau Mukhrani', 'Georgian wine history lesson', 'Traditional dinner with tamada'],
        activitiesHe: ['טעימת יין במצחתה', 'שאטו מוחראני', 'שיעור היסטוריית יין', 'ארוחת ערב עם טמאדה'],
        activitiesRu: ['Дегустация в Мцхете', 'Шато Мухрани', 'История вина', 'Ужин с тамадой'],
      },
      {
        day: 2,
        title: 'Kakheti Wine Heart',
        titleHe: 'לב היין קאחטי',
        titleRu: 'Сердце вина Кахетия',
        activities: ['Sighnaghi walking tour', '3 family wineries', 'Qvevri cellar visits', 'Amber wine tasting', 'Sunset at vineyard'],
        activitiesHe: ['סיור רגלי בסיגנאגי', '3 יקבים משפחתיים', 'מרתפי קווברי', 'טעימת יין ענבר', 'שקיעה בכרם'],
        activitiesRu: ['Пешеходный Сигнахи', '3 семейные винодельни', 'Квеври погреба', 'Янтарное вино', 'Закат на винограднике'],
      },
      {
        day: 3,
        title: 'Gastronomy Deep Dive',
        titleHe: 'צלילה עמוקה לגסטרונומיה',
        titleRu: 'Погружение в гастрономию',
        activities: ['Morning market visit', 'Cooking class: khinkali, khachapuri, sauces', 'Churchkhela making', 'Cheese tasting', 'Chacha distillery tour'],
        activitiesHe: ['ביקור שוק בוקר', 'שיעור בישול: חינקלי, חצ\'פורי, רטבים', 'ייצור צ\'ורצ\'חלה', 'טעימת גבינות', 'סיור מזקקת צ\'אצ\'ה'],
        activitiesRu: ['Утренний рынок', 'Готовка: хинкали, хачапури, соусы', 'Чурчхела', 'Дегустация сыров', 'Винокурня'],
      },
      {
        day: 4,
        title: 'Natural Wine & Farewell',
        titleHe: 'יין טבעי ופרידה',
        titleRu: 'Натуральное вино и прощание',
        activities: ['Natural wine producer visit', 'Biodynamic vineyard tour', 'Final tasting & lunch', 'Wine purchase arrangements', 'Return to Tbilisi'],
        activitiesHe: ['ביקור ביצרן יין טבעי', 'סיור כרם ביודינמי', 'טעימה וארוחת צהריים סופית', 'סידור רכישת יינות', 'חזרה לטביליסי'],
        activitiesRu: ['Натуральное вино', 'Биодинамический виноградник', 'Финальная дегустация', 'Заказ вин', 'Возврат в Тбилиси'],
      },
    ],
    difficulty: 'easy',
    groupSize: '2-10 people',
    bestSeason: 'April-November',
  },
]

// ============================================
// CONTENT TRANSLATIONS
// ============================================
const content = {
  en: {
    hero: {
      pre: 'Guided Tours',
      title: 'Unforgettable Journeys',
      sub: 'Multi-day adventures through Georgia\'s most stunning landscapes and rich culture',
    },
    toursTitle: 'Our Tours',
    toursSubtitle: 'Carefully crafted experiences for every traveler',
    days: 'days',
    from: 'From',
    person: '/ person',
    viewDetails: 'View Details',
    bookTour: 'Book This Tour',
    tourDetails: 'Tour Details',
    highlights: 'Highlights',
    whatsIncluded: 'What\'s Included',
    itinerary: 'Itinerary',
    day: 'Day',
    difficulty: 'Difficulty',
    groupSize: 'Group Size',
    bestSeason: 'Best Season',
    difficultyLevels: {
      easy: 'Easy',
      moderate: 'Moderate',
      challenging: 'Challenging',
    },
    whyBookWithUs: 'Why Book With Us?',
    reasons: [
      { icon: '👨‍🏫', title: 'Expert Guides', desc: 'Local guides with deep knowledge and passion' },
      { icon: '🏆', title: 'Small Groups', desc: 'Intimate experiences, never crowded buses' },
      { icon: '🍷', title: 'Authentic', desc: 'Real Georgian culture, not tourist traps' },
      { icon: '🚐', title: 'Premium Transport', desc: 'Comfortable vehicles, professional drivers' },
      { icon: '🏨', title: 'Quality Stays', desc: 'Handpicked hotels & guesthouses' },
      { icon: '💯', title: 'Flexible', desc: 'Customizable itineraries for your group' },
    ],
    ctaTitle: 'Ready for an adventure?',
    ctaSub: 'Contact us to customize your perfect Georgian experience',
    ctaBtn: 'Plan My Tour',
    backHome: '← Back to Visit Georgia',
  },
  he: {
    hero: {
      pre: 'טיולים מאורגנים',
      title: 'מסעות בלתי נשכחים',
      sub: 'הרפתקאות רב-יומיות דרך הנופים המדהימים והתרבות העשירה של גאורגיה',
    },
    toursTitle: 'הטיולים שלנו',
    toursSubtitle: 'חוויות מעוצבות בקפידה לכל נוסע',
    days: 'ימים',
    from: 'מ',
    person: '/ אדם',
    viewDetails: 'צפה בפרטים',
    bookTour: 'הזמן טיול זה',
    tourDetails: 'פרטי הטיול',
    highlights: 'דגשים',
    whatsIncluded: 'מה כלול',
    itinerary: 'מסלול',
    day: 'יום',
    difficulty: 'רמת קושי',
    groupSize: 'גודל קבוצה',
    bestSeason: 'עונה מומלצת',
    difficultyLevels: {
      easy: 'קל',
      moderate: 'בינוני',
      challenging: 'מאתגר',
    },
    whyBookWithUs: 'למה להזמין אצלנו?',
    reasons: [
      { icon: '👨‍🏫', title: 'מדריכים מומחים', desc: 'מדריכים מקומיים עם ידע עמוק ותשוקה' },
      { icon: '🏆', title: 'קבוצות קטנות', desc: 'חוויות אינטימיות, לעולם לא אוטובוסים צפופים' },
      { icon: '🍷', title: 'אותנטי', desc: 'תרבות גאורגית אמיתית, לא מלכודות תיירים' },
      { icon: '🚐', title: 'תחבורה פרימיום', desc: 'רכבים נוחים, נהגים מקצועיים' },
      { icon: '🏨', title: 'לינה איכותית', desc: 'מלונות ובתי הארחה נבחרים' },
      { icon: '💯', title: 'גמיש', desc: 'מסלולים הניתנים להתאמה אישית' },
    ],
    ctaTitle: 'מוכנים להרפתקה?',
    ctaSub: 'צרו קשר להתאמה אישית של החוויה הגאורגית המושלמת שלכם',
    ctaBtn: 'תכנן את הטיול שלי',
    backHome: '→ חזרה ל-Visit Georgia',
  },
  ru: {
    hero: {
      pre: 'Организованные туры',
      title: 'Незабываемые путешествия',
      sub: 'Многодневные приключения по самым красивым пейзажам и богатой культуре Грузии',
    },
    toursTitle: 'Наши туры',
    toursSubtitle: 'Тщательно продуманные впечатления для каждого путешественника',
    days: 'дней',
    from: 'От',
    person: '/ чел',
    viewDetails: 'Подробнее',
    bookTour: 'Забронировать тур',
    tourDetails: 'Детали тура',
    highlights: 'Основные моменты',
    whatsIncluded: 'Что включено',
    itinerary: 'Маршрут',
    day: 'День',
    difficulty: 'Сложность',
    groupSize: 'Размер группы',
    bestSeason: 'Лучший сезон',
    difficultyLevels: {
      easy: 'Легкий',
      moderate: 'Средний',
      challenging: 'Сложный',
    },
    whyBookWithUs: 'Почему мы?',
    reasons: [
      { icon: '👨‍🏫', title: 'Опытные гиды', desc: 'Местные гиды с глубокими знаниями' },
      { icon: '🏆', title: 'Малые группы', desc: 'Интимные впечатления, никогда не автобусы' },
      { icon: '🍷', title: 'Аутентично', desc: 'Настоящая грузинская культура' },
      { icon: '🚐', title: 'Премиум транспорт', desc: 'Комфортные автомобили, профессиональные водители' },
      { icon: '🏨', title: 'Качественное жилье', desc: 'Отобранные отели и гостевые дома' },
      { icon: '💯', title: 'Гибкость', desc: 'Индивидуальные маршруты' },
    ],
    ctaTitle: 'Готовы к приключению?',
    ctaSub: 'Свяжитесь с нами, чтобы создать идеальное грузинское путешествие',
    ctaBtn: 'Спланировать тур',
    backHome: '← Назад на Visit Georgia',
  },
}

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
}

// ============================================
// COMPONENTS
// ============================================

// Hero Section
function ToursHero({ t, isRTL }: any) {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-ivory dark:bg-black transition-colors duration-500" />
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
          alt="Georgia Tours"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/50 to-ivory dark:from-black/70 dark:via-black/50 dark:to-black transition-colors duration-500" />
      </motion.div>

      <div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block bg-terracotta dark:bg-gold-400 text-white dark:text-black text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 mb-6 transition-colors duration-300"
        >
          {t.hero.pre}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-espresso dark:text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 transition-colors duration-300"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-espresso/60 dark:text-white/60 text-lg md:text-xl max-w-2xl transition-colors duration-300"
        >
          {t.hero.sub}
        </motion.p>
      </div>
    </section>
  )
}

// Tour Card
function TourCard({ tour, t, isRTL, onSelect }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const tourName = isRTL ? (lang === 'he' ? tour.nameHe : tour.nameRu) : tour.name
  const tourDesc = isRTL ? (lang === 'he' ? tour.descriptionHe : tour.descriptionRu) : tour.description

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className="group bg-cream dark:bg-white/5 rounded-2xl overflow-hidden border border-espresso/10 dark:border-white/10 hover:border-terracotta/50 dark:hover:border-gold-400/50 transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(tour)}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={tour.image}
          alt={tourName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block bg-terracotta dark:bg-gold-400 text-white dark:text-black text-xs font-bold px-3 py-1 rounded-full">
            {tour.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-espresso dark:text-white text-2xl font-bold mb-3 group-hover:text-terracotta dark:group-hover:text-gold-400 transition-colors">
          {tourName}
        </h3>
        <p className="text-espresso/60 dark:text-white/60 text-sm mb-4 line-clamp-2 transition-colors duration-300">
          {tourDesc}
        </p>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-espresso/10 dark:border-white/10">
          <div>
            <p className="text-espresso/40 dark:text-white/40 text-xs transition-colors duration-300">{t.from}</p>
            <p className="text-terracotta dark:text-gold-400 text-2xl font-bold transition-colors duration-300">
              €{tour.price}
              <span className="text-sm font-normal"> {t.person}</span>
            </p>
          </div>
          <motion.button
            whileHover={{ x: isRTL ? -5 : 5 }}
            className="text-terracotta dark:text-gold-400 font-medium text-sm flex items-center gap-2 transition-colors"
          >
            {t.viewDetails}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Tour Detail Modal
function TourDetailModal({ tour, t, isRTL, onClose, lang }: any) {
  if (!tour) return null

  const tourName = lang === 'he' ? tour.nameHe : lang === 'ru' ? tour.nameRu : tour.name
  const tourDesc = lang === 'he' ? tour.descriptionHe : lang === 'ru' ? tour.descriptionRu : tour.description
  const highlights = lang === 'he' ? tour.highlightsHe : lang === 'ru' ? tour.highlightsRu : tour.highlights
  const included = lang === 'he' ? tour.includedHe : lang === 'ru' ? tour.includedRu : tour.included

  const generateWhatsAppLink = () => {
    const message = `Hi! I'm interested in the "${tour.name}" tour (${tour.duration}, €${tour.price}/person). Can you provide more information and availability?`
    return `https://wa.me/995514048822?text=${encodeURIComponent(message)}`
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-cream dark:bg-cinema-dark rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header Image */}
        <div className="relative h-64 md:h-80">
          <img
            src={tour.image}
            alt={tourName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-black/90 rounded-full flex items-center justify-center text-espresso dark:text-white hover:bg-white dark:hover:bg-black transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="font-display text-white text-3xl md:text-4xl font-bold mb-2">
              {tourName}
            </h2>
            <p className="text-white/80 text-lg">{tour.duration}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Description */}
          <p className="text-espresso/70 dark:text-white/70 text-lg leading-relaxed">
            {tourDesc}
          </p>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-espresso/5 dark:bg-white/5 rounded-xl p-4">
              <p className="text-espresso/50 dark:text-white/50 text-sm mb-1">{t.difficulty}</p>
              <p className="text-espresso dark:text-white font-medium">
                {t.difficultyLevels[tour.difficulty]}
              </p>
            </div>
            <div className="bg-espresso/5 dark:bg-white/5 rounded-xl p-4">
              <p className="text-espresso/50 dark:text-white/50 text-sm mb-1">{t.groupSize}</p>
              <p className="text-espresso dark:text-white font-medium">{tour.groupSize}</p>
            </div>
            <div className="bg-espresso/5 dark:bg-white/5 rounded-xl p-4">
              <p className="text-espresso/50 dark:text-white/50 text-sm mb-1">{t.bestSeason}</p>
              <p className="text-espresso dark:text-white font-medium">{tour.bestSeason}</p>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-espresso dark:text-white text-2xl font-bold mb-4">{t.highlights}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {highlights.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-terracotta dark:text-gold-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-espresso/70 dark:text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included */}
          <div>
            <h3 className="text-espresso dark:text-white text-2xl font-bold mb-4">{t.whatsIncluded}</h3>
            <div className="space-y-2">
              {included.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-espresso/70 dark:text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <h3 className="text-espresso dark:text-white text-2xl font-bold mb-6">{t.itinerary}</h3>
            <div className="space-y-4">
              {tour.itinerary.map((day: any, i: number) => {
                const dayTitle = lang === 'he' ? day.titleHe : lang === 'ru' ? day.titleRu : day.title
                const activities = lang === 'he' ? day.activitiesHe : lang === 'ru' ? day.activitiesRu : day.activities

                return (
                  <div key={i} className="border-l-4 border-terracotta/30 dark:border-gold-400/30 pl-6 pb-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-terracotta dark:text-gold-400 font-bold text-lg">
                        {t.day} {day.day}
                      </span>
                      <h4 className="text-espresso dark:text-white font-semibold text-lg">
                        {dayTitle}
                      </h4>
                    </div>
                    <ul className="space-y-1.5">
                      {activities.map((activity: string, j: number) => (
                        <li key={j} className="text-espresso/60 dark:text-white/60 text-sm flex items-start gap-2">
                          <span className="text-terracotta/50 dark:text-gold-400/50 mt-1.5">•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Price & Book */}
          <div className="bg-terracotta/10 dark:bg-gold-400/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-espresso/60 dark:text-white/60 text-sm mb-1">{t.from}</p>
              <p className="text-terracotta dark:text-gold-400 text-4xl font-bold">
                €{tour.price}
                <span className="text-lg font-normal"> {t.person}</span>
              </p>
            </div>
            <motion.a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-8 py-4 bg-green-500 text-white text-lg font-semibold rounded-full shadow-xl hover:bg-green-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.bookTour}
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Why Book Section
function WhyBookSection({ t, isRTL }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-ivory to-cream dark:from-cinema-black dark:to-cinema-dark transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="font-display text-espresso dark:text-white text-4xl md:text-5xl font-bold text-center mb-16 transition-colors duration-300"
        >
          {t.whyBookWithUs}
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {t.reasons.map((reason: any, i: number) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-cream dark:bg-white/5 rounded-xl p-6 border border-espresso/10 dark:border-white/10 hover:border-terracotta/50 dark:hover:border-gold-400/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-espresso dark:text-white text-xl font-bold mb-2 transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-espresso/60 dark:text-white/60 transition-colors duration-300">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection({ t, isRTL }: any) {
  return (
    <section className="py-24 bg-cream dark:bg-black transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-espresso dark:text-white text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300"
        >
          {t.ctaTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-espresso/60 dark:text-white/60 text-xl mb-10 transition-colors duration-300"
        >
          {t.ctaSub}
        </motion.p>
        <motion.a
          href="https://wa.me/995514048822"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-10 py-5 bg-terracotta dark:bg-gold-400 text-white dark:text-black text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {t.ctaBtn}
        </motion.a>
      </div>
    </section>
  )
}

// ============================================
// MAIN PAGE
// ============================================
export default function ToursPage() {
  const [lang, setLang] = useState<'en' | 'he' | 'ru'>('en')
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const t = content[lang]
  const isRTL = lang === 'he'

  // Load saved language
  useEffect(() => {
    const saved = localStorage.getItem('visitGeorgia_lang')
    if (saved && (saved === 'en' || saved === 'he' || saved === 'ru')) {
      setLang(saved)
    }
  }, [])

  // Save language
  useEffect(() => {
    localStorage.setItem('visitGeorgia_lang', lang)
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [lang, isRTL])

  return (
    <main className="bg-ivory dark:bg-cinema-black min-h-screen transition-colors duration-500">
      <Navigation lang={lang} setLang={setLang} />

      <ToursHero t={t} isRTL={isRTL} />

      {/* Tours Grid */}
      <section className="py-20 bg-ivory dark:bg-cinema-black transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6" dir={isRTL ? 'rtl' : 'ltr'}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-espresso dark:text-white text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300">
              {t.toursTitle}
            </h2>
            <p className="text-espresso/60 dark:text-white/60 text-lg transition-colors duration-300">
              {t.toursSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                t={t}
                isRTL={isRTL}
                onSelect={setSelectedTour}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>

      <WhyBookSection t={t} isRTL={isRTL} />
      <CTASection t={t} isRTL={isRTL} />

      <Footer lang={lang} />
      <FloatingWhatsApp />
      <BackToTop />

      {/* Tour Detail Modal */}
      {selectedTour && (
        <TourDetailModal
          tour={selectedTour}
          t={t}
          isRTL={isRTL}
          onClose={() => setSelectedTour(null)}
          lang={lang}
        />
      )}
    </main>
  )
}
