// --- CONFIGURATION ---
const CORRECT_PIN = "4558";
const TOTAL_PHOTOS = 60;         // How many photos you have
const PHOTO_FOLDER = "./photos/"; // Path to photos
const FILE_EXTENSION = ".jpg";   // .jpg or .png

// --- STATE MANAGEMENT ---
let currentInput = "";
const lockScreen = document.getElementById("lock-screen");
const galleryView = document.getElementById("gallery-view");
const grid = document.getElementById("grid");
const dots = document.querySelectorAll(".dot");

// --- LIGHTBOX ELEMENTS (Created Dynamically) ---
let lightbox, lightboxImg, downloadBtn, closeBtn;

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initLightbox(); // Setup the popup system
});

// --- 1. PIN PAD LOGIC ---
document.querySelectorAll(".key").forEach(key => {
    key.addEventListener("click", () => {
        
        // Handle Delete Button
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

            // Auto-check when 4 digits entered
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
        // Wrong PIN Logic
        const container = document.querySelector(".lock-container");
        container.classList.add("shake");
        
        // Reset after animation
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
    
    // Close lightbox if open when locking
    if(lightbox) lightbox.style.display = "none";
});

// --- 3. PHOTO LOADING ---
function loadPhotos() {
    // Stop if images are already loaded
    if (grid.children.length > 0) return;

    // Loop from 1 to 60
    for (let i = 1; i <= TOTAL_PHOTOS; i++) {
        const img = document.createElement("img");
        
        // Create filename: ./photos/p1.jpg ...
        const imgSrc = `${PHOTO_FOLDER}p${i}${FILE_EXTENSION}`;
        img.src = imgSrc;
        img.alt = `Photo ${i}`;
        img.classList.add("gallery-img");
        
        // PERFORMANCE: Only load when scrolled into view
        img.loading = "lazy";

        // ERROR HANDLING: Hide image if file is missing
        img.onerror = function() {
            this.style.display = "none";
        };

        // CLICK EVENT: Open Lightbox
        img.addEventListener('click', () => {
            openLightbox(imgSrc);
        });

        grid.appendChild(img);
    }
}

// --- 4. LIGHTBOX / POPUP LOGIC (NEW FEATURE) ---

function initLightbox() {
    // A. Inject Styles for the Popup
    const style = document.createElement('style');
    style.innerHTML = `
        #lightbox {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.9);
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        #lightbox img {
            max-width: 90%;
            max-height: 80vh;
            border: 2px solid white;
            box-shadow: 0 0 20px rgba(255,255,255,0.2);
        }
        .lightbox-controls {
            margin-top: 20px;
            display: flex;
            gap: 20px;
        }
        .lb-btn {
            background: #333;
            color: white;
            border: 1px solid white;
            padding: 10px 20px;
            cursor: pointer;
            font-size: 16px;
            text-decoration: none;
            border-radius: 5px;
            transition: 0.3s;
        }
        .lb-btn:hover {
            background: white;
            color: black;
        }
        #lb-close { background: #b91c1c; border-color: #b91c1c; }
        #lb-close:hover { background: red; }
    `;
    document.head.appendChild(style);

    // B. Create HTML Elements
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    
    lightboxImg = document.createElement('img');
    
    const controls = document.createElement('div');
    controls.className = 'lightbox-controls';
    
    downloadBtn = document.createElement('a');
    downloadBtn.className = 'lb-btn';
    downloadBtn.innerText = 'Download';
    downloadBtn.download = ''; // Attribute for downloading
    
    closeBtn = document.createElement('button');
    closeBtn.className = 'lb-btn';
    closeBtn.id = 'lb-close';
    closeBtn.innerText = 'Close';
    
    // Assemble
    controls.appendChild(downloadBtn);
    controls.appendChild(closeBtn);
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(controls);
    document.body.appendChild(lightbox);

    // C. Close Events
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = "flex";
    
    // Setup Download Link
    downloadBtn.href = src;
    // Extract filename for download attribute (e.g., "p1.jpg")
    const fileName = src.split('/').pop(); 
    downloadBtn.setAttribute('download', fileName);
}

function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = ""; // Clear src to stop memory leaks
}