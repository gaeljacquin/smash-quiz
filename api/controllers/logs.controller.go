package controllers

import (
	"encoding/json"
	"log"
	"time"

	"github.com/gaeljacquin/smash-quiz/api/initializers"
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

	selectedJSON, err := json.Marshal(logRequest.Selected)

	if err != nil {
		c.JSON(400, gin.H{"error": "Failed to serialize \"selected\""})
		return
	}

	logData := map[string]interface{}{
		"clip_id":  logRequest.ClipID,
		"score":    logRequest.Score,
		"answers":  logRequest.Answers,
		"selected": selectedJSON,
		"played":   played.Format("2006-01-02 15:04:05"),
	}

	key := "log:" + time.Now().Format(time.RFC3339Nano)

	err = initializers.RedisClient.HMSet(c.Request.Context(), key, logData).Err()

	if err != nil {
		log.Printf("Failed to log game: %v", err)
		c.JSON(500, gin.H{"error": "Failed to log game"})
		return
	}

	c.JSON(200, gin.H{"message": "Game logged! 😀"})
}
