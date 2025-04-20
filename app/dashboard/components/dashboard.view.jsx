"use client";

import { LineChart, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle,  } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { Briefcase, Brain } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, defs, linearGradient, stop } from "recharts";

// #fe725d #724748 #3a001e

const Dashboardview = ({ insights }) => {
  if (!insights?.insights) {
    console.error("Insights object is null or undefined.");
    return <p>No insights available.</p>;
  }

  const industryInsights = insights.insights;
  console.log("Industry insights:", industryInsights);

  // Check if salaryRanges exist
  const salaryData =
    industryInsights.salaryRanges?.map((salary) => ({
      name: salary.role,
      min: salary.min / 1000,
      max: salary.max / 1000,
      median: salary.median / 1000,
    })) || []; // Default to empty array if no data

  const demandLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const MarketOutlookInfo = (outlook) => {
    switch (outlook?.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = MarketOutlookInfo(industryInsights.marketOutlook)?.icon;
  const outlookColor = MarketOutlookInfo(industryInsights.marketOutlook)?.color;

  // Safely handle lastUpdated and nextUpdate
  const lastUpdated = industryInsights.lastUpdated
    ? format(new Date(industryInsights.lastUpdated), "dd/MM/yyyy")
    : "N/A";

  console.log("Last Updated:", industryInsights?.lastUpdated);

  const nextUpdateDistance = industryInsights.nextUpdate
    ? formatDistanceToNow(new Date(industryInsights.nextUpdate), {
        addSuffix: true,
      })
    : "N/A";

  return (
    <div className="space-y-4">
      {/* Add more dashboard content here */}
      <div className="flex justify-between items-center">
        <Badge variant="outline">Last Updated: {lastUpdated}</Badge>
        <Badge variant="outline">Next Update: {nextUpdateDistance}</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Market Outlook
            </CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{industryInsights.marketOutlook}</div>
            <p className="text-xs text-muted-foreground">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Industry Overview
            </CardTitle>
            <TrendingUp className= "text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{industryInsights.growthRate.toFixed(1)}%</div>
            <Progress value={industryInsights.growthRate} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Market Demand
            </CardTitle>
            <Briefcase className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{industryInsights.demandLevel}</div>
            <div>
              <Progress className={`${demandLevelColor(industryInsights.demandLevel)}`}/>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Skills Demand
            </CardTitle>
            <Brain className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{industryInsights.topSkills
              .map((skill) => 
                <Badge key={skill} variant="outline" className="mr-2 mb-2">{skill}</Badge>
              )
            }</div>
            <p className="text-xs text-muted-foreground">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Salary Ranges by Role</CardTitle>
            <CardDescription>
              Displaying minimum, median, and maximum salaries (in thousands)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData}>
                  <defs>
                    <linearGradient id="minGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3a001e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3a001e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="medianGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#724748" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#724748" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="maxGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fe725d  " stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#fe725d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-lg p-2 shadow-md">
                            <p className="font-medium">{label}</p>
                            {payload.map((item) => (
                              <p key={item.name} className="text-sm">
                                {item.name}: ${item.value}K
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="min" fill="url(#minGradient)" name="Min Salary (K)" />
                  <Bar dataKey="median" fill="url(#medianGradient)" name="Median Salary (K)" />
                  <Bar dataKey="max" fill="url(#maxGradient)" name="Max Salary (K)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Key Industry Trends</CardTitle>
            <CardDescription>
              Current trends shaping the industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {industryInsights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span className="text-sm">{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Recommended Skills</CardTitle>
            <CardDescription>Skills to consider developing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {industryInsights.recommendedSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

   
    </div>
  );
};

export default Dashboardview;
