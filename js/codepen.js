/*3D Page Fold Transition https://codepen.io/team/keyframers/pen/bGdebPM*/ 
console.clear();
const elApp = document.querySelector('#worldOrder-join');
const elDetails = document.querySelector('[data-view="details"]');
const elOverview = document.querySelector('[data-view="overview"]');

const DURATION = 1500; // milliseconds

elApp.style.setProperty('--duration', `${DURATION}ms`);

const elRestaurant = document.querySelector('#restaurant');
const elDetailCard = document.querySelector('#detail-card');

function activate(state) {
  elApp.dataset.prevState = elApp.dataset.state;
  elApp.dataset.state = state;
  
  document.querySelectorAll(`[data-active]`)
    .forEach(el => delete el.dataset.active);
  document.querySelectorAll(`[data-view="${state}"]`)
    .forEach(el => el.dataset.active = true);
}

function flip(el, nextEl = el, layoutFn = function(){}) {
  // get initial rect
  const rect = el.getBoundingClientRect();
  
  layoutFn();
  
  const lastRect = nextEl.getBoundingClientRect();
  
  const dx = lastRect.x - rect.x;
  const dy = lastRect.y - rect.y;
  const dw = rect.width / lastRect.width;
  const dh = rect.height / lastRect.height;
  
  
  console.log({ dx, dy, dw, dh });
  
  // provide the CSS vars
  nextEl.style.setProperty('--dx', dx);
  nextEl.style.setProperty('--dy', dy);
  nextEl.style.setProperty('--dw', dw);
  nextEl.style.setProperty('--dh', dh);
  
  // give animation "hooks"
  requestAnimationFrame(() => {
    // [data-move="pending"]
    nextEl.dataset.move = "pending";

    // initiate transition
    requestAnimationFrame(() => {
      // [data-move="moving"]
      nextEl.dataset.move = "moving";
    });
  });
}

elDetails.addEventListener('click', () => {
  console.log('clicked details');
  activate('overview');
  elApp.dataset.transitioning = true;
  
  setTimeout(() => {
    flip(elDetailCard, elRestaurant, ()=>{
      delete elApp.dataset.transitioning;
    });
  }, DURATION)
});

elOverview.addEventListener('click', () => {
  console.log('clicked overview');
  
  activate('details');
});

activate('details'); //