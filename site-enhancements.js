(function () {
  const styles = document.createElement('style');
  styles.textContent = '.nav-actions{display:flex;align-items:center;gap:8px}.language-link{border:1px solid #2d6870;border-radius:7px;padding:5px 8px;color:#d9ffff;font-size:.7rem;font-weight:800}.language-link:hover{background:#16323a}.site-search{display:flex;align-items:center;gap:12px;margin:0 0 22px;padding:12px 14px;border:1px solid #dcebed;border-radius:10px;background:#f8fafc}.site-search label{font-size:.78rem;font-weight:800;color:#071820;white-space:nowrap}.site-search input{width:min(360px,100%);border:1px solid #dcebed;border-radius:7px;padding:9px 11px;font:inherit;font-size:.82rem;outline:0;background:#fff}.site-search input:focus{border-color:#16d9e5;box-shadow:0 0 0 3px #16d9e522}.consent-banner{position:fixed;z-index:20;bottom:16px;left:16px;right:16px;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:14px 18px;border:1px solid #2d6870;border-radius:10px;background:#071820;color:#d9ffff;box-shadow:0 12px 30px #07182033}.consent-banner p{margin:0;font-size:.78rem}.consent-banner a{color:#45d596;font-weight:800}.consent-banner button{border:0;border-radius:7px;background:#45d596;color:#071820;padding:8px 14px;font:inherit;font-size:.78rem;font-weight:800;cursor:pointer;white-space:nowrap}@media(max-width:560px){.nav-actions{gap:4px}.language-link{padding:4px 6px}.site-search{display:block}.site-search label{display:block;margin-bottom:6px}.site-search input{width:100%}.consent-banner{display:block}.consent-banner button{margin-top:10px}}';
  document.head.appendChild(styles);
  const root = document.documentElement;
  const path = window.location.pathname;
  const isFrench = path.includes('/fr/');
  const isEnglish = path.includes('/en/');
  const labels = isFrench
    ? { search: 'Rechercher un article', placeholder: 'Chercher par mot-clé...', consent: 'Ce site utilise Google Analytics et pourra afficher des publicités personnalisées. Consultez la politique de confidentialité.', accept: 'Accepter', privacy: 'Confidentialité' }
    : isEnglish
      ? { search: 'Search articles', placeholder: 'Search by keyword...', consent: 'This site uses Google Analytics and may display personalized ads. Read our privacy policy.', accept: 'Accept', privacy: 'Privacy' }
      : { search: 'قلب فالمقالات', placeholder: 'قلب بكلمة أو موضوع...', consent: 'هاد الموقع كيستعمل Google Analytics وقد يعرض إعلانات مخصصة. قرا سياسة الخصوصية.', accept: 'موافق', privacy: 'الخصوصية' };

  function addLanguageLinks() {
    const nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('.language-link')) return;
    const actions = document.createElement('div');
    actions.className = 'nav-actions';
    const links = isFrench
      ? [['AR', '../index.html'], ['EN', '../en/']]
      : isEnglish
        ? [['AR', '../index.html'], ['FR', '../fr/']]
        : [['EN', 'en/'], ['FR', 'fr/']];
    links.forEach(([label, href]) => {
      const link = document.createElement('a');
      link.className = 'language-link';
      link.href = href;
      link.textContent = label;
      actions.appendChild(link);
    });
    nav.appendChild(actions);
  }

  function addSearch() {
    const articles = document.querySelector('#articles');
    if (!articles || document.querySelector('.site-search')) return;
    const form = document.createElement('form');
    form.className = 'site-search';
    form.setAttribute('role', 'search');
    form.innerHTML = '<label for="article-search">' + labels.search + '</label><input id="article-search" type="search" placeholder="' + labels.placeholder + '" autocomplete="off">';
    articles.insertBefore(form, articles.querySelector('.feature-grid'));
    const input = form.querySelector('input');
    const cards = Array.from(document.querySelectorAll('.feature-card, .post-row, .new-article-card'));
    input.addEventListener('input', function () {
      const query = input.value.trim().toLocaleLowerCase();
      cards.forEach(function (card) {
        card.hidden = query && !card.textContent.toLocaleLowerCase().includes(query);
      });
    });
  }

  function addConsent() {
    if (localStorage.getItem('tqniya-consent') || document.querySelector('.consent-banner')) return;
    const banner = document.createElement('aside');
    banner.className = 'consent-banner';
    banner.innerHTML = '<p>' + labels.consent + ' <a href="' + (isFrench || isEnglish ? '../privacy.html' : 'privacy.html') + '">' + labels.privacy + '</a></p><button type="button">' + labels.accept + '</button>';
    document.body.appendChild(banner);
    banner.querySelector('button').addEventListener('click', function () {
      localStorage.setItem('tqniya-consent', 'accepted');
      banner.remove();
    });
  }

  addLanguageLinks();
  addSearch();
  addConsent();
})();
