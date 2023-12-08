var quiz = {
  data: [
    {
      q: "Most places on Earth are warmer than they were 100 years ago?",
      o: ["True", "False"],

      a: 1,
    },
    {
      q: "Some kinds of pollution in the atmosphere can act to cool the planet by reducing the amount of solar radiation that reaches Earth's surface.",
      o: ["True", "False"],

      a: 3,
    },

    {
      q: "Which of the following gases does not trap heat?",
      o: ["Carbon dioxide", "Nitrogen", "Water vapor", "Methane"],

      a: 2,
    },

    {
      q: "Which is the seventh planet from the sun?",
      o: ["Uranus", "Earth", "Pluto", "Mars"],

      a: 0,
    },

    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],

      a: 3,
    },
  ],

  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  now: 0, // current question
  score: 0, // current score

  init: () => {
    quiz.hWrap = document.getElementById("quizWrap");

    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    quiz.draw();
  },

  draw: () => {
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => {
        quiz.select(label);
      });
      quiz.hAns.appendChild(label);
    }
  },

  select: (option) => {
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }

    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) {
        quiz.draw();
      } else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },
  reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  },
};

window.addEventListener("load", quiz.init);
