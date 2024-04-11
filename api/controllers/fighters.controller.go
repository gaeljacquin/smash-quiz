package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/gaeljacquin/smash-quiz/api/initializers"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

func GetFighters(c *gin.Context) {
	characterImagePath := os.Getenv("SUPABASE_URL") + os.Getenv("SUPABASE_BUCKET_PATH") + os.Getenv("SUPABASE_SSBU_ROSTER_BUCKET")

	if characterImagePath == "" {
		c.JSON(500, gin.H{"error": "characterImagePath is empty"})
		return
	}

	ctx := context.Background()
	rdb := initializers.RedisClient

	fighters, err := rdb.Get(ctx, "fighters").Result()

	var results []struct {
		SmashID    string `json:"smash_id"`
		SimpleName string `json:"simple_name"`
		NameEnUs   string `json:"name_en_us"`
		PartialImg string `json:"partial_img"`
		FullImg    string `json:"full_img"`
	}

	if err == redis.Nil {
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
			c.JSON(500, gin.H{"error": "Error fetching 'fighters'"})
			return
		}

		fightersJSON, err := json.Marshal(results)

		if err != nil {
			c.JSON(500, gin.H{"error": "Error marshalling 'fighters'"})
			return
		}

		rdb.Set(ctx, "fighters", fightersJSON, 0)

		c.JSON(200, results)
	} else if err != nil {
		c.JSON(500, gin.H{"error": "Error fetching 'fighters' from Redis"})
	} else {
		if err := json.Unmarshal([]byte(fighters), &results); err != nil {
			c.JSON(500, gin.H{"error": "Error unmarshalling 'fighters' from Redis"})
			return
		}

		c.JSON(200, results)
	}
}
