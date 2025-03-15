import { Injectable } from '@angular/core';
import { Observable, from, map, catchError } from 'rxjs';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { ATSAnalysisResult, FeedbackResult, JDAnalysisResult, ResumeFormatResult } from '../models/agent.model';


@Injectable({
  providedIn: 'root',
})
export class OverallScoreService {
  constructor() {}

  generateFeedback(
    resumeText: string,
    jobDescription: string,
    atsScore: ATSAnalysisResult,
    jobMatchScore: JDAnalysisResult,
    structureScore: ResumeFormatResult,
    apiKey: string
  ): Observable<FeedbackResult> {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
          You are a **senior career coach and resume expert** with extensive experience in **talent acquisition**.

          Analyze the provided **resume** against the **job description** and deliver a **structured evaluation in valid JSON format**. Ensure that all results are **strictly based on the input**, without any inferred or fabricated details.

          ---

          ### **Input Data:**
          **RESUME:**  
          ${resumeText}

          **JOB DESCRIPTION:**  
          ${jobDescription}

          ### **Analysis Metrics:**  
          - **ATS Score:** ${atsScore.overall}/100  
          - **Job Match Score:** ${jobMatchScore.score}/100  
          - **Structure Score:** ${structureScore.completeness}/100  

          ### **Key Findings:**  
          - **Detected Keywords:** ${atsScore.keywords.join(', ')}  
          - **Missing Keywords:** ${atsScore.missing_keywords.join(', ')}  
          - **Matching Skills:** ${jobMatchScore.matching_skills.join(', ')}  
          - **Missing Skills:** ${jobMatchScore.missing_skills.join(', ')}  
          - **Present Sections:** ${structureScore.sections_present.join(', ')}  
          - **Missing Sections:** ${structureScore.sections_missing.join(', ')}  

          ---

          ### **Guidelines:**  
          - Extract insights **only** from the **provided resume and job description**—do **not** assume or fabricate missing details.  
          - Ensure that **scores, strengths, weaknesses, and recommendations** are based **strictly on detected content**.  
          - Provide **valid JSON output** with **no additional commentary, explanations, or formatting errors**.  

          ---

          ### **Expected JSON Output Format:**

          json
          {
            "overall_score": <integer between 0-100 based on input>,
            "overall_scoreComments": "<Comments based on the overall score>",
            "summary": "<Concise 2-3 sentence overview of the resume's fitness for the role>",
            "strengths": [<Array of 5 key strengths identified in the resume>],
            "weaknesses": [<Array of 5 main areas needing improvement>],
            "action_items": [<Array of 5 specific, actionable steps to improve the resume>],
            "improvement_plan": "<Structured paragraph describing the recommended approach to enhance the resume>"
          }


          ---

          ### **Example Output:**

          {
            "overall_score": 20,
            "overall_scoreComments": "Your combined resume evaluation score based on all factors needs improvement.",
            "summary": "The resume partially aligns with the role but lacks key industry-specific skills and structure.",
            "strengths": ["Expertise in data analysis", "Strong communication skills"],
            "weaknesses": ["Lack of industry-specific knowledge", "Limited project management experience"],
            "action_items": [
              "Take a course on industry-specific data analysis",
              "Improve project management skills",
              "Refine the resume structure for better readability",
              "Add measurable achievements under experience",
              "Optimize keywords for better ATS compatibility"
            ],
            "improvement_plan": "To improve the resume, focus on gaining deeper knowledge in relevant fields, enhancing soft skills such as communication, and restructuring sections to improve readability and keyword optimization."
          }

          Now, analyze the resume and return the JSON response accordingly.
          `;


    return from(model.generateContent(prompt)).pipe(
      map((result) => {
        let responseText = result.response.text();
        responseText = responseText.replace(/^```json|```$/g, '');
        responseText = responseText.replace(/,\s*([}\]])/g, '$1');
        try {
          console.log('ResponseText',responseText);
          const parsedResult = JSON.parse(responseText) as FeedbackResult;
          return parsedResult;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          throw new Error('Invalid JSON response from Gemini.');
        }
      }),
      catchError((error) => {
        console.error('Error generating feedback:', error);
        throw new Error('Error generating feedback with Gemini.');
      })
    );
  }
}