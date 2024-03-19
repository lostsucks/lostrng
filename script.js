const btn = document.querySelector('.btn');
const rarityMessage = document.getElementById('rarity-message');
const chanceMessage = document.getElementById('chance-message');
const clickCountElement = document.getElementById('click-count');
const recentRngList = document.querySelector('.recent-rng-list');

let originalBackgroundColor = document.body.style.backgroundColor;

let clickCount = 0;
let recentRngs = [];

// Update the click count display
clickCountElement.textContent = `Clicks: ${clickCount}`;

// ----------------------------------------

const rarityLevels = {
  '1 in 3 chance': {
    text: 'Common',
    color: 'grey',
  },
  '1 in 4 chance': {
    text: 'Uncommon',
    color: 'green',
  },
  '1 in 8 chance': {
    text: 'Natural',
    color: 'limegreen',
  },
  '1 in 16 chance': {
    text: 'Rare',
    color: 'blue',
  },
  '1 in 32 chance': {
    text: 'Divinus',
    color: 'gold',
  },
  '1 in 64 chance': {
    text: 'Crystallized',
    color: 'purple',
  },
  '1 in 128 chance': {
    text: 'Rage',
    color: 'red',
  },
  '1 in 256 chance': {
    text: 'Glacier',
    color: 'cyan',
  },
  '1 in 300 chance': {
    text: 'Wind',
    color: 'lightblue',
  },
  '1 in 350 chance': {
    text: 'Ruby',
    color: 'darkred',
  },
  '1 in 512 chance': {
    text: 'Gilded',
    color: 'yellow',
  },
  '1 in 777 chance': {
    text: 'Jackpot',
    color: 'gold',
  },
  '1 in 1004 chance': {
    text: 'Diaboli',
    color: 'darkred',
  },
  '1 in 1024 chance': {
    text: 'Precious',
    color: 'lightblue',
  },
  '1 in 1111 chance': {
    text: 'Undefined',
    color: 'grey',
  },
  '1 in 2048 chance': {
    text: 'Magnetic',
    color: 'lightblue',
  },
  '1 in 4096 chance': {
    text: 'Sidereum',
    color: 'gold',
  },
  '1 in 4444 chance': {
    text: 'Bleeding',
    color: 'red',
  },
  '1 in 5000 chance': {
    text: 'Lunar',
    color: 'lightblue',
  },
  '1 in 5000 chance': {
    text: 'Solar',
    color: 'yellow',
  },
  '1 in 6900 chance': {
    text: 'Flushed',
    color: 'yellow',
  },
  '1 in 6969 chance': {
    text: 'awhecksno',
    color: 'red',
  },
  '1 in 10000 chance': {
    text: 'Undead',
    color: 'darkgreen',
  },
  '1 in 12000 chance': {
    text: 'Comet',
    color: 'lightblue',
  },
  '1 in 12800 chance': {
    text: 'HeatedRage',
    color: 'red',
  },
  '1 in 24500 chance': {
    text: 'Permafrost',
    color: 'cyan',
  },
  '1 in 30000 chance': {
    text: 'Stormal',
    color: 'lightblue',
  },
  '1 in 30000 chance': {
    text: 'Eclipse',
    color: 'darkblue',
  },
  '1 in 40000 chance': {
    text: 'Aquatic',
    color: 'lightblue',
  },
  '1 in 69000 chance': {
    text: 'Lobotomy',
    color: 'green',
  },
  '1 in 70000 chance': {
    text: 'Nautilus',
    color: 'lightblue',
  },
  '1 in 99999 chance': {
    text: 'Exotic',
    color: 'white',
  },
  '1 in 100000 chance': {
    text: 'Devil Undead',
    color: 'darkgreen',
  },
  '1 in 100400 chance': {
    text: 'Voided Diaboli',
    color: 'darkred',
  },
  '1 in 200000 chance': {
    text: 'Bounded',
    color: 'lightblue',
  },
  '1 in 350000 chance': {
    text: 'Celestial',
    color: 'lightblue',
  },
  '1 in 500000 chance': {
    text: 'Galaxy',
    color: 'lightblue',
  },
  '1 in 500000 chance': {
    text: 'FULLMOON',
    color: 'lightblue',
  },
  '1 in 600000 chance': {
    text: 'Twilight',
    color: 'lightblue',
  },
  '1 in 1000000 chance': {
    text: 'Arcane',
    color: 'lightblue',
  },
  '1 in 1100000 chance': {
    text: 'STARCOURSE',
    color: 'red',
  },
};

// ----------------------------------------

