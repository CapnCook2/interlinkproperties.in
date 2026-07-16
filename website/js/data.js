// ============================================================
// Interlink Properties — EDITABLE CONTENT
// This file holds the property listings and all translated text.
// Edit here; no need to touch index.html or main.js.
// ============================================================

// ---------- Listings ----------
// SAMPLE INVENTORY: replace these 20 entries with vague versions of real
// current listings before relying on them. Keep them non-identifiable on
// purpose: general area only, size and price as ranges, no plot numbers or
// exact roads. The page shows a random 4 on each load.
const LISTINGS = [
  { t: "plot",  size: "250 sq yd",   area: "Sector 15 area",        price: "₹2.7 - 3.0 Cr",  hook_en: "Corner plot, park facing",            hook_hi: "कॉर्नर प्लॉट, पार्क के सामने" },
  { t: "plot",  size: "300 sq yd",   area: "Sector 16 area",        price: "₹3.2 - 3.6 Cr",  hook_en: "Wide road, east facing",              hook_hi: "चौड़ी सड़क, पूर्वमुखी" },
  { t: "plot",  size: "160 sq yd",   area: "Sector 21 area",        price: "₹1.4 - 1.6 Cr",  hook_en: "Near market and school",              hook_hi: "मार्केट और स्कूल के पास" },
  { t: "plot",  size: "500 sq yd",   area: "Sector 17 area",        price: "₹5.0 - 5.6 Cr",  hook_en: "Prime block, clear title",            hook_hi: "प्राइम ब्लॉक, साफ़ टाइटल" },
  { t: "plot",  size: "200 sq yd",   area: "Greater Faridabad",     price: "₹95 L - 1.1 Cr", hook_en: "Developing sector, good appreciation", hook_hi: "विकसित होता सेक्टर, अच्छी ग्रोथ" },
  { t: "kothi", size: "250 sq yd",   area: "Sector 15A area",       price: "₹4.2 - 4.8 Cr",  hook_en: "Well maintained, double storey",      hook_hi: "अच्छी हालत, डबल स्टोरी" },
  { t: "kothi", size: "350 sq yd",   area: "Sector 14 area",        price: "₹6.0 - 6.8 Cr",  hook_en: "Corner kothi, wide frontage",         hook_hi: "कॉर्नर कोठी, चौड़ा फ्रंट" },
  { t: "kothi", size: "160 sq yd",   area: "Sector 29 area",        price: "₹2.1 - 2.4 Cr",  hook_en: "Ready to move, near park",            hook_hi: "रेडी टू मूव, पार्क के पास" },
  { t: "floor", size: "3 BHK",       area: "Sector 15 area",        price: "₹1.1 - 1.3 Cr",  hook_en: "First floor, car parking",            hook_hi: "पहली मंज़िल, कार पार्किंग" },
  { t: "floor", size: "3 BHK",       area: "Sector 16 area",        price: "₹1.2 - 1.4 Cr",  hook_en: "New construction, lift",              hook_hi: "नया निर्माण, लिफ्ट" },
  { t: "floor", size: "2 BHK",       area: "Sector 21 area",        price: "₹70 - 85 L",     hook_en: "Gated street, sunny floor",           hook_hi: "गेटेड गली, हवादार फ्लोर" },
  { t: "flat",  size: "3 BHK",       area: "Greater Faridabad",     price: "₹90 L - 1.1 Cr", hook_en: "Society with club and pool",          hook_hi: "क्लब और पूल वाली सोसाइटी" },
  { t: "flat",  size: "2 BHK",       area: "Neharpar",              price: "₹55 - 65 L",     hook_en: "Ready possession, near school",       hook_hi: "रेडी पज़ेशन, स्कूल के पास" },
  { t: "shop",  size: "SCF",         area: "HUDA Market area",      price: "₹1.8 - 2.2 Cr",  hook_en: "Running market, good footfall",       hook_hi: "चालू मार्केट, अच्छी ग्राहकी" },
  { t: "shop",  size: "Booth",       area: "Sector 15 Market",      price: "₹80 - 95 L",     hook_en: "Main lane, rental income",            hook_hi: "मेन लेन, किराया आय" },
  { t: "shop",  size: "Showroom",    area: "Mathura Road side",     price: "₹3.5 - 4.0 Cr",  hook_en: "Highway visibility",                  hook_hi: "हाईवे से दिखने वाला" },
  { t: "ind",   size: "450 sq yd",   area: "Sector 24 side",        price: "₹2.4 - 2.8 Cr",  hook_en: "Industrial plot, wide approach",      hook_hi: "इंडस्ट्रियल प्लॉट, चौड़ा रास्ता" },
  { t: "ind",   size: "1000 sq yd",  area: "Sector 58 side",        price: "₹3.8 - 4.4 Cr",  hook_en: "Shed with power connection",          hook_hi: "बिजली कनेक्शन के साथ शेड" },
  { t: "rent",  size: "3 BHK floor", area: "Sector 15 area",        price: "₹28 - 34 K/mo",  hook_en: "Family floor, near market",           hook_hi: "फैमिली फ्लोर, मार्केट के पास" },
  { t: "rent",  size: "Shop",        area: "Sector 28 Metro side",  price: "₹45 - 60 K/mo",  hook_en: "Near metro station",                  hook_hi: "मेट्रो स्टेशन के पास" }
];

