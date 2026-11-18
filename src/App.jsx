import React, { useState, useEffect, useMemo } from 'react';
import {
  Phone, MessageSquare, MapPin, CheckCircle2, Paintbrush, ShieldCheck, Sparkles,
  Clock, Search, Menu, X, ChevronRight, Droplet, Home as HomeIcon, Building2,
  Check, Navigation, Wrench, BookOpen, Globe, Camera, Maximize2, Star, Award,
  ExternalLink, Share2, Calculator
} from 'lucide-react';
import RoomStudio, { HeroRoom } from './RoomStudio';



/* ---------------- BUSINESS DATA ---------------- */
const BIZ = {
  name: 'Shiva Traders – Asian Paints Colour Cube',
  address: 'SCO 423, Green City, Dhakoli, Zirakpur, Punjab 140603, India.',
  phone1: '919888662449', phone1Fmt: '98886 62449',
  phone2: '919988549329', phone2Fmt: '99885 49329',
  hours: 'Tue – Sun: 9:00 AM – 8:30 PM (Monday: half day, please call to confirm)',
  maps: 'https://www.google.com/maps/dir/?api=1&destination=Shiva+Traders+Asian+Paints+Colour+Cube,+SCO+423,+Green+City,+Dhakoli,+Zirakpur,+Punjab+140603',
  review: 'https://share.google/qmktaN7FQg2idfbm3',
  areas: ['Dhakoli', 'Zirakpur', 'Panchkula', 'VIP Road, Zirakpur', 'Peer Muchalla', 'Baltana', 'Gazipur', 'Lohgarh', 'Chandigarh']
};
const wa = (msg) => `https://wa.me/${BIZ.phone1}?text=${encodeURIComponent(msg)}`;
const tel = (n) => `tel:+${n}`;
const DEFAULT_WA = 'Hello Shiva Traders, I would like to enquire about Asian Paints products in Zirakpur.';

/* ---------------- TRANSLATIONS (nav, hero, key labels) ---------------- */
const TR = {
  en: {
    nav: { home: 'Home', about: 'About Us', products: 'Products', services: 'Paint Services', waterproofing: 'Waterproofing', studio: 'Colour Studio', visualizer: 'Room Preview', gallery: 'Shop Gallery', calculator: 'Calculator', offers: 'Offers', contact: 'Contact Us' },
    hero: { badge: 'Shiva Traders – Dhakoli, Zirakpur', a: 'Transform Your Home with the ', b: 'Perfect Colours.', sub: 'Explore Asian Paints products, colour ideas, painting guidance and waterproofing products at Shiva Traders, Dhakoli, Zirakpur.', colours: 'Explore Paint Colours', preview: 'Try Room Preview', wa: 'Contact Us on WhatsApp' },
    c: { call: 'Call Now', directions: 'Get Directions', learn: 'Learn More', enquire: 'Enquire Now', address: 'Address', phone: 'Phone', hours: 'Hours', enqWp: 'Enquire About Waterproofing', note: '' },
    s: { psSub: 'Complete Paint & Surface Care', psTitle: 'Our Products & Services', psDesc: 'Asian Paints retail supplies and guidance for homes and commercial projects in Zirakpur & Dhakoli.', gSub: 'Our Store', gTitle: 'Inside Shiva Traders – Visit Our Store', gDesc: 'A look inside our Asian Paints Colour Cube store in Green City, Dhakoli.', gBtn: 'Explore Our Store Gallery', wSub: 'Local Paint Retailer', wTitle: 'Why Choose Shiva Traders', tSub: 'Customer Experience', tTitle: 'What Our Customers Say', tBtn: 'Read More Google Reviews' }
  },
  hi: {
    nav: { home: 'होम', about: 'हमारे बारे में', products: 'पेंट उत्पाद', services: 'पेंटिंग सेवाएं', waterproofing: 'वाटरप्रूफिंग', studio: 'कलर स्टूडियो', visualizer: 'रूम प्रीव्यू', gallery: 'शॉप गैलरी', calculator: 'पेंट कैलकुलेटर', offers: 'ऑफ़र', contact: 'संपर्क करें' },
    hero: { badge: 'शिवा ट्रेडर्स – ढकोली, ज़ीरकपुर', a: 'अपने घर को दें ', b: 'परफेक्ट रंगों की नई पहचान।', sub: 'शिवा ट्रेडर्स, ढकोली, ज़ीरकपुर में एशियन पेंट्स उत्पाद, रंगों के सुझाव, पेंटिंग मार्गदर्शन और वाटरप्रूफिंग उत्पाद देखें।', colours: 'पेंट के रंग देखें', preview: 'रूम प्रीव्यू आज़माएं', wa: 'व्हाट्सएप पर संपर्क करें' },
    c: { call: 'अभी कॉल करें', directions: 'रास्ता देखें (मैप्स)', learn: 'अधिक जानें', enquire: 'अभी पूछताछ करें', address: 'पता', phone: 'फ़ोन', hours: 'समय', enqWp: 'वाटरप्रूफिंग के लिए पूछताछ करें', note: 'इस पेज की बाकी जानकारी अभी अंग्रेज़ी में है। हिंदी में मदद के लिए कॉल या व्हाट्सएप करें।' },
    s: { psSub: 'संपूर्ण पेंट और सुरक्षा समाधान', psTitle: 'हमारे उत्पाद और सेवाएं', psDesc: 'ज़ीरकपुर और ढकोली में घरों और व्यावसायिक प्रोजेक्ट्स के लिए एशियन पेंट्स उत्पाद और मार्गदर्शन।', gSub: 'हमारा स्टोर', gTitle: 'शिवा ट्रेडर्स के अंदर – हमारे स्टोर पर आएं', gDesc: 'ग्रीन सिटी, ढकोली स्थित हमारे एशियन पेंट्स कलर क्यूब स्टोर की झलक देखें।', gBtn: 'हमारी स्टोर गैलरी देखें', wSub: 'स्थानीय पेंट विक्रेता', wTitle: 'शिवा ट्रेडर्स ही क्यों चुनें', tSub: 'ग्राहकों के विचार', tTitle: 'हमारे ग्राहक क्या कहते हैं', tBtn: 'गूगल पर और समीक्षाएं पढ़ें' }
  },
  pa: {
    nav: { home: 'ਹੋਮ', about: 'ਸਾਡੇ ਬਾਰੇ', products: 'ਪੇਂਟ ਉਤਪਾਦ', services: 'ਪੇਂਟਿੰਗ ਸੇਵਾਵਾਂ', waterproofing: 'ਵਾਟਰਪ੍ਰੂਫਿੰਗ', studio: 'ਕਲਰ ਸਟੂਡੀਓ', visualizer: 'ਰੂਮ ਪ੍ਰੀਵਿਊ', gallery: 'ਦੁਕਾਨ ਗੈਲਰੀ', calculator: 'ਪੇਂਟ ਕੈਲਕੁਲੇਟਰ', offers: 'ਆਫ਼ਰ', contact: 'ਸੰਪਰਕ ਕਰੋ' },
    hero: { badge: 'ਸ਼ਿਵਾ ਟ੍ਰੇਡਰਜ਼ – ਢਕੋਲੀ, ਜ਼ੀਰਕਪੁਰ', a: 'ਆਪਣੇ ਘਰ ਨੂੰ ਦਿਓ ', b: 'ਬਿਹਤਰੀਨ ਰੰਗਾਂ ਦੀ ਨਵੀਂ ਦਿੱਖ।', sub: 'ਸ਼ਿਵਾ ਟ੍ਰੇਡਰਜ਼, ਢਕੋਲੀ, ਜ਼ੀਰਕਪੁਰ ਵਿਖੇ ਏਸ਼ੀਅਨ ਪੇਂਟਸ ਉਤਪਾਦ, ਰੰਗਾਂ ਦੇ ਸੁਝਾਅ, ਪੇਂਟਿੰਗ ਮਾਰਗਦਰਸ਼ਨ ਅਤੇ ਵਾਟਰਪ੍ਰੂਫਿੰਗ ਉਤਪਾਦ ਦੇਖੋ।', colours: 'ਪੇਂਟ ਦੇ ਰੰਗ ਦੇਖੋ', preview: 'ਰੂਮ ਪ੍ਰੀਵਿਊ ਵਰਤੋ', wa: 'ਵਟਸਐਪ \'ਤੇ ਸੰਪਰਕ ਕਰੋ' },
    c: { call: 'ਹੁਣੇ ਕਾਲ ਕਰੋ', directions: 'ਰਸਤਾ ਦੇਖੋ (ਮੈਪਸ)', learn: 'ਹੋਰ ਜਾਣੋ', enquire: 'ਹੁਣੇ ਪੁੱਛਗਿੱਛ ਕਰੋ', address: 'ਪਤਾ', phone: 'ਫ਼ੋਨ', hours: 'ਸਮਾਂ', enqWp: 'ਵਾਟਰਪ੍ਰੂਫਿੰਗ ਬਾਰੇ ਪੁੱਛੋ', note: 'ਇਸ ਪੰਨੇ ਦੀ ਬਾਕੀ ਜਾਣਕਾਰੀ ਅਜੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਹੈ। ਪੰਜਾਬੀ ਵਿੱਚ ਮਦਦ ਲਈ ਕਾਲ ਜਾਂ ਵਟਸਐਪ ਕਰੋ।' },
    s: { psSub: 'ਮੁਕੰਮਲ ਪੇਂਟ ਅਤੇ ਸੁਰੱਖਿਆ ਹੱਲ', psTitle: 'ਸਾਡੇ ਉਤਪਾਦ ਅਤੇ ਸੇਵਾਵਾਂ', psDesc: 'ਜ਼ੀਰਕਪੁਰ ਅਤੇ ਢਕੋਲੀ ਵਿੱਚ ਘਰਾਂ ਅਤੇ ਵਪਾਰਕ ਇਮਾਰਤਾਂ ਲਈ ਏਸ਼ੀਅਨ ਪੇਂਟਸ ਉਤਪਾਦ ਅਤੇ ਮਾਰਗਦਰਸ਼ਨ।', gSub: 'ਸਾਡੀ ਦੁਕਾਨ', gTitle: 'ਸ਼ਿਵਾ ਟ੍ਰੇਡਰਜ਼ ਦੇ ਅੰਦਰ – ਸਾਡੀ ਦੁਕਾਨ \'ਤੇ ਆਓ', gDesc: 'ਗ੍ਰੀਨ ਸਿਟੀ, ਢਕੋਲੀ ਵਿਖੇ ਸਾਡੇ ਏਸ਼ੀਅਨ ਪੇਂਟਸ ਕਲਰ ਕਿਊਬ ਸਟੋਰ ਦੀ ਝਲਕ ਦੇਖੋ।', gBtn: 'ਸਾਡੀ ਸਟੋਰ ਗੈਲਰੀ ਦੇਖੋ', wSub: 'ਸਥਾਨਕ ਪੇਂਟ ਸਟੋਰ', wTitle: 'ਸ਼ਿਵਾ ਟ੍ਰੇਡਰਜ਼ ਹੀ ਕਿਉਂ ਚੁਣੋ', tSub: 'ਗਾਹਕਾਂ ਦੇ ਵਿਚਾਰ', tTitle: 'ਸਾਡੇ ਗਾਹਕ ਕੀ ਕਹਿੰਦੇ ਹਨ', tBtn: 'ਗੂਗਲ \'ਤੇ ਹੋਰ ਸਮੀਖਿਆਵਾਂ ਪੜ੍ਹੋ' }
  }
};

