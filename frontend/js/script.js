// Backend API URL - Update this for deployment
const API_BASE_URL = 'http://localhost:8000/api';

// DOM elements
const imageUpload = document.getElementById('imageUpload');
const processBtn = document.getElementById('processBtn');
const originalImageDiv = document.getElementById('originalImage');
const processedImageDiv = document.getElementById('processedImage');
const loadingDiv = document.getElementById('loading');

let currentOriginalImage = null;

// Event listeners
imageUpload.addEventListener('change', handleImageUpload);
processBtn.addEventListener('click', processImage);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
        alert('Please select a valid image file (JPG, PNG)');
        return;
    }

    // Display original image preview
    const reader = new FileReader();
    reader.onload = function(e) {
        originalImageDiv.innerHTML = `<img src="${e.target.result}" alt="Original Image" />`;
        currentOriginalImage = file;
    };
    reader.readAsDataURL(file);
}

async function processImage() {
    if (!currentOriginalImage) {
        alert('Please upload an image first');
        return;
    }

    const phase = document.querySelector('input[name="phase"]:checked').value;
    
    // Show loading
    loadingDiv.classList.remove('hidden');
    processBtn.disabled = true;

    try {
        const formData = new FormData();
        formData.append('image', currentOriginalImage);
        formData.append('phase', phase);

        const response = await fetch(`${API_BASE_URL}/process/`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        // Display processed image
        processedImageDiv.innerHTML = `<img src="${data.processed_image}" alt="Processed Image" />`;

    } catch (error) {
        console.error('Error processing image:', error);
        alert('Error processing image. Please try again.');
    } finally {
        // Hide loading
        loadingDiv.classList.add('hidden');
        processBtn.disabled = false;
    }
}

// Utility function to show errors
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    document.querySelector('.upload-section').appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

console.log('MedTech Image Processor loaded');
