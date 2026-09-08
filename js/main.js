// CraftStand.ma - Shared JavaScript

// ===== i18n TRANSLATIONS =====
const translations = {
  en: {
    'header.subtitle': 'DESIGN 3D & FABRICATION SUR-MESURE',
    'nav.home': 'Home', 'nav.services': 'Services', 'nav.portfolio': 'Portfolio', 'nav.contact': 'Contact', 'nav.creation3d': 'Création 3D', 'nav.cta': 'Get Quote',
    'footer.rights': 'All rights reserved.',
    'contact.form.submit': 'Send Request',
  },
  fr: {
    'header.subtitle': 'DESIGN 3D & FABRICATION SUR-MESURE',
    'nav.home': 'Accueil', 'nav.services': 'Services', 'nav.portfolio': 'Portfolio', 'nav.contact': 'Contact', 'nav.creation3d': 'Création 3D', 'nav.cta': 'Demander un Devis',
    'footer.rights': 'Tous droits réservés.',
    'contact.form.submit': 'Envoyer la Demande',
  },
  ar: {
    'header.subtitle': 'تصميم ثلاثي الأبعاد وتصنيع حسب الطلب',
    'nav.home': 'الرئيسية', 'nav.services': 'الخدمات', 'nav.portfolio': 'أعمالنا', 'nav.contact': 'اتصل بنا', 'nav.creation3d': 'إنشاء ثلاثي الأبعاد', 'nav.cta': 'احصل على عرض سعر',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'contact.form.submit': 'إرسال الطلب',
  }
};

let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  const isRTL = lang === 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.body.dir = isRTL ? 'rtl' : 'ltr';
  document.body.className = isRTL ? 'font-cairo' : 'font-inter';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('bg-gold', 'text-dark');
      btn.classList.remove('text-slate-400', 'hover:text-gold');
    } else {
      btn.classList.remove('bg-gold', 'text-dark');
      btn.classList.add('text-slate-400', 'hover:text-gold');
    }
  });
}

// ===== MOBILE NAV =====
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('hidden');
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== INIT =====
setLang('en');
