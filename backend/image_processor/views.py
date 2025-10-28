import os
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np
from skimage import filters
import base64
from io import BytesIO
import json

@csrf_exempt
@api_view(['POST'])
def process_image(request):
    if 'image' not in request.FILES:
        return JsonResponse({'error': 'No image provided'}, status=400)
    
    image_file = request.FILES['image']
    phase = request.POST.get('phase', 'arterial')
    
    # Open and process image
    original_image = Image.open(image_file)
    
    if phase == 'arterial':
        # Increase contrast
        enhancer = ImageEnhance.Contrast(original_image)
        processed_image = enhancer.enhance(2.0)  # Double contrast
    elif phase == 'venous':
        # Gaussian blur
        processed_image = original_image.filter(ImageFilter.GaussianBlur(radius=2))
    else:
        return JsonResponse({'error': 'Invalid phase'}, status=400)
    
    # Convert images to base64 for frontend display
    buffered_original = BytesIO()
    original_image.save(buffered_original, format="PNG")
    original_b64 = base64.b64encode(buffered_original.getvalue()).decode()
    
    buffered_processed = BytesIO()
    processed_image.save(buffered_processed, format="PNG")
    processed_b64 = base64.b64encode(buffered_processed.getvalue()).decode()
    
    return JsonResponse({
        'original_image': f"data:image/png;base64,{original_b64}",
        'processed_image': f"data:image/png;base64,{processed_b64}"
    })
