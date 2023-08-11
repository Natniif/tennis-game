const players = require("./players-dict.js");
const wins = require("./wins.js");

function changeTable(winner) {
  const table = document.querySelector(".table");
  table.innerHTML = "<tr>Matt</tr>";
}

const names = [
  "Matt",
  "Fin",
  "Rosie",
  "Frankie",
  "Ash",
  "Zak",
  "Jerry",
  "Bert",
  "Vladi",
  "Thomas",
  "Bob",
  "Steve",
  "Jo",
  "Kenzie",
  "Goerge",
  "Eoghan",
];

// Fisher-Yates shuffling algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

function tournament() {
  let comp = shuffleArray(names);
  function round(rnd) {
    let losers = [];
    for (let i = 0; i < rnd.length; i += 2) {
      const player1 = rnd[i];
      const player2 = rnd[i + 1];

      const loser = match(players[player1], players[player2]);
      losers.push(loser);
    }
    for (let i = 0; i < losers.length; i++) {
      rnd.splice(rnd.indexOf(losers[i]), 1);
    }
    return rnd;
  }

  comp = round(comp);
  comp = round(comp);
  comp = round(comp);
  comp = round(comp);

  return comp;
}

console.log(tournament());

function randomSurface() {
  const surfaces = ["lawn", "clay", "hard"];
  return surfaces[Math.floor(Math.random() * surfaces.length)];
}

function win_changer(winner) {
  winner.wins += 1;
}

function randomCondition() {
  const conditions = ["rain", "snow", "dry", "sunny"];
  return conditions[Math.floor(Math.random() * conditions.length)];
}

// IMPORTANT: Returns the loser of the match not the winner!!! makes it easier to remove losers from the bracket
function match(p1, p2) {
  const surf = randomSurface();
  const cond = randomCondition();

  const p1_surf = p1[surf];
  const p1_cond = p1[cond];
  const p1_score = p1_surf * p1_cond;

  const p2_surf = p2[surf];
  const p2_cond = p2[cond];
  const p2_score = p2_surf * p2_cond;

  if (p1_score > p2_score) {
    return p2.name;
  } else if (p1_score < p2_score) {
    return p1.name;
  }

  // if equal score recursively call match until winner found
  else {
    return match(p1, p2);
  }
}
