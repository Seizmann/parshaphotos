// --- CONFIGURATION ---
const CORRECT_PIN = "0000";
const TOTAL_PHOTOS = 60;       // How many photos you have
const PHOTO_FOLDER = "./";     // UPDATED: Pointing to root directory
const FILE_EXTENSION = ".jpg"; // .jpg or .png

// --- STATE MANAGEMENT ---
let currentInput = "";
const lockScreen = document.getElementById("lock-screen");
const galleryView = document.getElementById("gallery-view");
const grid = document.getElementById("grid");
const dots = document.querySelectorAll(".dot");

// --- LIGHTBOX ELEMENTS ---
let lightbox, lightboxImg, downloadBtn, closeBtn;

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initLightbox();
});

// --- 1. PIN PAD LOGIC ---
document.querySelectorAll(".key").forEach(key => {
    key.addEventListener("click", () => {
        // Handle Delete
        if (key.classList.contains("delete")) {
            currentInput = "";
            updateDots();
            return;
        }

        // Handle Numbers
        const num = key.dataset.num;
        if (num && currentInput.length < 4) {
            currentInput += num;
            updateDots();

            if (currentInput.length === 4) {
                setTimeout(checkPin, 200);
            }
        }
    });
});

function updateDots() {
    dots.forEach((dot, index) => {
        if (index < currentInput.length) {
            dot.classList.add("filled");
        } else {
            dot.classList.remove("filled");
        }
    });
}

function checkPin() {
    if (currentInput === CORRECT_PIN) {
        unlockGallery();
    } else {
        const container = document.querySelector(".lock-container");
        container.classList.add("shake");
        setTimeout(() => {
            container.classList.remove("shake");
            currentInput = "";
            updateDots();
        }, 500);
    }
}

function unlockGallery() {
    lockScreen.classList.add("hidden");
    galleryView.classList.add("visible");
    loadPhotos();
}

// --- 2. LOCK BUTTON ---
document.getElementById("lock-btn").addEventListener("click", () => {
    lockScreen.classList.remove("hidden");
    galleryView.classList.remove("visible");
    currentInput = "";
    updateDots();
    if(lightbox) lightbox.style.display = "none";
});

// --- 3. PHOTO LOADING (UPDATED FOR ROOT) ---
function loadPhotos() {
    if (grid.children.length > 0) return;

    for (let i = 1; i <= TOTAL_PHOTOS; i++) {
        const img = document.createElement("img");
        
        // This will now generate: ./p1.jpg, ./p2.jpg, etc.
        const imgSrc = `${PHOTO_FOLDER}p${i}${FILE_EXTENSION}`;
        
        img.src = imgSrc;
        img.alt = `Photo ${i}`;
        img.classList.add("gallery-img");
        img.loading = "lazy";

        img.onerror = function() {
            this.style.display = "none";
        };

        img.addEventListener('click', () => {
            openLightbox(imgSrc);
        });

        grid.appendChild(img);
    }
}

// --- 4. LIGHTBOX / POPUP LOGIC ---
function initLightbox() {
    // Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        #lightbox { display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.9); justify-content: center; align-items: center; flex-direction: column; }
        #lightbox img { max-width: 90%; max-height: 80vh; border: 2px solid white; box-shadow: 0 0 20px rgba(255,255,255,0.2); }
        .lightbox-controls { margin-top: 20px; display: flex; gap: 20px; }
        .lb-btn { background: #333; color: white; border: 1px solid white; padding: 10px 20px; cursor: pointer; font-size: 16px; text-decoration: none; border-radius: 5px; transition: 0.3s; }
        .lb-btn:hover { background: white; color: black; }
        #lb-close { background: #b91c1c; border-color: #b91c1c; }
        #lb-close:hover { background: red; }
    `;
    document.head.appendChild(style);

    // Create Elements
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    
    lightboxImg = document.createElement('img');
    
    const controls = document.createElement('div');
    controls.className = 'lightbox-controls';
    
    downloadBtn = document.createElement('a');
    downloadBtn.className = 'lb-btn';
    downloadBtn.innerText = 'Download';
    
    closeBtn = document.createElement('button');
    closeBtn.className = 'lb-btn';
    closeBtn.id = 'lb-close';
    closeBtn.innerText = 'Close';
    
    controls.appendChild(downloadBtn);
    controls.appendChild(closeBtn);
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(controls);
    document.body.appendChild(lightbox);

    // Events
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = "flex";
    downloadBtn.href = src;
    // Extract filename (e.g., "p1.jpg") handles both "./p1.jpg" and "p1.jpg"
    const fileName = src.split('/').pop(); 
    downloadBtn.setAttribute('download', fileName);
}

function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";

}
