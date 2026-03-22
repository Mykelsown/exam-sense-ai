package handlers

import (
	"encoding/json"
	"net/http"

	"exam-sense-backend/services"
)

type GenerateRequest struct {
	LectureTranscript string `json:"lecture_transcript"`
	StudyMaterial     string `json:"study_material"`
	QuestionCount     int    `json:"question_count"`
	QuestionFormat    string `json:"question_format"`
}

func GenerateHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req GenerateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	questions, err := services.GenerateQuestions(services.GenerateQuestionsInput{
		LectureTranscript: req.LectureTranscript,
		StudyMaterial:     req.StudyMaterial,
		QuestionCount:     req.QuestionCount,
		QuestionFormat:    req.QuestionFormat,
	})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"questions": questions,
	})
}
