package main

import (
	"github.com/gaeljacquin/smash-quiz/api/controllers"
	"github.com/gaeljacquin/smash-quiz/api/initializers"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnv()
	initializers.ConnectToDB()
	initializers.ConnectToRedis()
	go initializers.StartConsumer()
}

func main() {
	r := gin.Default()

	r.GET("/", controllers.Home)
	r.GET("/fighters", controllers.GetFighters)
	r.GET("/clips", controllers.GetClips)
	r.POST("/log", controllers.SaveLog)

	r.Run()
}
