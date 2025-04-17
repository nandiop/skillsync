// app/interview/history/page.jsx
import React from "react";
import { getAssessments } from "../../../actions/interview";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { format } from "date-fns";

const HistoryPage = async () => {
  const assessments = await getAssessments();

  return (
    <div className="max-w-4xl mx-auto px-4 py-40 space-y-6 ">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-title">Quiz History</h1>
          <p className="text-muted-foreground">
            Review all your past quiz attempts and track your progress.
          </p>
        </div>
        <Link href="/interview">
          <Button>Back to Recent Quizzes</Button>
        </Link>
      </div>

      {assessments.length === 0 ? (
        <p className="text-center text-muted-foreground">No quiz history yet.</p>
      ) : (
        <div className="space-y-4">
          {assessments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((assessment, index) => (
              <Card key={assessment.id}>
                <CardHeader>
                  <CardTitle>Quiz {index + 1}</CardTitle>
                  <CardDescription>
                    <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                    <div>
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Improvement Tip:</p>
                  <p className="text-gray-400">
                    {assessment.improvementTip}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
