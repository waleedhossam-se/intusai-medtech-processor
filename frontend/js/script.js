// Backend API URL - Updated for deployed backend
const API_BASE_URL = 'https://waleedho-intusai-medtech-backend.hf.space/api';

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

    if (!file.type.match('image.*')) {
        alert('Please select a valid image file (JPG, PNG)');
        return;
    }

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
    
    loadingDiv.classList.remove('hidden');
    processBtn.disabled = true;

    try {
        const formData = new FormData();
        formData.append('image', currentOriginalImage);
        formData.append('phase', phase);

        console.log('Sending request to:', `${API_BASE_URL}/process/`);

        const response = await fetch(`${API_BASE_URL}/process/`, {
            method: 'POST',
            body: formData
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Success! Received processed image');

        processedImageDiv.innerHTML = `<img src="${data.processed_image}" alt="Processed Image" />`;

    } catch (error) {
        console.error('Error processing image:', error);
        alert('Error: ' + error.message);
    } finally {
        loadingDiv.classList.add('hidden');
        processBtn.disabled = false;
    }
}

console.log('MedTech Image Processor loaded');
