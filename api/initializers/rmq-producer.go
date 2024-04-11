package initializers

import (
	"context"
	"encoding/json"
	"os"

	amqp "github.com/rabbitmq/amqp091-go"
)

func PublishLog(logData map[string]interface{}) error {
	conn, err := amqp.Dial(os.Getenv("RABBITMQ_URL"))
	ctx := context.Background()

	if err != nil {
		return err
	}

	defer conn.Close()

	ch, err := conn.Channel()

	if err != nil {
		return err
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
		return err
	}

	logJSON, err := json.Marshal(logData)

	if err != nil {
		return err
	}

	err = ch.PublishWithContext(
		ctx,
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			ContentType: "application/json",
			Body:        logJSON,
		},
	)

	if err != nil {
		return err
	}

	return nil
}
