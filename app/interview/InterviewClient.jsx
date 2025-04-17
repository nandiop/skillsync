"use client";

import React, { useState } from "react";
import StatCards from "./components/StatCards";
import PerformanceChart from "./components/PerformanceChart";
import QuizList from "./components/QuizList";
import HistoryPage from "./history/page";

const InterviewClient = ({ assessments }) => {
  const [viewHistory, setViewHistory] = useState(false);

  return (
    <div className="container mx-auto space-y-4 py-30">
      <h1 className="text-6xl font-bold gradient-title">Interview Preparation</h1>

      <div className="space-y-6">
        <StatCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        {viewHistory ? (
          <HistoryPage assessments={assessments} goBack={() => setViewHistory(false)} />
        ) : (
          <QuizList assessments={assessments} onViewHistory={() => setViewHistory(true)} />
        )}
      </div>
    </div>
  );
};

export default InterviewClient;
