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

const word = "MARTYN STIRK WEB DEVELOPER";

const box = document.querySelector("#box");

word.split("").forEach((v,i)=>{
	let rColor = colors[Math.floor(Math.random() * colors.length)];
	let rTrans = trans[Math.floor(Math.random() * trans.length)]
	if(v === " "){
		box.innerHTML += `<br/>`
	} else {
		box.innerHTML += `<span class="${rColor} ${rTrans}" style="animation-delay: ${i*100}ms">${v}</span>`
	}
});

const navBtn = document.querySelector("nav button");
const nav = document.querySelector("nav");

nav.addEventListener("click", ()=>{
		nav.classList.toggle("min");
});
