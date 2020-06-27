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
      onLeave: ()=>{
        head.classList.add("show");
      },
      onEnterBack: ()=>{
        head.classList.remove("show");
      }
    }
  });
  // Iterate over words
  words.forEach((word, wordIndex) => {
    // For each child(character)...
    word.childNodes.forEach((char, charIndex) => {
      // Add CharacterScrollAnimation to scrollTimeline
      scrollTimeline.add(buildCharacterScrollAnimation(char, charIndex, wordIndex));
    });
  });
}

// Expects character node element, index of character in word, index of word in hero
function buildCharacterScrollAnimation(char,charIndex,wordIndex){
  // Return gsap animation...
  return gsap.to(char, {
    // Transform origin either top right or top left depending on odd/even
    transformOrigin: `top ${wordIndex % 2 ? "right" : "left"}`,
    // Scale to nothing
    scale: 0,
    // Translate characterIndex * 75% either left or right
    translateX: `${wordIndex % 2 ? "+" : "-"}${charIndex * 75}%`,
    // Translate upwards 100% so off screen
    translateY: "-100%",
    // Rotate 90deg clock or anti-clock
    rotate: `${wordIndex % 2 ? "+" : "-"}90deg`
  });
}

// ==================NAV SLIDER==================

const nav = document.querySelector("nav");

nav.addEventListener("click", ()=>{
		nav.classList.toggle("min");
});

// ===================SECTION===================

const headerChars = document.querySelectorAll("section h2 .char");

headerChars.forEach(char=>{
  char.classList.add(getRandomColor());
})