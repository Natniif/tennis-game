function changeTable(winner) {}

function randomSurface() {
  const surfaces = ["lawn", "clay", "hard"];
  return surfaces[Math.floor(Math.random() * surfaces.length)];
}

function randomCondition() {
  const conditions = ["rain", "snow", "dry", "sunny"];
  return conditions[Math.floor(Math.random() * conditions.length)];
}

function fetch_player_value(pname, stat) {
  return new Promise((resolve, reject) => {
    fetch("players.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let playerVal = null;
        data.Players.forEach((player) => {
          if (player.name == pname) {
            playerVal = player[stat];
          }
        });
        resolve(playerVal);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

fetch_player_value("Matt", "lawn")
  .then((value) => {
    console.log(value);
    console.log("Ran");
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function match(p1, p2) {
  surf = randomSurface();
  cond = randomCondition();

  p1_surf = fetch_player_value(p1, surf);
  p1_cond = fetch_player_value(p1, cond);
  p1_score = p1_surf * p1_cond;

  p2_surf = fetch_player_value(p2, surf);
  p2_cond = fetch_player_value(p2, cond);
  p2_score = p2_surf * p2_cond;

  if (p1_score > p2_score) {
    winner = p1;
  } else if (p1_score < p2_score) {
    winner = p2;
  }

  // if equal score recursively call match until winner found
  else {
    winner = match(p1, p2);
  }

  return winner;
}
