package initializers

import (
	"encoding/base64"
	"encoding/json"
	"log"
	"os"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
	"gorm.io/gorm"

	"github.com/gaeljacquin/smash-quiz/api/models"
)

func StartConsumer() {
	ConnectToDB()

	rmqUrl := os.Getenv("RABBITMQ_URL")
	conn, err := amqp.Dial(rmqUrl)

	if err != nil {
		log.Fatalf("%s: %s", "Failed to connect to RabbitMQ", err)
	}

	defer conn.Close()

	ch, err := conn.Channel()

	if err != nil {
		log.Fatalf("%s: %s", "Failed to open a channel", err)
	}

	defer ch.Close()

	q, err := ch.QueueDeclare(
		os.Getenv("RABBITMQ_QUEUE"), // name
		true,                        // durable
		false,                       // delete when unused
		false,                       // exclusive
		false,                       // no-wait
		nil,                         // arguments
	)

	if err != nil {
		log.Fatalf("%s: %s", "Failed to declare a queue", err)
	}

	// Consume messages from the queue
	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)

	if err != nil {
		log.Fatalf("%s: %s", "Failed to register a consumer", err)
	}

	for msg := range msgs {
		var logData map[string]interface{}
		err := json.Unmarshal(msg.Body, &logData)

		if err != nil {
			log.Printf("Failed to unmarshal game log: %v", err)
			continue
		}

		selectedBase64 := logData["selected"].(string)
		selectedBytes, err := base64.StdEncoding.DecodeString(selectedBase64)

		if err != nil {
			log.Printf("Failed to decode selected field: %v", err)
			continue
		}

		var selected []string
		err = json.Unmarshal(selectedBytes, &selected)

		if err != nil {
			log.Printf("Failed to unmarshal selected field: %v", err)
			continue
		}

		logData["selected"] = selected
		err = SaveLogToDB(DB, logData)

		if err != nil {
			log.Printf("Failed to save game log to DB: %v", err)
		}
	}
}

func SaveLogToDB(db *gorm.DB, logData map[string]interface{}) error {
	played, err := time.Parse("2006-01-02 15:04:05", logData["played"].(string))

	if err != nil {
		return err
	}

	selected, ok := logData["selected"].([]string)

	if !ok {
		log.Printf("Failed to assert \"selected\" to []string")
		return err
	}

	scoreFloat64, ok := logData["score"].(float64)

	if !ok {
		log.Printf("Failed to assert \"score\" to float64")
		return err
	}

	score := int(scoreFloat64)

	answersFloat64, ok := logData["answers"].(float64)

	if !ok {
		log.Printf("Failed to assert \"answers\" to float64")
		return err
	}

	answers := int(answersFloat64)

	clip_idFloat64, ok := logData["clip_id"].(float64)

	if !ok {
		log.Printf("Failed to assert \"answers\" to float64")
		return err
	}

	clip_id := int(clip_idFloat64)

	logEntry := models.Log{
		ClipID:   clip_id,
		Score:    score,
		Answers:  answers,
		Selected: selected,
		Played:   &played,
	}
	result := db.Create(&logEntry)

	if result.Error != nil {
		return result.Error
	}

	log.Println("Game log saved to DB! 😀")

	return nil
}
