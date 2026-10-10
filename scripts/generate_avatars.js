import fs from 'fs';
import path from 'path';

const assetsDir = path.resolve('public/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

function createSVG(filename, content) {
  fs.writeFileSync(path.join(assetsDir, filename), content.trim());
}

// Chef Avatars
function makeChefAvatar(filename, bg1, bg2, accentColor, initials) {
  createSVG(filename, `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="grad_${filename}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg1}"/>
      <stop offset="100%" stop-color="${bg2}"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="30" fill="url(#grad_${filename})"/>
  <circle cx="100" cy="80" r="38" fill="${accentColor}" opacity="0.9"/>
  <path d="M 40,175 C 40,135 70,125 100,125 C 130,125 160,135 160,175 Z" fill="${accentColor}" opacity="0.9"/>
  <text x="100" y="88" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">${initials}</text>
  <circle cx="100" cy="38" r="14" fill="#ffffff" opacity="0.8"/>
  <path d="M 85,38 Q 100,20 115,38 Z" fill="#ffffff" opacity="0.9"/>
</svg>
`);
}

makeChefAvatar('chef1.svg', '#01261f', '#094337', '#e67e22', 'ER');
makeChefAvatar('chef2.svg', '#1f2421', '#3b433e', '#fc8f34', 'JV');
makeChefAvatar('chef3.svg', '#3a2e39', '#5c4d5b', '#f4a261', 'CM');
makeChefAvatar('chef4.svg', '#283618', '#606c38', '#dda15e', 'MA');

console.log('Chef avatars created!');
