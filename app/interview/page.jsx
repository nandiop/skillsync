// app/interview/page.jsx
import React from 'react'
import { getAssessments } from '../../actions/interview';
import InterviewClient from './InterviewClient';

const InterviewPage = async () => {
  const assessments = await getAssessments();

  return <InterviewClient assessments={assessments} />;
};

export default InterviewPage;
