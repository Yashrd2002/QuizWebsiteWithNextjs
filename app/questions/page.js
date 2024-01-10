"use client";
import React, { useState } from "react";
import { quiz } from "../qna";
const page = () => {
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnwers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  const ans = (answer, id) => {
    setChecked(true);
    setSelectedAnswerIndex(id);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log("true");
    } else {
      setSelectedAnswer(false);
      console.log("false");
    }
  };
  const AddQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnwers: prev.wrongAnwers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };
  return (
    <div className=" h-screen px-10 py-10 flex flex-col justify-between back">
      <div className="flex gap-6 items-center">
        <div className="w-full h-1 rounded-full bg-white" />
        {!showResult && <div className=" w-16 h-9 flex justify-center items-center rounded-sm bg-white">
            
            {activeQuestion + 1}/{questions.length}
          </div>}
        
      </div>

      <div>
        <div>
          {!showResult ? (
            <div className="text-white flex flex-col gap-16">
              <h1 className="text-xl font-bold">{questions[activeQuestion].question}</h1>
              <div className="flex flex-col gap-8 w-4/12">
                {answers.map((answer, id) => (
                  <div

                    key={id}
                    onClick={() => ans(answer, id)}
                    className={`${selectedAnswerIndex === id ? " bg-gray-500 text-white" : "text-black hover:bg-gray-500 bg-white hover:text-white"} px-10 text-lg font-semibold py-2 rounded-md cursor-pointer  `}
                  >
                    {answer}
                  </div>
                ))}
              </div>
              <div>
            {checked ? (
                <div className="text-white" onClick={AddQuestion}>
                    <button className=" bg-blue-500 px-10 py-2 rounded-lg">{activeQuestion === question.length - 1 ? "Finish":"Next"}</button>
                </div>
            ):(
                <div className="text-white" >
                    <button className=" px-10 py-2 rounded-lg disabled:bg-slate-500" disabled>{activeQuestion === question.length - 1 ? "Finish":"Next"}</button>
                </div>
            )}

        </div>
            </div>
          ) : (
<div className="text-white flex flex-col gap-8 text-xl font-semibold">
            <p>Persentage : {(result.score / 25) * 100}%</p>
            <p>Total question : {questions.length}</p>
            <p>Total Score : {result.score}</p>
            <p>Correct answer : {result.correctAnswers}</p>
            <p>wrong answer : {result.wrongAnwers}</p>
            <div>
              <button
                className=" bg-blue-500 px-10 py-2 rounded-lg"
                onClick={() => window.location.reload()}
              >
                restart
              </button>
            </div>
          </div>
  )}
          
        </div>
      </div>
      <div className="w-full h-1 rounded-full bg-white"></div>
    </div>
  );
};

export default page;