const TYPE_LABELS = {
  plot:  { en: "HUDA Residential Plot", hi: "हुडा रिहायशी प्लॉट" },
  kothi: { en: "Kothi / House",         hi: "कोठी / मकान" },
  floor: { en: "Builder Floor",         hi: "बिल्डर फ्लोर" },
  flat:  { en: "Society Flat",          hi: "सोसाइटी फ्लैट" },
  shop:  { en: "Commercial",            hi: "कमर्शियल" },
  ind:   { en: "Industrial",            hi: "इंडस्ट्रियल" },
  rent:  { en: "For Rent",              hi: "किराये के लिए" }
};

// ---------- Translations ----------
const I18N = {
  en: {
    callNow: "Call Now", callNow2: "Call Now", waBtn: "WhatsApp Us", waBtn2: "WhatsApp",
    tagline: "buy | sell | rent", taglineFoot: "buy | sell | rent",
    heroTitle: "Trusted Property Dealer in Faridabad Since 2009",
    heroSub: "HUDA plots, kothis, builder floors, commercial and industrial property. We handle your deal end to end: shortlisting, site visits, negotiation, paperwork and registry.",
    heroBadge: "Our office · HUDA Market area",
    revChip: "Read our client reviews on Google",
    statSince: "serving Faridabad since", statSectors: "all sectors covered", statRev: "reviews on Google", statGst: "registered firm",
    svcTitle: "What We Deal In",
    svc1: "HUDA Residential Plots", svc1p: "Plots across the HUDA sectors of Faridabad, with honest guidance on prevailing market rates.",
    svc2: "Kothis & Builder Floors", svc2p: "Independent houses and floors for purchase, sale and rent in established sectors.",
    svc3: "Commercial Property", svc3p: "Shops, SCFs, showrooms and office spaces in main markets and commercial hubs.",
    svc4: "Industrial", svc4p: "Industrial plots and sheds in and around Faridabad.",
    listTitle: "Current Opportunities",
    listSub: "A few of the properties we are currently handling. Call us for details, many more are available.",
    listCta: "Call for Details",
    aboutTitle: "Meet Mukesh Nagpal",
    aboutP: "Interlink Properties is run personally by Mukesh Nagpal, dealing in Faridabad's HUDA sectors since 2009. Every enquiry, site visit and negotiation is handled by him directly.",
    whyTitle: "Why clients trust us",
    why1: "15+ years of on-ground experience in the Faridabad market",
    why2: "Honest advice on fair prices, backed by deep knowledge of prevailing rates",
    why3: "Complete deal support: documentation, verification and registry",
    why4: "Trusted by NRI clients for safe, transparent transactions",
    why5: "Most of our business comes from repeat clients and referrals",
    revTitle: "What Our Clients Say", revSrc: "Google Review", revSrc2: "Google Review", revSrc3: "Google Review",
    revAll: "Read all our reviews on Google →",
    areaTitle: "Areas We Serve", areaGF: "Greater Faridabad", areaAll: "All of Faridabad",
    conTitle: "Visit or Call Us", conTalk: "Talk to Us", conHoursLbl: "Open daily:", conHours: "10:00 AM to 7:00 PM",
    conAddr1: "12-15 Dividing Road (before SRS Mall turn)",
    footLine: "© Interlink Properties, Faridabad. Serving Faridabad and Greater Faridabad since 2009.",
    footGst: "GST Registered Firm",
    stickyCall: "Call Now", stickyWa: "WhatsApp"
  },
  hi: {
    callNow: "अभी कॉल करें", callNow2: "अभी कॉल करें", waBtn: "व्हाट्सऐप करें", waBtn2: "व्हाट्सऐप",
    tagline: "खरीदें | बेचें | किराया", taglineFoot: "खरीदें | बेचें | किराया",
    heroTitle: "फरीदाबाद में 2009 से भरोसेमंद प्रॉपर्टी डीलर",
    heroSub: "हुडा प्लॉट, कोठी, बिल्डर फ्लोर, कमर्शियल और इंडस्ट्रियल प्रॉपर्टी। शॉर्टलिस्टिंग से लेकर साइट विज़िट, मोल-भाव, कागज़ात और रजिस्ट्री तक, आपकी डील की पूरी ज़िम्मेदारी हमारी।",
    heroBadge: "हमारा ऑफिस · हुडा मार्केट",
    revChip: "गूगल पर हमारे ग्राहकों के रिव्यू पढ़ें",
    statSince: "से फरीदाबाद की सेवा में", statSectors: "सभी सेक्टरों में काम", statRev: "गूगल पर रिव्यू", statGst: "रजिस्टर्ड फर्म",
    svcTitle: "हम क्या करते हैं",
    svc1: "हुडा रिहायशी प्लॉट", svc1p: "फरीदाबाद के हुडा सेक्टरों में प्लॉट, बाज़ार भाव की सही और ईमानदार सलाह के साथ।",
    svc2: "कोठी और बिल्डर फ्लोर", svc2p: "जाने-माने सेक्टरों में मकान और फ्लोर, खरीदने, बेचने और किराये के लिए।",
    svc3: "कमर्शियल प्रॉपर्टी", svc3p: "मेन मार्केट और कमर्शियल हब में दुकानें, SCF, शोरूम और ऑफिस स्पेस।",
    svc4: "इंडस्ट्रियल", svc4p: "फरीदाबाद और आसपास इंडस्ट्रियल प्लॉट और शेड।",
    listTitle: "उपलब्ध प्रॉपर्टी",
    listSub: "कुछ प्रॉपर्टी जो अभी हमारे पास हैं। जानकारी के लिए कॉल करें, और भी कई उपलब्ध हैं।",
    listCta: "जानकारी के लिए कॉल करें",
    aboutTitle: "मिलिए मुकेश नागपाल से",
    aboutP: "इंटरलिंक प्रॉपर्टीज़ को मुकेश नागपाल खुद चलाते हैं, 2009 से फरीदाबाद के हुडा सेक्टरों में। हर पूछताछ, साइट विज़िट और मोल-भाव वे खुद संभालते हैं।",
    whyTitle: "ग्राहक हम पर भरोसा क्यों करते हैं",
    why1: "फरीदाबाद मार्केट में 15+ साल का ज़मीनी अनुभव",
    why2: "बाज़ार भाव की गहरी समझ के साथ सही कीमत की ईमानदार सलाह",
    why3: "पूरी डील में साथ: कागज़ात, जांच और रजिस्ट्री",
    why4: "NRI ग्राहकों का भरोसा, सुरक्षित और पारदर्शी सौदे",
    why5: "हमारा ज़्यादातर काम पुराने ग्राहकों और उनकी सिफारिश से आता है",
    revTitle: "हमारे ग्राहक क्या कहते हैं", revSrc: "गूगल रिव्यू", revSrc2: "गूगल रिव्यू", revSrc3: "गूगल रिव्यू",
    revAll: "गूगल पर सभी रिव्यू पढ़ें →",
    areaTitle: "हमारे कार्यक्षेत्र", areaGF: "ग्रेटर फरीदाबाद", areaAll: "पूरा फरीदाबाद",
    conTitle: "मिलें या कॉल करें", conTalk: "हमसे बात करें", conHoursLbl: "रोज़ खुला:", conHours: "सुबह 10 बजे से शाम 7 बजे तक",
    conAddr1: "12-15 डिवाइडिंग रोड (SRS मॉल टर्न से पहले)",
    footLine: "© इंटरलिंक प्रॉपर्टीज़, फरीदाबाद। 2009 से फरीदाबाद और ग्रेटर फरीदाबाद की सेवा में।",
    footGst: "GST रजिस्टर्ड फर्म",
    stickyCall: "अभी कॉल करें", stickyWa: "व्हाट्सऐप"
  }
};
