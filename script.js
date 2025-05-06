document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            alert(`You selected: ${button.textContent}`);
        });
    });

    const items = document.querySelectorAll(".item");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    items.forEach(item => observer.observe(item));
});

document.addEventListener("DOMContentLoaded", function () {
    const pyramidLevels = document.querySelectorAll(".pyramid-level");

    pyramidLevels.forEach((level, index) => {
        setTimeout(() => {
            level.style.opacity = "1";
            level.style.transform = "translateY(0) scale(1)";
        }, index * 400);
    });

    // Add glowing effect to levels
    setInterval(() => {
        pyramidLevels.forEach((level, index) => {
            setTimeout(() => {
                level.classList.toggle("glow");
            }, index * 500);
        });
    }, 2000);
});

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight - 50;
}

// Function to add class when element comes into view
function handleScroll() {
    const cards = document.querySelectorAll(".product-card");
    cards.forEach((card) => {
        if (isInViewport(card)) {
            card.classList.add("show");
        }
    });
}

// Run on scroll and on page load
window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);


