import React from 'react';

export interface t("auto.types.8f9bfe9d") {
  id?: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'developer';
  avatar?: string;
  token?: string;
}

export interface AnalysisStepData {
  [key: string]: any;
}

export interface AnalysisFormData {
  step1: AnalysisStepData;
  step2: AnalysisStepData;
  step3: AnalysisStepData;
  step4: AnalysisStepData;
  step5: AnalysisStepData;
}

export interface RecentAnalysis {
  id: string;
  name: string;
  type: string;
  date: string;
  score: number;
  status: 't("auto.types.ae94f80b")' | 't("auto.types.643562a9")' | 't("auto.types.f03ab16c")';
}

export interface MyAnalysis {
  id: string;
  name: string;
  details: string;
  riskLevel: 't("auto.types.28d0edd0")' | 't("auto.types.87f8a6ab")' | 't("auto.types.655d20c1")';
  successPercent: number;
  date: string;
  investment: number;
  expectedROI: number;
  score: number;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number; // in minutes
  isPopular: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export interface t("auto.types.e3afed00")t("auto.types.8f9bfe9d") {
  id: string;
  name: string;
  email: string;
  role: 't("auto.types.e3afed00")' | 't("auto.types.8f9bfe9d")';
  status: 't("auto.types.4d3d769b")' | 't("auto.types.3cab03c0")';
  analyses: number;
  lastLogin: string;
}
