# 🔒 Secure PIN Photo Gallery

A responsive, Vanilla JavaScript web application that hides a photo gallery behind a numeric PIN pad. Features a clean UI, performance optimizations, and a custom lightbox.

## ✨ Features

* **PIN Protection**: A 4-digit security screen blocks access to the gallery until the correct code is entered.
* **Shake Animation**: Visual feedback (shake effect) for incorrect PIN attempts.
* **Lazy Loading**: Images are loaded dynamically to improve performance and only when the gallery is unlocked.
* **Lightbox Viewer**: Click any image to view it in full screen with a dark overlay.
* **Download Support**: Built-in download button in the lightbox view.
* **Auto-Lock**: Ability to re-lock the gallery with a single click.

## 🛠️ Tech Stack

* **HTML5**: Semantic structure.
* **CSS3**: Grid layout, Flexbox, and Animations.
* **JavaScript (ES6+)**: Logic for state management, DOM manipulation, and dynamic element creation.

## 🚀 How to Run

1.  Clone the repository.
2.  Place your images in the `/photos` folder.
3.  Open `index.html` in your browser.

## ⚙️ Configuration

You can easily customize the gallery by editing the top of `script.js`:

```javascript
// Change your PIN here
const CORRECT_PIN = "0000"; 

// Set the number of photos in your folder
const TOTAL_PHOTOS = 50; 

// Set your photo path and extension
const PHOTO_FOLDER = "./photos/";
const FILE_EXTENSION = ".jpg";
