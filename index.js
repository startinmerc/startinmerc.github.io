// =========GLOBAL TRIGGER FUNCTIONS=========

// Manipulates DOM so needs to be called first
Splitting();

// Trigger all JavaScript when page is ready
document.addEventListener('DOMContentLoaded', ready);

function ready() {
	// Build all GSAP timelines for #hero
	getHeroGSAP();
	// Build nav timelines & add click listener to nav
	buildNav();
	// Add colors to buttons & headers in portfolio
	addPortColors();
	// Add link styling
	addLinkHovers();
	// Build <section> ScrollTrigger animations
	buildSectionScrolls();
	// Build all GSAP timelines for SVG Ghost
	buildGhostTimeline();
	// Add colors to footer
	colorFooterBlocks();
}

const isMobile = window.innerWidth < 500;

// ================COLOUR DEFS================

// Array of color classes
const ftColors = [
	'ft-1',
	'ft-2',
	'ft-3',
	'ft-4',
	'ft-5',
];

const bgColors = [
	'bg-1',
	'bg-2',
	'bg-3',
	'bg-5',
]

// Returns random color class name
function getRandomFtColor(section = false) {
	// Exclude white if section header
	if (section) {
		return ftColors[Math.floor(Math.random() * (ftColors.length - 1))];
	}
	return ftColors[Math.floor(Math.random() * ftColors.length)];
}

// Replace ft-... class in supplied node
function replaceFtColor(node,rColor = getRandomFtColor()) {
	// Not the most performant
	ftColors.forEach(c => {
		node.classList.remove(c);
	});
	node.classList.add(rColor);
}

// Returns random background color
function getRandomBgColor() {
	return bgColors[Math.floor(Math.random() * bgColors.length)];
}

// Replace bg-... class in supplied node
function replaceBgColor(node,rColor = getRandomBgColor()) {
	// Not the most performant
	bgColors.forEach(c => {
		node.classList.remove(c);
	});
	node.classList.add(rColor);
}

// ==================LINKS==================


// Adds link interaction styling
function addLinkHovers() {
	// Grab all links
	const links = Array.from(document.querySelectorAll("a"));

	links.forEach((a) => {
		// Define transition duration dictated by element width
		a.style.transitionDuration = `${Math.max(230, a.offsetWidth / 2)}ms `;
	});
}

// ==================NAV SLIDER==================

// Find <nav>
const nav = document.querySelector("nav");

function buildNav() {
	// Make nav timelines
	buildNavTimelines();
	// Add click listener
	addNavListener();
}

// Add click listener to toggle min class, i.e show/hide
function addNavListener() {
	nav.addEventListener("click", () => {
		// Play appropriate timeline
		if (nav.classList.contains("max")) {
			navTimelineMin.restart();
		} else {
			navTimelineMax.restart();
		}
	});
}

const navTimelineMax = gsap.timeline({
	// Set default speed for tweens
	defaults: { duration: "400ms" },
	// Toggle max class to trigger pseudo animations
	onStart: () => { nav.classList.toggle("max") },
	// Change focus
	onComplete: () => { nav.focus() }
});

const navTimelineMin = gsap.timeline({
	// Set default speed for tweens
	defaults: { duration: "100ms" },
	// Toggle max class to trigger pseudo animations
	onStart: () => { nav.classList.toggle("max") },
	// Change focus
	onComplete: () => { nav.blur() }
});

function buildNavTimelines() {
	// Add tweens to maximise nav timeline
	navTimelineMax.to("nav", { translateX: "0%" }, 0);
	navTimelineMax.to("nav button", { translateY: "32.5vh" }, 0);
	navTimelineMax.to("nav a", { translateX: 0, stagger: 0.1 }, 0.2);
	// Add tweens to minimise nav timeline
	navTimelineMin.to("nav a", { translateX: "100vw", stagger: 0.1 });
	navTimelineMin.to("nav", { translateX: "100%" }, 0);
	navTimelineMin.to("nav button", { translateY: "0vh" }, 0);
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
	function rotateFull(target) {
		let tl = gsap.to(target, {
			rotate: "+=360deg",
			duration: heroDuration,
			repeatDelay: 3,
			repeat: -1,
			ease: "back.inOut(1.7)"
		});
		return tl;
	},
	(target)=>(null),
	(target)=>(null),
	(target)=>(null),
	(target)=>(null)
];

// List of all split characters in #hero
const chars = document.querySelectorAll("#hero .char");
// Get #head element
const head = document.querySelector("#head");
// Get #head chars
const headChars = document.querySelectorAll("#head .char");

// Master function to get all #hero GSAP
function getHeroGSAP(){
	// Build a gsap timeline for inital #hero transforms
	buildCharacterAnimation(chars);
	// Build ScrollTrigger timeline for #hero characters
	buildScrollTimeline(chars);
}

