const colors = [
	'red',
	'blue',
	'green',
	'yellow'
];

const trans = [
	"skewPlus",
	"skewMinus",
	"rotatePlus",
	"rotateMinus",
	"none",
	"none",
	"none",
	"none"
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
