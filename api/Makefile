run:
ifeq ($(ENV),prod)
	go run main.go
else
	CompileDaemon -command="./api"
endif

install:
	go get -u github.com/gin-gonic/gin gorm.io/gorm gorm.io/driver/postgres github.com/joho/godotenv github.com/lib/pq
	go install -mod=mod github.com/githubnemo/CompileDaemon

.PHONY: run install