/* ---------------- CONTENT DATA ---------------- */
// Put your real store photos in /public/images/ with these file names.
const GALLERY = [
  { id: 'g1', cat: 'Shop Front View', title: 'Shiva Traders – Storefront', cap: 'Our Asian Paints Colour Cube store at Green City, Dhakoli, Zirakpur.', img: '/images/front.webp' },
  { id: 'g2', cat: 'Store Interior', title: 'Colour Cube Showroom', cap: 'A welcoming view of our showroom and customer consultation area.', img: '/images/desk.webp' },
  { id: 'g3', cat: 'Product Displays', title: 'SmartCare & Ultraa Range', cap: 'Explore Asian Paints waterproofing solutions and premium emulsions.', img: '/images/iamge-4.webp' },
  { id: 'g4', cat: 'Shade Cards', title: 'Colour Consultation Zone', cap: 'Interior and exterior shade choices for your home.', img: '/images/image-1.webp' },
  { id: 'g5', cat: 'Store Interior', title: 'Inside the Showroom', cap: 'A look inside the Shiva Traders Colour Cube experience.', img: '/images/image-2.webp' },
  { id: 'g6', cat: 'WoodTech & Finishes', title: 'WoodTech Designer Finishes', cap: 'Designer, clear and colour finishes for wood surfaces.', img: '/images/image-3.webp' },
  { id: 'g7', cat: 'Painting Services', title: 'Asian Paints Painting Services', cap: 'Explore painting service guidance and colour palettes.', img: '/images/image-5.webp' },
  { id: 'g8', cat: 'WoodTech & Finishes', title: 'WoodTech Finish Collection', cap: 'A closer look at premium wood finish samples.', img: '/images/image-6.webp' },
  { id: 'g9', cat: 'Textures & Exterior', title: 'Texture & Exterior Samples', cap: 'Browse textured finishes and exterior sample boards.', img: '/images/image-7.webp' }
];
const GALLERY_CATS = ['All', ...Array.from(new Set(GALLERY.map((g) => g.cat)))];

const REVIEWS = [
  { id: 1, name: 'Anmol Jain', meta: 'Google review', text: 'Had a great experience at Shiva Traders! The staff is friendly, polite, and very helpful. They explained everything clearly and helped me choose the right paint and products for my home. The products are genuine, and the rates are also very reasonable. Excellent customer service! Highly recommended....' },
  { id: 2, name: 'Munish Sharma', meta: 'Google review', text: 'Excellent experience! The shop has a wide range of Asian Paints products ..They provided very good guidance on colour combinations and helped me choose the right products for my requirement. Pricing was also competitive and the service was quick. Definitely a reliable place..' },
  { id: 3, name: 'Gourish Singla', meta: 'Google review', text: 'Shiva Traders offers excellent painting, texture, and home décor services with great quality and reasonable prices. Their team is very polite, professional, and dedicated to delivering beautiful results. Highly recommended—truly one of the best shops for painting services!' }
];

const OVERVIEW = [
  { id: 'ps', badge: 'Application & Guidance', title: 'A. Painting Services', sub: 'Painting enquiries for homes and commercial spaces in Zirakpur & Dhakoli.', tab: 'services', items: ['Interior Wall Painting', 'Exterior House Painting', 'New Home Painting', 'Commercial Painting Enquiries', 'Decorative Wall Finishes', 'Colour Selection Help'], msg: 'Hello Shiva Traders, I would like to enquire about Painting Services in Zirakpur.' },
  { id: 'ws', badge: 'Leakage & Dampness', title: 'B. Waterproofing Guidance', sub: 'Product recommendations for seepage and dampness problems.', tab: 'waterproofing', items: ['Terrace & Roof Waterproofing', 'Bathroom Waterproofing', 'Wall Dampness Solutions', 'Exterior Wall Protection', 'Crack Filling Solutions', 'Product Guidance'], msg: 'Hello Shiva Traders, I need guidance regarding waterproofing.' },
  { id: 'pp', badge: 'Retail Stock', title: 'C. Paint Products', sub: 'Asian Paints emulsions, enamels, wood finishes, primers and putty.', tab: 'products', items: ['Interior Emulsions', 'Exterior Emulsions', 'Decorative & Texture Paints', 'Primers', 'Wall Putty', 'Wood Finishes & Enamels'], msg: 'Hello Shiva Traders, I want to check availability and pricing for Asian Paints products.' },
  { id: 'wp', badge: 'SmartCare Range', title: 'D. Waterproofing Products', sub: 'Asian Paints SmartCare products for roofs, bathrooms and walls.', tab: 'waterproofing', items: ['SmartCare Damp Proof', 'SmartCare Damp Block 2K', 'SmartCare Hydroloc', 'SmartCare Crack Seal', 'Bathroom Products', 'Exterior Wall Products'], msg: 'Hello Shiva Traders, I want to enquire about SmartCare waterproofing products.' }
];

// Specs below are general descriptions. Please confirm exact figures against the official Asian Paints product pages before adding numbers.
const PRODUCTS = [
  { id: 'rl', cat: 'interior', name: 'Asian Paints Royale Luxury Emulsion', badge: 'Luxury Interior', desc: 'Premium interior emulsion with a smooth, washable finish.', finish: 'Luxury sheen', msg: 'Hello Shiva Traders, I want to check availability and price for Royale Luxury Emulsion.' },
  { id: 'rh', cat: 'interior', name: 'Asian Paints Royale Health Shield', badge: 'Anti-Bacterial Range', desc: 'Interior emulsion from the Royale range with anti-bacterial protection.', finish: 'Soft sheen', msg: 'Hello Shiva Traders, I want to enquire about Royale Health Shield.' },
  { id: 'ap', cat: 'interior', name: 'Asian Paints Apcolite Premium Emulsion', badge: 'Stain Resistant', desc: 'Washable interior coating for living rooms, hallways and dining areas.', finish: 'Matt / Satin', msg: 'Hello Shiva Traders, please share prices for Apcolite Premium Emulsion.' },
  { id: 'au', cat: 'exterior', name: 'Asian Paints Apex Ultima Exterior Emulsion', badge: 'Weather Protection', desc: 'Exterior emulsion built for sun, dust and monsoon exposure.', finish: 'Weather-proof sheen', msg: 'Hello Shiva Traders, I need Apex Ultima exterior paint details.' },
  { id: 'ac', cat: 'exterior', name: 'Asian Paints Ace Exterior Emulsion', badge: 'Budget Exterior', desc: 'Water-based exterior wall finish for everyday protection.', finish: 'Matt', msg: 'Hello Shiva Traders, please share Ace Exterior Emulsion pricing.' },
  { id: 'wt', cat: 'wood-metal', name: 'Asian Paints WoodTech Finishes', badge: 'Wood Coating', desc: 'Clear coatings for doors, windows and furniture.', finish: 'Gloss / Matt', msg: 'Hello Shiva Traders, I want to ask about WoodTech wood finishes.' },
  { id: 'pu', cat: 'primers-putty', name: 'Asian Paints TruCare Wall Putty', badge: 'Surface Preparation', desc: 'Smooth base coat that fills pinholes and minor dents before primer.', finish: 'Smooth white base', msg: 'Hello Shiva Traders, I need TruCare Wall Putty price.' },
  { id: 'pr', cat: 'primers-putty', name: 'Asian Paints TruCare Interior Primer', badge: 'Primer', desc: 'Water-based primer that helps topcoat adhesion and colour evenness.', finish: 'Matt undercoat', msg: 'Hello Shiva Traders, please share TruCare Primer availability.' }
];

const WATERPROOF = [
  { id: 'dp', name: 'Asian Paints SmartCare Damp Proof', badge: 'Terrace & Roof', target: 'Terrace & roof slab', desc: 'Flexible waterproofing coating for terraces and roofs.', msg: 'Hello Shiva Traders, I have roof leakage and want SmartCare Damp Proof.' },
  { id: 'db', name: 'Asian Paints SmartCare Damp Block 2K', badge: 'Internal Dampness', target: 'Internal walls & bathrooms', desc: 'Two-component coating used behind paint to block internal dampness.', msg: 'Hello Shiva Traders, I have internal wall dampness. Please suggest Damp Block 2K.' },
  { id: 'hx', name: 'Asian Paints SmartCare Hydroloc', badge: 'Efflorescence', target: 'Salt deposits & peeling paint', desc: 'Liquid treatment for walls affected by moisture and salt deposits.', msg: 'Hello Shiva Traders, I have efflorescence and peeling paint. I need Hydroloc.' },
  { id: 'cs', name: 'Asian Paints SmartCare Crack Seal', badge: 'Crack Filling', target: 'Plaster cracks', desc: 'Flexible crack filler for interior and exterior walls.', msg: 'Hello Shiva Traders, I need SmartCare Crack Seal for wall cracks.' }
];

const SERVICES = [
  { t: 'Interior Wall Painting', d: 'Interior painting guidance with Royale and Apcolite emulsions and shade selection.', i: HomeIcon, m: 'Hello Shiva Traders, I want to enquire about Interior Wall Painting.' },
  { t: 'Exterior House Painting', d: 'Weather-resistant exterior options such as Apex Ultima.', i: Building2, m: 'Hello Shiva Traders, I want to enquire about Exterior House Painting.' },
  { t: 'New Home Painting', d: 'Guidance on putty, primer and topcoat for new homes.', i: Paintbrush, m: 'Hello Shiva Traders, I need guidance for new home painting.' },
  { t: 'Commercial Painting', d: 'Painting enquiries for offices, shops and showrooms in Zirakpur.', i: Wrench, m: 'Hello Shiva Traders, I need a commercial painting enquiry.' },
  { t: 'Decorative Textures', d: 'Feature wall textures and decorative finishes.', i: Sparkles, m: 'Hello Shiva Traders, I want details about texture wall finishes.' },
  { t: 'Colour Consultation', d: 'Shade card consultation for harmonious colour palettes.', i: BookOpen, m: 'Hello Shiva Traders, I want to schedule a colour consultation.' }
];

