// Consolidated content loader
function loadContent(page) {
	const content = document.getElementById('dynamic-content');
	fetch(`${page}.html`)
		.then((response) => {
			if (!response.ok) throw new Error('Failed to load');
			return response.text();
		})
		.then((data) => (content.innerHTML = data))
		.catch((error) => {
			content.innerHTML = `
                            <div class="section error">
                                <h2>Page Load Error</h2>
                                <p>Unable to load ${page}. Please try again later.</p>
                                <button onclick="loadContent('home')">Return Home</button>
                            </div>`;
		});
}

function showHome() {
	loadContent('home');
}

// Scroll management
window.addEventListener('scroll', function () {
	document.getElementById('back-to-top').style.display =
		window.scrollY > 300 ? 'block' : 'none';
});

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copyEmail() {
	navigator.clipboard.writeText('amwhubs@gmail.com');
	alert(
		'Email address copied to clipboard. Right click and paste on a new message in your email.'
	);
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
	loadContent('home');
});

//adding event listener for all zoomable buttons
document.addEventListener('click', (e) => {
	const btn = e.target.closest('.zoomable-btn');
	if (btn) {
		const img = btn.querySelector('img');
		openModal(img.src, img.alt, btn.dataset.title, btn.dataset.caption);
	}
});

//Modal logic
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalCaption = document.getElementById('modal-caption');
const closeModalBtn = document.getElementById("modalBtn"); 


//function to open Modal
function openModal(imageSrc, imageAlt, title = '', caption = '') {
	modalImage.src = imageSrc;
	modalImage.alt = imageAlt;
	modalTitle.textContent = title;
	modalCaption.textContent = caption;
	modal.style.display = 'flex';
}

//function to close the Modal
closeModalBtn.addEventListener('click', () => {
	modal.style.display = 'none';
});

const closeBtn = document.querySelector(".close-modal-btn");

// Close modal function
function closeModal() {
  modal.style.display = "none";
}

// 1. Close when clicking the [×] button
closeBtn.addEventListener("click", closeModal);

// 2. Close when clicking OUTSIDE the modal-wrapper (on the overlay)
modal.addEventListener("click", (e) => {
  if (e.target === modal) { // Checks if click is on the overlay (not content)
    closeModal();
  }
});


window.openModal = openModal;