btn.addEventListener('click', () => {
  if (isOnCooldown) return;
  
  clickCount++;
  clickCountElement.textContent = `Clicks: ${clickCount}`;
  setCooldown();

  const chances = [
    { text: '1 in 3 chance', weight: 0.33 },
    { text: '1 in 4 chance', weight: 0.25 },
    { text: '1 in 8 chance', weight: 0.125 },
    { text: '1 in 16 chance', weight: 0.0625 },
    { text: '1 in 32 chance', weight: 0.03125 },
    { text: '1 in 64 chance', weight: 0.015625 },
    { text: '1 in 128 chance', weight: 0.0068125 },
    { text: '1 in 256 chance', weight: 0.00290625 },
    { text: '1 in 300 chance', weight: 0.00233333333 },
    { text: '1 in 350 chance', weight: 0.00185714285 },
    { text: '1 in 512 chance', weight: 0.000953125 },
    { text: '1 in 777 chance', weight: 0.00028534704 },
    { text: '1 in 1,004 chance', weight: 0.00089501661 },
    { text: '1 in 1,024 chance', weight: 0.0008765625 },
    { text: '1 in 1,111 chance', weight: 0.00080009001 },
    { text: '1 in 2,048 chance', weight: 0.00038828125 },
    { text: '1 in 4,096 chance', weight: 0.00014414062 },
    { text: '1 in 4,444 chance', weight: 0.00012502250 },
    { text: '1 in 5,000 chance', weight: 0.00010004000 },
    { text: '1 in 6,900 chance', weight: 0.00004492753 },
    { text: '1 in 6,969 chance', weight: 0.00004367816 },
    { text: '1 in 10,000 chance', weight: 0.00001000000 },
    { text: '1 in 12,000 chance', weight: 0.00007333333 },
    { text: '1 in 12,800 chance', weight: 0.00006812500 },
    { text: '1 in 24,500 chance', weight: 0.00003081632 },
    { text: '1 in 30,000 chance', weight: 0.00002333333 },
    { text: '1 in 40,000 chance', weight: 0.00001500000 },
    { text: '1 in 69,000 chance', weight: 0.00000449275 },
    { text: '1 in 70,000 chance', weight: 0.00000428571 },
    { text: '1 in 99,999 chance', weight: 0.00000100010 },
    { text: '1 in 100,000 chance', weight: 0.00000100000 },
    { text: '1 in 100,400 chance', weight: 0.00000896016 },
    { text: '1 in 200,000 chance', weight: 0.00000400000 },
    { text: '1 in 350,000 chance', weight: 0.00000185714 },
    { text: '1 in 500,000 chance', weight: 0.00000100000 },
    { text: '1 in 600,000 chance', weight: 0.00000066667 },
    { text: '1 in 1,000,000 chance', weight: 0.00000010000 },
    { text: '1 in 1,100,000 chance', weight: 0.00000009909 },
  ];

  const randomNumber = Math.random();
  let totalWeight = 0;
  for (const chance of chances) {
    totalWeight += chance.weight;
    if (randomNumber < totalWeight) {
      const message = chance.text;
      const rarity = rarityLevels[message];
      rarityMessage.textContent = rarity.text;
      rarityMessage.style.color = rarity.color;
      rarityMessage.style.textShadow = '0 0 20px ' + rarity.color + ', 0 0 40px ' + rarity.color + ', 0 0 84px ' + rarity.color;
      
      if (chance.text === '1 in 8 chance') {
        const coinImage = new Image();
        coinImage.src = 'images/coin.gif';
        coinImage.onload = function() {
          document.body.style.backgroundImage = "url('images/coin.gif')";
          document.body.style.backgroundColor = "transparent";
        };
        coinImage.onerror = function() {
          console.error('Error loading coin.gif image');
        };
      } else {
        document.body.style.backgroundColor = "#121212";
        document.body.style.backgroundImage = "none";
      }

      chanceMessage.textContent = message;

      // Add the rarity to the recent RNGs list
      recentRngs.unshift({
        rarity: rarity.text,
        chance: message,
      });

      // Limit the recent RNGs list to the last 5 items
      if (recentRngs.length > 19) {
        recentRngs.pop();
      }

      // Update the recent RNGs list in the HTML // use toboto font sans serif 400px weight
      recentRngList.innerHTML = '';
      for (const rng of recentRngs) {
        const listItem = document.createElement('li');
        listItem.textContent = `${rng.rarity}: ${rng.chance}`;
        listItem.style.color = rarity.color;
        listItem.style.fontFamily = 'sans-serif';
        listItem.style.fontWeight = '700px';

        
        recentRngList.appendChild(listItem);
      }

      break;
    }
  }
});


const cooldownTime = 200;
let isOnCooldown = false;
let cooldownTimer;

function resetCooldown() {
  isOnCooldown = false;
  clearTimeout(cooldownTimer);
  document.body.style.backgroundColor = originalBackgroundColor; // Restore the original background color
  document.getElementById('cooldown-message').textContent = '';
}


function setCooldown() {
  isOnCooldown = true;
  originalBackgroundColor = document.body.style.backgroundColor; // Save the current background color
  document.body.style.backgroundColor = "#121212"; // Change the background color to the original color
  cooldownTimer = setTimeout(resetCooldown, cooldownTime);
}