/* Indicative on-screen colours only. Always confirm the shade on a physical shade card in store. */
const SHADES = [
  ['8116','Soft Breeze','Whites','#F0F4F1','Royale'],['9436','Air Breeze','Whites','#E8EFEA','Royale'],['8100','Winged Angel','Whites','#F5F5F0','Royale'],['L101','Absolute White','Whites','#FAFAFA','Royale'],
  ['8084','Tinge Of Rose','Off-whites','#FAF0E6','Royale'],['8620','White Clay','Off-whites','#E0DDD5','Apex'],['7958','Ivory Coast','Off-whites','#F3EFE6','Apcolite'],
  ['8036','Soft Chenille','Beiges','#E6D7C3','Apcolite'],['8539','Warm Sand','Beiges','#D9C5B2','Apex'],['8557','Almond Cream','Beiges','#EFE3D3','Apcolite'],['8524','Desert Sun','Beiges','#D2B48C','Apcolite'],['8504','Golden Touch','Beiges','#C5A059','Royale'],
  ['8269','Silver Grey','Greys','#D3D3D3','Apcolite'],['8302','Slate Grey','Greys','#708090','Apex'],['8324','Charcoal Smoke','Greys','#36454F','Royale'],['8274','Foggy Dew','Greys','#E0E5E5','Royale'],['8312','Urban Grey','Greys','#5A6B7C','Apex'],
  ['5182','Lucid Dream','Blues','#81D4FA','Apcolite'],['8204','Twilight Sky','Blues','#1E3A8A','Apex'],['7289','Royal Blue','Blues','#4169E1','Royale'],['7272','Celestial Blue','Blues','#4682B4','Apcolite'],['7220','Breeze Blue','Blues','#B0E0E6','Royale'],['7204','Sky Blue','Blues','#87CEEB','Apcolite'],
  ['8676','Zen','Greens','#C8E6C9','Royale'],['7612','Mint Frost','Greens','#E8F5E9','Royale'],['7541','Pistachio Cream','Greens','#D0F0C0','Apcolite'],['7501','Emerald Isle','Greens','#50C878','Royale'],['7580','Sage Meadow','Greens','#8FBC8F','Apcolite'],['7660','Olive Grove','Greens','#556B2F','Apex'],
  ['8124','Angel Harp','Yellows','#FFF59D','Apcolite'],['8716','Zinnia Bloom','Yellows','#FBC02D','Apcolite'],['7864','Golden Harvest','Yellows','#DAA520','Royale'],['7840','Lemon Drops','Yellows','#FFFACD','Royale'],
  ['7912','Terracotta Glow','Oranges','#E06D53','Apex'],['7930','Sunset Orange','Oranges','#FF7F50','Apcolite'],['7924','Peach Surprise','Oranges','#FFDAB9','Apcolite'],['7948','Apricot Nectar','Oranges','#FBCEB1','Royale'],
  ['8149','Crimson Tide','Reds','#DC143C','Royale'],['8184','Deep Maroon','Reds','#800000','Apex'],
  ['8092','Pink Mist','Pinks','#FADEE1','Royale'],['8108','Button Rose','Pinks','#F48FB1','Apcolite'],['8072','Soft Blush','Pinks','#FFDAE9','Royale'],
  ['7148','Lilac Frost','Purples','#D1C4E9','Royale'],['7120','Royal Purple','Purples','#7851A9','Royale'],['7164','Lavender Mist','Purples','#E6E6FA','Apcolite']
].map(([code, name, family, hex, collection]) => ({ id: `s-${code}`, code, name, family, hex, collection }));
const FAMILIES = ['All', ...Array.from(new Set(SHADES.map((s) => s.family)))];

const ROOMS = [
  { id: 'living-room', name: 'Living Room', walls: [['backWall', 'Main Back Wall'], ['leftWall', 'Left Wall'], ['rightWall', 'Right Wall']] },
  { id: 'bedroom', name: 'Bedroom', walls: [['backWall', 'Headboard Wall'], ['leftWall', 'Left Wall'], ['rightWall', 'Right Wall']] },
  { id: 'kitchen', name: 'Kitchen', walls: [['backWall', 'Cabinet Wall'], ['leftWall', 'Left Wall'], ['rightWall', 'Right Wall']] },
  { id: 'dining', name: 'Dining Room', walls: [['backWall', 'Main Dining Wall'], ['leftWall', 'Left Wall'], ['rightWall', 'Right Wall']] },
  { id: 'exterior', name: 'Exterior House', walls: [['backWall', 'Upper Facade'], ['leftWall', 'Porch Wall'], ['rightWall', 'Right Wing']] }
];
const FINISHES = { matte: { name: 'Matte', glow: 0 }, satin: { name: 'Satin', glow: 0.1 }, sheen: { name: 'Luxury Sheen', glow: 0.22 } };
const TIERS = {
  royale: { name: 'Royale Luxury', cover: 145, price: 520 },
  apcolite: { name: 'Apcolite Premium', cover: 130, price: 380 },
  economy: { name: 'Economy Emulsion', cover: 110, price: 240 }
};
const wallName = (room, id) => room.walls.find((w) => w[0] === id)?.[1] || '';
const num = (v) => Math.max(0, parseFloat(v) || 0);

/* ---------------- SMALL COMPONENTS ---------------- */
const Eyebrow = ({ children }) => (
  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">{children}</span>
);
const PageHead = ({ eyebrow, title, desc }) => (
  <div className="text-center max-w-3xl mx-auto space-y-3">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h1 className="text-3xl sm:text-4xl font-black text-slate-900">{title}</h1>
    {desc && <p className="text-slate-600 text-sm">{desc}</p>}
  </div>
);
const WaLink = ({ msg, children, className = '' }) => (
  <a href={wa(msg)} target="_blank" rel="noopener noreferrer"
    className={`bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold px-4 py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-colors ${className}`}>
    <MessageSquare className="w-4 h-4" aria-hidden="true" /> {children}
  </a>
);
const Img = ({ src, alt, className }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`${className} bg-slate-200 text-slate-500 flex items-center justify-center text-xs text-center p-4`} role="img" aria-label={alt}>
        <Camera className="w-6 h-6 mr-2" aria-hidden="true" /> Photo coming soon
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
};

