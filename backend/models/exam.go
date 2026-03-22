package models

type ExamRequest struct {
	LectureTranscript string `json:"lecture_transcript"`
	StudyMaterial     string `json:"study_material"`
	QuestionCount     int    `json:"question_count"`
	QuestionFormat    string `json:"question_format"` // essay, mcq, short-answer
}

type ExamResponse struct {
	Questions string `json:"questions"`
}
