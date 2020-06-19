const colors = [
	'red',
	'blue',
	'green',
	'yellow'
];

const trans = [
  function skewPlus(target) {
    let tl = gsap.to(target, {
      skewX: "8deg",
      duration: heroDuration
    });
    return tl;
  },
  function skewMinus(target) {
    let tl = gsap.to(target, {
      skewX: "-10deg",
      duration: heroDuration
    });
    return tl;
  },
  function rotatePlus(target) {
    let tl = gsap.to(target, {
      rotate: "3deg",
      duration: heroDuration
    });
    return tl;
  },
  function rotateMinus(target) {
    let tl = gsap.to(target, {
      rotate: "-5deg",
      duration: heroDuration
    });
    return tl;
  },
	(target)=>(null),
	(target)=>(null),
	(target)=>(null),
	(target)=>(null)
];

Splitting();

// HERO CHARACTERS

const chars = document.querySelectorAll(".char");

chars.forEach((v,i)=>{
	let rColor = colors[Math.floor(Math.random() * colors.length)];
	let rTrans = trans[Math.floor(Math.random() * trans.length)];
	v.classList.add(rColor, rTrans);
	v.style.animationDelay = `${i*100}ms`;
});

// NAV SLIDER

const navBtn = document.querySelector("nav button");
const nav = document.querySelector("nav");

nav.addEventListener("click", ()=>{
		nav.classList.toggle("min");
});
