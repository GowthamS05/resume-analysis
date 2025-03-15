export interface ATSAnalysisResult {
  name: string;
  email: string;
  phone: string;
  overall: number;
  location: string;
  keywords: string[];
  missing_keywords: string[];
  grammar_score: number;
  grammarScoreComment:string;
  readabilityScoreComment:string;
  overallComment:string;
  readability_score:number;
  tips: TitleDescription[]
}

interface TitleDescription {
    title: string;
    description: string;
  
}
export interface ResumeFormatResult {
  name: string;
  email: string;
  phone: string;
  location:string;
  completeness: number;
  completenessComments:string;
  sections_present: string[];
  sections_missing: string[];
  suggestions: string[];
  readability: number;
  readabilityComments:string;
}

export interface JDAnalysisResult {
  name: string;
  email: string;
  phone: string;
  score: number;
  location:string;
  matching_skills: string[];
  missing_skills: string[];
  recommendations: string[];
  relevance: number;
  relevanceComments:string;
  scoreComments:string;
}

export interface FeedbackResult {
    overall_score: number;
    overall_scoreComments:String;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    action_items: string[];
    improvement_plan: string;
  }
  export interface OverallResult{
    ats_score:ATSAnalysisResult;
    jd_score:JDAnalysisResult;
    format_score:ResumeFormatResult;
    overall:FeedbackResult;
  } 

export interface FinalAnalysis{
      [key: string]: ATSAnalysisResult | FeedbackResult | ResumeFormatResult | JDAnalysisResult | OverallResult;
  

}