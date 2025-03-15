import { Injectable } from '@angular/core';
import { Observable, from, map, catchError } from 'rxjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeFormatResult } from '../models/agent.model';



@Injectable({
  providedIn: 'root',
})
export class ResumeFormatService {
  constructor() {}

  generateResumeFormatScore(
    resumeText: string,
    apiKey: string
  ): Observable<ResumeFormatResult> {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
            You are an **expert in resume structure analysis**, specializing in **format and organization**.

            Analyze the **structure and formatting** of the provided resume and return a **structured assessment in valid JSON format**. Ensure that all results are **strictly based on the input**, without any inferred or fabricated information.

            The JSON response must follow this exact format:

            {
              "name": "<Extracted name from the resume>",
              "email": "<Extracted email from the resume>",
              "location": "<Extracted location from the resume>",
              "phone": "<Extracted phone number from the resume>",
              "completeness": <integer between 0-100 representing how complete the resume is>,
              "completenessComments": "<Brief assessment based on the completeness score>",
              "sections_present": [<Array of detected resume sections>],
              "sections_missing": [<Array of important missing sections that could improve visibility to recruiters>],
              "suggestions": [<Array of formatting and structure improvements that will enhance the resume>],
              "readability": <integer between 0-100 representing how readable the resume is>,
              "readabilityComments": "<Brief assessment based on the readability score>"
            }

            ### Example Output:

            {
              "name": "John Doe",
              "email": "123@gmail.com",
              "phone": "123-456-7890",
              "location": "India",
              "completeness": 85,
              "completenessComments": "Your resume includes most essential sections. Adding a few more could make it more comprehensive.",
              "readability": 90,
              "readabilityComments": "Your resume is well-structured and easy to read. Minor formatting improvements could further enhance readability.",
              "sections_present": ["Summary", "Experience", "Education", "Skills"],
              "sections_missing": ["Projects", "Certifications"],
              "suggestions": [
                "Add a Projects section to showcase hands-on work",
                "Make section headers more prominent",
                "Ensure consistent formatting for bullet points",
                "Use a professional font for better readability",
                "Optimize spacing and alignment for a cleaner layout"
              ]
            }

            ### **Guidelines:**  
            - Identify **only the sections explicitly present** in the resume.  
            - Do **not** infer missing sections unless they are **clearly absent** from the input.  
            - Provide **at least five actionable suggestions** for improving the structure.  
            - Ensure that **readability and completeness scores** are based **only on detected content**.  
            - Return **valid JSON output** without any additional text, explanations, or formatting errors.  

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
          const parsedResult = JSON.parse(responseText) as ResumeFormatResult;
          return parsedResult;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          throw new Error('Invalid JSON response from Gemini.');
        }
      }),
      catchError((error) => {
        console.error('Error analyzing resume format:', error);
        throw new Error('Error analyzing resume format with Gemini.');
      })
    );
  }
}