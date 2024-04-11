package initializers

import (
	"log"
	"os"

	"github.com/redis/go-redis/v9"
)

var RedisClient *redis.Client

func ConnectToRedis() {
	redisURL := os.Getenv("REDIS_URL")

	if redisURL == "" {
		log.Fatal("REDIS_URL environment variable is not set")
	}

	opts, err := redis.ParseURL(redisURL)

	if err != nil {
		log.Fatalf("Failed to parse REDIS_URL: %v", err)
	}

	RedisClient = redis.NewClient(opts)
}
