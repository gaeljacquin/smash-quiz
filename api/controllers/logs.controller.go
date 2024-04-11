package controllers

import (
	"time"

	"github.com/gaeljacquin/smash-quiz/api/initializers"
	"github.com/gaeljacquin/smash-quiz/api/models"
	"github.com/gin-gonic/gin"
)

type LogRequest struct {
	ClipID   int      `json:"clip_id"`
	Score    int      `json:"score"`
	Answers  int      `json:"answers"`
	Selected []string `json:"selected"`
	Played   string   `json:"played"`
}

func SaveLog(c *gin.Context) {
	var logRequest LogRequest

	if err := c.BindJSON(&logRequest); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	played, err := time.Parse("2006-01-02 15:04:05", logRequest.Played)

	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid time format"})
		return
	}

	log := models.Log{
		ClipID:   logRequest.ClipID,
		Score:    logRequest.Score,
		Answers:  logRequest.Answers,
		Selected: logRequest.Selected,
		Played:   &played,
	}
	result := initializers.DB.Create(&log)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(200, result)
}
