"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

const StatCards = ({ assessments }) => {
  const averageScore = () => {
    if (!assessments || assessments.length === 0) return 0;
    console.log("Assesments", assessments);
    
    const quizScores = assessments?.map(a => Number(a.quizScore)).filter(score => !isNaN(score)) || [];

    // Total score
    const totalScore = quizScores.reduce((sum, score) => sum + score, 0);
  
    // Average score
    const averageScore = quizScores.length > 0 ? (totalScore / quizScores.length).toFixed(1) : 0;
   
  
    console.log("All Scores:", quizScores);
    console.log("Total Score:", totalScore);
    console.log("Average Score:", averageScore);
    return averageScore;
  };

  const getTotalQuestions = () => {
    if (!assessments || assessments.length === 0) return 0;
    return assessments.reduce((total, a) => total + a.questions.length, 0);
  };

  const getLatestScore = () => {
    if (!assessments || assessments.length === 0) return "N/A";
    const assesmentsLastIndex = assessments.length-1;
    return assessments[assesmentsLastIndex].quizScore || "N/A";
  };

  return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageScore()}%</div>
          <p className="text-xs text-muted-foreground">Across all assessments.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Questions Practiced</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getTotalQuestions()}</div>
          <p className="text-xs text-muted-foreground">Across all assessments.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getLatestScore()}%</div>
          <p className="text-xs text-muted-foreground">From the most recent assessment.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
