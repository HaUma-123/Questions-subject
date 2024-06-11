const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const categories = {
  english: 10,
  science: 17,
  geography: 22,
  maths: 19,
  history: 23,
  space: 9,
  chemistry: 17,
  sports: 21,
  music: 12,
  movies: 11,
  computers: 18,
  literature: 10,
  art: 25,
  mythology: 20
};

app.get('/question', async (req, res) => {
  const subject = req.query.subject?.toLowerCase() || 'english';
  const category = categories[subject] || categories.english;

  try {
    const response = await axios.get(`https://opentdb.com/api.php?amount=1&category=${category}&type=multiple`);
    const triviaData = response.data.results[0];

    const { question, correct_answer, incorrect_answers } = triviaData;
    const answers = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);
    const options = {
      A: answers[0],
      B: answers[1],
      C: answers[2],
      D: answers[3]
    };

    res.json({
      question,
      correctAnswer: correct_answer,
      options
    });
  } catch (error) {
    console.error("Error fetching trivia data:", error);
    res.status(500).json({ error: "Unable to retrieve trivia question at the moment. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
