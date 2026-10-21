import cv2
import numpy as np
import os

dir_path = r'C:\Users\kashi\.gemini\antigravity-ide\brain\23ca7d84-1304-499b-9eb3-f921b7f54966\.user_uploaded'
out_dir = r'C:\Users\kashi\Desktop\Forgex\public\assets\images\faculty'

officers = [
    {
        'id': 'kashyap_sc',
        'file': 'media_1792563142380.jpg',
        'crop': (270, 15, 822, 570)
    },
    {
        'id': 'kapoor',
        'file': 'media_1792563142407.jpg',
        'crop': (250, 15, 819, 585)
    },
    {
        'id': 'tewari',
        'file': 'media_1792563142461.jpg',
        'crop': (240, 20, 819, 585)
    },
    {
        'id': 'sathe',
        'file': 'media_1792563142480.jpg',
        'crop': (240, 20, 819, 585)
    },
    {
        'id': 'kaushalendra',
        'file': 'media_1792563142538.jpg',
        'crop': (210, 15, 819, 575)
    }
]

for o in officers:
    im_path = os.path.join(dir_path, o['file'])
    orig = cv2.imread(im_path)
    x1, y1, x2, y2 = o['crop']
    crop = orig[y1:y2, x1:x2].copy()
    h, w = crop.shape[:2]

    # Inpaint the top-right corner where 'PEOPLE PERSPECTIVE PERFORMANCE' appears
    rx1, ry1, rx2, ry2 = max(0, w - 210), 0, w, min(h, 130)
    top_right = crop[ry1:ry2, rx1:rx2]
    gray = cv2.cvtColor(top_right, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 180, 255, cv2.THRESH_BINARY)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    thresh = cv2.dilate(thresh, kernel, iterations=2)
    
    mask = np.zeros((h, w), dtype=np.uint8)
    mask[ry1:ry2, rx1:rx2] = thresh
    
    # Also inpaint any stray text pixels on the far left (x < 60)
    left_strip = crop[:, :min(w, 60)]
    gray_l = cv2.cvtColor(left_strip, cv2.COLOR_BGR2GRAY)
    _, thresh_l = cv2.threshold(gray_l, 200, 255, cv2.THRESH_BINARY)
    thresh_l = cv2.dilate(thresh_l, kernel, iterations=2)
    mask[:, :min(w, 60)] = thresh_l

    inpainted = cv2.inpaint(crop, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)

    # Standardize to 640x640 portrait with high-quality Lanczos resampling
    final_img = cv2.resize(inpainted, (640, 640), interpolation=cv2.INTER_LANCZOS4)

    out_file = os.path.join(out_dir, f"{o['id']}.jpg")
    cv2.imwrite(out_file, final_img, [cv2.IMWRITE_JPEG_QUALITY, 96])
    print(f"Created {out_file} (640x640)")