const DICT = {
  hi: {
    'Asian Paints Colour Cube – Zirakpur': 'एशियन पेंट्स कलर क्यूब – ज़ीरकपुर',
    'Located at SCO 423, Green City, Dhakoli, Zirakpur, Shiva Traders supplies Asian Paints emulsions, primers, putty and SmartCare waterproofing products, with tinting and shade guidance in store.': 'SCO 423, ग्रीन सिटी, ढकोली, ज़ीरकपुर में स्थित शिवा ट्रेडर्स एशियन पेंट्स इमल्शन, प्राइमर, पुट्टी और स्मार्टकेयर वॉटरप्रूफिंग उत्पाद उपलब्ध कराता है। दुकान पर रंग मिलाने और शेड चुनने में भी मदद मिलती है।',
    'Our Store': 'हमारी दुकान',
    'Visit us to look through physical shade cards, compare finishes and get advice that suits your home and lighting.': 'फिजिकल शेड कार्ड देखें, फिनिश की तुलना करें और अपने घर व रोशनी के अनुसार सलाह लें।',
    'Asian Paints Products': 'एशियन पेंट्स उत्पाद',
    'Ask us about availability, pack sizes and which product suits your wall, terrace or bathroom.': 'उपलब्धता, पैक साइज़ और दीवार, छत या बाथरूम के लिए सही उत्पाद पूछें।',
    'Areas We Serve': 'हमारे सेवा क्षेत्र',
    'Asian Paints Retail Stock': 'एशियन पेंट्स स्टॉक',
    'Explore Paint Products': 'पेंट उत्पाद देखें',
    'Interior and exterior paints, wood finishes, primers and putty. Message us for current price and availability.': 'इंटीरियर व एक्सटीरियर पेंट, वुड फिनिश, प्राइमर और पुट्टी। मौजूदा कीमत और उपलब्धता के लिए संदेश करें।',
    'All Products': 'सभी उत्पाद',
    'Interior': 'इंटीरियर',
    'Exterior': 'एक्सटीरियर',
    'Wood & Metal': 'लकड़ी और धातु',
    'Primers & Putty': 'प्राइमर और पुट्टी',
    'Finish:': 'फिनिश:',
    'Check Price & Availability': 'कीमत और उपलब्धता पूछें',
    'Coverage and performance vary by surface and application. Please check the product label or ask us in store.': 'कवरेज और प्रदर्शन सतह व उपयोग पर निर्भर करते हैं। उत्पाद लेबल देखें या दुकान पर पूछें।',
    'Guidance & Painting Enquiries': 'पेंटिंग मार्गदर्शन और पूछताछ',
    'Residential & Commercial Painting': 'घर और व्यावसायिक पेंटिंग',
    'Get shade and product guidance and painting enquiries in Dhakoli, Zirakpur and Panchkula.': 'ढकोली, ज़ीरकपुर और पंचकुला में शेड, उत्पाद मार्गदर्शन और पेंटिंग संबंधी पूछताछ करें।',
    'Enquire on WhatsApp': 'व्हाट्सएप पर पूछें',
    'Asian Paints SmartCare Range': 'एशियन पेंट्स स्मार्टकेयर रेंज',
    'Waterproofing Solutions': 'वॉटरप्रूफिंग समाधान',
    'Tell us where the dampness or leakage is and we will suggest suitable products.': 'सीलन या लीकेज की जगह बताएं, हम उपयुक्त उत्पाद सुझाएंगे।',
    'Use:': 'उपयोग:',
    'Indicative Colour Previews': 'रंगों के नमूने',
    'Colour Studio': 'कलर स्टूडियो',
    'Browse shade ideas and try them in the room preview. On-screen colours vary by display, so please check the physical shade card in store before buying.': 'शेड के सुझाव देखें और रूम प्रीव्यू में आज़माएं। स्क्रीन पर रंग अलग दिख सकते हैं, खरीदने से पहले दुकान में असली शेड कार्ड देखें।',
    'Search shade name or code': 'शेड का नाम या कोड खोजें',
    'Tap “Try in room” on any shade to see it on a wall.': 'दीवार पर देखने के लिए किसी शेड पर “रूम में आज़माएं” दबाएं।',
    'No shades match your search. Try a different name or code.': 'आपकी खोज से कोई शेड नहीं मिला। दूसरा नाम या कोड आज़माएं।',
    'Try in room': 'रूम में आज़माएं',
    'Enquire': 'पूछताछ',
    'Green City, Dhakoli': 'ग्रीन सिटी, ढकोली',
    'Inside Shiva Traders': 'शिवा ट्रेडर्स के अंदर',
    'Our showroom counters, product displays and shade selection area.': 'हमारे शोरूम काउंटर, उत्पाद डिस्प्ले और शेड चयन क्षेत्र।',
    'Quantity Estimator': 'मात्रा अनुमान',
    'Paint Quantity Calculator': 'पेंट मात्रा कैलकुलेटर',
    'A rough estimate of paint, primer and putty for your walls. Actual needs depend on the surface and product.': 'दीवारों के लिए पेंट, प्राइमर और पुट्टी का अनुमान। वास्तविक मात्रा सतह और उत्पाद पर निर्भर करती है।',
    'By Room Size': 'कमरे के आकार से',
    'By Wall Area': 'दीवार के क्षेत्रफल से',
    'Length (ft)': 'लंबाई (फीट)',
    'Width (ft)': 'चौड़ाई (फीट)',
    'Height (ft)': 'ऊंचाई (फीट)',
    'Total wall area (sq. ft.)': 'कुल दीवार क्षेत्र (वर्ग फीट)',
    'Doors': 'दरवाज़े',
    'Windows': 'खिड़कियां',
    'Coats': 'कोट',
    'Paint type': 'पेंट प्रकार',
    'Include primer': 'प्राइमर शामिल करें',
    'Include wall putty': 'वॉल पुट्टी शामिल करें',
    'Estimated Materials': 'अनुमानित सामग्री',
    'Net paintable area': 'पेंट करने योग्य क्षेत्र',
    'Topcoat paint': 'फिनिश पेंट',
    'Primer': 'प्राइमर',
    'Wall putty': 'वॉल पुट्टी',
    'Rough material cost': 'सामग्री की अनुमानित लागत',
    'Indicative only. Prices change and labour is not included. Message us for the current rate.': 'यह केवल अनुमान है। कीमत बदल सकती है और मजदूरी शामिल नहीं है। वर्तमान दर के लिए संदेश करें।',
    'Get a Quote on WhatsApp': 'व्हाट्सएप पर कोटेशन लें',
    'Offers': 'ऑफर',
    'Ask About Current Offers': 'मौजूदा ऑफर पूछें',
    'Offers change from time to time. Message or call us to find out what is available now.': 'ऑफर समय-समय पर बदलते हैं। अभी उपलब्ध ऑफर जानने के लिए संदेश या कॉल करें।',
    'Shade Consultation': 'शेड परामर्श',
    'Bring photos of your walls to the store and we will help you plan colours using shade cards.': 'दीवारों की तस्वीरें दुकान पर लाएं। शेड कार्ड से रंग चुनने में हम मदद करेंगे।',
    'Open Room Preview': 'रूम प्रीव्यू खोलें',
    'Waterproofing Advice': 'वॉटरप्रूफिंग सलाह',
    'Tell us about your terrace, wall or bathroom problem and we will suggest suitable SmartCare products.': 'छत, दीवार या बाथरूम की समस्या बताएं, हम उपयुक्त स्मार्टकेयर उत्पाद सुझाएंगे।',
    'Ask on WhatsApp': 'व्हाट्सएप पर पूछें',
    'Visit or Reach Us': 'आएं या संपर्क करें',
    'Contact Shiva Traders': 'शिवा ट्रेडर्स से संपर्क करें',
    'Store location': 'दुकान का पता',
    'Phone': 'फ़ोन',
    'Open in Google Maps': 'गूगल मैप्स में खोलें',
    'Send a WhatsApp Enquiry': 'व्हाट्सएप पूछताछ भेजें',
    'Your name': 'आपका नाम',
    'Service': 'सेवा',
    'Area': 'क्षेत्र',
    'Your requirement': 'आपकी आवश्यकता',
    'Shade, wall area, or the waterproofing problem': 'शेड, दीवार का क्षेत्र या वॉटरप्रूफिंग समस्या',
    'Send Message via WhatsApp': 'व्हाट्सएप पर संदेश भेजें',
    'Asian Paints Colour Cube store for paints, primers and SmartCare waterproofing products in Zirakpur.': 'ज़ीरकपुर में पेंट, प्राइमर और स्मार्टकेयर वॉटरप्रूफिंग उत्पादों के लिए एशियन पेंट्स कलर क्यूब स्टोर।',
    'Quick links': 'त्वरित लिंक',
    'Service areas': 'सेवा क्षेत्र',
    'Contact': 'संपर्क',
    'Google Maps location': 'गूगल मैप्स लोकेशन'
  },
  pa: {
    'Asian Paints Colour Cube – Zirakpur': 'ਏਸ਼ੀਅਨ ਪੇਂਟਸ ਕਲਰ ਕਿਊਬ – ਜ਼ੀਰਕਪੁਰ',
    'Located at SCO 423, Green City, Dhakoli, Zirakpur, Shiva Traders supplies Asian Paints emulsions, primers, putty and SmartCare waterproofing products, with tinting and shade guidance in store.': 'SCO 423, ਗ੍ਰੀਨ ਸਿਟੀ, ਢਕੋਲੀ, ਜ਼ੀਰਕਪੁਰ ਵਿੱਚ ਸ਼ਿਵਾ ਟ੍ਰੇਡਰਜ਼ ਏਸ਼ੀਅਨ ਪੇਂਟਸ ਇਮਲਸ਼ਨ, ਪ੍ਰਾਈਮਰ, ਪੁੱਟੀ ਅਤੇ ਸਮਾਰਟਕੇਅਰ ਵਾਟਰਪ੍ਰੂਫਿੰਗ ਉਤਪਾਦ ਦਿੰਦਾ ਹੈ। ਦੁਕਾਨ ’ਤੇ ਰੰਗ ਮਿਲਾਉਣ ਅਤੇ ਸ਼ੇਡ ਚੁਣਨ ਵਿੱਚ ਵੀ ਮਦਦ ਮਿਲਦੀ ਹੈ।',
    'Our Store': 'ਸਾਡੀ ਦੁਕਾਨ',
    'Visit us to look through physical shade cards, compare finishes and get advice that suits your home and lighting.': 'ਅਸਲੀ ਸ਼ੇਡ ਕਾਰਡ ਵੇਖੋ, ਫਿਨਿਸ਼ ਦੀ ਤੁਲਨਾ ਕਰੋ ਅਤੇ ਘਰ ਤੇ ਰੋਸ਼ਨੀ ਅਨੁਸਾਰ ਸਲਾਹ ਲਵੋ।',
    'Asian Paints Products': 'ਏਸ਼ੀਅਨ ਪੇਂਟਸ ਉਤਪਾਦ',
    'Ask us about availability, pack sizes and which product suits your wall, terrace or bathroom.': 'ਉਪਲਬਧਤਾ, ਪੈਕ ਸਾਈਜ਼ ਅਤੇ ਕੰਧ, ਛੱਤ ਜਾਂ ਬਾਥਰੂਮ ਲਈ ਢੁਕਵਾਂ ਉਤਪਾਦ ਪੁੱਛੋ।',
    'Areas We Serve': 'ਸਾਡੇ ਸੇਵਾ ਖੇਤਰ',
    'Asian Paints Retail Stock': 'ਏਸ਼ੀਅਨ ਪੇਂਟਸ ਸਟਾਕ',
    'Explore Paint Products': 'ਪੇਂਟ ਉਤਪਾਦ ਵੇਖੋ',
    'Interior and exterior paints, wood finishes, primers and putty. Message us for current price and availability.': 'ਇੰਟੀਰੀਅਰ ਅਤੇ ਐਕਸਟੀਰੀਅਰ ਪੇਂਟ, ਵੁੱਡ ਫਿਨਿਸ਼, ਪ੍ਰਾਈਮਰ ਅਤੇ ਪੁੱਟੀ। ਮੌਜੂਦਾ ਕੀਮਤ ਅਤੇ ਉਪਲਬਧਤਾ ਲਈ ਸੁਨੇਹਾ ਕਰੋ।',
    'All Products': 'ਸਾਰੇ ਉਤਪਾਦ',
    'Interior': 'ਇੰਟੀਰੀਅਰ',
    'Exterior': 'ਐਕਸਟੀਰੀਅਰ',
    'Wood & Metal': 'ਲੱਕੜ ਅਤੇ ਧਾਤ',
    'Primers & Putty': 'ਪ੍ਰਾਈਮਰ ਅਤੇ ਪੁੱਟੀ',
    'Finish:': 'ਫਿਨਿਸ਼:',
    'Check Price & Availability': 'ਕੀਮਤ ਅਤੇ ਉਪਲਬਧਤਾ ਪੁੱਛੋ',
    'Coverage and performance vary by surface and application. Please check the product label or ask us in store.': 'ਕਵਰੇਜ ਅਤੇ ਕਾਰਗੁਜ਼ਾਰੀ ਸਤ੍ਹਾ ਅਤੇ ਵਰਤੋਂ ’ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ। ਲੇਬਲ ਵੇਖੋ ਜਾਂ ਦੁਕਾਨ ’ਤੇ ਪੁੱਛੋ।',
    'Guidance & Painting Enquiries': 'ਪੇਂਟਿੰਗ ਸਲਾਹ ਅਤੇ ਪੁੱਛਗਿੱਛ',
    'Residential & Commercial Painting': 'ਘਰ ਅਤੇ ਵਪਾਰਕ ਪੇਂਟਿੰਗ',
    'Get shade and product guidance and painting enquiries in Dhakoli, Zirakpur and Panchkula.': 'ਢਕੋਲੀ, ਜ਼ੀਰਕਪੁਰ ਅਤੇ ਪੰਚਕੂਲਾ ਵਿੱਚ ਸ਼ੇਡ, ਉਤਪਾਦ ਸਲਾਹ ਅਤੇ ਪੇਂਟਿੰਗ ਬਾਰੇ ਪੁੱਛੋ।',
    'Enquire on WhatsApp': 'ਵਟਸਐਪ ’ਤੇ ਪੁੱਛੋ',
    'Asian Paints SmartCare Range': 'ਏਸ਼ੀਅਨ ਪੇਂਟਸ ਸਮਾਰਟਕੇਅਰ ਰੇਂਜ',
    'Waterproofing Solutions': 'ਵਾਟਰਪ੍ਰੂਫਿੰਗ ਹੱਲ',
    'Tell us where the dampness or leakage is and we will suggest suitable products.': 'ਸੀਲਨ ਜਾਂ ਲੀਕੇਜ ਕਿੱਥੇ ਹੈ ਦੱਸੋ, ਅਸੀਂ ਢੁਕਵੇਂ ਉਤਪਾਦ ਸੁਝਾਵਾਂਗੇ।',
    'Use:': 'ਵਰਤੋਂ:',
    'Indicative Colour Previews': 'ਰੰਗਾਂ ਦੇ ਨਮੂਨੇ',
    'Colour Studio': 'ਕਲਰ ਸਟੂਡੀਓ',
    'Browse shade ideas and try them in the room preview. On-screen colours vary by display, so please check the physical shade card in store before buying.': 'ਸ਼ੇਡ ਦੇ ਸੁਝਾਅ ਵੇਖੋ ਅਤੇ ਰੂਮ ਪ੍ਰੀਵਿਊ ਵਿੱਚ ਅਜ਼ਮਾਓ। ਸਕ੍ਰੀਨ ’ਤੇ ਰੰਗ ਵੱਖਰੇ ਹੋ ਸਕਦੇ ਹਨ, ਖਰੀਦਣ ਤੋਂ ਪਹਿਲਾਂ ਦੁਕਾਨ ’ਤੇ ਅਸਲੀ ਸ਼ੇਡ ਕਾਰਡ ਵੇਖੋ।',
    'Search shade name or code': 'ਸ਼ੇਡ ਦਾ ਨਾਮ ਜਾਂ ਕੋਡ ਖੋਜੋ',
    'Tap “Try in room” on any shade to see it on a wall.': 'ਕੰਧ ’ਤੇ ਵੇਖਣ ਲਈ ਕਿਸੇ ਸ਼ੇਡ ’ਤੇ “ਕਮਰੇ ਵਿੱਚ ਅਜ਼ਮਾਓ” ਦਬਾਓ।',
    'No shades match your search. Try a different name or code.': 'ਤੁਹਾਡੀ ਖੋਜ ਨਾਲ ਕੋਈ ਸ਼ੇਡ ਨਹੀਂ ਮਿਲਿਆ। ਹੋਰ ਨਾਮ ਜਾਂ ਕੋਡ ਅਜ਼ਮਾਓ।',
    'Try in room': 'ਕਮਰੇ ਵਿੱਚ ਅਜ਼ਮਾਓ',
    'Enquire': 'ਪੁੱਛੋ',
    'Green City, Dhakoli': 'ਗ੍ਰੀਨ ਸਿਟੀ, ਢਕੋਲੀ',
    'Inside Shiva Traders': 'ਸ਼ਿਵਾ ਟ੍ਰੇਡਰਜ਼ ਅੰਦਰ',
    'Our showroom counters, product displays and shade selection area.': 'ਸਾਡੇ ਸ਼ੋਰੂਮ ਕਾਊਂਟਰ, ਉਤਪਾਦ ਡਿਸਪਲੇਅ ਅਤੇ ਸ਼ੇਡ ਚੋਣ ਖੇਤਰ।',
    'Quantity Estimator': 'ਮਾਤਰਾ ਅਨੁਮਾਨ',
    'Paint Quantity Calculator': 'ਪੇਂਟ ਮਾਤਰਾ ਕੈਲਕੁਲੇਟਰ',
    'A rough estimate of paint, primer and putty for your walls. Actual needs depend on the surface and product.': 'ਕੰਧਾਂ ਲਈ ਪੇਂਟ, ਪ੍ਰਾਈਮਰ ਅਤੇ ਪੁੱਟੀ ਦਾ ਅੰਦਾਜ਼ਾ। ਅਸਲ ਮਾਤਰਾ ਸਤ੍ਹਾ ਅਤੇ ਉਤਪਾਦ ’ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ।',
    'By Room Size': 'ਕਮਰੇ ਦੇ ਆਕਾਰ ਅਨੁਸਾਰ',
    'By Wall Area': 'ਕੰਧ ਦੇ ਖੇਤਰ ਅਨੁਸਾਰ',
    'Length (ft)': 'ਲੰਬਾਈ (ਫੁੱਟ)',
    'Width (ft)': 'ਚੌੜਾਈ (ਫੁੱਟ)',
    'Height (ft)': 'ਉਚਾਈ (ਫੁੱਟ)',
    'Total wall area (sq. ft.)': 'ਕੁੱਲ ਕੰਧ ਖੇਤਰ (ਵਰਗ ਫੁੱਟ)',
    'Doors': 'ਦਰਵਾਜ਼ੇ',
    'Windows': 'ਖਿੜਕੀਆਂ',
    'Coats': 'ਕੋਟ',
    'Paint type': 'ਪੇਂਟ ਕਿਸਮ',
    'Include primer': 'ਪ੍ਰਾਈਮਰ ਸ਼ਾਮਲ ਕਰੋ',
    'Include wall putty': 'ਵਾਲ ਪੁੱਟੀ ਸ਼ਾਮਲ ਕਰੋ',
    'Estimated Materials': 'ਅੰਦਾਜ਼ਨ ਸਮੱਗਰੀ',
    'Net paintable area': 'ਪੇਂਟ ਕਰਨ ਵਾਲਾ ਖੇਤਰ',
    'Topcoat paint': 'ਫਿਨਿਸ਼ ਪੇਂਟ',
    'Primer': 'ਪ੍ਰਾਈਮਰ',
    'Wall putty': 'ਵਾਲ ਪੁੱਟੀ',
    'Rough material cost': 'ਸਮੱਗਰੀ ਦੀ ਅੰਦਾਜ਼ਨ ਲਾਗਤ',
    'Indicative only. Prices change and labour is not included. Message us for the current rate.': 'ਇਹ ਸਿਰਫ਼ ਅੰਦਾਜ਼ਾ ਹੈ। ਕੀਮਤਾਂ ਬਦਲ ਸਕਦੀਆਂ ਹਨ ਅਤੇ ਮਜ਼ਦੂਰੀ ਸ਼ਾਮਲ ਨਹੀਂ। ਮੌਜੂਦਾ ਰੇਟ ਲਈ ਸੁਨੇਹਾ ਕਰੋ।',
    'Get a Quote on WhatsApp': 'ਵਟਸਐਪ ’ਤੇ ਕੋਟ ਲਵੋ',
    'Offers': 'ਆਫ਼ਰ',
    'Ask About Current Offers': 'ਮੌਜੂਦਾ ਆਫ਼ਰ ਪੁੱਛੋ',
    'Offers change from time to time. Message or call us to find out what is available now.': 'ਆਫ਼ਰ ਬਦਲਦੇ ਰਹਿੰਦੇ ਹਨ। ਇਸ ਵੇਲੇ ਕੀ ਉਪਲਬਧ ਹੈ, ਸੁਨੇਹਾ ਜਾਂ ਕਾਲ ਕਰਕੇ ਪੁੱਛੋ।',
    'Shade Consultation': 'ਸ਼ੇਡ ਸਲਾਹ',
    'Bring photos of your walls to the store and we will help you plan colours using shade cards.': 'ਕੰਧਾਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਦੁਕਾਨ ’ਤੇ ਲਿਆਓ। ਸ਼ੇਡ ਕਾਰਡ ਨਾਲ ਰੰਗ ਚੁਣਨ ਵਿੱਚ ਮਦਦ ਕਰਾਂਗੇ।',
    'Open Room Preview': 'ਰੂਮ ਪ੍ਰੀਵਿਊ ਖੋਲ੍ਹੋ',
    'Waterproofing Advice': 'ਵਾਟਰਪ੍ਰੂਫਿੰਗ ਸਲਾਹ',
    'Tell us about your terrace, wall or bathroom problem and we will suggest suitable SmartCare products.': 'ਛੱਤ, ਕੰਧ ਜਾਂ ਬਾਥਰੂਮ ਦੀ ਸਮੱਸਿਆ ਦੱਸੋ, ਅਸੀਂ ਢੁਕਵੇਂ ਸਮਾਰਟਕੇਅਰ ਉਤਪਾਦ ਸੁਝਾਵਾਂਗੇ।',
    'Ask on WhatsApp': 'ਵਟਸਐਪ ’ਤੇ ਪੁੱਛੋ',
    'Visit or Reach Us': 'ਆਓ ਜਾਂ ਸੰਪਰਕ ਕਰੋ',
    'Contact Shiva Traders': 'ਸ਼ਿਵਾ ਟ੍ਰੇਡਰਜ਼ ਨਾਲ ਸੰਪਰਕ',
    'Store location': 'ਦੁਕਾਨ ਦਾ ਪਤਾ',
    'Phone': 'ਫ਼ੋਨ',
    'Open in Google Maps': 'ਗੂਗਲ ਮੈਪਸ ਵਿੱਚ ਖੋਲ੍ਹੋ',
    'Send a WhatsApp Enquiry': 'ਵਟਸਐਪ ਪੁੱਛਗਿੱਛ ਭੇਜੋ',
    'Your name': 'ਤੁਹਾਡਾ ਨਾਮ',
    'Service': 'ਸੇਵਾ',
    'Area': 'ਇਲਾਕਾ',
    'Your requirement': 'ਤੁਹਾਡੀ ਲੋੜ',
    'Shade, wall area, or the waterproofing problem': 'ਸ਼ੇਡ, ਕੰਧ ਦਾ ਖੇਤਰ ਜਾਂ ਵਾਟਰਪ੍ਰੂਫਿੰਗ ਸਮੱਸਿਆ',
    'Send Message via WhatsApp': 'ਵਟਸਐਪ ’ਤੇ ਸੁਨੇਹਾ ਭੇਜੋ',
    'Asian Paints Colour Cube store for paints, primers and SmartCare waterproofing products in Zirakpur.': 'ਜ਼ੀਰਕਪੁਰ ਵਿੱਚ ਪੇਂਟ, ਪ੍ਰਾਈਮਰ ਅਤੇ ਸਮਾਰਟਕੇਅਰ ਵਾਟਰਪ੍ਰੂਫਿੰਗ ਉਤਪਾਦਾਂ ਲਈ ਏਸ਼ੀਅਨ ਪੇਂਟਸ ਕਲਰ ਕਿਊਬ ਸਟੋਰ।',
    'Quick links': 'ਤੁਰੰਤ ਲਿੰਕ',
    'Service areas': 'ਸੇਵਾ ਖੇਤਰ',
    'Contact': 'ਸੰਪਰਕ',
    'Google Maps location': 'ਗੂਗਲ ਮੈਪਸ ਟਿਕਾਣਾ'
  }
};

