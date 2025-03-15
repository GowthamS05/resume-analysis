# AI Resume Analyzer ([## DEMO LINK](https://gowthams05.github.io/resume-analysis/))

## Overview
AI Resume Analyzer is an intelligent web application that helps users optimize their resumes for Applicant Tracking Systems (ATS). Users can upload their resumes, paste a job description, and receive detailed feedback to improve their chances of landing an interview.

## Features
- **ATS Score**: Evaluate how well a resume passes through Applicant Tracking Systems.
- **Job Match Analysis**: Analyze how well the resume matches the specific job requirements.
- **Resume Structure Review**: Get feedback on formatting, organization, and content.
- **Overall Feedback**: Receive a comprehensive analysis, including all three metrics above.

## Project Setup
### Frontend
```sh
npm i 
ng serve
```


## Technologies Used
- **Frontend**:  Angular ,Typescript
- **GoogleGenerativeAI**: The main API client for interacting with Google's generative models.
- **GenerativeModel**: Represents a specific AI model used for text generation and other tasks

## How It Works
1. **Generate API key** : Generate Free API key from https://aistudio.google.com/app/apikey
2. **Validate API key** : Hit Resume Analyser and Validate API key
2. **Upload Resume**: Users can upload a PDF version of their resume (max size: 5MB).
3. **Enter Job Description**: Users paste the job description to analyze the match between their resume and the role.
4. **Select Analysis Options**: Choose from ATS Score, Job Match, Resume Structure, or Overall Feedback.
5. **Analyze Resume**: Click the "Analyze Resume" button to receive insights and recommendations.
6. **Review Results**: Users receive actionable feedback to improve their resume.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## Attachments
**Home Screen - Screenshots**:
  ![image](https://github.com/user-attachments/assets/a6dadd7f-faf8-4837-8ee7-70a96ba6077d)

**ATS Aalysis-Screenshots**:
![image](https://github.com/user-attachments/assets/4e1c9b66-b177-4807-ae18-c31429f474b3)

**JD Analysis -Screenshots**
![image](https://github.com/user-attachments/assets/a7b86fef-9f5d-44f6-a00d-c9f9791ae1bf)

**Format Analyis Screenshots**
![image](https://github.com/user-attachments/assets/1a834dd3-dc00-4713-8305-6001f4edfd2a)

**Overall Screenshots**:
![image](https://github.com/user-attachments/assets/0093a299-5a17-4398-98ad-e524af36b880)


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.








