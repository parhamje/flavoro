import fs from 'fs';
import path from 'path';

const assetsDir = path.resolve('public/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

function createSVG(filename, content) {
  fs.writeFileSync(path.join(assetsDir, filename), content.trim());
}

// 1. Mushroom Pasta
createSVG('pasta.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#3d2f23"/>
      <stop offset="100%" stop-color="#191410"/>
    </radialGradient>
    <radialGradient id="plateGrad" cx="45%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#2a2f2b"/>
      <stop offset="80%" stop-color="#141815"/>
      <stop offset="100%" stop-color="#0a0c0b"/>
    </radialGradient>
    <radialGradient id="pastaGrad" cx="50%" cy="45%" r="45%">
      <stop offset="0%" stop-color="#fff1c5"/>
      <stop offset="40%" stop-color="#fed679"/>
      <stop offset="80%" stop-color="#e09e3e"/>
      <stop offset="100%" stop-color="#ab6b1d"/>
    </radialGradient>
    <linearGradient id="shroom" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#694f38"/>
      <stop offset="100%" stop-color="#302015"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="600" height="450" fill="url(#bgGrad)"/>
  <circle cx="300" cy="225" r="185" fill="url(#plateGrad)" filter="url(#shadow)"/>
  <circle cx="300" cy="225" r="175" fill="none" stroke="#3b423c" stroke-width="2" opacity="0.6"/>
  <circle cx="300" cy="225" r="130" fill="url(#plateGrad)"/>
  
  <!-- Pasta Swirls -->
  <g filter="url(#shadow)">
    <circle cx="300" cy="225" r="95" fill="url(#pastaGrad)"/>
    <!-- Pasta Ribbon Ribs -->
    <path d="M 230,220 Q 300,160 360,210 Q 400,260 330,290 Q 240,290 230,220 Z" fill="#ffecad" opacity="0.9"/>
    <path d="M 260,190 Q 340,180 350,240 Q 330,300 270,270 Q 220,240 260,190 Z" fill="#ffe082" opacity="0.8"/>
    <path d="M 280,210 Q 310,170 335,210 Q 360,250 310,260 Q 265,260 280,210 Z" fill="#fff7d6" opacity="0.9"/>
  </g>

  <!-- Mushrooms -->
  <g fill="url(#shroom)">
    <path d="M 270,190 C 270,175 300,170 310,185 C 315,195 285,205 270,190 Z"/>
    <path d="M 330,220 C 335,205 360,205 365,225 C 365,240 340,240 330,220 Z"/>
    <path d="M 250,240 C 245,225 275,220 285,235 C 290,250 260,255 250,240 Z"/>
    <path d="M 305,250 C 300,235 330,230 340,245 C 345,260 320,265 305,250 Z"/>
  </g>

  <!-- Herbs and Truffle flecks -->
  <g fill="#2e7d32">
    <circle cx="285" cy="205" r="4"/>
    <circle cx="330" cy="195" r="5"/>
    <circle cx="315" cy="235" r="4.5"/>
    <circle cx="265" cy="230" r="3.5"/>
    <circle cx="340" cy="260" r="4"/>
    <path d="M 290,195 Q 295,185 300,192 Q 305,200 295,202 Z"/>
    <path d="M 320,215 Q 330,210 328,220 Q 320,228 318,220 Z"/>
  </g>
  <g fill="#1a1412">
    <circle cx="295" cy="210" r="2"/>
    <circle cx="310" cy="190" r="1.5"/>
    <circle cx="325" cy="240" r="2"/>
    <circle cx="275" cy="220" r="1.5"/>
  </g>
</svg>
`);

// 2. Grilled Salmon
createSVG('salmon.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <radialGradient id="bgSalmon" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#2c302e"/>
      <stop offset="100%" stop-color="#121413"/>
    </radialGradient>
    <radialGradient id="plateSalmon" cx="45%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="85%" stop-color="#e8e2d8"/>
      <stop offset="100%" stop-color="#c9beaf"/>
    </radialGradient>
    <linearGradient id="salmonMeat" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff7f50"/>
      <stop offset="40%" stop-color="#ff6347"/>
      <stop offset="80%" stop-color="#e04e31"/>
      <stop offset="100%" stop-color="#a8321a"/>
    </linearGradient>
    <linearGradient id="grillChar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3d140a"/>
      <stop offset="100%" stop-color="#240b05"/>
    </linearGradient>
    <filter id="drop" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>
  <rect width="600" height="450" fill="url(#bgSalmon)"/>
  <circle cx="300" cy="225" r="185" fill="url(#plateSalmon)" filter="url(#drop)"/>
  <circle cx="300" cy="225" r="170" fill="none" stroke="#d5c8b6" stroke-width="1.5"/>
  
  <!-- Asparagus Spear Bed -->
  <g stroke="#386641" stroke-width="12" stroke-linecap="round">
    <line x1="200" y1="260" x2="380" y2="190"/>
    <line x1="210" y1="280" x2="390" y2="210"/>
    <line x1="220" y1="300" x2="400" y2="230"/>
  </g>

  <!-- Salmon Fillet -->
  <g filter="url(#drop)">
    <polygon points="230,170 370,170 390,265 210,265" fill="url(#salmonMeat)" rx="12"/>
    <!-- Grill Marks -->
    <line x1="250" y1="170" x2="280" y2="265" stroke="url(#grillChar)" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
    <line x1="290" y1="170" x2="320" y2="265" stroke="url(#grillChar)" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
    <line x1="330" y1="170" x2="360" y2="265" stroke="url(#grillChar)" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
  </g>

  <!-- Lemon Wedge -->
  <g transform="translate(370, 240) rotate(25)">
    <path d="M 0,0 A 40,40 0 0,1 55,30 Z" fill="#ffd100" stroke="#f4b400" stroke-width="3"/>
    <path d="M 5,5 A 32,32 0 0,1 48,27 Z" fill="#fff59d"/>
  </g>

  <!-- Herb garnish & microgreens -->
  <g fill="#2e7d32">
    <circle cx="300" cy="210" r="3"/>
    <circle cx="320" cy="190" r="2.5"/>
    <circle cx="280" cy="230" r="3.5"/>
    <circle cx="340" cy="220" r="2"/>
    <path d="M 270,185 Q 260,175 275,170 Q 280,180 270,185 Z"/>
    <path d="M 310,195 Q 320,185 325,195 Q 315,200 310,195 Z"/>
  </g>
</svg>
`);

// 3. Beef Burger
createSVG('burger.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <radialGradient id="bgBurger" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#2d241e"/>
      <stop offset="100%" stop-color="#140f0c"/>
    </radialGradient>
    <linearGradient id="bunGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e0923e"/>
      <stop offset="40%" stop-color="#c97726"/>
      <stop offset="100%" stop-color="#8a4b0e"/>
    </linearGradient>
    <linearGradient id="pattyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a2511"/>
      <stop offset="50%" stop-color="#301507"/>
      <stop offset="100%" stop-color="#1c0a02"/>
    </linearGradient>
    <filter id="shadowB" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="600" height="450" fill="url(#bgBurger)"/>
  
  <g filter="url(#shadowB)" transform="translate(300, 225)">
    <!-- Bottom Bun -->
    <path d="M -130,70 Q 0,110 130,70 L 120,40 Q 0,60 -120,40 Z" fill="url(#bunGrad)"/>
    
    <!-- Beef Patty -->
    <rect x="-140" y="5" width="280" height="40" rx="14" fill="url(#pattyGrad)"/>
    
    <!-- Melted Cheese -->
    <path d="M -135,10 L 135,10 L 110,35 L 70,18 L 30,38 L -20,18 L -60,35 L -100,18 Z" fill="#ffb703"/>
    
    <!-- Tomato Slices -->
    <rect x="-125" y="-18" width="115" height="18" rx="7" fill="#d90429"/>
    <rect x="10" y="-18" width="115" height="18" rx="7" fill="#d90429"/>
    
    <!-- Lettuce Leaf -->
    <path d="M -145,-20 Q -100,-45 -40,-25 Q 20,-45 80,-25 Q 120,-45 145,-20 Q 110,-10 0,-15 Q -100,-10 -145,-20 Z" fill="#588157"/>
    
    <!-- Top Brioche Bun -->
    <path d="M -130,-22 Q 0,-130 130,-22 Z" fill="url(#bunGrad)"/>
    
    <!-- Sesame Seeds -->
    <g fill="#ffe8d6">
      <ellipse cx="-50" cy="-70" rx="3.5" ry="2" transform="rotate(-15 -50 -70)"/>
      <ellipse cx="0" cy="-85" rx="3.5" ry="2"/>
      <ellipse cx="45" cy="-65" rx="3.5" ry="2" transform="rotate(20 45 -65)"/>
      <ellipse cx="-80" cy="-45" rx="3.5" ry="2" transform="rotate(-30 -80 -45)"/>
      <ellipse cx="80" cy="-45" rx="3.5" ry="2" transform="rotate(30 80 -45)"/>
      <ellipse cx="-10" cy="-55" rx="3.5" ry="2" transform="rotate(10 -10 -55)"/>
    </g>
  </g>
</svg>
`);

// 4. Chocolate Lava Cake
createSVG('lava_cake.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <radialGradient id="bgLava" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#3b2219"/>
      <stop offset="100%" stop-color="#140a06"/>
    </radialGradient>
    <radialGradient id="plateLava" cx="45%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="85%" stop-color="#ded8ce"/>
      <stop offset="100%" stop-color="#beb4a4"/>
    </radialGradient>
    <linearGradient id="cakeGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3d1d11"/>
      <stop offset="60%" stop-color="#240f07"/>
      <stop offset="100%" stop-color="#120602"/>
    </linearGradient>
    <linearGradient id="molten" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#542313"/>
      <stop offset="100%" stop-color="#260b03"/>
    </linearGradient>
    <filter id="shadowL" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000" flood-opacity="0.55"/>
    </filter>
  </defs>
  <rect width="600" height="450" fill="url(#bgLava)"/>
  <circle cx="300" cy="225" r="185" fill="url(#plateLava)" filter="url(#shadowL)"/>
  
  <!-- Raspberry Coulis Swipe -->
  <path d="M 160,260 Q 240,320 380,290 Q 440,270 420,240" fill="none" stroke="#9e0031" stroke-width="14" stroke-linecap="round" opacity="0.85"/>
  <circle cx="425" cy="235" r="6" fill="#9e0031"/>
  <circle cx="445" cy="245" r="4" fill="#9e0031"/>

  <!-- Cake Body -->
  <g filter="url(#shadowL)">
    <path d="M 230,260 L 250,170 Q 300,160 350,170 L 370,260 Q 300,285 230,260 Z" fill="url(#cakeGrad)"/>
    <!-- Top Cake Crust -->
    <ellipse cx="300" cy="170" rx="50" ry="16" fill="#4a2617"/>
    
    <!-- Molten Flowing Center -->
    <path d="M 285,185 Q 260,230 250,275 Q 300,295 320,275 Q 310,230 315,185 Z" fill="url(#molten)"/>
  </g>

  <!-- Vanilla Bean Gelato Scoop -->
  <g filter="url(#shadowL)">
    <circle cx="375" cy="190" r="32" fill="#fffdfa"/>
    <ellipse cx="375" cy="195" rx="30" ry="25" fill="#fcf6ec"/>
    <!-- Vanilla Specks -->
    <circle cx="365" cy="185" r="1" fill="#4a3b32"/>
    <circle cx="380" cy="175" r="0.8" fill="#4a3b32"/>
    <circle cx="390" cy="195" r="1.2" fill="#4a3b32"/>
  </g>

  <!-- Mint Leaf on Top -->
  <path d="M 295,155 Q 310,140 315,155 Q 310,165 295,155 Z" fill="#2d6a4f"/>
  <!-- Powdered Sugar -->
  <g fill="#ffffff" opacity="0.75">
    <circle cx="270" cy="175" r="1.5"/>
    <circle cx="280" cy="168" r="1"/>
    <circle cx="320" cy="170" r="1.5"/>
    <circle cx="335" cy="178" r="1"/>
  </g>
</svg>
`);

// 5. Burrata Starter
createSVG('burrata.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <radialGradient id="bgB" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1f2d24"/>
      <stop offset="100%" stop-color="#0a120c"/>
    </radialGradient>
    <radialGradient id="plateB" cx="45%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#2d332e"/>
      <stop offset="85%" stop-color="#191c1a"/>
      <stop offset="100%" stop-color="#0d0e0d"/>
    </radialGradient>
    <radialGradient id="cheese" cx="40%" cy="35%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#f4eedb"/>
      <stop offset="100%" stop-color="#ded3b8"/>
    </radialGradient>
    <filter id="shadowBu" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="600" height="450" fill="url(#bgB)"/>
  <circle cx="300" cy="225" r="185" fill="url(#plateB)" filter="url(#shadowBu)"/>
  
  <!-- Sourdough Toast Slice -->
  <polygon points="180,240 260,160 310,190 230,270" fill="#c99355" stroke="#7a4f21" stroke-width="4" filter="url(#shadowBu)"/>

  <!-- Burrata Ball -->
  <circle cx="320" cy="225" r="70" fill="url(#cheese)" filter="url(#shadowBu)"/>
  <path d="M 305,160 C 315,145 335,145 340,165 C 330,175 315,170 305,160 Z" fill="#e8dfc5"/>

  <!-- Heirloom Cherry Tomatoes -->
  <g filter="url(#shadowBu)">
    <circle cx="260" cy="260" r="18" fill="#d90429"/>
    <circle cx="390" cy="240" r="16" fill="#e85d04"/>
    <circle cx="370" cy="170" r="15" fill="#d90429"/>
    <circle cx="270" cy="180" r="14" fill="#ffb703"/>
  </g>

  <!-- Balsamic Glaze Drizzle & Basil -->
  <path d="M 250,210 Q 320,180 380,220 Q 340,260 270,240" fill="none" stroke="#240046" stroke-width="4" stroke-linecap="round"/>
  <g fill="#2d6a4f">
    <ellipse cx="310" cy="190" rx="14" ry="8" transform="rotate(-30 310 190)"/>
    <ellipse cx="340" cy="250" rx="16" ry="9" transform="rotate(20 340 250)"/>
  </g>
</svg>
`);

// 6. Cocktail
createSVG('cocktail.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <radialGradient id="bgC" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#3d2817"/>
      <stop offset="100%" stop-color="#140a04"/>
    </radialGradient>
    <linearGradient id="whiskey" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fca311"/>
      <stop offset="50%" stop-color="#e85d04"/>
      <stop offset="100%" stop-color="#9d0208"/>
    </linearGradient>
    <filter id="glassShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="20" stdDeviation="20" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="600" height="450" fill="url(#bgC)"/>
  
  <!-- Lowball Rocks Glass -->
  <g filter="url(#glassShadow)" transform="translate(300, 230)">
    <!-- Liquid -->
    <path d="M -75,65 L -65,-30 L 65,-30 L 75,65 Q 0,85 -75,65 Z" fill="url(#whiskey)" opacity="0.9"/>
    
    <!-- Clear Large Ice Sphere -->
    <circle cx="0" cy="15" r="45" fill="#ffffff" opacity="0.35" stroke="#ffffff" stroke-width="2"/>
    <ellipse cx="-15" cy="5" rx="15" ry="8" fill="#ffffff" opacity="0.5"/>

    <!-- Glass Contour Outline -->
    <path d="M -85,-50 L -75,70 Q 0,95 75,70 L 85,-50" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.6"/>
    <ellipse cx="0" cy="-50" rx="85" ry="18" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.5"/>

    <!-- Orange Peel Twist -->
    <path d="M -40,-40 Q -10,-80 30,-50 Q 60,-20 70,-45" fill="none" stroke="#f77f00" stroke-width="8" stroke-linecap="round"/>
    
    <!-- Smoked Rosemary Sprig -->
    <line x1="-30" y1="-10" x2="40" y2="-95" stroke="#2d6a4f" stroke-width="4" stroke-linecap="round"/>
    <line x1="0" y1="-50" x2="-20" y2="-65" stroke="#2d6a4f" stroke-width="3"/>
    <line x1="15" y1="-65" x2="35" y2="-75" stroke="#2d6a4f" stroke-width="3"/>
  </g>
</svg>
`);

// 7. Interior Ambiance
createSVG('interior.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <radialGradient id="lampGlow" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#ffd166" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#f77f00" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#01261f" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#023027"/>
      <stop offset="100%" stop-color="#011814"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#wallGrad)"/>
  
  <!-- Ambient Hanging Lanterns -->
  <circle cx="160" cy="130" r="100" fill="url(#lampGlow)"/>
  <circle cx="300" cy="100" r="120" fill="url(#lampGlow)"/>
  <circle cx="440" cy="130" r="100" fill="url(#lampGlow)"/>

  <!-- Lantern fixtures -->
  <line x1="160" y1="0" x2="160" y2="120" stroke="#b08968" stroke-width="2"/>
  <circle cx="160" cy="125" r="14" fill="#ffd166" stroke="#b08968" stroke-width="3"/>

  <line x1="300" y1="0" x2="300" y2="90" stroke="#b08968" stroke-width="2"/>
  <circle cx="300" cy="95" r="18" fill="#ffe49e" stroke="#b08968" stroke-width="3"/>

  <line x1="440" y1="0" x2="440" y2="120" stroke="#b08968" stroke-width="2"/>
  <circle cx="440" cy="125" r="14" fill="#ffd166" stroke="#b08968" stroke-width="3"/>

  <!-- Dining Tables -->
  <path d="M 60,340 L 260,340 L 280,450 L 40,450 Z" fill="#58311a" stroke="#331a0b" stroke-width="4"/>
  <path d="M 340,340 L 540,340 L 560,450 L 320,450 Z" fill="#58311a" stroke="#331a0b" stroke-width="4"/>

  <!-- Wine Glasses and Candles -->
  <ellipse cx="160" cy="335" rx="16" ry="6" fill="#ffffff" opacity="0.4"/>
  <circle cx="160" cy="325" r="5" fill="#ffb703"/>

  <ellipse cx="440" cy="335" rx="16" ry="6" fill="#ffffff" opacity="0.4"/>
  <circle cx="440" cy="325" r="5" fill="#ffb703"/>
</svg>
`);

console.log('Assets created successfully!');
