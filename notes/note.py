import tkinter as tk
from tkinter import simpledialog
import os

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notes</title>
    <style>
        .note {{
            border: 1px solid #000;
            margin: 10px;
            padding: 10px;
            border-radius: 5px;
        }}
    </style>
</head>
<body>
    {}
</body>
</html>
"""


def add_note_to_html(note):
    note_element = f'<div class="note">{note}</div>'
    if not os.path.exists('index.html'):
        with open('index.html', 'w') as file:
            file.write(HTML_TEMPLATE.format(note_element))
    else:
        with open('index.html', 'r+') as file:
            content = file.read()
            position = content.find('</body>')
            new_content = content[:position] + note_element + '\n' + content[position:]
            file.seek(0)
            file.write(new_content)

def get_note_from_user():
    root = tk.Tk()
    root.withdraw() # we don't want a full GUI, so keep the root window from appearing
    note = simpledialog.askstring("Input", "What note would you like to add?")
    if note:
        add_note_to_html(note)
        tk.messagebox.showinfo("Success", "Note added successfully!")
    else:
        tk.messagebox.showwarning("Warning", "No note entered.")

if __name__ == "__main__":
    get_note_from_user()