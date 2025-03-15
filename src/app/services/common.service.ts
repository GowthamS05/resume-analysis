import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  async validateToken(apiKey: string): Promise<boolean> {
    try {
      if (!apiKey) {
        return false; 
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); 

      const prompt = 'test';

      await model.generateContent(prompt);

      return true; 
    } catch (error: any) {
      if (error && error.message && (error.message.includes('API key not valid') || error.message.includes('PERMISSION_DENIED'))) {
        return false; 
      }
      console.error('Error validating Gemini token:', error);
      return false; 
    }
  }
}
