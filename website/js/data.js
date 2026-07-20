// ============================================================
// Interlink Properties — EDITABLE CONTENT
// This file holds the property listings and all translated text.
// Edit here; no need to touch index.html or main.js.
// ============================================================

// ---------- Listings ----------
// CURRENT INVENTORY: real listings. Update this array as inventory changes.
// The page shows a random 4 on each load.
const LISTINGS = [
  { t: "plot", size_en: "350 sq yd", size_hi: "350 गज", area_en: "Sector 8 area",    area_hi: "सेक्टर 8 क्षेत्र",  price: "₹4.25 Cr", hook_en: "Genuine listing, enquire today",   hook_hi: "असली लिस्टिंग, आज ही पूछताछ करें" },
  { t: "plot", size_en: "250 sq yd", size_hi: "250 गज", area_en: "Sector 62 area",   area_hi: "सेक्टर 62 क्षेत्र", price: "₹3.60 Cr", hook_en: "Good investment opportunity",      hook_hi: "अच्छा निवेश अवसर" },
  { t: "plot", size_en: "350 sq yd", size_hi: "350 गज", area_en: "Sector 14 area",   area_hi: "सेक्टर 14 क्षेत्र", price: "₹9.50 Cr", hook_en: "Prime location, enquire now",      hook_hi: "प्राइम लोकेशन, अभी पूछताछ करें" },
  { t: "shop", size_en: "Booth",     size_hi: "बूथ",     area_en: "Sector 19 Market", area_hi: "सेक्टर 19 मार्केट", price: "₹1.15 Cr", hook_en: "Ready for immediate use",          hook_hi: "तुरंत उपयोग के लिए तैयार" },
  { t: "plot", size_en: "160 sq yd", size_hi: "160 गज", area_en: "Sector 65 area",   area_hi: "सेक्टर 65 क्षेत्र", price: "₹2.60 Cr", hook_en: "Available now, call for details",  hook_hi: "अभी उपलब्ध, जानकारी के लिए कॉल करें" }
];

const TYPE_LABELS = {
  plot:  { en: "HUDA Residential Plot", hi: "हुडा रिहायशी प्लॉट" },
  kothi: { en: "Kothi / House",         hi: "कोठी / मकान" },
  floor: { en: "Builder Floor",         hi: "बिल्डर फ्लोर" },
  flat:  { en: "Society Flat",          hi: "सोसाइटी फ्लैट" },
  shop:  { en: "Commercial",            hi: "कमर्शियल" },
  ind:   { en: "Industrial",            hi: "इंडस्ट्रियल" }
};

