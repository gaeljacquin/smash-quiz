package controllers

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/gaeljacquin/smash-quiz/api/initializers"
	"github.com/gin-gonic/gin"
)

type StringArray []string

func (a *StringArray) Scan(value interface{}) error {
	if value == nil {
		*a = nil
		return nil
	}

	strValue, ok := value.(string)

	if !ok {
		return fmt.Errorf("unexpected type %T for fighters", value)
	}

	strValue = strings.Trim(strValue, "{}")
	*a = strings.Split(strValue, ",")

	return nil
}

func (a StringArray) Value() (driver.Value, error) {
	if a == nil {
		return nil, nil
	}

	return json.Marshal(a)
}

func GetClips(c *gin.Context) {
	var clips []struct {
		ClipName string      `json:"clip_name"`
		Timer    int         `json:"timer"`
		Fighters StringArray `gorm:"type:varchar(10)[]" json:"fighters"`
	}

	query := `
        SELECT
            c.id,
            c.clip_name,
            c.timer,
            array_agg(a.smash_id) as fighters
        FROM
            clip c
        JOIN
            answer a ON c.id = a.clip_id
        GROUP BY
            c.id
    `

	if err := initializers.DB.Raw(query).Scan(&clips).Error; err != nil {
		c.JSON(500, gin.H{"error": "Error fetching clips"})
		return
	}

	c.JSON(200, clips)
}
