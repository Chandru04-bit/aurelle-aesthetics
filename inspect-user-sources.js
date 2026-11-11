const fs = require('fs');
const dir = 'C:/Users/satha/.gemini/antigravity/brain/b5c89135-d409-4d1a-9551-e2df7e29540f/.user_uploaded/';
fs.readdirSync(dir).forEach(f => {
  const stat = fs.statSync(dir + f);
  console.log(f, stat.size + ' bytes');
});
