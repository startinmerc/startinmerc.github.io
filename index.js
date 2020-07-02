// ================GLOBAL DEFS================

// Array of color classes
const colors = [
	'red',
	'blue',
	'green',
	'yellow'
];

// Returns random color class name
function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

// Split chars/words
Splitting();

// ==================LINKS==================

// Grab all links
const links = document.querySelectorAll("a");
addLinkHovers();
// Adds link interaction styling
function addLinkHovers() {
	links.forEach((a) => {
		// Define transition, with duration dictated by element width
		a.style.transition = `box-shadow ${a.offsetWidth}ms ease-in`;
		a.onmouseenter = () => linkEnter(a);
		a.onmouseleave = () => linkLeave(a);
		a.onfocus = () => linkEnter(a);
		a.onblur = () => linkLeave(a);
	});
}

function linkEnter(element) {
	// Adds inset box shadow to link offset by width of element
	element.style.boxShadow = `${element.offsetWidth}px 0 yellow inset`;
	element.style.webkitBoxShadow = `${element.offsetWidth}px 0 yellow inset`;
	element.style.mozBoxShadow = `${element.offsetWidth}px 0 yellow inset`;
}

function linkLeave(element) {
	// Resets box shadow to invisible
	element.style.boxShadow = `0px 0 yellow `;
	element.style.boxShadow = `0px 0 yellow inset`;
	element.style.webkitBoxShadow = `0px 0 yellow inset`;
	element.style.mozBoxShadow = `0px 0 yellow inset`;
}

//====================HERO====================

// Duration in seconds for initial character transforms
const heroDuration = 2.2

// Array of GSAP transform and null functions
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

// Returns random transform
function getRandomTransform() {
	return trans[Math.floor(Math.random() * trans.length)];
}

// List of all split characters in #hero
const chars = document.querySelectorAll("#hero .char");
// List of all split words in #hero
const words = document.querySelectorAll("#hero .word");
// Get #head element
const head = document.querySelector("#head");
// Get #head chars
const headChars = document.querySelectorAll("#head .char");

// Build a gsap timeline for inital #hero transforms
buildCharacterAnimation(chars);
// Build ScrollTrigger timeline for #hero characters
buildScrollTimeline(words);

// Expects array of characters
function buildCharacterAnimation(chars){
	// Create new timeline
	const heroTimeline = gsap.timeline();
	// For each character...
	chars.forEach((v, i) => {
		// Pick random colour
		let rColor = getRandomColor();
		// Pick random transform
		let rTrans = getRandomTransform();
		// Add transform to timeline at index / 10 seconds
		heroTimeline.add(rTrans(v), i / 10);
		// Add color class to character
		v.classList.add(rColor);
		// Add same transition & color to corresponding #head character
		try{
			headChars[i].classList.add(rColor);
			heroTimeline.add(rTrans(headChars[i]));
			// Catch error of index being beyond #head chars
		} catch {null};
	});
}

// Expects array of words with characters
function buildScrollTimeline(words) {
	// Create new timeline
	const scrollTimeline = gsap.timeline({
		// Add ScrollTrigger
		scrollTrigger: {
			// Scrub animation with scroll in real time
			scrub: true,
			// Watch #hero element as trigger
			trigger: "#hero",
			// Start timeline when scroll and element are top aligned
			start: "top",
			// End timeline when bottom of scroll is 50% down the element
			end: "bottom +=50%",
			// Show header when animation is finished
			onLeave: ()=>{
				head.classList.add("show");
			},
			// Hide header when hero scrolls back into view
			onEnterBack: ()=>{
				head.classList.remove("show");
			},
			// Show header if page loads past hero
			onRefresh: ({progress})=>{
				if(progress === 1){
					head.classList.add("show");
				};
			}
		}
	});
	// Iterate over words
	words.forEach(word => {
		// For each child(character)...
		word.childNodes.forEach((char, charIndex) => {
			// Add CharacterScrollAnimation to scrollTimeline
			scrollTimeline.add(buildCharacterScrollAnimation(char, charIndex));
		});
	});
}

