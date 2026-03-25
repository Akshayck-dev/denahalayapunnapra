import os
from PIL import Image

def optimize_images():
    base_dir = r"c:\Users\ACER\OneDrive\Documents\Denahalaya latest\Denahalaya1\Denahalaya"
    img_dir = os.path.join(base_dir, "assets", "images")
    
    # Categories and Targets
    # Profiles: 300px
    # Gallery: 800px
    # Background/Hero: 1200px
    
    profile_keywords = ["Abraham", "Andrews", "Cheriyan", "Varghese", "Scaria", "Siju", "Jiya", "Tijo", "Thomas", "Anish", "Linta", "nirmala"]
    bg_keywords = ["slider", "building", "ALLEPPEY", "background"]
    gallery_keywords = ["img", "classroom", "Gallery"]

    for filename in os.listdir(img_dir):
        if filename.lower().endswith((".jpg", ".jpeg", ".png")):
            filepath = os.path.join(img_dir, filename)
            
            try:
                with Image.open(filepath) as img:
                    orig_width, orig_height = img.size
                    
                    # Determine target width
                    target_width = 800 # Default for gallery/others
                    if any(kw.lower() in filename.lower() for kw in profile_keywords):
                        target_width = 300
                    elif any(kw.lower() in filename.lower() for kw in bg_keywords):
                        target_width = 1200
                    
                    # Resize if original is larger
                    if orig_width > target_width:
                        ratio = target_width / float(orig_width)
                        target_height = int(float(orig_height) * float(ratio))
                        img = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
                        print(f"Resized {filename} to {target_width}px width")
                    else:
                        print(f"Kept original width for {filename} ({orig_width}px)")

                    # Convert to WebP
                    webp_filename = os.path.splitext(filename)[0] + ".webp"
                    webp_path = os.path.join(img_dir, webp_filename)
                    
                    # Save with quality=80
                    img.save(webp_path, "WEBP", quality=80)
                    
                    # Quality Check (Safe Size)
                    size_kb = os.path.getsize(webp_path) / 1024
                    if size_kb < 50 and os.path.getsize(filepath) / 1024 > 60:
                        # Re-save with higher quality if too small
                        img.save(webp_path, "WEBP", quality=90)
                        print(f"Converted {filename} -> {webp_filename} (High Quality fallback, {os.path.getsize(webp_path)/1024:.1f}KB)")
                    else:
                        print(f"Converted {filename} -> {webp_filename} ({size_kb:.1f}KB)")

            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    optimize_images()
