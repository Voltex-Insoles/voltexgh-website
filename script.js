(function () {
	"use strict";

	// Preloader
	const preloader = document.querySelector('#preloader');
	if (preloader) {
		window.addEventListener('load', () => {
			preloader.remove();
		});
	}


	/* Scroll to top*/
	let scrollTop = document.querySelector('.scroll-top');

	function toggleScrollTop() {
		if (scrollTop) {
			window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
		}
	}

	if (scrollTop) {
		scrollTop.addEventListener('click', (e) => {
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}

	window.addEventListener('load', toggleScrollTop);
	document.addEventListener('scroll', toggleScrollTop);


	/* Scroll-reveal */
	// Custom AOS-style scroll animations
	const aosElements = document.querySelectorAll('[data-aos]');
	const animatedElements = new Set();

	function animateOnScroll() {
		const triggerPoint = window.innerHeight * 0.9;

		aosElements.forEach((element) => {
			if (animatedElements.has(element)) return;

			const rect = element.getBoundingClientRect();

			if (rect.top < triggerPoint && rect.bottom > 0) {
				const delay = Number(element.dataset.aosDelay) || 0;

				animatedElements.add(element);

				setTimeout(() => {
					element.classList.add('aos-animate');
				}, delay);
			}
		});
	}

	animateOnScroll();

	window.addEventListener('load', animateOnScroll);
	window.addEventListener('scroll', animateOnScroll, { passive: true });
	window.addEventListener('resize', animateOnScroll);
	


	/* Video modal */
	const videoTrigger = document.querySelector('[data-video-modal]');
	if (videoTrigger) {
		const overlay = document.createElement('div');
		overlay.className = 'video-modal-overlay';
		overlay.innerHTML =
			'<div class="video-modal">' +
			'<button type="button" class="video-modal-close" aria-label="Close video">&times;</button>' +
			'<video class="video-modal-player" controls playsinline></video>' +
			'</div>';
		document.body.appendChild(overlay);

		const video = overlay.querySelector('.video-modal-player');
		const closeBtn = overlay.querySelector('.video-modal-close');

		function openVideoModal() {
			video.src = videoTrigger.getAttribute('href');
			overlay.classList.add('active');
			document.body.style.overflow = 'hidden';
			video.play();
		}

		function closeVideoModal() {
			overlay.classList.remove('active');
			document.body.style.overflow = '';
			video.pause();
			video.currentTime = 0;
			video.removeAttribute('src');
		}

		videoTrigger.addEventListener('click', (e) => {
			e.preventDefault();
			openVideoModal();
		});
		closeBtn.addEventListener('click', closeVideoModal);
		overlay.addEventListener('click', (e) => {
			if (e.target === overlay) closeVideoModal();
		});
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && overlay.classList.contains('active')) closeVideoModal();
		});
	}


	/* Correct scrolling position on load for URLs containing hash links */
	window.addEventListener('load', function () {
		if (window.location.hash) {
			const section = document.querySelector(window.location.hash);
			if (section) {
				setTimeout(() => {
					const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
					window.scrollTo({
						top: section.offsetTop - parseInt(scrollMarginTop),
						behavior: 'smooth'
					});
				}, 100);
			}
		}
	});

})();



const cards = Array.from(document.querySelectorAll('.card'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

let currentIndex = 0;


cards.forEach((_, index) => {
	const dot = document.createElement('div');
	dot.classList.add('dot');
	if (index === 0) dot.classList.add('active');
	dot.addEventListener('click', () => goToSlide(index));
	dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

function updateStack() {
	cards.forEach((card, i) => {
		card.className = 'card'; 

		if (i === currentIndex) {
			card.classList.add('active');
		} else if (i === (currentIndex - 1 + cards.length) % cards.length) {
			card.classList.add('prev');
		} else if (i === (currentIndex + 1) % cards.length) {
			card.classList.add('next');
		}
	});

	dots.forEach((dot, i) => {
		dot.classList.toggle('active', i === currentIndex);
	});
}

function goToSlide(index) {
	currentIndex = index;
	updateStack();
}

nextBtn.addEventListener('click', () => {
	currentIndex = (currentIndex + 1) % cards.length;
	updateStack();
});

prevBtn.addEventListener('click', () => {
	currentIndex = (currentIndex - 1 + cards.length) % cards.length;
	updateStack();
});

updateStack();