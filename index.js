const players = require("./players-dict.js");

function changeTable(winner) {}

function randomSurface() {
  const surfaces = ["lawn", "clay", "hard"];
  return surfaces[Math.floor(Math.random() * surfaces.length)];
}

function randomCondition() {
  const conditions = ["rain", "snow", "dry", "sunny"];
  return conditions[Math.floor(Math.random() * conditions.length)];
}

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
    return p1.name;
  } else if (p1_score < p2_score) {
    return p2.name;
  }

  // if equal score recursively call match until winner found
  else {
    return match(p1, p2);
  }
}

console.log(match(players.Eoghan, players.Matt));
