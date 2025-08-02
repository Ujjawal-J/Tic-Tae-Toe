// player's turn data
let player1 = [];
let player2 = [];
let count = 1;

// FUNCTION 1
function chk_count(turn) {
  // DECISIVE(victory can occur early)
  // victory() => true|false
  if (count >= 5 && VICTORY()) {
    return;
  }
  // still gotta play
  else {
    if (turn === "Player 1's turn") {
      document.querySelector(".turn").innerHTML = "Player 2's turn";
    } else {
      document.querySelector(".turn").innerHTML = "Player 1's turn";
    }
  }
}

// FUNCTON 2
function pressCell(button) {
  let turn = document.querySelector(".turn").innerHTML;

  // player 1 turn
  if (turn === "Player 1's turn") {
    button.innerHTML = "X";
    player1.push(button.getAttribute("id"));
  }
  // player 2 turn
  else {
    button.innerHTML = "O";
    player2.push(button.getAttribute("id"));
  }

  count++;
  chk_count(turn);
}

// FUNCTION 3
function VICTORY() {
  const condition = [
    // rows
    ["zero", "first", "second"],
    ["third", "fourth", "fifth"],
    ["sixth", "seventh", "eighth"],
    // cols
    ["zero", "third", "sixth"],
    ["first", "fourth", "seventh"],
    ["second", "fifth", "eighth"],
    // diags
    ["zero", "fourth", "eighth"],
    ["second", "fourth", "sixth"],
  ];

  // to reduce redundancy
  function result(player, condition) {
    // return true or false
    return condition.every((arr) => {
      return player.includes(arr);
    });
  }

  for (let cond of condition) {
    // player 1 result if true
    if (result(player1, cond)) {
      document.querySelector(".turn").innerHTML = "BRAVO, Player 1 triumphs";
      return true;
    }

    // player 2 result if player1 in this loop is false
    if (result(player2, cond)) {
      document.querySelector(".turn").innerHTML = "BRAVO!, Player 2 triumphs";
      return true;
    }
  }

  // tie
  if (count >= 9) {
    document.querySelector(".turn").innerHTML =
      "MAGNIFICENT duel!, but it's a DRAW";
    return true;
  }
}

// FUNCTION 4
function resetCells() {
  document.querySelectorAll(".cell").forEach((button) => {
    button.innerHTML = "";
  });

  document.querySelector(".turn").innerHTML = "Player 1's turn";
  player1 = [];
  player2 = [];
}

// NON-FUNC
document.querySelectorAll(".cell").forEach((button) => {
  button.addEventListener("click", () => {
    pressCell(button);
  });
});

document.querySelector("#reset").addEventListener("click", () => {
  resetCells();
});
