"""Generate a photo-style orange telephone receiver against a blue sky
gradient for the /contact page hero image."""

import math
import random

from PIL import Image, ImageDraw, ImageFilter

W, H = 1000, 1300

# --- sky gradient (light periwinkle -> deep blue) ---
top_color = (122, 134, 224)
bottom_color = (42, 44, 132)

sky = Image.new("RGB", (W, H))
for y in range(H):
    t = y / (H - 1)
    r = round(top_color[0] + (bottom_color[0] - top_color[0]) * t)
    g = round(top_color[1] + (bottom_color[1] - top_color[1]) * t)
    b = round(top_color[2] + (bottom_color[2] - top_color[2]) * t)
    ImageDraw.Draw(sky).line([(0, y), (W, y)], fill=(r, g, b))

# --- soft clouds ---
cloud_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
cd = ImageDraw.Draw(cloud_layer)
cloud_specs = [
    (180, 220, 260, 90, 70),
    (650, 160, 320, 110, 60),
    (420, 380, 240, 80, 50),
    (120, 520, 200, 70, 45),
    (760, 480, 280, 95, 55),
    (300, 80, 200, 70, 60),
]
for cx, cy, w, h, alpha in cloud_specs:
    cd.ellipse([cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2], fill=(255, 255, 255, alpha))
cloud_layer = cloud_layer.filter(ImageFilter.GaussianBlur(40))
sky = Image.alpha_composite(sky.convert("RGBA"), cloud_layer)

# --- telephone receiver (earpiece - handle - mouthpiece), drawn vertically then rotated ---
phone_w, phone_h = 380, 760
phone = Image.new("RGBA", (phone_w, phone_h), (0, 0, 0, 0))
pd = ImageDraw.Draw(phone)

orange_light = (255, 167, 89)
orange_mid = (237, 116, 47)
orange_dark = (196, 78, 24)

# gradient fill helper: vertical gradient rounded rect
def gradient_rounded_rect(img_draw, base_img, box, radius, top_c, bottom_c):
    x0, y0, x1, y1 = box
    w = x1 - x0
    h = y1 - y0
    grad = Image.new("RGB", (w, h))
    for yy in range(h):
        t = yy / max(h - 1, 1)
        r = round(top_c[0] + (bottom_c[0] - top_c[0]) * t)
        g = round(top_c[1] + (bottom_c[1] - top_c[1]) * t)
        b = round(top_c[2] + (bottom_c[2] - top_c[2]) * t)
        ImageDraw.Draw(grad).line([(0, yy), (w, yy)], fill=(r, g, b))
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, w - 1, h - 1], radius=radius, fill=255)
    base_img.paste(grad, (x0, y0), mask)

# earpiece (top rounded block)
gradient_rounded_rect(pd, phone, (20, 10, phone_w - 20, 230), 90, orange_light, orange_mid)
# handle (middle bar)
gradient_rounded_rect(pd, phone, (140, 190, 240, 560), 40, orange_mid, orange_dark)
# mouthpiece (bottom rounded block)
gradient_rounded_rect(pd, phone, (20, 520, phone_w - 20, phone_h - 20), 90, orange_mid, orange_dark)

# speaker holes
hole_color = (90, 41, 16)
for grid_y, cy_base in [(0, 70), (1, 620)]:
    for row in range(3):
        for col in range(4):
            cx = 70 + col * 70
            cy = cy_base + row * 38
            pd.ellipse([cx - 8, cy - 8, cx + 8, cy + 8], fill=hole_color)

# soft highlight sheen on earpiece
sheen = Image.new("RGBA", (phone_w, phone_h), (0, 0, 0, 0))
sd = ImageDraw.Draw(sheen)
sd.ellipse([30, 20, 200, 110], fill=(255, 255, 255, 90))
sd.ellipse([30, 540, 200, 640], fill=(255, 255, 255, 70))
sheen = sheen.filter(ImageFilter.GaussianBlur(18))
phone = Image.alpha_composite(phone, sheen)

# rotate the receiver for a dynamic "held up" composition
phone = phone.rotate(28, expand=True, resample=Image.BICUBIC)

# drop shadow
shadow = Image.new("RGBA", sky.size, (0, 0, 0, 0))
shadow_shape = phone.split()[-1]
shadow_layer = Image.new("RGBA", phone.size, (10, 10, 40, 130))
shadow_layer.putalpha(shadow_shape)
shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(28))

px = (W - phone.width) // 2 + 30
py = (H - phone.height) // 2 + 60

shadow.paste(shadow_layer, (px + 30, py + 40), shadow_layer)
sky = Image.alpha_composite(sky, shadow)
sky.paste(phone, (px, py), phone)

# --- film grain for a photographic feel ---
random.seed(7)
grain = Image.new("L", (W, H))
grain.putdata([random.randint(0, 255) for _ in range(W * H)])
grain = grain.convert("RGBA")
grain.putalpha(18)
sky = Image.alpha_composite(sky, grain)

# subtle vignette
vignette = Image.new("L", (W, H), 0)
vd = ImageDraw.Draw(vignette)
vd.ellipse([-W * 0.3, -H * 0.25, W * 1.3, H * 1.25], fill=255)
vignette = vignette.filter(ImageFilter.GaussianBlur(120))
dark = Image.new("RGBA", (W, H), (10, 10, 40, 60))
dark.putalpha(Image.eval(vignette, lambda v: 255 - v))
sky = Image.alpha_composite(sky, dark)

sky.convert("RGB").save("public/images/base/phone-call.jpg", quality=88)
print("done")
