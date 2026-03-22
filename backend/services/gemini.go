// package services

// import (
// 	"context"
// 	"os"

// 	"github.com/google/generative-ai-go/genai"
// 	"google.golang.org/api/option"
// )

// func GenerateExamQuestions(ctx context.Context, prompt string) (string, error) {
// 	apiKey := os.Getenv("GEMINI_API_KEY")

// 	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
// 	if err != nil {
// 		return "", err
// 	}
// 	defer client.Close()

// 	model := client.GenerativeModel("models/gemini-1.0-pro")

// 	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
// 	if err != nil {
// 		return "", err
// 	}

// 	// Safely extract text
// 	if len(resp.Candidates) == 0 {
// 		return "", nil
// 	}

// 	part := resp.Candidates[0].Content.Parts[0]
// 	text := part.(genai.Text)

// 	return string(text), nil
// }


// NEW CODE FOR FUTURE PROOF DUE TO FAILED BILLING

package services

import "fmt"

// GenerateQuestionsInput defines the input contract
type GenerateQuestionsInput struct {
	LectureTranscript string
	StudyMaterial     string
	QuestionCount     int
	QuestionFormat    string
}

// Question represents one exam question
type Question struct {
	Question string `json:"question"`
	Answer   string `json:"answer"`
}

// GenerateQuestions is the main entry point
func GenerateQuestions(input GenerateQuestionsInput) ([]Question, error) {

	// 🔹 MOCK MODE (Gemini disabled)
	questions := []Question{}

	for i := 1; i <= input.QuestionCount; i++ {
		q := Question{
			Question: fmt.Sprintf(
				"(%d) Explain %s based on the lecture and provided material.",
				i,
				input.QuestionFormat,
			),
			Answer: fmt.Sprintf(
				"This answer is generated based on the lecture: \"%s\" and the study material.",
				input.LectureTranscript,
			),
		}
		questions = append(questions, q)
	}

	return questions, nil
}