// Returns random transform tween
function getRandomTransform() {
	return trans[Math.floor(Math.random() * trans.length)];
}

// Create new timeline
const heroTimeline = gsap.timeline();
// Create header timeline
const headerTimeline = gsap.timeline();

// Expects array of characters
function buildCharacterAnimation(chars){
	// For each character...
	chars.forEach((v, i) => {
		// Pick random colour
		let rColor = getRandomFtColor();
		// Pick random transform
		let rTrans = getRandomTransform();
		// Add transform to timeline at index / 10 seconds
		heroTimeline.add(rTrans(v), i / 10);
		// Add color class to character
		v.classList.add(rColor);
		// Add same transition & color to corresponding #head character
		addToHeader(rColor,rTrans,i);
		// Mouseover
		v.onmouseenter = () => {
			let rColor = getRandomFtColor();
			replaceFtColor(v,rColor);
			addToHeader(rColor,null,i);
		};
	});
}

// Adds supplied color & trans to header
function addToHeader(color, trans = null, index) {
	// Try adding to headChars[index]
	try {
		// Change color in corresponding header
		replaceFtColor(headChars[index],color);
		// If trans supplied, 
		trans && headerTimeline.add(trans(headChars[index]));
		// Catch error of index being beyond #head chars
	} catch { null };
}

// Expects array of words with characters
function buildScrollTimeline(chars) {
	// Create new timeline
	const scrollTimeline = gsap.timeline({
		// Add ScrollTrigger
		scrollTrigger: {
			// Scrub animation with scroll in real time
			scrub: true,
			// Watch #hero element as trigger
			trigger: "#hero",
			// Start timeline when scroll and element are top aligned
			start: "top top",
			// End timeline when bottom of scroll is 20% from top of screen
			end: "bottom 20%",
			// When scrolled to end
			onLeave: ()=>{
				// Show header
				head.classList.add("show");
				// Pause character animations
				heroTimeline.pause();
				// Pause ghost timeline
				ghostTimeline.pause();
				// Remove eye tracker
				document.getElementById("hero").removeEventListener("mousemove", eyeMove);
			},
			// When back in view
			onEnterBack: ()=>{
				// Hide header
				head.classList.remove("show");
				// Resume character animations
				heroTimeline.play();
				// Resume ghost timeline
				ghostTimeline.play();
				// Readd eye tracker
				document.getElementById("hero").addEventListener("mousemove", eyeMove);
			},
			// Show header if page loads past hero
			onRefresh: ({progress})=>{
				if(progress === 1){
					head.classList.add("show");
				};
			},
			onEnter: ()=>{
				// Play ghost timeline at start
				ghostTimeline.play();
			},
			pin: true,
			pinSpacing: false
		}
	});
	// Reverse characters & iterate over
	[...chars].reverse().forEach((char, charIndex) => {
		// Add CharacterScrollAnimation to scrollTimeline
		scrollTimeline.add(buildCharacterScrollAnimation(char, charIndex));
	});
	// Fade ghost
	scrollTimeline.to('#hero svg',{
		opacity: 0,
		duration: 8
	},2)
}

// Expects character node element, index of character in word, index of word in hero
function buildCharacterScrollAnimation(char,charIndex){
	// Return gsap animation...
	return gsap.to(char, {
		// Transform origin either top right or top left depending on odd/even
		transformOrigin: `top ${charIndex % 2 ? "right" : "left"}`,
		// Scale to nothing
		scale: 0,
		// Translate 100% either left or right
		translateX: `${charIndex % 2 ? "+" : "-"}100%`,
		// Translate upwards 100% so off screen
		translateY: "-100%",
		// Rotate 90deg clock or anti-clock
		rotate: `${charIndex % 2 ? "+" : "-"}90deg`
	});
}

// =================GHOST=================

// Create GSAP timeline for SVG Ghost
const ghostTimeline = gsap.timeline({
	paused: true,
	onStart: document.getElementById("hero").addEventListener("mousemove", eyeMove)
});

// Assemble all ghost tweens to timeline
function buildGhostTimeline() {
	ghostTimeline.add(getShadowTween(), 0);
	ghostTimeline.add(getBlinkTimeline(), 0);
	ghostTimeline.add(getFloatTween(), 0);
}

// Animates shadow
function getShadowTween() {
	return gsap.to('.ghost__shadow', {
		// Animate SVG Path attributes
		attr: { rx: '30px', ry: '5px' },
		repeat: -1,
		yoyo: true,
		ease: Power1.easeInOut,
		duration: 1
	});
}

