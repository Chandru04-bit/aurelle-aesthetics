import os
import re
from html.parser import HTMLParser

html_files = []
for root, dirs, files in os.walk('.'):
    if any(x in root for x in ['node_modules', '.git', 'dist', 'scratch']):
        continue
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f).replace('\\', '/'))

print(f"Analyzing {len(html_files)} HTML files:")

class SimpleSectionParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = []
        self.current_heading = ''
        self.in_heading = False
        self.current_section = ''
        self.tag_stack = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        self.tag_stack.append(tag)
        if tag == 'section':
            self.current_section = attr_dict.get('id', '')
        if tag in ['h1', 'h2', 'h3', 'h4']:
            self.in_heading = True
            self.current_heading = ''
        if tag == 'img':
            src = attr_dict.get('src', '')
            alt = attr_dict.get('alt', '')
            if src and not src.endswith('.svg') and not src.endswith('.ico') and not src.startswith('data:'):
                self.images.append({
                    'src': src,
                    'alt': alt,
                    'section': self.current_section,
                    'heading': self.current_heading,
                    'class': attr_dict.get('class', '')
                })

    def handle_endtag(self, tag):
        if self.tag_stack and self.tag_stack[-1] == tag:
            self.tag_stack.pop()
        if tag in ['h1', 'h2', 'h3', 'h4']:
            self.in_heading = False
        if tag == 'section':
            pass

    def handle_data(self, data):
        if self.in_heading:
            self.current_heading += ' ' + data.strip()
            self.current_heading = self.current_heading.strip()

for hf in sorted(html_files):
    if hf == './home-2.html':
        continue
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        parser = SimpleSectionParser()
        parser.feed(f.read())
    
    if parser.images:
        print(f"\n=======================================================")
        print(f"FILE: {hf} (Total images: {len(parser.images)})")
        print(f"=======================================================")
        for idx, img in enumerate(parser.images, 1):
            print(f"  [{idx}] Sec: '{img['section']}' | Heading: '{img['heading']}'")
            print(f"      Alt: '{img['alt']}'")
            print(f"      Src: '{img['src']}'")
