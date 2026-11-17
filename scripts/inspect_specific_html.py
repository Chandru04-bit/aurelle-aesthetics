import os
from html.parser import HTMLParser

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
                })

    def handle_endtag(self, tag):
        if self.tag_stack and self.tag_stack[-1] == tag:
            self.tag_stack.pop()
        if tag in ['h1', 'h2', 'h3', 'h4']:
            self.in_heading = False

    def handle_data(self, data):
        if self.in_heading:
            self.current_heading += ' ' + data.strip()
            self.current_heading = self.current_heading.strip()

target_files = ['./pages/about.html', './pages/booking.html', './pages/contact.html', './pages/dashboard.html']
for hf in target_files:
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        parser = SimpleSectionParser()
        parser.feed(f.read())
    print(f"\nFILE: {hf}")
    for idx, img in enumerate(parser.images, 1):
        print(f"  [{idx}] Sec: '{img['section']}' | Heading: '{img['heading']}'")
        print(f"      Alt: '{img['alt']}'")
        print(f"      Src: '{img['src']}'")
