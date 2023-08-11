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

players = {
  Matt: {
    name: "Matt",
    lawn: 6,
    clay: 4,
    hard: 1,
    rain: 9,
    dry: 1,
    snow: 8,
    sunny: 9,
    tournaments: 0,
  },
  Fin: {
    name: "Fin",
    lawn: 10,
    clay: 5,
    hard: 8,
    rain: 6,
    dry: 8,
    snow: 3,
    sunny: 7,
    tournaments: 0,
  },
  Rosie: {
    name: "Rosie",
    lawn: 6,
    clay: 1,
    hard: 10,
    rain: 2,
    dry: 3,
    snow: 3,
    sunny: 8,
    tournaments: 0,
  },
  Frankie: {
    name: "Frankie",
    lawn: 5,
    clay: 8,
    hard: 10,
    rain: 1,
    dry: 2,
    snow: 3,
    sunny: 6,
    tournaments: 0,
  },
  Ash: {
    name: "Ash",
    lawn: 4,
    clay: 9,
    hard: 10,
    rain: 4,
    dry: 1,
    snow: 8,
    sunny: 1,
    tournaments: 0,
  },
  Zak: {
    name: "Zak",
    lawn: 9,
    clay: 8,
    hard: 2,
    rain: 4,
    dry: 4,
    snow: 10,
    sunny: 5,
    tournaments: 0,
  },
  Jerry: {
    name: "Jerry",
    lawn: 1,
    clay: 5,
    hard: 7,
    rain: 1,
    dry: 2,
    snow: 9,
    sunny: 10,
    tournaments: 0,
  },
  Bert: {
    name: "Bert",
    lawn: 7,
    clay: 10,
    hard: 1,
    rain: 3,
    dry: 1,
    snow: 10,
    sunny: 10,
    tournaments: 0,
  },
  Vladi: {
    name: "Vladi",
    lawn: 6,
    clay: 2,
    hard: 5,
    rain: 6,
    dry: 4,
    snow: 8,
    sunny: 6,
    tournaments: 0,
  },
  Thomas: {
    name: "Thomas",
    lawn: 2,
    clay: 5,
    hard: 8,
    rain: 8,
    dry: 8,
    snow: 7,
    sunny: 6,
    tournaments: 0,
  },
  Bob: {
    name: "Bob",
    lawn: 9,
    clay: 10,
    hard: 4,
    rain: 4,
    dry: 9,
    snow: 7,
    sunny: 7,
    tournaments: 0,
  },
  Steve: {
    name: "Steve",
    lawn: 7,
    clay: 5,
    hard: 4,
    rain: 10,
    dry: 4,
    snow: 4,
    sunny: 5,
    tournaments: 0,
  },
  Jo: {
    name: "Jo",
    lawn: 7,
    clay: 4,
    hard: 1,
    rain: 10,
    dry: 4,
    snow: 3,
    sunny: 7,
    tournaments: 0,
  },
  Kenzie: {
    name: "Kenzie",
    lawn: 1,
    clay: 5,
    hard: 1,
    rain: 1,
    dry: 5,
    snow: 1,
    sunny: 4,
    tournaments: 0,
  },
  Goerge: {
    name: "Goerge",
    lawn: 4,
    clay: 3,
    hard: 5,
    rain: 2,
    dry: 10,
    snow: 5,
    sunny: 3,
    tournaments: 0,
  },
  Eoghan: {
    name: "Eoghan",
    lawn: 3,
    clay: 7,
    hard: 6,
    rain: 7,
    dry: 8,
    snow: 4,
    sunny: 2,
    tournaments: 0,
  },
};

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
  winner = round(comp);

  return winner;
}

function randomSurface() {
  const surfaces = ["lawn", "clay", "hard"];
  return surfaces[Math.floor(Math.random() * surfaces.length)];
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

// storage of winners
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

function reset() {
  for (let i = 0; i < names.length; i++) {
    localStorage.setItem(names[i], 0);
  }
}
// reset();

function generateRows() {
  out = "";
  for (let i = 0; i < names.length; i++) {
    out += `
    <tr> 
      <td>${names[i]}</td>
      <td>${localStorage.getItem(names[i])}</td>
    </tr>`;
  }
  return out;
}

function changeTable() {
  const table = document.querySelector(".table");
  table.innerHTML = `
  <thead> 
    <tr> 
      <th>Player</th> 
      <th>Wins</th>
    </tr>
  </thead>

  <tbody>
    ${generateRows()}
  <tbody>`;
}

function main() {
  winner = tournament();

  let wins = parseInt(localStorage.getItem(winner));
  localStorage.setItem(winner, wins + 1);

  console.log(localStorage.getItem(winner));
  console.log(winner);
  changeTable();
}

main();
