# THE PORTFOLIO GRAND REDESIGN

## [Development Blog Here](https://startinmerc.home.blog/)

`GSAP / SASS / JavaScript / HTML / Git / Netlify / Codepen`

This site was built in June/July 2020 as a redesign of my previous portfolio site,
sharing the same basic markup but with a dramatically colourful and playful redesign.

I documented the redesign on [a blog](http://startinmerc.home.blog),
something I've now decided to continue on other projects going forward. I found it an incredibly gratifying experience and,
combined with Codepen prototyping, this helped me record my thought process and improve my coding practices.

Both the hero and section elements make heavy use of GSAP 3, and their ScrollTrigger plugin in particular.
This is most prominent in the hero element where a combination of SplittingJS, ScrollTrigger,
randomly generated GSAP tweens and random colour styles come together to create a bold scroll-based animation.
Sections also have GSAP timelines with ScrollTriggers, and their headers share the hero's randomised styles.

This is my first project developed entirely with SASS, using VSCode and a live compiler for development.

TO DO:

* Implement master ScrollTrigger timeline for all scrollers
* Refresh pins etc. on resize
* Master timeline should fix page loads at non-top
