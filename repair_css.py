import os

file_path = r'c:\Users\ACER\OneDrive\Documents\Denahalaya latest\Denahalaya1\Denahalaya\assets\css\main.css'
target = """/* Mobile Adjustments */
@media (max-width: 768px) {"""

replacement = """}

/* Mobile Adjustments */
@media (max-width: 768px) {"""

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8-sig') as f:
        content = f.read()
    
    if target in content:
        # We only want to replace the FIRST occurrence after line 3000
        # Actually, let's just replace the FIRST occurrence in the whole file if it's unclosed.
        # But to be safe, let's find the approximate position.
        
        new_content = content.replace(target, replacement, 1) # Only first occurrence
        with open(file_path, 'w', encoding='utf-8', newline='') as f:
            f.write(new_content)
        print("Success: Updated main.css - repaired unclosed media query")
    else:
        # Try with different line endings
        target_norm = target.replace('\r\n', '\n')
        content_norm = content.replace('\r\n', '\n')
        if target_norm in content_norm:
            new_content_norm = content_norm.replace(target_norm, replacement.replace('\r\n', '\n'), 1)
            with open(file_path, 'w', encoding='utf-8', newline='\n') as f:
                f.write(new_content_norm)
            print("Success: Updated main.css (fixed line endings) - repaired unclosed media query")
        else:
            print("Error: Target content not found in main.css")
else:
    print(f"Error: File not found {file_path}")
