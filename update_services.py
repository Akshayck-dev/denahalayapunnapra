import sys
import re

try:
    with open('services.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Apply all specific text replacements
    html = html.replace('class="programs-grid-premium"', 'class="services-grid-premium"')
    html = re.sub(r'class="program-card-premium([^"]*)"', r'class="services-card-premium\1"', html)
    html = html.replace('class="icon-box-premium', 'class="services-icon-box')
    html = html.replace('class="program-subtitle-premium"', 'class="services-subtitle"')
    html = html.replace('class="program-meta-premium"', 'class="services-meta"')
    html = html.replace('class="program-description-premium"', 'class="services-description"')

    # Replace dual-btn group with single wide pill button exactly like the screenshot
    pattern = r'<div class="program-btn-group">.*?<button onclick="openCourse\(\'([^\']+)\'\)" class="btn-read-premium">READ MORE</button>.*?<button class="btn-apply-premium"[^>]*>APPLY NOW</button>.*?</div>'
    replacement = r'<button onclick="openCourse(\'\1\')" class="services-btn-read">READ MORE <i class="fas fa-chevron-right ms-1" style="font-size: 10px;"></i></button>'
    
    html = re.sub(pattern, replacement, html, flags=re.DOTALL)

    with open('services.html', 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("SERVICES PAGE UPDATE SUCCESS")
except Exception as e:
    print(f"Error: {e}")