// Independent blink timeline
function getBlinkTimeline() {
	// Independent timeline to animate eye blinking
	let tl = gsap.timeline({ repeat: -1, repeatDelay: 2, defaults: { duration: 0.18 } });
	// Attribute not scale to avoid line distortion
	tl.to('.ghost__eye', { attr: { ry: '0px' } });
	tl.to('.ghost__eye', { attr: { ry: '12.5px' } });
	tl.to('.ghost__eye', { attr: { ry: '0px' } });
	tl.to('.ghost__eye', { attr: { ry: '12.5px' } });
	return tl;
}

// Float tween for whole ghost SVG group
function getFloatTween() {
	return gsap.fromTo('#ghost', {
		y: '-10px'
	}, {
		y: '10px',
		yoyo: true,
		repeat: -1,
		ease: Power1.easeInOut,
		duration: 1
	});
}

function eyeMove(e) {
	gsap.to(".ghost__eye", {
		// Coordinates within element
		x: e.clientX / 70,
		y: e.clientY / 70,
		ease: "linear",
		duration: 0.2
	});
}

// =================PORTFOLIO=================

// Get all portfolio buttons
const portfolioLinks = document.querySelectorAll(".button-grid a");
// Get all portfolio entry titles
const portfolioEntryHeaders = document.querySelectorAll(".portfolio-entry__title");

// Add random colors to matching buttons & entry headers
function addPortColors() {
	portfolioLinks.forEach((btn, ind) => {
		// Get random color
		let rColor = getRandomBgColor();
		// Add random color to button background
		btn.classList.add(rColor);
		// Add random color to corresponding entry header
		portfolioEntryHeaders[ind].classList.add(rColor);
	})
}

// ===================SECTION===================

// Get all <section> elements
const sections = document.querySelectorAll("section:not(#portfolio)");

// Builds GSAP ScrollTrigger timeline for each section
function buildSectionScrolls(){
	sections.forEach((section, index) => {
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
				onEnter: () => {
					sectionTimeline.restart();
				},
				// Reverse header animation when element scrolled out of view
				onLeaveBack: () => {
					sectionTimeline.reverse();
				},
				onLeave: () => {
					// Play portfolio header tween if About is left
					index === 0 && portHeaderTween.restart();
				}
			}
		});
		// Create section header timeline
		let sectionTimeline = gsap.timeline();
		// Get split characters from header
		let headerChars = section.querySelectorAll(".char");
		// Get content wrapper for section
		let headerText = section.querySelector(".section-container");

		// Random colour header characters
		headerChars.forEach(char => {
			char.classList.add(getRandomFtColor(true));
		});

		// Translate characters from +100% to 0%
		sectionTimeline.fromTo(headerChars, {
			y: "300%"
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
		}, {
			y: "0%"
		});
	});

	// Portfolio header characters
	const portChars = document.querySelectorAll(".portfolio-header .char");
	// Portfolio header height
	const portHeight = document.querySelector(".portfolio-header").offsetHeight;

	// Random colour portfolio header characters
	portChars.forEach(char => {
		char.classList.add(getRandomFtColor(true));
	});

	// Portfolio header tween
	const portHeaderTween = gsap.fromTo(portChars, {
			y: "300%"
		}, {
			y: "0%",
			// Ease out & back
			ease: "back.out(1.7)",
			duration: 0.7,
			// Stagger letters
			stagger: 0.1,
			paused: true
		}
	);

	// Create seperate portfolio ScrollTrigger
	ScrollTrigger.create({
		trigger: "#portfolio",
		start: "top",
		end: `bottom ${portHeight}px`,
		pin: ".portfolio-header",
		pinSpacing: false,
		onLeaveBack: () => {
			// Show header again
			isMobile && head.classList.add("show");
			// Hide header
			portHeaderTween.reverse();
		},
		onEnterBack: () => {
			// Move header out of the way
			isMobile && head.classList.remove("show");
			// Play header
			portHeaderTween.restart();
		},
		onEnter: ()=>{
			// Move header out of the way
			isMobile && head.classList.remove("show");
			// Play header
			portHeaderTween.restart();
		},
		onLeave: ()=>{
			// Show header again
			isMobile && head.classList.add("show");
			// Hide header
			portHeaderTween.reverse();
		}
	});
}

// ======================FOOTER======================

// Get all blocks and header elements from footer
const footerBlocks = [
	...document.querySelectorAll(".block"),
	...document.querySelectorAll("footer h3")
];

function colorFooterBlocks() {
	// Iterate over all footer blocks
	footerBlocks.forEach(node => {
		// Assign random background color
		node.classList.add(getRandomBgColor());
		// Randomise background color on mouseover
		node.onmouseenter = () => {
			replaceBgColor(node);
		};
	});
}
