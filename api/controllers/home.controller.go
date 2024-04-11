package controllers

import (
	"github.com/gin-gonic/gin"
)

func Home(c *gin.Context) {
	c.String(200, "Hello World!")
}
