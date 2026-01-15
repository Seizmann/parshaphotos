# 🔒 Secure PIN Photo Gallery

A responsive, Vanilla JavaScript web application that protects a photo gallery behind a numeric PIN pad. Features a clean UI, performance optimizations, and a custom lightbox with download capabilities.

## ✨ Features

* **PIN Protection**: A 4-digit security screen blocks access to the gallery until the correct code is entered.
* **Shake Animation**: Visual feedback (shake effect) for incorrect PIN attempts.
* **Lazy Loading**: Images are loaded dynamically to improve performance and only appear when the gallery is unlocked.
* **Lightbox Viewer**: Click any image to view it in full screen with a dark overlay.
* **Download Support**: Built-in download button in the lightbox view allows users to save individual photos.
* **Auto-Lock**: Ability to re-lock the gallery with a single click.

## 🛠️ Tech Stack

* **HTML5**: Semantic structure.
* **CSS3**: Grid layout, Flexbox, and Animations.
* **JavaScript (ES6+)**: Logic for state management, DOM manipulation, and dynamic element creation.

## 🚀 How to Run

1.  Clone the repository or download the source code.
2.  **Add Images**: Place your image files directly in the **root directory** (the same folder as `index.html` and `script.js`).
3.  **Naming**: Ensure images are named sequentially (e.g., `p1.jpg`, `p2.jpg`, `p3.jpg`, etc.).
4.  Open `index.html` in your browser.

## ⚙️ Configuration

You can easily customize the gallery by editing the top of `script.js`:

```javascript
// Change your PIN here
const CORRECT_PIN = "0000"; 

// Set the number of photos you have
const TOTAL_PHOTOS = 50; 

// Path configuration (Set to root directory)
const PHOTO_FOLDER = "./"; 

// File extension (.jpg or .png)
const FILE_EXTENSION = ".jpg";