// Expects character node element, index of character in word, index of word in hero
function buildCharacterScrollAnimation(char,charIndex){
	// Return gsap animation...
	return gsap.to(char, {
		// Transform origin either top right or top left depending on odd/even
		transformOrigin: `top ${charIndex % 2 ? "right" : "left"}`,
		// Scale to nothing
		scale: 0,
		// Translate characterIndex * 75% either left or right
		translateX: `${charIndex % 2 ? "+" : "-"}${charIndex * 75}%`,
		// Translate upwards 100% so off screen
		translateY: "-100%",
		// Rotate 90deg clock or anti-clock
		rotate: `${charIndex % 2 ? "+" : "-"}90deg`
	});
}

// ==================NAV SLIDER==================

const nav = document.querySelector("nav");

nav.addEventListener("click", ()=>{
	nav.classList.toggle("min");
});

// ===================SECTION===================

const sections = document.querySelectorAll("section");

sections.forEach((section,index)=>{
	// Create new scroll timeline
	let sectionScrollTimeline = gsap.timeline({
		scrollTrigger: {
			// Scrub animation with scroll in real time
			scrub: 0.2,
			// Watch section element as trigger
			trigger: section,
			// Start timeline when scroller is 80% down element
			start: "top +=80%",
			// End timeline when element is 25% from top of screen
			end: "top 25%",
			// Trigger header animation on enter
			onEnter: ()=>{
				sectionTimeline.restart();
				index === 2 && ghostTimeline.play();
			},
			// Reverse header animation when element scrolled out of view
			onLeaveBack: ()=>{
				sectionTimeline.reverse();
				index === 2 && ghostTimeline.pause();
			}
		}
	});
	// Create section header timeline
	let sectionTimeline = gsap.timeline();
	// Get split characters from header
	let headerChars = section.querySelectorAll(".char");
	// Get content wrapper for section
	let headerText = section.querySelector("div");
	// Random colour header characters
	headerChars.forEach(char => {
		char.classList.add(getRandomColor());
	});
	// Translate characters from +100% to 0%
	sectionTimeline.fromTo(headerChars, {
			y: "100%"
		}, {
			y: "0%",
			// Ease out & back
			ease: "back.out(1.7)",
			duration: 0.7,
			// Stagger letters
			stagger: 0.1
		}
	);

	// Translate content wrapper to visible on scroll
	sectionScrollTimeline.fromTo(headerText, {
		y: "-100%"
	},{
		y: "0%"
	});
});

// =================CONTACT GHOST=================

const ghostTimeline = gsap.timeline({paused: true});

buildGhostTimeline();

function buildGhostTimeline() {
	ghostTimeline.add(getShadowTimeline(), 0);
	ghostTimeline.add(getBlinkTimeline(), 0);
	ghostTimeline.add(getFloatTimeline(), 0);
}

function getShadowTimeline() {
	return gsap.to('.ghost__shadow', 1, { attr: { rx: '30px', ry: '5px' }, repeat: -1, yoyo: true, ease: Power1.easeInOut });
}

function getBlinkTimeline() {
	let tl = gsap.timeline({ repeat: -1, repeatDelay: 2, defaults: {duration: 0.18} });
	tl.to('.ghost__eye', { attr: { ry: '0px' } });
	tl.to('.ghost__eye', { attr: { ry: '12.5px' } });
	tl.to('.ghost__eye', { attr: { ry: '0px' } });
	tl.to('.ghost__eye', { attr: { ry: '12.5px' } });
	return tl;
}

function getFloatTimeline() {
	return gsap.fromTo('#ghost', 1, { y: '-10px' }, { y: '10px', yoyo: true, repeat: -1, ease: Power1.easeInOut });;
}