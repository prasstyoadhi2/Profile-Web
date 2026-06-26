// 1. Animasi Scroll Reveal yang Lebih Smooth
function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 80; // Trigger sedikit lebih cepat

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
            
            // Trigger skill bars dengan gaya fluid jika section skills terlihat
            if (element.classList.contains('skills-info')) {
                const progressBars = element.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    // Mengambil nilai target dari inline style CSS variable
                    const targetWidth = bar.style.getPropertyValue('--target');
                    if(targetWidth) {
                        bar.style.width = targetWidth;
                    }
                });
            }
        }
    });
}

window.addEventListener("scroll", reveal);
reveal(); // Trigger saat pertama kali load

// 2. Efek Navbar Mengecil (Shrink) saat di-scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3. Lightbox Animasi Smooth (Fullscreen Image Viewer)
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");
const galleryImages = document.querySelectorAll(".gallery-img");

galleryImages.forEach(img => {
    img.addEventListener("click", function() {
        lightbox.style.display = "flex";
        // Kasih jeda sedikit agar display:flex kerender dulu, baru nambah class show untuk opacity
        setTimeout(() => {
            lightbox.classList.add("show");
        }, 10);
        lightboxImg.src = this.src;
    });
});

function closeLightbox() {
    lightbox.classList.remove("show");
    // Tunggu animasi opacity selesai baru hilangkan dari DOM
    setTimeout(() => {
        lightbox.style.display = "none";
    }, 300);
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
        closeLightbox();
    }
});

// Menutup lightbox dengan tombol ESC di keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("show")) {
        closeLightbox();
    }
});