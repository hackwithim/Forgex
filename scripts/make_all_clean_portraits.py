import cv2
import numpy as np
import os

dir_path = r'C:\Users\kashi\.gemini\antigravity-ide\brain\23ca7d84-1304-499b-9eb3-f921b7f54966\.user_uploaded'
out_dir = r'C:\Users\kashi\Desktop\Forgex\public\assets\images\faculty'
os.makedirs(out_dir, exist_ok=True)

configs = [
    {
        'id': 'kashyap_sc',
        'file': 'media_1792563142380.jpg',
        'crop': (300, 20, 780, 500), # 480x480
        'left_text_box': (0, 150, 120, 430), # expanded to cover 'der' and white shape
        'top_right_box': (360, 0, 480, 110)
    },
    {
        'id': 'kapoor',
        'file': 'media_1792563142407.jpg',
        'crop': (310, 15, 790, 495),
        'left_text_box': (0, 150, 80, 320),
        'top_right_box': (360, 0, 480, 110)
    },
    {
        'id': 'tewari',
        'file': 'media_1792563142461.jpg',
        'crop': (200, 25, 680, 505),
        'left_text_box': (0, 130, 110, 440), # expanded to cover 'grated/d'
        'top_right_box': (360, 0, 480, 110)
    },
    {
        'id': 'sathe',
        'file': 'media_1792563142480.jpg',
        'crop': (330, 25, 810, 505),
        'left_text_box': (0, 140, 80, 300),
        'top_right_box': (360, 0, 480, 110)
    },
    {
        'id': 'kaushalendra',
        'file': 'media_1792563142538.jpg',
        'crop': (320, 20, 800, 500),
        'left_text_box': (0, 160, 120, 320), # expanded to cover 'A'
        'top_right_box': (360, 0, 480, 110)
    }
]

for cfg in configs:
    im_path = os.path.join(dir_path, cfg['file'])
    orig = cv2.imread(im_path)
    if orig is None:
        print(f"Error loading {im_path}")
        continue
    
    x1, y1, x2, y2 = cfg['crop']
    crop = orig[y1:y2, x1:x2].copy()
    h, w = crop.shape[:2]

    mask = np.zeros((h, w), dtype=np.uint8)

    # Inpaint left text box
    lx1, ly1, lx2, ly2 = cfg['left_text_box']
    roi_l = crop[ly1:ly2, lx1:lx2]
    if roi_l.size > 0:
        gray_l = cv2.cvtColor(roi_l, cv2.COLOR_BGR2GRAY)
        _, thresh_l = cv2.threshold(gray_l, 130, 255, cv2.THRESH_BINARY)
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        thresh_l = cv2.dilate(thresh_l, kernel, iterations=3)
        mask[ly1:ly2, lx1:lx2] = thresh_l

    # Inpaint top right box
    rx1, ry1, rx2, ry2 = cfg['top_right_box']
    roi_r = crop[ry1:ry2, rx1:rx2]
    if roi_r.size > 0:
        gray_r = cv2.cvtColor(roi_r, cv2.COLOR_BGR2GRAY)
        _, thresh_r = cv2.threshold(gray_r, 110, 255, cv2.THRESH_BINARY)
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        thresh_r = cv2.dilate(thresh_r, kernel, iterations=3)
        mask[ry1:ry2, rx1:rx2] = thresh_r

    # Inpaint seamlessly
    inpainted = cv2.inpaint(crop, mask, inpaintRadius=7, flags=cv2.INPAINT_TELEA)

    # Output crisp 600x600 portrait
    final = cv2.resize(inpainted, (600, 600), interpolation=cv2.INTER_LANCZOS4)
    
    out_path = os.path.join(out_dir, f"{cfg['id']}.jpg")
    cv2.imwrite(out_path, final, [cv2.IMWRITE_JPEG_QUALITY, 96])
    print(f"Successfully generated: {out_path}")

print("All 5 portraits regenerated!")
