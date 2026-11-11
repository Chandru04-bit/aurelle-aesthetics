const https = require('https');
const fs = require('fs');
const path = require('path');

const targets = [
  {
    name: 'About Us Consultation HD',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&h=1200&q=90',
    dest: 'assets/images/about/hero-about-hd.jpg',
    distDest: 'dist/assets/images/about/hero-about-hd.jpg'
  },
  {
    name: 'Treatments Session HD',
    url: 'https://plus.unsplash.com/premium_photo-1674841252366-162fc9b8f983?auto=format&fit=crop&w=1600&h=1200&q=90',
    dest: 'assets/images/treatments/hero-treatment-hd.jpg',
    distDest: 'dist/assets/images/treatments/hero-treatment-hd.jpg'
  },
  {
    name: 'Specialists Team HD',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1600&h=1200&q=90',
    dest: 'assets/images/providers/hero-specialists-hd.jpg',
    distDest: 'dist/assets/images/providers/hero-specialists-hd.jpg'
  },
  {
    name: 'Contact Concierge HD',
    url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1600&h=1200&q=90',
    dest: 'assets/images/contact/hero-contact-hd.jpg',
    distDest: 'dist/assets/images/contact/hero-contact-hd.jpg'
  }
];

async function run() {
  for (const t of targets) {
    fs.mkdirSync(path.dirname(t.dest), { recursive: true });
    fs.mkdirSync(path.dirname(t.distDest), { recursive: true });
    console.log(`Downloading ${t.name}...`);
    const res = await fetch(t.url);
    if (!res.ok) throw new Error(`Failed to download ${t.name}: ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(t.dest, buf);
    fs.writeFileSync(t.distDest, buf);
    console.log(`  Saved ${t.dest} (${buf.length} bytes)`);
  }
  console.log('All HD images successfully downloaded and stored!');
}

run().catch(console.error);
