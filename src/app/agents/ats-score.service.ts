import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { Observable, from, map, catchError } from 'rxjs';
import { ATSAnalysisResult } from '../models/agent.model';



@Injectable({
  providedIn: 'root',
})
export class ATSScoreService {

  generateAtsScore(resumeText: string,api_key:string): Observable<ATSAnalysisResult> {
    let genAI: GoogleGenerativeAI;
    let model: GenerativeModel;
    genAI = new GoogleGenerativeAI(api_key);
    model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `
          You are an **Applicant Tracking System (ATS) expert** specializing in **resume optimization**. Analyze the provided resume strictly for **ATS compatibility** and return the results **only in valid JSON format**. Ensure the analysis is based **solely on the resume content** without adding, inferring, or fabricating any details.

          The JSON response must strictly follow this format:

          {
            "name": "<Extracted name from the resume>",
            "email": "<Extracted email from the resume>",
            "phone": "<Extracted phone number from the resume>",
            "location": "<Extracted location if available>",
            "overall": <integer between 0-100, evaluating resume formatting, keyword structure, and ATS compatibility>,
            "overallComment": "<Brief assessment based on overall score>",
            "keywords": [<Array of detected keywords>],
            "missing_keywords": [<Array of important missing keywords relevant to the role>],
            "grammar_score": <integer between 0-100, evaluating grammar, spelling, and language quality>,
            "grammarScoreComment": "<Brief assessment based on grammar score>",
            "readability_score": <integer between 0-100, analyzing sentence complexity, bullet point usage, and clarity>,
            "readabilityScoreComment": "<Brief assessment based on readability score>",
            "tips": [
              {
                "title": "<Resume improvement tip>",
                "description": "<Short explanation of the tip based on resume content>"
              },
              {
                "title": "<Another resume improvement tip>",
                "description": "<Short explanation of the tip>"
              },
              ...
            ]
          }
         
          ### Example output:

          {
            "name": "John Doe",
            "email": "123@gmail.com",
            "phone": "123-456-7890",
            "location": "San Francisco, CA",
            "overall": 85,
            "keywords": ["javascript", "react", "node.js"],
            "missing_keywords": ["", ""],
            "grammar_score": 90,
            "readability_score":90,
            "tips":[{
              'title': 'Add Modern JavaScript Frameworks',
              'description': 'While your Angular experience is strong, many frontend positions now require experience with React or Vue.js. Consider adding these skills if you have any experience with them.',
            }]
          }

          ### **Guidelines:**  
          - Extract and return **only authentic** information present in the resume.  
          - Do **not** infer, assume, or fabricate any missing details.  
          - Provide **at least five actionable tips** for improving the resume.  
          - Ensure the **output is valid JSON** with no additional commentary, explanations, or formatting errors.  

          Now, analyze the resume and return the JSON response accordingly.

          **Resume Input:**  
          ${resumeText}
         
          `;


    return from(model.generateContent(prompt)).pipe(
      map((result) => {
        let responseText = result.response.text();
        responseText = responseText.replace(/^```json|```$/g, '');
        responseText = responseText.replace(/,\s*([}\]])/g, '$1');
        try {
          console.log('ResponseText',responseText);
          const parsedResult = JSON.parse(responseText) as ATSAnalysisResult;
          return parsedResult;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          throw new Error('Invalid JSON response from Gemini.');
        }
      }),
      catchError((error) => {
        console.error('Error generating ATS score:', error);
        throw new Error('Error analyzing resume with Gemini.');
      })
    );
  }
}