document.addEventListener("DOMContentLoaded", function() {
    const questionsContainer = document.getElementById('questions');
    const submitBtn = document.getElementById('submitBtn');
    const resultContainer = document.getElementById('result');
  
    // Об'єкт з тестовими даними про подорож
    const travelTestData = {
      "testName": "Тест з подорожі",
      "questions": [
        {
          "question": "Яка найбільша пустеля у світі?",
          "answers": [
            {
              "answer": "Сахара",
              "isCorrect": true
            },
            {
              "answer": "Атакама",
              "isCorrect": false
            },
            {
              "answer": "Калагарі",
              "isCorrect": false
            },
            {
              "answer": "Гобі",
              "isCorrect": false
            }
          ]
        },
        {
          "question": "Яка столиця Японії?",
          "answers": [
            {
              "answer": "Токіо",
              "isCorrect": true
            },
            {
              "answer": "Сеул",
              "isCorrect": false
            },
            {
              "answer": "Пекін",
              "isCorrect": false
            },
            {
              "answer": "Гонконг",
              "isCorrect": false
            }
          ]
        },
        {
          "question": "Де знаходиться Ейфелева вежа?",
          "answers": [
            {
              "answer": "У Парижі, Франція",
              "isCorrect": true
            },
            {
              "answer": "У Барселоні, Іспанія",
              "isCorrect": false
            },
            {
              "answer": "У Римі, Італія",
              "isCorrect": false
            },
            {
              "answer": "У Лондоні, Великобританія",
              "isCorrect": false
            }
          ]
        },
        {
          "question": "Яка найвища гора у світі?",
          "answers": [
            {
              "answer": "Еверест",
              "isCorrect": true
            },
            {
              "answer": "Кіліманджаро",
              "isCorrect": false
            },
            {
              "answer": "Джомолунґма",
              "isCorrect": false
            },
            {
              "answer": "Аконкагуа",
              "isCorrect": false
            }
          ]
        },
        {
          "question": "Де знаходиться Піраміди Гізи?",
          "answers": [
            {
              "answer": "У Каїрі, Єгипет",
              "isCorrect": true
            },
            {
              "answer": "У Римі, Італія",
              "isCorrect": false
            },
            {
              "answer": "У Мехіко, Мексика",
              "isCorrect": false
            },
            {
              "answer": "У Афінах, Греція",
              "isCorrect": false
            }
          ]
        }
      ]
    };
  
    // Функція для відображення питань та відповідей
    function renderQuestions() {
      travelTestData.questions.forEach((questionObj, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `<p>${index + 1}. ${questionObj.question}</p>`;
  
        questionObj.answers.forEach(answerObj => {
          const answerElement = document.createElement('div');
          answerElement.classList.add('answer');
          const input = document.createElement('input');
          input.type = 'radio';
          input.name = `question${index}`;
          input.value = answerObj.isCorrect;
          const label = document.createElement('label');
          label.textContent = answerObj.answer;
          answerElement.appendChild(input);
          answerElement.appendChild(label);
          questionElement.appendChild(answerElement);
        });
  
        questionsContainer.appendChild(questionElement);
      });
    }
  
    // Функція для перевірки результатів
    function checkResults() {
      let score = 0;
      travelTestData.questions.forEach((questionObj, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer) {
          if (selectedAnswer.value === 'true') {
            score++;
            // Позначаємо правильну відповідь зеленим кольором
            selectedAnswer.parentElement.classList.add('correct-answer');
            resultContainer.innerHTML += `<p>Питання ${index + 1}: <span class="correct">Правильно</span></p>`;
          } else {
            // Позначаємо неправильну відповідь червоним кольором
            selectedAnswer.parentElement.classList.add('wrong-answer');
            resultContainer.innerHTML += `<p>Питання ${index + 1}: <span class="wrong">Неправильно</span></p>`;
          }
        }
      });
  
      resultContainer.innerHTML += `<p>Ваш результат: ${score} з ${travelTestData.questions.length}</p>`;
    }
  
    // Викликаємо функцію для відображення питань
    renderQuestions();
  
    // Додаємо обробник події на кнопку "Перевірити результат"
    submitBtn.addEventListener('click', checkResults);
  });
  document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.getElementById('backBtn');
  
    backBtn.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  });