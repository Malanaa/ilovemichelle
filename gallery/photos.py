import tkinter as tk
from tkinter import filedialog, messagebox
import os
import shutil

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Photos</title>
    <style>
        .photo {{
            border: 1px solid #000;
            margin: 10px;
            padding: 10px;
            border-radius: 5px;
            max-width: 100%;
            height: auto;
        }}
    </style>
</head>
<body>
    {}
</body>
</html>
"""

def ensure_images_folder():
    if not os.path.exists('images'):
        os.makedirs('images')

def add_photo_to_html(filename):
    photo_element = f'<img src="images/{filename}" class="photo">'
    if not os.path.exists('index.html'):
        with open('index.html', 'w') as file:
            file.write(HTML_TEMPLATE.format(photo_element))
    else:
        with open('index.html', 'r+') as file:
            content = file.read()
            position = content.find('</body>')
            new_content = content[:position] + photo_element + '\n' + content[position:]
            file.seek(0)
            file.write(new_content)

def copy_photo_to_images_folder(photo_path):
    ensure_images_folder()
    filename = os.path.basename(photo_path)
    destination = os.path.join('images', filename)
    # Check if file exists to avoid overwrite
    if os.path.exists(destination):
        base, extension = os.path.splitext(filename)
        counter = 1
        while os.path.exists(destination):
            filename = f"{base}_{counter}{extension}"
            destination = os.path.join('images', filename)
            counter += 1
    shutil.copy(photo_path, destination)
    return filename

def get_photo_from_user():
    root = tk.Tk()
    root.withdraw() # we don't want a full GUI, so keep the root window from appearing
    photo_path = filedialog.askopenfilename(title="Select a photo",
                                            filetypes=(("JPEG files", "*.jpg;*.jpeg"), ("PNG files", "*.png"), ("All files", "*.*")))
    if photo_path:
        filename = copy_photo_to_images_folder(photo_path)
        add_photo_to_html(filename)
        messagebox.showinfo("Success", "Photo added successfully!")
    else:
        messagebox.showwarning("Warning", "No photo selected.")

if __name__ == "__main__":
    get_photo_from_user()
