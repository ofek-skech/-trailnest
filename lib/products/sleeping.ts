import type { Product } from '../types';

export const sleepingProducts: Product[] = [
  // ─── EXISTING PRODUCT (prod-004) ──────────────────────────────────────────
  {
    id: 'prod-004',
    name: 'ערסל ENO DoubleNest 70D Nylon + רצועות עץ',
    slug: 'arasal-shtat',
    category: 'קמפינג ושינה',
    categorySlug: 'sleeping',
    price: 369,
    originalPrice: 449,
    rating: 4.8,
    reviewCount: 312,
    badge: 'new',
    inStock: true,
    sku: 'CAMP-SLP-001',
    brand: 'ENO (Eagles Nest Outfitters)',
    sourceUrl: 'https://eaglesnestoutfittersinc.com/products/doublenest-hammock',
    deliveryTime: '5–10 ימי עסקים',
    image: 'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-doublenest-hammock-1229152559.jpg?v=1774456148',
    images: [
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-doublenest-hammock-1229152559.jpg?v=1774456148',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-coastal-cocktail-doublenest-hammock-1229152566.jpg?v=1774456176',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-doublenest-hammock-1229152556.jpg?v=1774456088',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-doublenest-hammock-1229152557.jpg?v=1774456115',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-doublenest-hammock-1229152560.jpg?v=1774456028',
    ],
    videoUrl: null,
    shortDescription:
      'ENO DoubleNest — ניילון 70D, עמיד ל-181 ק"ג. 539 גרם. גליל, כרמל, גולן, נגב — כשיש עצים.',
    description: `לפעמים הציוד הכי פשוט הוא הכי טוב.

ערסל, שני עצים, עשר דקות — ואחרי שמונה שעות של נסיעה ועלייה, יש לכם מקום לנוח שאף כסא קמפינג לא יכול להחליף. גליל, כרמל, גולן — ובשביל האמיצים, גם עצי שיטה ואקציה בנגב הצפוני.

ה-ENO DoubleNest עשוי ניילון 70D — קל, עמיד לשמש ולמים. עמיד ל-181 קילוגרם, שוקל 539 גרם בלבד ללא רצועות. הרצועות Atlas (כלולות) ברוחב 120 ס"מ עם נקודות עיגון מרובות — מתאים לכל עוביות עץ ולא פוגע בקליפה.

הגדרה מלאה: 5 דקות בפעם הראשונה. 90 שניות כשאתם כבר יודעים.

ערסל DoubleNest — מספיק רחב לשני אנשים בנוחות, מספיק קל לכל טיול.`,
    benefits: [
      'ניילון 70D — קל, עמיד, לא נקרע',
      'עמיד ל-181 ק"ג — מחזיק שניים בנוחות',
      'רצועות Atlas 120 ס"מ כלולות — לא פוגעות בעץ',
      '539 גרם — קל יותר מרוב בקבוקי המים',
      'הגדרה מלאה תוך 5 דקות, ללא קשרים מיוחדים',
      'מגיע עם שק נשיאה קומפקטי — נכנס לכיס קטן',
    ],
    specs: [
      { label: 'בד',               value: 'ניילון 70D Taffeta' },
      { label: 'עומס מקסימלי',    value: '181 ק"ג (400 פאונד)' },
      { label: 'אורך ערסל',       value: '284 ס"מ' },
      { label: 'רוחב ערסל',       value: '188 ס"מ' },
      { label: 'אורך רצועות',     value: '120 ס"מ × 2' },
      { label: 'משקל',            value: '539 גרם (ללא רצועות)' },
      { label: 'שק נשיאה',        value: 'כלול' },
    ],
    faqs: [
      {
        question: 'צריך לדעת קשירה מיוחדת?',
        answer: 'ממש לא. הרצועות Atlas והקרבינרים מתחברים בלחיצה. הוראות מצורפות. רוב האנשים מגדירים אותו נכון בפעם הראשונה תוך 5 דקות.',
      },
      {
        question: 'עד כמה גבוה צריך לתלות?',
        answer: 'גובה תלייה מומלץ: 1.5–2 מטר מהאדמה. הערסל מתמתח כ-30 ס"מ תחת עומס, אז תלייה ב-1.8 מטר תשאיר אתכם בגובה נוח.',
      },
      {
        question: 'עובד בנגב?',
        answer: 'כן, אם יש עצים. עצי שיטה ואקציה בנגב הצפוני ובאזור מכתש רמון מתאימים. בנגב הפתוח ללא עצים — הערסל לא יעבוד ללא עמודים.',
      },
      {
        question: 'מה עם גשם?',
        answer: 'ניילון 70D מחזיק גשם קל. לשינה בגשם כבד מומלץ להוסיף כיסוי טרפ (נמכר בנפרד). לשכיבה והרפיה ביום — שאלה לא רלוונטית.',
      },
      {
        question: 'שניים יכולים לשכב יחד?',
        answer: 'כן — DoubleNest (רחב 188 ס"מ) מתוכנן לשני אנשים. עומס מקסימלי 181 ק"ג בסך הכל.',
      },
    ],
    seoTitle: 'ערסל ENO DoubleNest 70D | 181 ק"ג | רצועות כלולות | CampIL',
    seoDescription: 'ערסל ENO DoubleNest 70D, עמיד ל-181 ק"ג, 539 גרם. מגיע עם רצועות Atlas 120 ס"מ. גליל, כרמל, גולן. CampIL ישראל.',
    tags: ['ערסל קמפינג', 'ערסל שטח', 'ENO', 'קמפינג', 'אוברלנדינג'],
    relatedSlugs: ['eno-singlenest-hammock', 'eno-junglenest-hammock', 'eno-guardian-sl-bug-net', 'eno-profly-sil-tarp'],
  },

  // ─── NEW PRODUCT 1: ENO SingleNest Hammock ────────────────────────────────
  {
    id: 'prod-1101',
    name: 'ערסל ENO SingleNest — ניילון 70D לאדם אחד',
    slug: 'eno-singlenest-hammock',
    category: 'קמפינג ושינה',
    categorySlug: 'sleeping',
    price: 289,
    originalPrice: 349,
    rating: 4.8,
    reviewCount: 527,
    badge: 'bestseller',
    inStock: true,
    sku: 'ENO-SN-001',
    brand: 'ENO (Eagles Nest Outfitters)',
    sourceUrl: 'https://eaglesnestoutfittersinc.com/collections/hammocks/products/singlenest-hammock',
    deliveryTime: '5–10 ימי עסקים',
    image: 'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-mint-sage-singlenest-hammock-1215121360.jpg?v=1767738908',
    images: [
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-mint-sage-singlenest-hammock-1215121360.jpg?v=1767738908',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-singlenest-hammock-1215121359.jpg?v=1767738936',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eno-singlenest-hammock-atlas-straps-bundle-1215121330.jpg?v=1767734044',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=lf5SHUKk26k',
    shortDescription:
      'ENO SingleNest — ערסל ניילון 70D לאדם אחד, 397 גרם, עמיד ל-136 ק"ג. ה-SingleNest האייקוני שהפך את ה-ENO למותג האהוב של מטיילים בכל העולם.',
    description: `הסיפור של ENO התחיל ב-1999 מחצר המגורים, עם חוטים, ניילון ורצון לישון בין שני עצים בלי קשרים מסובכים. ה-SingleNest הוא עדיין אותו הרעיון — פשוט יותר, ועם 25 שנות שיפורים.

ניילון 70D Taffeta — אותו בד שמשמש ב-DoubleNest, רק בגרסה צרה יותר לאדם אחד. 267 ס"מ אורך, 147 ס"מ רוחב, 397 גרם. נכנס לשק קטן יותר מרוב ארנקים.

הקרבינרים המשולבים מתחברים ישירות לרצועות Atlas (נמכרות בנפרד) — ללא קשרים, ללא בלגן. כשאתם יכולים להתמקד בנוף ולא בציוד, זה מנצח.

SingleNest: ה-entry point המושלם לעולם הערסלים. אחרי לילה אחד תבינו למה יש אנשים שמוכרים את האוהל שלהם.`,
    benefits: [
      'ניילון 70D Taffeta — בד קלאסי, עמיד, ניתן לכביסה',
      'עמיד ל-136 ק"ג — מספיק לאדם אחד ועוד קצת',
      '397 גרם — אחד הערסלים הקלים ביחס מחיר-משקל',
      'קרבינרים כלולים — רק צריך רצועות',
      'מגיע בעשרות צבעים — קל למצוא את הצבע שלכם',
      'הגדרה תוך 3 דקות עם רצועות Atlas',
    ],
    specs: [
      { label: 'בד',            value: 'ניילון 70D Taffeta' },
      { label: 'עומס מקסימלי', value: '136 ק"ג (300 פאונד)' },
      { label: 'אורך ערסל',    value: '267 ס"מ' },
      { label: 'רוחב ערסל',    value: '147 ס"מ' },
      { label: 'משקל',         value: '397 גרם (ללא רצועות)' },
      { label: 'שק נשיאה',     value: 'כלול' },
      { label: 'קרבינרים',     value: '2 כלולים' },
    ],
    faqs: [
      {
        question: 'מה ההבדל בין SingleNest ל-DoubleNest?',
        answer: 'SingleNest (147 ס"מ) מתוכנן לאדם אחד, DoubleNest (188 ס"מ) מתוכנן לשניים. שניהם מאותו בד ואיכות. אם אתם לרוב לבד — Single. אם אתם זוג — Double.',
      },
      {
        question: 'הרצועות כלולות?',
        answer: 'לא — SingleNest מגיע עם קרבינרים בלבד. רצועות Atlas (120 ס"מ) נמכרות בנפרד. ניתן לרכוש Bundle עם רצועות.',
      },
      {
        question: 'כמה רחוק צריכים להיות העצים?',
        answer: 'מרחק אידיאלי: 3–4.5 מטר. הרצועות Atlas מוסיפות גמישות — ניתן לעבוד עם עצים במרחקים שונים.',
      },
      {
        question: 'עמיד לחום ישראלי?',
        answer: 'בהחלט. ניילון 70D עמיד לשמש, לחות ולמלח. המטיילים בסיני, גולן ועמק הירדן מדווחים על ביצועים מצוינים גם ב-40+ מעלות.',
      },
    ],
    seoTitle: 'ערסל ENO SingleNest 70D | 397 גרם | 136 ק"ג | CampIL',
    seoDescription: 'ערסל ENO SingleNest ניילון 70D לאדם אחד. 397 גרם, עמיד ל-136 ק"ג. קרבינרים כלולים. גליל, כרמל, גולן — CampIL ישראל.',
    tags: ['ערסל יחיד', 'ENO SingleNest', 'ערסל קל', 'ערסל קמפינג', 'ENO'],
    relatedSlugs: ['arasal-shtat', 'eno-junglenest-hammock', 'eno-sub6-ultralight-hammock', 'eno-travelnest-combo'],
  },

  // ─── NEW PRODUCT 2: ENO JungleNest Hammock ────────────────────────────────
  {
    id: 'prod-1102',
    name: 'ערסל ENO JungleNest — ערסל עם רשת מובנית נגד יתושים',
    slug: 'eno-junglenest-hammock',
    category: 'קמפינג ושינה',
    categorySlug: 'sleeping',
    price: 549,
    originalPrice: 679,
    rating: 4.7,
    reviewCount: 184,
    badge: 'new',
    inStock: true,
    sku: 'ENO-JN-001',
    brand: 'ENO (Eagles Nest Outfitters)',
    sourceUrl: 'https://eaglesnestoutfittersinc.com/collections/hammock-bug-nets/products/junglenest-hammock',
    deliveryTime: '5–10 ימי עסקים',
    image: 'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-charcoal-junglenest-hammock-1215121379.jpg?v=1767734133',
    images: [
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-charcoal-junglenest-hammock-1215121379.jpg?v=1767734133',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-junglenest-hammock-1215121378.jpg?v=1767734133',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-junglenest-hammock-1215121336.jpg?v=1767734133',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-junglenest-hammock-1215121372.jpg?v=1767734133',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-junglenest-hammock-1215121373.jpg?v=1767734133',
    ],
    videoUrl: null,
    shortDescription:
      'ENO JungleNest — ערסל לינה עם רשת יתושים 360° מובנית, ניילון 70D, קרבינרים כלולים. שינה בלי עקיצות מהגליל ועד הכינרת.',
    description: `קמפינג בגליל, עמק הירדן, חוף הכינרת — ובכולם יש יתושים. ה-ENO JungleNest נבנה בדיוק בשביל זה: ערסל לינה מלא עם רשת יתושים SkyWeave™ 360° מובנית, ריק עיגון כפולה, ורוכסן כניסה צידי.

הרשת יושבת על קשת פנימית שמפרידה אותה מהגוף שלכם — כלומר אין מגע עם הרשת בזמן שינה. הריק הפנימי (ניילון 70D) עמיד ל-136 ק"ג ומספיק נוח לשינה מלאה.

הגדרה: מקרבינר לקרבינר, 5 דקות. הרשת נפרשת אוטומטית. כניסה ויציאה דרך הרוכסן הצידי — ללא מגע עם הרשת.

לשינה בשטח עם יתושים — JungleNest הוא הפתרון שחוסך ספריי וחרדות. בחופי ישראל, גליל תחתון, ועמק בית שאן — ייתכן שתשנו טוב יותר מאשר בבית.`,
    benefits: [
      'רשת יתושים SkyWeave™ 360° מובנית — כיסוי מלא',
      'קשת פנימית — הרשת לא נוגעת בגוף בזמן שינה',
      'ניילון 70D — עמיד ל-136 ק"ג, מספיק לשינה מלאה',
      'כניסה/יציאה דרך רוכסן צידי — נוח ומהיר',
      'קרבינרים כלולים — רק צריך רצועות',
      'נכנס לשק נשיאה קומפקטי — אותו פורמט כמו SingleNest',
    ],
    specs: [
      { label: 'בד',              value: 'ניילון 70D Taffeta' },
      { label: 'רשת יתושים',     value: 'SkyWeave™ Lite Mesh 360°' },
      { label: 'עומס מקסימלי',   value: '136 ק"ג (300 פאונד)' },
      { label: 'ריד-לין',        value: 'קשת פנימית מובנית' },
      { label: 'כניסה',          value: 'רוכסן צידי' },
      { label: 'קרבינרים',       value: '2 כלולים' },
      { label: 'שק נשיאה',       value: 'כלול' },
    ],
    faqs: [
      {
        question: 'הרשת עמידה ליתושים בישראל?',
        answer: 'כן. רשת SkyWeave™ Lite Mesh בעלת רשת צפופה שחוסמת יתושים, זבובים ויתר מטרדי שטח ישראליים. לא מחליף דרמינה — אבל ישן אחריו בלי עקיצות.',
      },
      {
        question: 'אפשר להשתמש ב-JungleNest בלי לפרוס את הרשת?',
        answer: 'כן — הרשת מתקפלת לצד. שימושי ביום כשאין יתושים ורוצים אוויר פתוח. בלילה — פורסים.',
      },
      {
        question: 'כמה זמן לוקח להגדיר?',
        answer: 'עם רצועות Atlas: כ-7 דקות בפעם הראשונה. הרשת נפרשת אוטומטית כשהערסל תלוי. אין הגדרה נפרדת.',
      },
      {
        question: 'מה ההבדל בין JungleNest ל-Guardian SL Bug Net?',
        answer: 'JungleNest הוא ערסל שלם עם רשת מובנית. Guardian SL הוא רשת חיצונית שמתלבשת על ערסל קיים. JungleNest — מוצר אחד, Guardian SL — תוספת לערסל שכבר יש לכם.',
      },
    ],
    seoTitle: 'ערסל ENO JungleNest | רשת יתושים מובנית | לינה בשטח | CampIL',
    seoDescription: 'ENO JungleNest — ערסל לינה עם רשת יתושים 360° מובנית. ניילון 70D, עמיד ל-136 ק"ג. לגליל, כינרת, עמק הירדן. CampIL ישראל.',
    tags: ['ערסל יתושים', 'ערסל לינה', 'ENO JungleNest', 'ערסל שטח', 'קמפינג קיץ'],
    relatedSlugs: ['arasal-shtat', 'eno-singlenest-hammock', 'eno-guardian-sl-bug-net', 'eno-profly-sil-tarp'],
  },

  // ─── NEW PRODUCT 3: ENO Sub6 Ultralight Hammock ───────────────────────────
  {
    id: 'prod-1103',
    name: 'ערסל ENO Sub6 Ultralight — מתחת ל-170 גרם',
    slug: 'eno-sub6-ultralight-hammock',
    category: 'קמפינג ושינה',
    categorySlug: 'sleeping',
    price: 349,
    originalPrice: 429,
    rating: 4.9,
    reviewCount: 96,
    badge: 'new',
    inStock: true,
    sku: 'ENO-SUB6-001',
    brand: 'ENO (Eagles Nest Outfitters)',
    sourceUrl: 'https://eaglesnestoutfittersinc.com/collections/hammocks/products/sub6-ultralight-hammock',
    deliveryTime: '5–10 ימי עסקים',
    image: 'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-sub6-ultralight-hammock-1227882540.jpg?v=1767738908',
    images: [
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-sub6-ultralight-hammock-1227882540.jpg?v=1767738908',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-sub6-ultralight-hammock-1227882539.jpg?v=1767738908',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfittersinc-hammock-sub6-ultralight-hammock-1227882531.jpg?v=1767738908',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-sub6-ultralight-hammock-1227882532.jpg?v=1767738908',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-sub6-ultralight-hammock-1227882533.jpg?v=1767738908',
    ],
    videoUrl: null,
    shortDescription:
      'ENO Sub6 Ultralight — ערסל 30D Ripstop שוקל 164 גרם בלבד, עמיד ל-136 ק"ג. מחרוזת Silverlite™ ואלומיניום 7075. לטיולי אולטרה-לייט ברחבי ישראל.',
    description: `כשכל גרם חשוב — Sub6 הוא הבחירה. 164 גרם. מתחת לשש אונקיות. קטן יותר מכוס קפה.

30D Ripstop Nylon — בד דקיק שמרגיש כמו לא כלום בתרמיל, אבל עמיד ל-136 ק"ג ולמאות ימי קמפינג. מחרוזת Silverlite™ ואבזמי אלומיניום 7075 — כל חלק נבחר לפי משקלו.

מידות: 274 ס"מ אורך, 122 ס"מ רוחב. גודל קטן יותר מ-SingleNest, אבל מספיק לשינה נוחה לרוב האנשים. Packed size: 14 × 10 × 7.5 ס"מ — נכנס לכיס הצד של כל תרמיל.

למטיילים שסופרים גרמים בשביל הר מירון, שביל ישראל, או כל יעד שדורש ציוד קל ככל האפשר — Sub6 הוא הערסל שלא תרגישו שנושאים אותו.`,
    benefits: [
      '164 גרם — מהערסלים הקלים ביותר בשוק',
      '30D Ripstop Nylon — דק, חזק, עמיד',
      'עמיד ל-136 ק"ג עם בד פחות ממחצית עובי 70D',
      'מחרוזת Silverlite™ ואלומיניום 7075 — חיסכון בכל נקודה',
      'Packed size: 14 × 10 × 7.5 ס"מ — כיס חגורה',
      'מושלם לשביל ישראל, הר חרמון, שמורות טבע',
    ],
    specs: [
      { label: 'בד',            value: '30D Ripstop Nylon' },
      { label: 'מחרוזת',       value: 'Silverlite™ Cord' },
      { label: 'חומרת אבזמים', value: 'אלומיניום 7075 Anodized' },
      { label: 'עומס מקסימלי', value: '136 ק"ג (300 פאונד)' },
      { label: 'אורך',         value: '274 ס"מ (9 רגל)' },
      { label: 'רוחב',         value: '122 ס"מ (4 רגל)' },
      { label: 'משקל',         value: '164 גרם (5.8 אונקיות)' },
      { label: 'Packed size',  value: '14 × 10 × 7.5 ס"מ' },
    ],
    faqs: [
      {
        question: 'האם 30D עמיד מספיק לשימוש קבוע?',
        answer: 'כן — 30D Ripstop תוכנן לשימוש חוזר. ENO מדגישים שהוא עמיד לאותו עומס כמו 70D. הוא דק יותר, לא חלש יותר.',
      },
      {
        question: 'מה ההבדל בין Sub6 ל-SuperSub?',
        answer: 'Sub6 הוא ה-ultralight: 164 גרם, 30D Ripstop, ללא ריפוד. SuperSub הוא ה"ultra-lite בלי להוותר על נוחות" — קצת יותר כבד אבל עם בד נוח יותר.',
      },
      {
        question: 'רצועות כלולות?',
        answer: 'לא. Sub6 מגיע עם קרבינרים בלבד. לאולטרה-לייט אמיתי — שלבו עם רצועות Helios Straps של ENO (הקלות ביותר בטווח).',
      },
      {
        question: 'מתאים לשינה מלאה?',
        answer: 'לרוב האנשים — כן. ל-180 ס"מ ומטה ברוחב רגיל — מושלם. לאנשים גבוהים מ-190 ס"מ — מומלץ לבדוק תחילה.',
      },
    ],
    seoTitle: 'ערסל ENO Sub6 Ultralight | 164 גרם | 30D Ripstop | CampIL',
    seoDescription: 'ENO Sub6 Ultralight — ערסל 164 גרם בלבד, 30D Ripstop, עמיד ל-136 ק"ג. לטיולי שביל ישראל ואולטרה-לייט. CampIL ישראל.',
    tags: ['ערסל אולטרה-לייט', 'ENO Sub6', 'ערסל קל', 'שביל ישראל', 'backpacking'],
    relatedSlugs: ['arasal-shtat', 'eno-singlenest-hammock', 'eno-supersub-ultralight-hammock', 'eno-guardian-sl-bug-net'],
  },

  // ─── NEW PRODUCT 4: ENO SuperSub Ultralight Hammock ──────────────────────
  {
    id: 'prod-1104',
    name: 'ערסל ENO SuperSub Ultralight — ריפסטופ נשימתי, 85 דולר',
    slug: 'eno-supersub-ultralight-hammock',
    category: 'קמפינג ושינה',
    categorySlug: 'sleeping',
    price: 419,
    originalPrice: 519,
    rating: 4.7,
    reviewCount: 143,
    inStock: true,
    sku: 'ENO-SSUB-001',
    brand: 'ENO (Eagles Nest Outfitters)',
    sourceUrl: 'https://eaglesnestoutfittersinc.com/collections/hammocks/products/supersub-ultralight-hammock',
    deliveryTime: '5–10 ימי עסקים',
    image: 'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-cactus-steel-supersub-ultralight-hammock-1229610326.jpg?v=1775134863',
    images: [
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-cactus-steel-supersub-ultralight-hammock-1229610326.jpg?v=1775134863',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-supersub-ultralight-hammock-1229610325.jpg?v=1775134863',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-supersub-ultralight-hammock-1229610317.jpg?v=1775134863',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-supersub-ultralight-hammock-1229610318.jpg?v=1775134863',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-supersub-ultralight-hammock-1229610319.jpg?v=1775134863',
    ],
    videoUrl: null,
    shortDescription:
      'ENO SuperSub Ultralight — ריפסטופ נשימתי ומהיר-יבוש, אבזמי Toggle, מחרוזת Silverlite™ ואלומיניום 7075. אולטרה-לייט עם נוחות שדומה ל-70D.',
    description: `ה-SuperSub הוא הנקודה בין Sub6 ל-SingleNest: קל כמעט כמו Sub6, אבל עם בד שמרגיש כמו DoubleNest.

Ripstop נשימתי ומהיר-יבוש — הבחירה לשטחים לחים, קמפינג בחוף, וימי קיץ ישראליים. הבד מנדף זיעה טוב יותר מ-70D ומתייבש מהר יותר אחרי גשם.

מנגנון Toggle חדשני של ENO: במקום קרבינרים מסורתיים, SuperSub משתמש ב-Toggle System — מחרוזת Silverlite™ עם אלומיניום 7075. חיבור חזק יותר, קל יותר.

נכנס לכיס כוח 14 × 10 × 8 ס"מ בערך — מושלם להעמסה על תרמיל, לרכב שטח, לטיסות. ישנו על SuperSub בנגב, בגולן, בכרמל — תמיד מגיע מכווץ ויוצא מוכן תוך 3 דקות.`,
    benefits: [
      'ריפסטופ נשימתי — מנדף זיעה, מתייבש מהר',
      'Toggle System עם Silverlite™ — חיבור קל, חזק, ייחודי',
      'אלומיניום 7075 — חומר תעשיית תעופה, קל ועמיד',
      'עמיד ל-136 ק"ג עם בד אולטרה-לייט',
      'מושלם לקיץ ישראלי החם — בד קרר יותר',
      'Packed size: כיס קטן — מתאים לכל תרמיל',
    ],
    specs: [
      { label: 'בד',             value: 'Ripstop נשימתי מהיר-יבוש' },
      { label: 'מחרוזת',        value: 'Silverlite™ Cord' },
      { label: 'חיבור',         value: 'Toggle System אלומיניום 7075' },
      { label: 'עומס מקסימלי',  value: '136 ק"ג (300 פאונד)' },
      { label: 'קרבינרים',      value: 'Toggle System (ללא קרבינרים מסורתיים)' },
      { label: 'שק נשיאה',      value: 'כלול' },
    ],
    faqs: [
      {
        question: 'SuperSub לעומת SingleNest — מה עדיף לקיץ ישראלי?',
        answer: 'SuperSub — הבד הנשימתי מתאים יותר לחום. SingleNest עם ניילון 70D מתאים לעונות ביניים. לקיץ ישראלי — SuperSub עדיף.',
      },
      {
        question: 'Toggle System — איך זה עובד?',
        answer: 'במקום קרבינר שמסתחרר, Toggle System עובד כמו כפתור: מחרוזת Silverlite עוברת דרך לולאת הסנגר ונעצרת ב-Toggle. יציב יותר, קל יותר, מהיר להגדרה.',
      },
      {
        question: 'מה הטמפרטורה המינימלית?',
        answer: 'SuperSub הוא ערסל ד קיץ. בחורף ישראלי (מתחת ל-10 מעלות) תרצו שמיכה או שק שינה בתוך הערסל. לגליל ולחרמון בחורף — הוסיפו בידוד.',
      },
    ],
    seoTitle: 'ערסל ENO SuperSub Ultralight | Ripstop נשימתי | CampIL',
    seoDescription: 'ENO SuperSub Ultralight — ריפסטופ נשימתי, Toggle System, עמיד ל-136 ק"ג. לקיץ ישראלי ואולטרה-לייט. CampIL ישראל.',
    tags: ['ערסל אולטרה-לייט', 'ENO SuperSub', 'ערסל קיץ', 'ריפסטופ', 'backpacking'],
    relatedSlugs: ['eno-sub6-ultralight-hammock', 'eno-singlenest-hammock', 'arasal-shtat', 'eno-guardian-sl-bug-net'],
  },

  // ─── NEW PRODUCT 5: ENO SuperNest SL Hammock ──────────────────────────────
  {
    id: 'prod-1105',
    name: 'ערסל ENO SuperNest SL — ערסל פרמיום עם כיס ומשכב מרופד',
    slug: 'eno-supernest-sl-hammock',
    category: 'קמפינג ושינה',
    categorySlug: 'sleeping',
    price: 1099,
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
    sku: 'ENO-SNSL-001',
    brand: 'ENO (Eagles Nest Outfitters)',
    sourceUrl: 'https://eaglesnestoutfittersinc.com/collections/hammocks/products/supernest-sl-hammock',
    deliveryTime: '5–10 ימי עסקים',
    image: 'https://eaglesnestoutfittersinc.com/cdn/shop/products/eno-supernest-sl-hammock-33226269884565.jpg?v=1638985243',
    images: [
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eno-supernest-sl-hammock-33226269884565.jpg?v=1638985243',
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eno-supernest-sl-hammock-33226645766293.jpg?v=1657571518',
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eno-supernest-sl-hammock-33238808789141.jpg?v=1657571518',
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eno-supernest-sl-hammock-33238779101333.jpg?v=1657571518',
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eno-supernest-sl-hammock-33226319134869.jpg?v=1657740003',
    ],
    videoUrl: null,
    shortDescription:
      'ENO SuperNest SL — ערסל פרמיום עם כיס אחסון מובנה, משכב כפול (Coastal Blue / Pebble Grey), ריד-לין משולב וכריות ראש. חוויית הרפיה שונה לחלוטין.',
    description: `יש ערסלים לשכיבה, ויש ערסלים שאתם ממש לא רוצים לקום מהם. SuperNest SL שייך לקטגוריה השנייה.

שני שכבות בד — External shell ו-Internal body — עם ריפוד מתכוונן ביניהם. כיס צידי לטלפון, ספר, בקבוק. ריד-לין מובנה לנוחות מושלמת ב-30° זווית שינה.

מחיר $299.95 — הוא לא לטיולי אולטרה-לייט. הוא לקמפינג שבו אתם נשארים 3-7 ימים ורוצים ערסל שמרגיש כמו הספה בבית.

בצבעים Coastal Blue ו-Pebble Grey — שניהם עמידים ל-181 ק"ג. הגדרה עם Atlas Straps (נמכרות בנפרד): 8 דקות לפעם הראשונה.`,
    benefits: [
      'שני שכבות בד עם ריפוד מתכוונן — נוחות מדרגה ראשונה',
      'כיס צידי מובנה — לטלפון, ספר, פנס',
      'ריד-לין מובנה — זווית שינה מושלמת אוטומטית',
      'עמיד ל-181 ק"ג (400 פאונד)',
      'שני צבעים: Coastal Blue ו-Pebble Grey',
      'מתאים לקמפינג ממושך — לא לטיולים קצרים',
    ],
    specs: [
      { label: 'מבנה',           value: 'Double-layer עם ריפוד' },
      { label: 'עומס מקסימלי',  value: '181 ק"ג (400 פאונד)' },
      { label: 'ריד-לין',       value: 'מובנה' },
      { label: 'כיס',           value: 'צידי, מובנה' },
      { label: 'צבעים',         value: 'Coastal Blue, Pebble Grey' },
      { label: 'מחיר מקורי',    value: '$299.95 USD' },
    ],
    faqs: [
      {
        question: 'SuperNest SL — מה ה-SL אומר?',
        answer: 'SL = Side-Loading. הכניסה היא מהצד (רוכסן צידי) ולא מלמעלה כמו ערסל רגיל. מאפשר שכיבה בזווית אחרת ושינה נוחה יותר לטווח ארוך.',
      },
      {
        question: 'כמה זמן לוקח להגדיר?',
        answer: 'עם Atlas Straps: 8-10 דקות בפעם הראשונה. הריד-לין המובנה מתכוונן עצמאית — אין צורך בוויסות נפרד.',
      },
      {
        question: 'מתאים לשינה מלאה?',
        answer: 'כן — SuperNest SL תוכנן לשינה, לא רק לשכיבה. הריד-לין המובנה מאפשר שינה ב-30° שמפחיתה לחץ על הגב לאורך זמן.',
      },
    ],
    seoTitle: 'ערסל ENO SuperNest SL | ריפוד כפול | 181 ק"ג | CampIL',
    seoDescription: 'ENO SuperNest SL — ערסל פרמיום עם ריד-לין מובנה, כיס צידי, ריפוד כפול, עמיד ל-181 ק"ג. לקמפינג ממושך. CampIL ישראל.',
    tags: ['ערסל פרמיום', 'ENO SuperNest', 'ערסל נוחות', 'ערסל לינה', 'camping luxury'],
    relatedSlugs: ['arasal-shtat', 'eno-singlenest-hammock', 'eno-junglenest-hammock', 'eno-profly-sil-tarp'],
  },

  // ─── NEW PRODUCT 6: ENO Guardian SL Bug Net ───────────────────────────────
  {
    id: 'prod-1106',
    name: 'רשת יתושים ENO Guardian SL — הגנה 360° לכל ערסל ENO',
    slug: 'eno-guardian-sl-bug-net',
    category: 'קמפינג ושינה',
    categorySlug: 'sleeping',
    price: 329,
    originalPrice: 399,
    rating: 4.7,
    reviewCount: 218,
    inStock: true,
    sku: 'ENO-GSL-001',
    brand: 'ENO (Eagles Nest Outfitters)',
    sourceUrl: 'https://eaglesnestoutfittersinc.com/collections/hammock-bug-nets/products/guardian-sl-bug-net',
    deliveryTime: '5–10 ימי עסקים',
    image: 'https://eaglesnestoutfittersinc.com/cdn/shop/products/eagles-nest-outfitters-inc-bug-nets-guardian-sl-bug-net-36824097718421.jpg?v=1677700352',
    images: [
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eagles-nest-outfitters-inc-bug-nets-guardian-sl-bug-net-36824097718421.jpg?v=1677700352',
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eagles-nest-outfitters-inc-bug-nets-guardian-sl-bug-net-36824097423509.jpg?v=1677700171',
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eagles-nest-outfittersinc-bug-nets-guardian-sl-bug-net-33360446587029.jpg?v=1677699892',
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eagles-nest-outfitters-inc-bug-nets-guardian-sl-bug-net-36824097882261.jpg?v=1677700883',
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eagles-nest-outfitters-inc-bug-nets-guardian-sl-bug-net-36824097357973.jpg?v=1677700341',
    ],
    videoUrl: null,
    shortDescription:
      'ENO Guardian SL Bug Net — רשת יתושים 360° מ-SkyWeave™ Lite Mesh ו-40D Ripstop Nylon, 255 גרם. מתלבשת על כל ערסל ENO (למעט DayLoft/SuperNest) תוך 3 דקות.',
    description: `יתושים בגליל בקיץ — עובדה. Guardian SL הוא הפתרון הקל ביותר לשינה בחוץ ללא עקיצות.

SkyWeave™ Lite Mesh ו-40D Ripstop Nylon — רשת שקופה ורחבה מספיק לאוורור, צפופה מספיק לחסום יתושים, זבובים ופרעושים. 255 גרם — כמעט אין הבדל בתרמיל.

הגדרה: הריד-לין המשולב מסתמך על הריד-לין של הערסל שלכם. Guardian SL נלבשת מעל הערסל (לא מחתיכה נפרדת) — 3 דקות הגדרה, כניסה ויציאה ברוכסן אופקי.

תואמת: DoubleNest, SingleNest, SingleNest Print, Sub6, SuperSub, SuperNest SL, JungleNest (במקום הרשת המובנית). לא מתאימה ל-DayLoft ו-SuperNest.`,
    benefits: [
      'SkyWeave™ Lite Mesh — אוורור מעולה, חסימת יתושים מלאה',
      '255 גרם — תוספת מינימלית לתרמיל',
      'רוכסן אופקי — כניסה/יציאה בלי להפריע לרשת',
      'ריד-לין משולב — תלייה על ריד-לין הערסל הקיים',
      'תואמת רוב ערסלי ENO — DoubleNest, SingleNest, Sub6, SuperSub',
      'Packed size: 14 × 11.5 × 13.5 ס"מ',
    ],
    specs: [
      { label: 'חומר רשת',      value: 'SkyWeave™ Lite Mesh' },
      { label: 'חומר קצוות',   value: '40D Ripstop Nylon' },
      { label: 'משקל',          value: '255 גרם (9 אונקיות)' },
      { label: 'ממדי מוצר',    value: '274 × 91 ס"מ (9 × 3 רגל)' },
      { label: 'Packed size',   value: '14 × 11.5 × 13.5 ס"מ' },
      { label: 'כניסה',         value: 'רוכסן אופקי' },
      { label: 'תאימות',        value: 'DoubleNest, SingleNest, Sub6, SuperSub, SuperNest SL' },
    ],
    faqs: [
      {
        question: 'Guardian SL מתאים לאיזה ערסלים?',
        answer: 'תואם: DoubleNest, SingleNest (וכל גרסאות Print), Sub6, SuperSub, SuperNest SL. לא מתאים: DayLoft, SuperNest (ה-$399). JungleNest — יש לו רשת מובנית, אין צורך ב-Guardian.',
      },
      {
        question: 'הרשת נוגעת בפנים בזמן שינה?',
        answer: 'אם הריד-לין מותח נכון — לא. הרשת מקבלת צורת חרוט מעל הגוף. יש ממרחק בין הרשת לפנים. אם הריד-לין רפוי — הרשת יכולה ליגע. חשוב לוודא מתח נכון.',
      },
      {
        question: 'כמה זמן ההגדרה?',
        answer: 'הפעם הראשונה: 5-7 דקות. לאחר מכן: 2-3 דקות. הריד-לין ב-Guardian SL מתחבר לאותם נקודות עיגון של הערסל — אין ווים נוספים.',
      },
    ],
    seoTitle: 'רשת יתושים ENO Guardian SL | 255 גרם | לערסל ENO | CampIL',
    seoDescription: 'ENO Guardian SL Bug Net — רשת יתושים 360° SkyWeave Lite Mesh, 255 גרם. תואמת DoubleNest, SingleNest, Sub6. CampIL ישראל.',
    tags: ['רשת יתושים ערסל', 'ENO Guardian SL', 'הגנת יתושים', 'ערסל קמפינג', 'כלי שינה'],
    relatedSlugs: ['arasal-shtat', 'eno-singlenest-hammock', 'eno-junglenest-hammock', 'eno-profly-sil-tarp'],
  },

  // ─── NEW PRODUCT 7: ENO ProFly Sil Rain Tarp ──────────────────────────────
  {
    id: 'prod-1107',
    name: 'טרפ גשם ENO ProFly Sil — סיליקון 30D לערסל, 510 גרם',
    slug: 'eno-profly-sil-tarp',
    category: 'קמפינג ושינה',
    categorySlug: 'sleeping',
    price: 749,
    originalPrice: 899,
    rating: 4.8,
    reviewCount: 153,
    inStock: true,
    sku: 'ENO-PFSL-001',
    brand: 'ENO (Eagles Nest Outfitters)',
    sourceUrl: 'https://eaglesnestoutfittersinc.com/collections/hammock-tarps-shades/products/profly-sil-rain-tarp',
    deliveryTime: '5–10 ימי עסקים',
    image: 'https://eaglesnestoutfittersinc.com/cdn/shop/products/eagles-nest-outfitters-inc-rain-tarps-charcoal-profly-sil-rain-tarp-34870376005781.jpg?v=1658859389',
    images: [
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eagles-nest-outfitters-inc-rain-tarps-charcoal-profly-sil-rain-tarp-34870376005781.jpg?v=1658859389',
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eagles-nest-outfitters-inc-rain-tarps-profly-sil-rain-tarp-34870375841941.jpg?v=1658859394',
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eagles-nest-outfitters-inc-rain-tarps-profly-sil-rain-tarp-34870375874709.jpg?v=1658859581',
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eagles-nest-outfitters-inc-rain-tarps-profly-sil-rain-tarp-34870380036245.jpg?v=1658859583',
      'https://eaglesnestoutfittersinc.com/cdn/shop/products/eagles-nest-outfitters-inc-rain-tarps-profly-sil-rain-tarp-34870380724373.jpg?v=1658859932',
    ],
    videoUrl: null,
    shortDescription:
      'ENO ProFly Sil Rain Tarp — ניילון 30D סיליקון + ציפוי PU 1000mm, שישה נקודות עיגון, תפרים מודבקים. 510 גרם. מגן על כל ערסל ENO מגשם ישראלי.',
    description: `ישראל בחורף: גשם בגליל, גשם בכרמל, גשם בנגב (כן, גם שם). ProFly Sil הוא הכיסוי שהופך ערסל לסיסטם לינה גשמי אמיתי.

30D Silicone Impregnated Nylon עם 1000mm PU Coating — אחד מחומרי הטרפ הטובים בשוק. לא מים, לא רוח, לא לחות. תפרים מודבקים (Taped seams) — לא יודלפו אפילו בגשם ישראלי כבד.

שישה נקודות עיגון עם LineLoc tensioners — מתח אחיד, מהיר, ללא קשרים. ציר אלומיניום מובנה להגנה על הריד-לין. ארבעה יתדות כלולים.

מידות: 320 × 193 ס"מ — כיסוי מלא לכל ערסל ENO, כולל DoubleNest. Packed size: 20.5 × 10 × 10 ס"מ. 510 גרם — כולל יתדות וחבלים.`,
    benefits: [
      '30D Silicone + 1000mm PU — הגנת גשם מקסימלית',
      'תפרים מודבקים — אין דליפות, אפילו בגשם כבד',
      '6 נקודות עיגון עם LineLoc — מתח מהיר, ללא קשרים',
      '4 יתדות אלומיניום כלולים',
      'כבל ריד-לין אלומיניום מובנה',
      '510 גרם — קל יחסית לגודל הכיסוי',
    ],
    specs: [
      { label: 'חומר',          value: '30D Silicone Impregnated Nylon + 1000mm PU' },
      { label: 'ממדים',         value: '320 × 193 ס"מ (10.5 × 6.3 רגל)' },
      { label: 'Packed size',   value: '20.5 × 10 × 10 ס"מ' },
      { label: 'משקל',          value: '510 גרם (18 אונקיות)' },
      { label: 'נקודות עיגון', value: '6' },
      { label: 'תפרים',        value: 'מודבקים (Taped seams)' },
      { label: 'יתדות',        value: '4 יתדות אלומיניום כלולים' },
    ],
    faqs: [
      {
        question: 'ProFly Sil מגן מגשם ישראלי כבד?',
        answer: '1000mm PU + סיליקון = הגנה מלאה. גשם ישראלי כבד בגליל (עד 100mm/שעה בשיא) — ProFly Sil עומד בו. הדבקת תפרים מונעת דליפות בנקודות התפר.',
      },
      {
        question: 'מתאים לאיזה ערסלים?',
        answer: 'לכל ערסלי ENO. תואם גם לשימוש עצמאי כטרפ ביבשה ללא ערסל — 6 נקודות עיגון מאפשרות תצורות שונות.',
      },
      {
        question: 'כמה חבלי עיגון נצטרך מחוץ לסט?',
        answer: 'ProFly Sil כולל LineLoc tensioners וחבלי ridgeline. לעיגון לאדמה — הוסיפו 4 יתדות + גיי-לינס קצרים. היתדות כלולים. גיי-לינס — לא כלולים.',
      },
    ],
    seoTitle: 'טרפ גשם ENO ProFly Sil | 30D סיליקון | לערסל | CampIL',
    seoDescription: 'ENO ProFly Sil Rain Tarp — ניילון 30D סיליקון + PU 1000mm, תפרים מודבקים, 510 גרם. מגן על ערסל ENO בגשם. CampIL ישראל.',
    tags: ['טרפ ערסל', 'ENO ProFly', 'כיסוי גשם', 'ציוד שינה שטח', 'קמפינג גשם'],
    relatedSlugs: ['arasal-shtat', 'eno-singlenest-hammock', 'eno-guardian-sl-bug-net', 'eno-junglenest-hammock'],
  },

  // ─── NEW PRODUCT 8: ENO TravelNest Hammock + Straps Combo ─────────────────
  {
    id: 'prod-1108',
    name: 'ערסל ENO TravelNest + רצועות Atlas — קיט שלם למתחילים',
    slug: 'eno-travelnest-combo',
    category: 'קמפינג ושינה',
    categorySlug: 'sleeping',
    price: 319,
    originalPrice: 389,
    rating: 4.9,
    reviewCount: 74,
    badge: 'sale',
    inStock: true,
    sku: 'ENO-TNSA-001',
    brand: 'ENO (Eagles Nest Outfitters)',
    sourceUrl: 'https://eaglesnestoutfittersinc.com/collections/hammocks/products/travelnest-hammock-straps-combo',
    deliveryTime: '5–10 ימי עסקים',
    image: 'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-canyon-travelnest-hammock-straps-combo-1172772503.jpg?v=1749659454',
    images: [
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-canyon-travelnest-hammock-straps-combo-1172772503.jpg?v=1749659454',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-travelnest-hammock-straps-combo-1172772502.jpg?v=1749659451',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-travelnest-hammock-straps-combo-1172772494.jpg?v=1749659327',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-travelnest-hammock-straps-combo-1172772495.jpg?v=1749659331',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-travelnest-hammock-straps-combo-1172772493.jpg?v=1749659324',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=plhw1CuM4ro',
    shortDescription:
      'ENO TravelNest Hammock עם רצועות Atlas Straps בקיט אחד — כל מה שצריך לתלות ולשבת. ניילון 70D, עמיד ל-181 ק"ג. מתנה מושלמת למטיילים חדשים.',
    description: `אחת השאלות הנפוצות ביותר שאנו מקבלים: "קניתי ערסל — אבל צריך עוד משהו?" עם ה-TravelNest Combo — לא.

Combo מכיל: TravelNest Hammock (ניילון 70D, 181 ק"ג, 470 גרם) + Atlas Straps (120 ס"מ, 13 נקודות עיגון). כל מה שצריך כדי לתלות ולשכב תוך 5 דקות — בקופסה אחת.

TravelNest הוא אח קרוב של DoubleNest — ניילון 70D אותו, אותה יכולת עומס, מידות זהות. ההבדל: TravelNest הוא ה-entry-point product של ENO — קצת יותר פשוט, קצת יותר נגיש, אותה איכות בד.

Atlas Straps עם 13 לולאות עיגון — ניתן להגיע לכל עוביות עץ בין 5 ס"מ ל-18 ס"מ. לא פוגעות בקליפת העץ. המושלם לגנים לאומיים ושמורות טבע.`,
    benefits: [
      'קיט שלם: ערסל + רצועות בקופסה אחת',
      'ניילון 70D — אותו בד כמו DoubleNest',
      'עמיד ל-181 ק"ג — לשני אנשים',
      'Atlas Straps 13 נקודות — כל עוביות עץ',
      'לא פוגע בקליפת העץ — מתאים לגנים לאומיים',
      'הגדרה מלאה בפחות מ-5 דקות — ללא קשרים',
    ],
    specs: [
      { label: 'ערסל בד',        value: 'ניילון 70D Taffeta' },
      { label: 'עומס מקסימלי',  value: '181 ק"ג (400 פאונד)' },
      { label: 'אורך ערסל',     value: '284 ס"מ (בקירוב, כמו DoubleNest)' },
      { label: 'רצועות',        value: 'Atlas Straps 120 ס"מ × 2' },
      { label: 'נקודות עיגון',  value: '13 לולאות לכל רצועה' },
      { label: 'קרבינרים',      value: '2 כלולים' },
      { label: 'שק נשיאה',      value: 'כלול' },
    ],
    faqs: [
      {
        question: 'מה ההבדל בין TravelNest ל-DoubleNest?',
        answer: 'מינימלי. שניהם ניילון 70D, אותו עומס 181 ק"ג. TravelNest הוא ה-bundle entry product של ENO — עם Atlas Straps כלולות, מיועד למטיילים חדשים. DoubleNest נמכר עם הרצועות ב-bundle נפרד.',
      },
      {
        question: 'הרצועות Atlas פוגעות בעצים?',
        answer: 'לא — Atlas Straps ברוחב 2.5 ס"מ מפיצות את העומס על פני שטח גדול. הן עומדות בתקנות ה-Leave No Trace ומאושרות ברוב הגנים הלאומיים בישראל.',
      },
      {
        question: 'זה מתנה טובה?',
        answer: 'כן — זו אחת המתנות הנפוצות שאנו מוכרים. קיט מלא, אריזה נחמדה, הכל ב-place. מתאים לבר/בת מצווה, יום הולדת, סיום טיול.',
      },
    ],
    seoTitle: 'ENO TravelNest + Atlas Straps קיט | ערסל שלם | CampIL',
    seoDescription: 'ENO TravelNest Hammock + Atlas Straps Combo — קיט שלם, ניילון 70D, עמיד ל-181 ק"ג, 13 נקודות עיגון. CampIL ישראל.',
    tags: ['ערסל קיט', 'ENO TravelNest', 'ערסל + רצועות', 'מתנה מטייל', 'ערסל מתחיל'],
    relatedSlugs: ['arasal-shtat', 'eno-singlenest-hammock', 'eno-guardian-sl-bug-net', 'eno-profly-sil-tarp'],
  },

  // ─── NEW PRODUCT 9: ENO DoubleNest Print Hammock ──────────────────────────
  {
    id: 'prod-1109',
    name: 'ערסל ENO DoubleNest Print — ניילון 70D בדוגמאות צבעוניות',
    slug: 'eno-doublenest-print-hammock',
    category: 'קמפינג ושינה',
    categorySlug: 'sleeping',
    price: 369,
    originalPrice: 449,
    rating: 4.8,
    reviewCount: 203,
    badge: 'sale',
    inStock: true,
    sku: 'ENO-DNP-001',
    brand: 'ENO (Eagles Nest Outfitters)',
    sourceUrl: 'https://eaglesnestoutfittersinc.com/collections/hammocks/products/doublenest-hammock-print',
    deliveryTime: '5–10 ימי עסקים',
    image: 'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-tie-dye-shibori-fig-doublenest-hammock-print-1215121350.jpg?v=1767739115',
    images: [
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-tie-dye-shibori-fig-doublenest-hammock-print-1215121350.jpg?v=1767739115',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-doublenest-hammock-print-1215121349.jpg?v=1767739089',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-doublenest-hammock-print-1215121344.jpg?v=1767739028',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfittersinc-hammock-doublenest-hammock-print-1215121342.jpg?v=1767739056',
      'https://eaglesnestoutfittersinc.com/cdn/shop/files/eagles-nest-outfitters-inc-hammock-doublenest-hammock-print-1215121343.jpg?v=1767738995',
    ],
    videoUrl: null,
    shortDescription:
      'ENO DoubleNest Print — אותו ערסל DoubleNest 70D האייקוני, עכשיו בדוגמאות Tie-Dye ו-Shibori. 539 גרם, עמיד ל-181 ק"ג. כשאיכות פוגשת עיצוב.',
    description: `אם ה-DoubleNest הרגיל הוא הנוקיה 3310 של הערסלים — DoubleNest Print הוא אותו מכשיר, עם גוף ססגוני.

אותו ניילון 70D Taffeta, אותו עמידות ל-181 ק"ג, אותם 539 גרם. ההבדל היחיד הוא הדוגמה: Tie-Dye Shibori בצבע Fig — דוגמה שנעשית פופולרית בשנים האחרונות בקרב מטיילים שרוצים ציוד שנראה טוב גם בתמונה.

רצועות Atlas (נמכרות בנפרד) מתחברות לאותם קרבינרים כמו בכל DoubleNest. LokaLoka תואם, גן לאומי תואם, חוף ים תואם.

DoubleNest Print — כל הסיבות לאהוב DoubleNest, עם תוספת: הוא נראה יפה תלוי בין העצים.`,
    benefits: [
      'אותו ניילון 70D Taffeta כמו DoubleNest הקלאסי',
      'עמיד ל-181 ק"ג — לשני אנשים',
      '539 גרם — כבד כמו DoubleNest הרגיל',
      'דוגמאות Tie-Dye ו-Shibori — בולט בין העצים',
      'קרבינרים כלולים — תואם לכל רצועות ENO',
      'שק נשיאה כלול — אריזה ושאיבה תוך שניות',
    ],
    specs: [
      { label: 'בד',            value: 'ניילון 70D Taffeta' },
      { label: 'עומס מקסימלי', value: '181 ק"ג (400 פאונד)' },
      { label: 'אורך',          value: '284 ס"מ' },
      { label: 'רוחב',          value: '188 ס"מ' },
      { label: 'משקל',          value: '539 גרם (ללא רצועות)' },
      { label: 'דוגמה',         value: 'Tie-Dye Shibori Fig (ועוד דוגמאות)' },
      { label: 'קרבינרים',     value: '2 כלולים' },
      { label: 'שק נשיאה',     value: 'כלול' },
    ],
    faqs: [
      {
        question: 'הדוגמה פוגעת בעמידות הבד?',
        answer: 'לא — ENO משתמש בצביעה ישירה לסיב (fiber-reactive dye) שלא פוגעת בחוזק הניילון. הצבע לא מתקלף ולא נמחק. אחרי 100 שימושים — הצבע זהה.',
      },
      {
        question: 'הדוגמה זמינה בצבעים שונים?',
        answer: 'DoubleNest Print מגיע במספר דוגמאות ל פי עונה. Tie-Dye Shibori Fig, ועוד דוגמאות. הצבע הספציפי תלוי בזמינות המלאי.',
      },
      {
        question: 'DoubleNest Print לעומת DoubleNest — מה לבחור?',
        answer: 'אם הצבע לא משנה לכם — DoubleNest הרגיל. אם אתם רוצים ציוד עם אישיות — Print. ביצועים זהים לחלוטין.',
      },
    ],
    seoTitle: 'ערסל ENO DoubleNest Print | Tie-Dye | 181 ק"ג | CampIL',
    seoDescription: 'ENO DoubleNest Print Hammock — ניילון 70D, עמיד ל-181 ק"ג, 539 גרם, דוגמאות Tie-Dye ו-Shibori. רצועות Atlas בנפרד. CampIL ישראל.',
    tags: ['ערסל צבעוני', 'ENO DoubleNest Print', 'ערסל מעוצב', 'ערסל 70D', 'ערסל זוגי'],
    relatedSlugs: ['arasal-shtat', 'eno-singlenest-hammock', 'eno-travelnest-combo', 'eno-guardian-sl-bug-net'],
  },
];
