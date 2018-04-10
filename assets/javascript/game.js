function RandomWord(Arr) {
  return Arr[Math.floor(Math.random() * Arr.length)];
}

function Space(Str) {
  var Ret;

  Ret = Str.charAt(0);
  for (let i = 1; i < Str.length; i++) {
    Ret += " " + Str.charAt(i);
  }
  return Ret;
}

String.prototype.replaceAt = function(Index, Char) {
  return this.substr(0, Index) + Char + this.substr(Index + 1);
};

var Started = false;
var MyDoc = {};
var wins = 0;
var remaining;
var word;
var current;
var OrigWord;
var guessed;

MyDoc.status = document.getElementById("status");
MyDoc.wins = document.getElementById("wins");
MyDoc.word = document.getElementById("word");
MyDoc.remain = document.getElementById("remain");
MyDoc.guessed = document.getElementById("guessed");

MyDoc.status.innerHTML = "Press any key to start";

document.onkeyup = function(event) {
  var Char = event.key;
  var Index;

  if (!Started) {
    OrigWord = RandomWord(HangmanWords);
    current = OrigWord;
    guessed = "";
    remaining = current.length * 2;
    word = "_";
    word = word.repeat(current.length);

    MyDoc.status.innerHTML = "";
    MyDoc.wins.innerHTML = wins;
    MyDoc.word.innerHTML = Space(word);
    MyDoc.remain.innerHTML = remaining;
    MyDoc.guessed.innerHTML = Space(guessed);
    Started = true;
    return;
  }

  Char = Char.toUpperCase();
  if (Char.match(/[A-Z]/) == null) {
    // Char is not in A-Z
    MyDoc.status.innerHTML = "Only letters A thru Z";
    return;
  }

  if (guessed.indexOf(Char) != -1) {
    // Char already guessed
    MyDoc.status.innerHTML = "You've guessed that letter already";
    return;
  }

  Index = current.indexOf(Char);
  if (Index == -1) {
    // Wrong guess
    MyDoc.status.innerHTML = "Nope";
    guessed += Char;
    MyDoc.guessed.innerHTML = Space(guessed);

    remaining--;
    MyDoc.remain.innerHTML = remaining;

    if (remaining == 0) {
      MyDoc.status.innerHTML =
        'Sorry, you lose. Word was "' +
        OrigWord +
        '" Press any key to start again';
      Started = false;
      return;
    }
    return;
  }

  // Letter correctly guessed
  MyDoc.status.innerHTML = "Yes";
  while (Index != -1) {
    word = word.replaceAt(Index, Char);
    current = current.replaceAt(Index, "_");
    Index = current.indexOf(Char);
  }
  MyDoc.word.innerHTML = Space(word);
  guessed += Char;
  MyDoc.guessed.innerHTML = Space(guessed);

  if (word.indexOf("_") == -1) {
    wins++;
    MyDoc.wins.innerHTML = wins;
    MyDoc.status.innerHTML = "Congrats, you win. Press any key to start again";
    Started = false;
  }
};