/* ---------------- APP ---------------- */
const TAB_IDS = ['home', 'about', 'products', 'services', 'waterproofing', 'studio', 'visualizer', 'gallery', 'calculator', 'offers', 'contact'];
const readHash = () => {
  const h = window.location.hash.replace('#', '');
  return TAB_IDS.includes(h) ? h : 'home';
};

export default function App() {
  const [tab, setTab] = useState(readHash);
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickCalcOpen, setQuickCalcOpen] = useState(false);
  const [productFilter, setProductFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const [galleryCat, setGalleryCat] = useState('All');

  const [roomId, setRoomId] = useState('living-room');
  const [wallId, setWallId] = useState('backWall');
  const [finishId, setFinishId] = useState('sheen');
  const [toast, setToast] = useState('');
  const [incoming, setIncoming] = useState(null);
  const [colors, setColors] = useState({
    'living-room': { backWall: '#81D4FA', leftWall: '#F0F4F1', rightWall: '#C8E6C9' },
    bedroom: { backWall: '#FADEE1', leftWall: '#F5F5F0', rightWall: '#E0DDD5' },
    kitchen: { backWall: '#FFF59D', leftWall: '#F0F4F1', rightWall: '#E6D7C3' },
    dining: { backWall: '#D1C4E9', leftWall: '#FAF0E6', rightWall: '#E8EFEA' },
    exterior: { backWall: '#1E3A8A', leftWall: '#E0DDD5', rightWall: '#FBC02D' }
  });

  const [family, setFamily] = useState('All');
  const [query, setQuery] = useState('');

  const [mode, setMode] = useState('room');
  const [dims, setDims] = useState({ l: 15, w: 12, h: 10, area: 500, doors: 2, windows: 2, coats: 2 });
  const [tier, setTier] = useState('royale');
  const [putty, setPutty] = useState(true);
  const [primer, setPrimer] = useState(true);
  const [form, setForm] = useState({ name: '', service: 'Paint Products Purchase', location: 'Dhakoli', message: '' });

  const t = TR[lang];
  const L = (s) => (lang === 'en' ? s : (DICT[lang] && DICT[lang][s]) || s);
  const nav = TAB_IDS.map((id) => ({ id, label: id === 'studio' ? t.nav.studio : t.nav[id], badge: id === 'visualizer' ? 'New' : null }));

  const go = (id) => {
    window.location.hash = id === 'home' ? '' : id;
    setTab(id);
    setMenuOpen(false);
  };

  // Back/forward buttons
  useEffect(() => {
    const onHash = () => setTab(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [tab]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(id);
  }, [toast]);
  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  // JSON-LD for search engines (real script tag, not a modal)
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org', '@type': 'PaintStore', name: BIZ.name, telephone: `+${BIZ.phone1}`,
      address: { '@type': 'PostalAddress', streetAddress: 'SCO 423, Green City, Dhakoli', addressLocality: 'Zirakpur', addressRegion: 'Punjab', postalCode: '140603', addressCountry: 'IN' },
      hasMap: BIZ.maps, sameAs: [BIZ.review], url: window.location.origin, areaServed: BIZ.areas,
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '09:00', closes: '20:30' }]
    };
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.text = JSON.stringify(data);
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
  }, []);

  useEffect(() => {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    const st = document.createElement('style');
    st.textContent = `
      body{font-family:'Plus Jakarta Sans',system-ui,sans-serif;background:#f7f6f3;color:#33312e;overflow-x:hidden}
      h1,h2{font-family:'Fraunces',Georgia,serif;letter-spacing:-.01em}
      *,*::before,*::after{box-sizing:border-box}
      img,video,canvas,svg{max-width:100%}
      /* Neutral, warm-white palette overrides */
      .bg-slate-50{background-color:#f7f6f3!important}
      .bg-slate-100{background-color:#efede8!important}
      .bg-slate-200{background-color:#e6e2dc!important}
      .bg-slate-900,.bg-slate-950{background-color:#f1efeb!important}
      .bg-slate-800{background-color:#e8e5df!important}
      .bg-slate-700{background-color:#ddd8d0!important}
      .bg-slate-600{background-color:#d2ccc3!important}
      .text-white{color:#292724!important}
      .text-slate-950,.text-slate-900{color:#292724!important}
      .text-slate-800{color:#373430!important}
      .text-slate-700{color:#4a4641!important}
      .text-slate-600{color:#625d56!important}
      .text-slate-500{color:#777169!important}
      .text-slate-400{color:#8a837a!important}
      .text-slate-300,.text-slate-200{color:#6d675f!important}
      .border-slate-800,.border-slate-700,.border-slate-600{border-color:#d8d3cb!important}
      .bg-amber-500{background-color:#c5a77b!important}
      .bg-amber-600,.bg-amber-700{background-color:#ad9169!important}
      .text-amber-400,.text-amber-500{color:#94754d!important}
      .border-amber-500{border-color:#c5a77b!important}
      .bg-emerald-700{background-color:#687f70!important}
      .bg-orange-600{background-color:#a17d56!important}
      .bg-gradient-to-tr{background-image:linear-gradient(135deg,#c9b69b,#a68c6b)!important}
      header{background:#f5f3ef!important;border-color:#ddd8d0!important;color:#292724!important}
      header nav button:hover,header button:hover{background-color:#e9e5df!important}
      @media(max-width:640px){
        header>div:first-child{gap:8px!important;padding-left:12px!important;padding-right:12px!important;min-height:68px!important}
        header button[aria-label='Shiva Traders home']{min-width:0!important;gap:8px!important;max-width:calc(100% - 130px)}
        header button[aria-label='Shiva Traders home']>div:first-child{width:36px!important;height:36px!important;flex-shrink:0}
        header button[aria-label='Shiva Traders home'] span:first-child{font-size:15px!important;white-space:nowrap}
        header button[aria-label='Shiva Traders home'] span:nth-child(2){font-size:9px!important;white-space:nowrap}
        header label[aria-label='Website language']{padding:6px 7px!important;gap:4px!important;font-size:11px!important}
        header label[aria-label='Website language'] select{max-width:75px!important;font-size:11px!important}
        header button[aria-label='Toggle navigation menu']{padding:6px!important}
        main{min-width:0!important}
      }
      @media(max-width:360px){header button[aria-label='Shiva Traders home'] span:nth-child(2){display:none!important}header label[aria-label='Website language'] select{max-width:68px!important}}
      @media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
    `;
    document.head.appendChild(l); document.head.appendChild(st);
    return () => { document.head.removeChild(l); document.head.removeChild(st); };
  }, []);

  const room = ROOMS.find((r) => r.id === roomId) || ROOMS[0];
  const finish = FINISHES[finishId];
  const wc = colors[roomId];

  const applyShade = (shade) => { setIncoming({ shade, n: Date.now() }); go('visualizer'); };

  const calc = useMemo(() => {
    const raw = mode === 'room' ? 2 * (num(dims.l) + num(dims.w)) * num(dims.h) : num(dims.area);
    const net = Math.max(0, Math.round(raw - num(dims.doors) * 21 - num(dims.windows) * 12));
    const tr = TIERS[tier];
    const coats = Math.max(1, num(dims.coats) || 2);
    const paint = Math.ceil((net / tr.cover) * (coats / 2));
    const pr = primer ? Math.ceil(net / 210) : 0;
    const pu = putty ? Math.ceil(net / 18) : 0;
    return { net, paint, primer: pr, putty: pu, cost: paint * tr.price + pr * 180 + pu * 45, coats };
  }, [mode, dims, tier, putty, primer]);

  const shownProducts = productFilter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === productFilter);
  const shownShades = SHADES.filter((s) => (family === 'All' || s.family === family) && (s.name.toLowerCase().includes(query.toLowerCase()) || s.code.toLowerCase().includes(query.toLowerCase())));
  const shownGallery = galleryCat === 'All' ? GALLERY : GALLERY.filter((g) => g.cat === galleryCat);
  const setDim = (k) => (e) => setDims({ ...dims, [k]: e.target.value });
  const input = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-amber-500';

  const paletteMsg = ROOMS.length && `Hello Shiva Traders, I made a palette using the Room Preview. Room: ${room.name}. ` +
    room.walls.map(([id, label]) => {
      const hex = wc[id];
      const m = SHADES.find((s) => s.hex.toLowerCase() === hex.toLowerCase());
      return `${label}: ${m ? `${m.name} (${m.code})` : hex}`;
    }).join(', ') + '. Please advise on paint required.';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-amber-500 selection:text-white">
      {/* TOP BAR */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <span className="flex items-center gap-1 text-amber-400 font-medium"><Sparkles className="w-3.5 h-3.5" aria-hidden="true" /> {L("Asian Paints Colour Cube – Zirakpur")}</span>
          <div className="flex items-center gap-3">
            <a href={tel(BIZ.phone1)} className="hover:text-amber-400 flex items-center gap-1"><Phone className="w-3 h-3 text-amber-500" aria-hidden="true" /> {BIZ.phone1Fmt}</a>
            <a href={tel(BIZ.phone2)} className="hidden md:inline hover:text-amber-400">/ {BIZ.phone2Fmt}</a>

          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 min-h-20 py-2 flex items-center gap-4 2xl:gap-5">
          <button onClick={() => go('home')} className="flex items-center gap-3 text-left shrink-0 min-w-[220px]" aria-label="Shiva Traders home">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center">
              <Paintbrush className="w-6 h-6 text-slate-950" aria-hidden="true" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight block leading-tight">SHIVA TRADERS</span>
              <span className="text-[11px] text-amber-400 font-semibold tracking-wider">Asian Paints Colour Cube</span>
            </div>
          </button>

          <label className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm" aria-label="Website language">
            <Globe className="h-4 w-4 text-amber-400" aria-hidden="true" />
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="max-w-[118px] bg-transparent text-white outline-none cursor-pointer" aria-label="Select language">
              <option value="en" className="bg-slate-900">English</option><option value="hi" className="bg-slate-900">हिन्दी</option><option value="pa" className="bg-slate-900">ਪੰਜਾਬੀ</option>
            </select>
          </label>

          <nav className="hidden 2xl:flex flex-1 items-center justify-center gap-0.5 min-w-0" aria-label="Main">
            {nav.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} aria-current={tab === n.id ? 'page' : undefined}
                className={`px-1.5 py-2 rounded-lg text-[11px] font-semibold flex items-center gap-1 whitespace-nowrap shrink-0 ${tab === n.id ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}>
                {n.label}
                {n.badge && <span className="bg-orange-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{n.badge}</span>}
              </button>
            ))}
          </nav>

          <div className="hidden 2xl:flex items-center gap-2">
            <a href={tel(BIZ.phone1)} className="bg-slate-800 hover:bg-slate-700 text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-700 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" /> {t.c.call}</a>
            <a href={wa(DEFAULT_WA)} target="_blank" rel="noopener noreferrer" className="bg-emerald-700 hover:bg-emerald-600 text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" aria-hidden="true" /> WhatsApp</a>
          </div>

          <button className="2xl:hidden p-2 rounded-lg bg-slate-800 ml-auto shrink-0" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu" aria-expanded={menuOpen}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="2xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
            {nav.map((n) => (
              <button key={n.id} onClick={() => go(n.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-between ${tab === n.id ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-200 hover:bg-slate-800'}`}>
                <span>{n.label}</span><ChevronRight className="w-4 h-4 opacity-60" aria-hidden="true" />
              </button>
            ))}
            <div className="pt-3 flex gap-2 border-t border-slate-800">
              <a href={tel(BIZ.phone1)} className="flex-1 bg-slate-800 text-amber-400 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700"><Phone className="w-4 h-4" aria-hidden="true" /> {t.c.call}</a>
              <a href={wa(DEFAULT_WA)} target="_blank" rel="noopener noreferrer" className="flex-1 bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"><MessageSquare className="w-4 h-4" aria-hidden="true" /> WhatsApp</a>
            </div>
          </div>
        )}
      </header>

      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl border border-amber-500/40 max-w-[90vw]">{toast}</div>
      )}

      <main className="flex-grow">
        

        {/* HOME */}
        {tab === 'home' && (
          <div className="space-y-16 pb-16">
            <section className="relative bg-[#f7f6f3] text-[#292724] overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28 lg:pt-20 lg:pb-32 grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <p className="text-sm text-amber-700 font-semibold">{t.hero.badge}</p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05]">{t.hero.a}{t.hero.b}</h1>
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{t.hero.sub}</p>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => go('visualizer')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-full flex items-center gap-2"><Sparkles className="w-5 h-5" aria-hidden="true" /> {t.hero.preview}</button>
                    <a href={wa(DEFAULT_WA)} target="_blank" rel="noopener noreferrer" className="bg-[#e8e5df] hover:bg-[#ddd8d0] text-[#292724] font-bold px-6 py-3.5 rounded-full flex items-center gap-2 border border-[#d8d3cb]"><MessageSquare className="w-5 h-5" aria-hidden="true" /> {t.hero.wa}</a>
                  </div>
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-sm text-slate-300">
                    {['Asian Paints Colour Cube', 'Computerized tinting', 'SmartCare waterproofing'].map((x) => <li key={x} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" /> {L(x)}</li>)}
                  </ul>
                </div>
                <div className="lg:col-span-7"><HeroRoom shades={SHADES} onOpen={() => go('visualizer')} L={L} /></div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 grid md:grid-cols-4 gap-6">
                {[[MapPin, t.c.address, BIZ.address], [Phone, t.c.phone, `${BIZ.phone1Fmt} / ${BIZ.phone2Fmt}`], [Clock, t.c.hours, L(BIZ.hours)]].map(([Ic, label, val]) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0"><Ic className="w-6 h-6" aria-hidden="true" /></div>
                    <div><h4 className="text-xs font-bold text-slate-500">{label}</h4><p className="text-sm font-semibold text-slate-800 mt-1">{val}</p></div>
                  </div>
                ))}
                <div className="flex items-center md:justify-end">
                  <a href={BIZ.maps} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2"><Navigation className="w-4 h-4 text-amber-400" aria-hidden="true" /> {t.c.directions}</a>
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
                <Eyebrow>{t.s.psSub}</Eyebrow>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">{t.s.psTitle}</h2>
                <p className="text-slate-600 text-sm sm:text-base">{t.s.psDesc}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {OVERVIEW.map((o) => (
                  <div key={o.id} className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">{L(o.badge)}</span>
                      <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2">{L(o.title)}</h3>
                      <p className="text-slate-600 text-sm mb-4">{L(o.sub)}</p>
                      <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        {o.items.map((s) => <div key={s} className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" aria-hidden="true" /> {L(s)}</div>)}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => go(o.tab)} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5">{t.c.learn} <ChevronRight className="w-4 h-4" aria-hidden="true" /></button>
                      <WaLink msg={o.msg}>{t.c.enquire}</WaLink>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div className="space-y-2">
                    <Eyebrow>{t.s.gSub}</Eyebrow>
                    <h2 className="text-2xl sm:text-4xl font-extrabold">{t.s.gTitle}</h2>
                    <p className="text-slate-400 text-sm max-w-xl">{t.s.gDesc}</p>
                  </div>
                  <button onClick={() => go('gallery')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 self-start"><Camera className="w-4 h-4" aria-hidden="true" /> {t.s.gBtn}</button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {GALLERY.slice(0, 4).map((g) => (
                    <button key={g.id} onClick={() => setLightbox(g)} className="text-left bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-500/50">
                      <Img src={g.img} alt={g.title} className="w-full h-48 object-contain bg-slate-100" />
                      <div className="p-4"><span className="text-[11px] font-bold text-amber-400">{L(g.cat)}</span><h3 className="text-sm font-bold mt-1">{L(g.title)}</h3></div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
                <Eyebrow>{t.s.wSub}</Eyebrow>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">{t.s.wTitle}</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[[ShieldCheck, 'Asian Paints Products', 'Paints, primers and SmartCare products from the Asian Paints range.'], [Paintbrush, 'Tinting', 'Computerized tinting to match shade codes.'], [Sparkles, 'Colour Consultation', 'Help choosing interior and exterior shade combinations.'], [Droplet, 'Waterproofing Guidance', 'Advice on products for terrace, wall and bathroom dampness.']].map(([Ic, h, d]) => (
                  <div key={h} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center mb-4"><Ic className="w-6 h-6" aria-hidden="true" /></div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{L(h)}</h3>
                    <p className="text-slate-600 text-sm">{L(d)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-100 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
                  <Eyebrow>{t.s.tSub}</Eyebrow>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">{t.s.tTitle}</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {REVIEWS.map((r) => (
                    <div key={r.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex gap-1 text-amber-500 mb-3" aria-label="5 out of 5 stars">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />)}</div>
                      <p className="text-slate-700 text-sm italic mb-4">“{r.text}”</p>
                      <p className="font-bold text-slate-900 text-xs">{r.name} <span className="text-slate-500 font-normal">· {L(r.meta)}</span></p>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <a href={BIZ.review} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-xl"><Star className="w-4 h-4 text-amber-400 fill-current" aria-hidden="true" /> {t.s.tBtn} <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /></a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ABOUT */}
        {tab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black">{BIZ.name}</h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-3xl">{L("Located at SCO 423, Green City, Dhakoli, Zirakpur, Shiva Traders supplies Asian Paints emulsions, primers, putty and SmartCare waterproofing products, with tinting and shade guidance in store.")}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-3"><Building2 className="w-8 h-8 text-amber-600" aria-hidden="true" /><h3 className="text-xl font-bold">{L("Our Store")}</h3><p className="text-slate-600 text-sm">{L("Visit us to look through physical shade cards, compare finishes and get advice that suits your home and lighting.")}</p></div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-3"><ShieldCheck className="w-8 h-8 text-amber-600" aria-hidden="true" /><h3 className="text-xl font-bold">{L("Asian Paints Products")}</h3><p className="text-slate-600 text-sm">{L("Ask us about availability, pack sizes and which product suits your wall, terrace or bathroom.")}</p></div>
            </div>
            <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><MapPin className="w-5 h-5 text-amber-700" aria-hidden="true" /> {L("Areas We Serve")}</h3>
              <div className="flex flex-wrap gap-2">{BIZ.areas.map((a) => <span key={a} className="bg-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200">{a}</span>)}</div>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {tab === 'products' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <PageHead eyebrow={L("Asian Paints Retail Stock")} title={L("Explore Paint Products")} desc={L("Interior and exterior paints, wood finishes, primers and putty. Message us for current price and availability.")} />
            <div className="flex flex-wrap justify-center gap-2">
              {[['all', L('All Products')], ['interior', L('Interior')], ['exterior', L('Exterior')], ['wood-metal', L('Wood & Metal')], ['primers-putty', L('Primers & Putty')]].map(([id, l]) => (
                <button key={id} onClick={() => setProductFilter(id)} aria-pressed={productFilter === id}
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${productFilter === id ? 'bg-amber-500 text-slate-950' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>{l}</button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shownProducts.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs bg-slate-100 text-amber-800 font-bold px-2.5 py-1 rounded-md border border-slate-200">{L(p.badge)}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-3 mb-2">{p.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{L(p.desc)}</p>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl mb-6"><span className="font-bold">{L("Finish:")}</span> {L(p.finish)}</p>
                  </div>
                  <WaLink msg={p.msg} className="bg-slate-900 hover:bg-slate-800">{L("Check Price & Availability")}</WaLink>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-500">{L("Coverage and performance vary by surface and application. Please check the product label or ask us in store.")}</p>
          </div>
        )}

        {/* SERVICES */}
        {tab === 'services' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <PageHead eyebrow={L("Guidance & Painting Enquiries")} title={L("Residential & Commercial Painting")} desc={L("Get shade and product guidance and painting enquiries in Dhakoli, Zirakpur and Panchkula.")} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((s) => (
                <div key={s.t} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center mb-4"><s.i className="w-6 h-6" aria-hidden="true" /></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{L(s.t)}</h3>
                    <p className="text-slate-600 text-sm mb-6">{L(s.d)}</p>
                  </div>
                  <WaLink msg={s.m}>{L("Enquire on WhatsApp")}</WaLink>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WATERPROOFING */}
        {tab === 'waterproofing' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <PageHead eyebrow={L("Asian Paints SmartCare Range")} title={L("Waterproofing Solutions")} desc={L("Tell us where the dampness or leakage is and we will suggest suitable products.")} />
            <div className="grid md:grid-cols-2 gap-8">
              {WATERPROOF.map((w) => (
                <div key={w.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2">
                      <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">{L(w.badge)}</span>
                      <span className="text-xs text-slate-500">{L("Use:")} {L(w.target)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{w.name}</h3>
                    <p className="text-slate-600 text-sm mb-6">{L(w.desc)}</p>
                  </div>
                  <WaLink msg={w.msg} className="bg-slate-900 hover:bg-slate-800">{t.c.enqWp}</WaLink>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COLOUR STUDIO */}
        {tab === 'studio' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <PageHead eyebrow={L("Indicative Colour Previews")} title={L("Colour Studio")} desc={L("Browse shade ideas and try them in the room preview. On-screen colours vary by display, so please check the physical shade card in store before buying.")} />
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
                <input type="text" aria-label="Search shade name or code" placeholder={L("Search shade name or code")} value={query} onChange={(e) => setQuery(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {FAMILIES.map((f) => (
                  <button key={f} onClick={() => setFamily(f)} aria-pressed={family === f} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${family === f ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{L(f)}</button>
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center">{L("Tap “Try in room” on any shade to see it on a wall.")}</p>
            {shownShades.length === 0 && <p className="text-center text-sm text-slate-500">{L("No shades match your search. Try a different name or code.")}</p>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {shownShades.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="h-28 w-full" style={{ backgroundColor: s.hex }} role="img" aria-label={`${s.name} colour swatch`} />
                    <div className="p-3">
                      <h3 className="font-bold text-slate-900 text-sm">{s.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Code {s.code} · {s.collection}</p>
                    </div>
                  </div>
                  <div className="p-3 pt-0 space-y-1.5">
                    <button onClick={() => applyShade(s, true)} className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1"><Sparkles className="w-3 h-3 text-amber-400" aria-hidden="true" /> {L("Try in room")}</button>
                    <a href={wa(`Hello Shiva Traders, I am interested in Asian Paints shade ${s.name} (${s.code}). Please confirm availability.`)} target="_blank" rel="noopener noreferrer" className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold py-1.5 rounded-lg flex items-center justify-center gap-1"><MessageSquare className="w-3 h-3" aria-hidden="true" /> {L("Enquire")}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROOM STUDIO */}
        {tab === 'visualizer' && <RoomStudio shades={SHADES} families={FAMILIES} wa={wa} incoming={incoming} L={L} />}

        {/* GALLERY */}
        {tab === 'gallery' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <PageHead eyebrow={L("Green City, Dhakoli")} title={L("Inside Shiva Traders")} desc={L("Our showroom counters, product displays and shade selection area.")} />
            <div className="flex flex-wrap justify-center gap-2">
              {GALLERY_CATS.map((c) => (
                <button key={c} onClick={() => setGalleryCat(c)} aria-pressed={galleryCat === c} className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${galleryCat === c ? 'bg-amber-500 text-slate-950' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>{L(c)}</button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {shownGallery.map((g) => (
                <button key={g.id} onClick={() => setLightbox(g)} className="text-left bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg">
                  <Img src={g.img} alt={g.title} className="w-full h-52 object-contain bg-slate-100" />
                  <div className="p-4"><span className="text-[11px] font-bold text-amber-700">{L(g.cat)}</span><h3 className="text-sm font-bold text-slate-900 mt-1">{L(g.title)}</h3><p className="text-slate-500 text-xs mt-1">{L(g.cap)}</p></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CALCULATOR */}
        {tab === 'calculator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <PageHead eyebrow={L("Quantity Estimator")} title={L("Paint Quantity Calculator")} desc={L("A rough estimate of paint, primer and putty for your walls. Actual needs depend on the surface and product.")} />
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  {[['room', L('By Room Size')], ['area', L('By Wall Area')]].map(([id, l]) => (
                    <button key={id} onClick={() => setMode(id)} aria-pressed={mode === id} className={`flex-1 py-2.5 rounded-lg text-xs font-bold ${mode === id ? 'bg-amber-500 text-slate-950' : 'text-slate-600'}`}>{l}</button>
                  ))}
                </div>
                {mode === 'room' ? (
                  <div className="grid grid-cols-3 gap-4">
                    {[['l', L('Length (ft)')], ['w', L('Width (ft)')], ['h', L('Height (ft)')]].map(([k, l]) => (
                      <div key={k}><label htmlFor={`c-${k}`} className="text-xs font-bold text-slate-700 block mb-1">{l}</label><input id={`c-${k}`} type="number" min="0" value={dims[k]} onChange={setDim(k)} className={input} /></div>
                    ))}
                  </div>
                ) : (
                  <div><label htmlFor="c-area" className="text-xs font-bold text-slate-700 block mb-1">{L("Total wall area (sq. ft.)")}</label><input id="c-area" type="number" min="0" value={dims.area} onChange={setDim('area')} className={input} /></div>
                )}
                <div className="grid grid-cols-3 gap-4">
                  {[['doors', L('Doors')], ['windows', L('Windows')]].map(([k, l]) => (
                    <div key={k}><label htmlFor={`c-${k}`} className="text-xs font-bold text-slate-700 block mb-1">{l}</label><input id={`c-${k}`} type="number" min="0" value={dims[k]} onChange={setDim(k)} className={input} /></div>
                  ))}
                  <div><label htmlFor="c-coats" className="text-xs font-bold text-slate-700 block mb-1">{L("Coats")}</label>
                    <select id="c-coats" value={dims.coats} onChange={setDim('coats')} className={input}><option value={1}>1</option><option value={2}>2</option><option value={3}>3</option></select></div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700 mb-2">{L("Paint type")}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(TIERS).map(([id, tr]) => (
                      <button key={id} onClick={() => setTier(id)} aria-pressed={tier === id} className={`p-3 rounded-xl border text-left ${tier === id ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}>
                        <span className="block text-xs font-bold">{tr.name}</span><span className="block text-[11px] opacity-80 mt-0.5">~₹{tr.price}/L</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700"><input type="checkbox" checked={primer} onChange={(e) => setPrimer(e.target.checked)} className="w-4 h-4 accent-amber-500" /> {L("Include primer")}</label>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700"><input type="checkbox" checked={putty} onChange={(e) => setPutty(e.target.checked)} className="w-4 h-4 accent-amber-500" /> {L("Include wall putty")}</label>
                </div>
              </div>
              <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-4">
                <h2 className="text-2xl font-black">{L("Estimated Materials")}</h2>
                {[[L('Net paintable area'), `${calc.net} sq. ft.`], [L('Topcoat paint'), `${calc.paint} L`], ...(primer ? [[L('Primer'), `${calc.primer} L`]] : []), ...(putty ? [[L('Wall putty'), `${calc.putty} kg`]] : [])].map(([l, v]) => (
                  <div key={l} className="flex justify-between py-3 border-b border-slate-800"><span className="text-xs text-slate-400">{l}</span><span className="text-base font-bold">{v}</span></div>
                ))}
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                  <span className="text-xs text-slate-400">{L("Rough material cost")}</span>
                  <p className="text-3xl font-black text-amber-400 mt-1">₹ {calc.cost.toLocaleString('en-IN')}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{L("Indicative only. Prices change and labour is not included. Message us for the current rate.")}</p>
                </div>
                <WaLink msg={`Hello Shiva Traders, I used your calculator: Area ${calc.net} sq.ft., ${TIERS[tier].name} ${calc.paint}L (${calc.coats} coats), Primer ${calc.primer}L, Putty ${calc.putty}kg. Please share the current rates.`} className="w-full py-3.5">{L("Get a Quote on WhatsApp")}</WaLink>
              </div>
            </div>
          </div>
        )}

        {/* OFFERS */}
        {tab === 'offers' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <PageHead eyebrow={L("Offers")} title={L("Ask About Current Offers")} desc={L("Offers change from time to time. Message or call us to find out what is available now.")} />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col justify-between space-y-6">
                <div className="space-y-3"><h3 className="text-2xl font-black">{L("Shade Consultation")}</h3><p className="text-slate-300 text-sm">{L("Bring photos of your walls to the store and we will help you plan colours using shade cards.")}</p></div>
                <button onClick={() => go('visualizer')} className="self-start bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-6 py-3 rounded-xl">{L("Open Room Preview")}</button>
              </div>
              <div className="bg-amber-700 text-white p-8 rounded-3xl flex flex-col justify-between space-y-6">
                <div className="space-y-3"><h3 className="text-2xl font-black">{L("Waterproofing Advice")}</h3><p className="text-amber-50 text-sm">{L("Tell us about your terrace, wall or bathroom problem and we will suggest suitable SmartCare products.")}</p></div>
                <WaLink msg="Hello Shiva Traders, I would like advice on waterproofing and any current offers." className="self-start bg-slate-950 hover:bg-slate-900">{L("Ask on WhatsApp")}</WaLink>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT */}
        {tab === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <PageHead eyebrow={L("Visit or Reach Us")} title={L("Contact Shiva Traders")} desc={L(BIZ.hours)} />
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
                <div><h2 className="text-xs font-bold text-slate-500">{L("Store location")}</h2><p className="text-sm font-bold text-slate-900 mt-1">{BIZ.address}</p></div>
                <div><h2 className="text-xs font-bold text-slate-500">{L("Phone")}</h2>
                  <a href={tel(BIZ.phone1)} className="text-sm font-bold text-slate-900 block hover:text-amber-700 mt-1">{BIZ.phone1Fmt}</a>
                  <a href={tel(BIZ.phone2)} className="text-sm font-bold text-slate-900 block hover:text-amber-700">{BIZ.phone2Fmt}</a></div>
                <a href={BIZ.maps} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2"><Navigation className="w-4 h-4 text-amber-400" aria-hidden="true" /> {L("Open in Google Maps")}</a>
              </div>
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
                <h2 className="text-xl font-bold text-slate-900">{L("Send a WhatsApp Enquiry")}</h2>
                <div><label htmlFor="f-name" className="text-xs font-bold text-slate-700 block mb-1">{L("Your name")}</label><input id="f-name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} /></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label htmlFor="f-svc" className="text-xs font-bold text-slate-700 block mb-1">{L("Service")}</label>
                    <select id="f-svc" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={input}>
                      {['Paint Products Purchase', 'Waterproofing Requirement', 'Home Painting Consultation', 'Colour Preview Help'].map((o) => <option key={o} value={o}>{L(o)}</option>)}
                    </select></div>
                  <div><label htmlFor="f-loc" className="text-xs font-bold text-slate-700 block mb-1">{L("Area")}</label><input id="f-loc" type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={input} /></div>
                </div>
                <div><label htmlFor="f-msg" className="text-xs font-bold text-slate-700 block mb-1">{L("Your requirement")}</label><textarea id="f-msg" rows={4} placeholder={L("Shade, wall area, or the waterproofing problem")} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={input} /></div>
                <WaLink msg={`Hello Shiva Traders, Name: ${form.name || 'Customer'}, Area: ${form.location}, Service: ${form.service}, Details: ${form.message || 'General enquiry'}`} className="w-full py-4">{L("Send Message via WhatsApp")}</WaLink>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FLOATING QUICK CALCULATOR */}
      {tab !== 'calculator' && (
        <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-3">
          {quickCalcOpen && (
            <div className="w-[min(92vw,350px)] bg-white text-slate-900 border border-slate-200 rounded-2xl shadow-2xl p-4 sm:p-5 space-y-3 max-h-[75vh] overflow-y-auto" role="dialog" aria-label="Quick paint calculator">
              <div className="flex items-center justify-between gap-3">
                <div><h3 className="font-black text-lg">Quick Paint Calculator</h3><p className="text-xs text-slate-500">Estimate while browsing</p></div>
                <button onClick={() => setQuickCalcOpen(false)} aria-label="Close quick calculator" className="p-2 rounded-lg hover:bg-slate-100"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {[['room', 'Room size'], ['area', 'Wall area']].map(([id, label]) => <button key={id} onClick={() => setMode(id)} aria-pressed={mode === id} className={`flex-1 py-2 rounded-lg text-xs font-bold ${mode === id ? 'bg-amber-500 text-slate-950' : 'text-slate-600'}`}>{label}</button>)}
              </div>
              {mode === 'room' ? <div className="grid grid-cols-3 gap-2">
                {[['l','Length'],['w','Width'],['h','Height']].map(([k,label]) => <label key={k} className="text-[11px] font-bold text-slate-600">{label} (ft)<input type="number" min="0" value={dims[k]} onChange={setDim(k)} className="w-full mt-1 px-2 py-2 rounded-lg border border-slate-200 text-sm" /></label>)}
              </div> : <label className="block text-xs font-bold text-slate-600">Wall area (sq. ft.)<input type="number" min="0" value={dims.area} onChange={setDim('area')} className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm" /></label>}
              <div className="grid grid-cols-3 gap-2">
                {[['doors','Doors'],['windows','Windows']].map(([k,label]) => <label key={k} className="text-[11px] font-bold text-slate-600">{label}<input type="number" min="0" value={dims[k]} onChange={setDim(k)} className="w-full mt-1 px-2 py-2 rounded-lg border border-slate-200 text-sm" /></label>)}
                <label className="text-[11px] font-bold text-slate-600">Coats<select value={dims.coats} onChange={setDim('coats')} className="w-full mt-1 px-2 py-2 rounded-lg border border-slate-200 text-sm"><option value={1}>1</option><option value={2}>2</option><option value={3}>3</option></select></label>
              </div>
              <label className="block text-xs font-bold text-slate-600">Paint type<select value={tier} onChange={(e) => setTier(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm">{Object.entries(TIERS).map(([id,tr]) => <option key={id} value={id}>{tr.name} (~₹{tr.price}/L)</option>)}</select></label>
              <div className="grid grid-cols-2 gap-2 text-xs"><label className="flex items-center gap-2"><input type="checkbox" checked={primer} onChange={(e) => setPrimer(e.target.checked)} />Primer</label><label className="flex items-center gap-2"><input type="checkbox" checked={putty} onChange={(e) => setPutty(e.target.checked)} />Wall putty</label></div>
              <div className="rounded-xl bg-amber-50 border border-amber-100 p-3 space-y-1"><p className="text-xs text-slate-500">Net paintable area: <strong>{calc.net} sq. ft.</strong></p><p className="text-sm font-bold">Paint: {calc.paint} L{primer ? ` · Primer: ${calc.primer} L` : ''}{putty ? ` · Putty: ${calc.putty} kg` : ''}</p><p className="text-xl font-black text-amber-700">Approx. ₹{calc.cost.toLocaleString('en-IN')}</p><p className="text-[10px] text-slate-500">Indicative material cost; excludes labour.</p></div>
              <button onClick={() => { setQuickCalcOpen(false); go('calculator'); }} className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold">Open full calculator</button>
            </div>
          )}
          <button onClick={() => setQuickCalcOpen(!quickCalcOpen)} aria-label={quickCalcOpen ? 'Close quick calculator' : 'Open quick calculator'} aria-expanded={quickCalcOpen} className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xl flex items-center justify-center border-2 border-white"><Calculator className="w-6 h-6" /></button>
        </div>
      )}

      <a href={wa(DEFAULT_WA)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 bg-emerald-600 hover:bg-emerald-500 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"><MessageSquare className="w-6 h-6" aria-hidden="true" /></a>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={lightbox.title} onClick={() => setLightbox(null)}>
          <div className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} aria-label="Close image" className="absolute top-4 right-4 z-10 bg-slate-950/80 text-white p-2 rounded-full hover:bg-slate-800"><X className="w-6 h-6" /></button>
            <Img src={lightbox.img} alt={lightbox.title} className="w-full max-h-[70vh] object-contain bg-slate-950" />
            <div className="p-6 text-white"><span className="text-xs font-bold text-amber-400">{L(lightbox.cat)}</span><h3 className="text-lg font-bold mt-1">{L(lightbox.title)}</h3><p className="text-slate-400 text-xs mt-1">{L(lightbox.cap)}</p></div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-3"><span className="font-extrabold text-white text-base">SHIVA TRADERS</span><p>{L("Asian Paints Colour Cube store for paints, primers and SmartCare waterproofing products in Zirakpur.")}</p></div>
            <div><h3 className="text-xs font-bold text-white mb-3">{L("Quick links")}</h3>
              <ul className="space-y-2">{['home', 'products', 'services', 'waterproofing', 'studio', 'visualizer', 'calculator', 'contact'].map((id) => <li key={id}><button onClick={() => go(id)} className="hover:text-amber-400">{id === 'studio' ? t.nav.studio : t.nav[id]}</button></li>)}</ul></div>
            <div><h3 className="text-xs font-bold text-white mb-3">{L("Service areas")}</h3><p>{BIZ.areas.join(', ')}.</p></div>
            <div><h3 className="text-xs font-bold text-white mb-3">{L("Contact")}</h3><p className="text-slate-300 font-semibold mb-2">{BIZ.address}</p>
              <a href={tel(BIZ.phone1)} className="text-amber-400 font-bold block">{BIZ.phone1Fmt}</a>
              <a href={tel(BIZ.phone2)} className="text-amber-400 font-bold block mb-2">{BIZ.phone2Fmt}</a><p>{L(BIZ.hours)}</p></div>
          </div>
          <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} Shiva Traders – Asian Paints Colour Cube. All rights reserved.</p>
            <a href={BIZ.maps} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">{L("Google Maps location")}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
