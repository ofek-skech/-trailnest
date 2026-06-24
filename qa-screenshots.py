from playwright.sync_api import sync_playwright
import os

BASE = "http://localhost:3000"
OUT  = r"C:\Users\ofekd\CampingStore\qa-shots"
os.makedirs(OUT, exist_ok=True)

PAGES = [
    ("/",                       "home"),
    ("/shop",                   "shop"),
    ("/shop/camp-kitchen",      "shop-camp-kitchen"),
    ("/shop/vehicle-gear",      "shop-vehicle-gear"),
    ("/product/espresso-nayad", "product-espresso"),
    ("/product/plasma-lighter", "product-lighter"),
    ("/product/medeflatorm",    "product-deflators"),
    ("/product/arasal-shtat",   "product-hammock"),
    ("/cart",                   "cart"),
    ("/checkout",               "checkout"),
]

VIEWPORTS = [
    (1440, 900,  "desktop"),
    (390,  844,  "mobile"),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for w, h, label in VIEWPORTS:
        ctx  = browser.new_context(viewport={"width": w, "height": h})
        page = ctx.new_page()
        for path, name in PAGES:
            try:
                page.goto(f"{BASE}{path}", wait_until="networkidle", timeout=15000)
                page.wait_for_timeout(800)
                fp = os.path.join(OUT, f"{label}-{name}.png")
                page.screenshot(path=fp, full_page=True)
                print(f"OK {label}  {path}")
            except Exception as e:
                print(f"ERR {label}  {path}  ERROR: {e}")
        ctx.close()
    browser.close()

print("Done. Saved to " + OUT)
