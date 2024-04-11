package controllers

import (
	"fmt"
	"os"

	"github.com/gaeljacquin/smash-quiz/api/initializers"
	"github.com/gin-gonic/gin"
)

func GetFighters(c *gin.Context) {
	characterImagePath := os.Getenv("SUPABASE_URL") + os.Getenv("SUPABASE_BUCKET_PATH") + os.Getenv("SUPABASE_SSBU_ROSTER_BUCKET")

	if characterImagePath == "" {
		c.JSON(500, gin.H{"error": "characterImagePath is empty"})
		return
	}

	var results []struct {
		SmashID    string `json:"smash_id"`
		SimpleName string `json:"simple_name"`
		NameEnUs   string `json:"name_en_us"`
		PartialImg string `json:"partial_img"`
		FullImg    string `json:"full_img"`
	}

	query := fmt.Sprintf(`
        SELECT
            f.smash_id,
            f.simple_name,
            f.name_en_us,
            '%s' || f.simple_name || '/chara_0_' || f.simple_name || '_00.png' AS partial_img,
            '%s' || f.simple_name || '/chara_5_' || f.simple_name || '_00.png' AS full_img
        FROM
            fighter f
    `, characterImagePath, characterImagePath)

	if err := initializers.DB.Raw(query).Scan(&results).Error; err != nil {
		c.JSON(500, gin.H{"error": "Error fetching fighters"})
		return
	}

	c.JSON(200, results)
}
