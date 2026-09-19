// Trigger the launch and background change on load
window.addEventListener('DOMContentLoaded', ()=>{
  // small delay so the page paints white first
  requestAnimationFrame(()=>{
    setTimeout(()=>{
      const body = document.body;
      const rocket = document.querySelector('.rocket');
      const welcome = document.querySelector('.welcome');
      body.classList.add('launched');

      // When rocket animation ends, show welcome text
      const showWelcome = ()=>{
        if (body.classList.contains('show-welcome')) return;
        body.classList.add('show-welcome');

        const subheadline = document.querySelector('.subwelcome');
        if (!subheadline) return;

        const typingText = 'To Outer Space';
        subheadline.textContent = '';
        subheadline.style.borderRightWidth = '2px';

        setTimeout(() => {
          let i = 0;
          const type = () => {
            if (i <= typingText.length) {
              subheadline.textContent = typingText.slice(0, i);
              i += 1;
              setTimeout(type, 90);
            } else {
              subheadline.style.borderRightWidth = '0';
            }
          };
          type();
        }, 100);
      };

      if (rocket){
        rocket.addEventListener('animationend', ()=>{
          showWelcome();
        }, {once:true});
      }

      const asteroid = document.querySelector('.asteroid');
      if (asteroid) {
        asteroid.addEventListener('animationend', () => {
          body.classList.add('show-scene');
        }, { once: true });
      }

      const nextPage = 'next-page.html';

      const goToNextPage = () => {
        document.body.classList.add('flash');

        setTimeout(() => {
          window.location.href = nextPage;
        }, 180);
      };

      document.addEventListener('click', goToNextPage);
      document.addEventListener('touchstart', (event) => {
        event.preventDefault();
        goToNextPage();
      }, { passive: false });

      // Fallback: if animations are reduced or animationend doesn't fire, use timeout
      const cs = getComputedStyle(body);
      const dur = cs.getPropertyValue('--duration') || '3500ms';
      const ms = (()=>{
        const m = dur.trim().match(/([0-9\.]+)ms$/);
        if (m) return parseFloat(m[1]);
        const s = dur.trim().match(/([0-9\.]+)s$/);
        if (s) return parseFloat(s[1]) * 1000;
        return 3500;
      })();
      setTimeout(()=>{
        if (!document.body.classList.contains('show-welcome')) showWelcome();
      }, ms + 200);

      setTimeout(() => {
        if (!document.body.classList.contains('show-scene')) {
          body.classList.add('show-scene');
        }
      }, ms + 1200);

    }, 150);
  });
});
