"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { format } from "date-fns";
import QuizResult from "./quiz-result";

import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from "../../../components/ui/dialog";
import Link from "next/link";
const QuizList = ({ assessments,  onViewHistory  }) => {
  const router = useRouter();
  const [selectQiuiz, setSelectQuiz] = useState(null);

  return (
    <div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold gradient-title">
              Recent Quizes
            </CardTitle>
            <CardDescription>Review your past quiz performance</CardDescription>
          </div>
          <Button
            onClick={() => router.push("/interview/mock")}
            className={"cursor-pointer"}
          >
            Start New Quiz
          </Button>
        </CardHeader>
        <CardContent>
  <div>
    {assessments
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by most recent
      .slice(0, 5) // limit to latest 5
      .map((assesment, i) => (
        <div key={assesment.id} className="space-y-4">
          <Card
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setSelectQuiz(assesment)}
          >
            <CardHeader>
              <CardTitle>Quiz {i + 1}</CardTitle>
              <CardDescription>
                <div>Score: {assesment.quizScore.toFixed(1)}%</div>
                <div>
                  {format(
                    new Date(assesment.createdAt),
                    "MMMM dd, yyyy HH:mm"
                  )}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Improvement Tips:</p>
              <p className="text-gray-400">{assesment.improvementTip}</p>
            </CardContent>
          </Card>
        </div>
      ))}
  </div>
</CardContent>
      </Card>

      <Dialog open={!!selectQiuiz} onOpenChange={() => setSelectQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectQiuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    

      <div className="relative mt-10 flex justify-center">
        <div className="items-center text-center">
        <Button onClick={() => router.push("/interview/history")} variant={"outlined"} className= "border-1 hover:scale-x-105 transition-all ease-in cursor-pointer">
      View your quiz history
    </Button>
        </div>
      </div>

    </div>
  );
};

export default QuizList;
