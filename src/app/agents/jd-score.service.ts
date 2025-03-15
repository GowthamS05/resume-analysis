import { Injectable } from '@angular/core';
import { Observable, from, map, catchError } from 'rxjs';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { JDAnalysisResult } from '../models/agent.model';



@Injectable({
  providedIn: 'root',
})
export class JDMatchService {
  constructor() {}

  analyzeJobDescription(
    resumeText: string,
    jobDescription: string,
    apiKey: string
  ): Observable<JDAnalysisResult> {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
    You are an **experienced technical recruiter and job matching specialist**.

    Compare the provided **resume** with the **job description** and return a **structured analysis in valid JSON format**. Ensure that all results are derived **strictly from the input** without any additional or fabricated information.

    The JSON response must follow this exact structure:

    {
      "name": "<Extracted name from the resume>",
      "email": "<Extracted email from the resume>",
      "phone": "<Extracted phone number from the resume>",
      "location": "<Extracted location if available>",
      "score": <integer between 0-100 representing overall match percentage based on job description and resume>,
      "scoreComments": "<Brief assessment based on the score>",
      "matching_skills": [<Array of skills that match both the job description and resume>],
      "missing_skills": [<Array of required skills that are missing in the resume while comparing with the job description>],
      "recommendations": [<Array of specific suggestions for improvement to increase the match score>],
      "relevance": <integer between 0-100 representing experience and skills relevance based on the job description and resume>,
      "relevanceComments": "<Brief assessment based on the relevance score>"
    }

    ### Example Output:

    {
      "name": "John Doe",
      "email": "123@gmail.com",
      "phone": "123-456-7890",
      "location": "India",
      "score": 75,
      "scoreComments": "You got a decent score. Consider improving alignment with the job requirements.",
      "matching_skills": ["JavaScript", "React", "AWS"],
      "missing_skills": ["Python", "Django"],
      "recommendations": [
        "Add experience with Python",
        "Highlight cloud deployment skills",
        "Improve keyword optimization for ATS",
        "Include specific project examples",
        "Refine technical skill descriptions"
      ],
      "relevance": 80,
      "relevanceComments": "Your background is highly relevant to this position. Your experience aligns well with the core requirements of the role."
    }

    ### **Guidelines:**  
    - Extract and compare **only authentic** details found in the **resume** and **job description**.  
    - Do **not** infer, assume, or fabricate any missing details.  
    - Provide **at least five actionable recommendations** to improve the match score.  
    - Ensure the **output is valid JSON** with no additional commentary, explanations, or formatting errors.  

    Now, analyze the match and return the JSON response accordingly.

    **Resume:**  
    ${resumeText}

    **Job Description:**  
    ${jobDescription}
    `;


    return from(model.generateContent(prompt)).pipe(
      map((result) => {
        let responseText = result.response.text();
        responseText = responseText.replace(/^```json|```$/g, '');
        responseText = responseText.replace(/,\s*([}\]])/g, '$1');
        try {
          console.log('ResponseText',responseText);
          const parsedResult = JSON.parse(responseText) as JDAnalysisResult;
          return parsedResult;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          throw new Error('Invalid JSON response from Gemini.');
        }
      }),
      catchError((error) => {
        console.error('Error analyzing job description:', error);
        throw new Error('Error analyzing job description with Gemini.');
      })
    );
  }
}