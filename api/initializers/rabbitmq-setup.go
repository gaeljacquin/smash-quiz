package initializers

import (
	"log"
	"os"

	amqp "github.com/rabbitmq/amqp091-go"
)

var rabbitConn *amqp.Connection

func SetupRabbitMQ() {
	rmqUrl := os.Getenv("RABBITMQ_URL")

	if rmqUrl == "" {
		log.Fatal("RABBITMQ_URL environment variable is not set")
	}

	var err error
	rabbitConn, err = amqp.Dial(rmqUrl)

	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %v", err)
	}
}