// ---------- Translations ----------
const I18N = {
  en: {
    callNow: "Call Now", callNow2: "Call Now", waBtn: "WhatsApp Us", waBtn2: "WhatsApp",
    tagline: "buy | sell", taglineFoot: "buy | sell",
    heroTitle: "Trusted Property Dealer in Faridabad Since 2009",
    heroSub: "HUDA plots, kothis, builder floors, commercial and industrial property. We handle your deal end to end: shortlisting, site visits, negotiation, paperwork and registry.",
    heroBadge: "Our office · HUDA Market area",
    revChip: "Read our client reviews on Google",
    statSince: "serving Faridabad since", statSectors: "all sectors covered", statRev: "reviews on Google",
    svcTitle: "What We Deal In",
    svc1: "HUDA Residential Plots", svc1p: "Plots across the HUDA sectors of Faridabad, with honest guidance on prevailing market rates.",
    svc2: "Kothis & Builder Floors", svc2p: "Independent houses and floors for purchase and sale in established sectors.",
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
    why3: "Paperwork made easy and organized: documentation, verification and registry, all handled for you",
    why4: "Trusted by NRI clients for safe, transparent transactions",
    why5: "A trusted network of agents across Faridabad for anything we don't deal in directly",
    revTitle: "What Our Clients Say", revSrc: "Google Review", revSrc2: "Google Review", revSrc3: "Google Review",
    revAll: "Read all our reviews on Google →",
    areaTitle: "Areas We Serve", areaGF: "Greater Faridabad", areaAll: "All of Faridabad",
    areaS14: "Sector 14", areaS15: "Sector 15", areaS15A: "Sector 15A", areaS16: "Sector 16",
    areaS17: "Sector 17", areaS21: "Sector 21", areaS28: "Sector 28", areaS29: "Sector 29",
    areaHuda: "HUDA Sectors", areaNeharpar: "Neharpar",
    conTitle: "Visit or Call Us", conTalk: "Talk to Us", conHoursLbl: "Open daily:", conHours: "10:00 AM to 7:00 PM",
    conAddr1: "12-15 Dividing Road (before SRS Mall turn)",
    footLine: "© Interlink Properties, Faridabad. Serving Faridabad and Greater Faridabad since 2009.",
    stickyCall: "Call Now", stickyWa: "WhatsApp"
  },
  hi: {
    callNow: "अभी कॉल करें", callNow2: "अभी कॉल करें", waBtn: "व्हाट्सऐप करें", waBtn2: "व्हाट्सऐप",
    tagline: "खरीदें | बेचें", taglineFoot: "खरीदें | बेचें",
    heroTitle: "फरीदाबाद में 2009 से भरोसेमंद प्रॉपर्टी डीलर",
    heroSub: "हुडा प्लॉट, कोठी, बिल्डर फ्लोर, कमर्शियल और इंडस्ट्रियल प्रॉपर्टी। शॉर्टलिस्टिंग से लेकर साइट विज़िट, मोल-भाव, कागज़ात और रजिस्ट्री तक, आपकी डील की पूरी ज़िम्मेदारी हमारी।",
    heroBadge: "हमारा ऑफिस · हुडा मार्केट",
    revChip: "गूगल पर हमारे ग्राहकों के रिव्यू पढ़ें",
    statSince: "से फरीदाबाद की सेवा में", statSectors: "सभी सेक्टरों में काम", statRev: "गूगल पर रिव्यू",
    svcTitle: "हम क्या करते हैं",
    svc1: "हुडा रिहायशी प्लॉट", svc1p: "फरीदाबाद के हुडा सेक्टरों में प्लॉट, बाज़ार भाव की सही और ईमानदार सलाह के साथ।",
    svc2: "कोठी और बिल्डर फ्लोर", svc2p: "जाने-माने सेक्टरों में मकान और फ्लोर, खरीदने और बेचने के लिए।",
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
    why3: "आसान और व्यवस्थित कागज़ी काम: डॉक्यूमेंटेशन, जांच और रजिस्ट्री, सब हम संभालते हैं",
    why4: "NRI ग्राहकों का भरोसा, सुरक्षित और पारदर्शी सौदे",
    why5: "फरीदाबाद भर में भरोसेमंद एजेंटों का नेटवर्क, जो काम हम खुद नहीं करते उसके लिए भी सही मदद",
    revTitle: "हमारे ग्राहक क्या कहते हैं", revSrc: "गूगल रिव्यू", revSrc2: "गूगल रिव्यू", revSrc3: "गूगल रिव्यू",
    revAll: "गूगल पर सभी रिव्यू पढ़ें →",
    areaTitle: "हमारे कार्यक्षेत्र", areaGF: "ग्रेटर फरीदाबाद", areaAll: "पूरा फरीदाबाद",
    areaS14: "सेक्टर 14", areaS15: "सेक्टर 15", areaS15A: "सेक्टर 15ए", areaS16: "सेक्टर 16",
    areaS17: "सेक्टर 17", areaS21: "सेक्टर 21", areaS28: "सेक्टर 28", areaS29: "सेक्टर 29",
    areaHuda: "हुडा सेक्टर", areaNeharpar: "नेहरपार",
    conTitle: "मिलें या कॉल करें", conTalk: "हमसे बात करें", conHoursLbl: "रोज़ खुला:", conHours: "सुबह 10 बजे से शाम 7 बजे तक",
    conAddr1: "12-15 डिवाइडिंग रोड (SRS मॉल टर्न से पहले)",
    footLine: "© इंटरलिंक प्रॉपर्टीज़, फरीदाबाद। 2009 से फरीदाबाद और ग्रेटर फरीदाबाद की सेवा में।",
    stickyCall: "अभी कॉल करें", stickyWa: "व्हाट्सऐप"
  }
};
