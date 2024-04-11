package models

import (
	"time"

	"github.com/lib/pq"
)

type Log struct {
	CustomBaseModel
	ClipID   int            `gorm:"column:clip_id"`
	Score    int            `gorm:"column:score"`
	Answers  int            `gorm:"column:answers"`
	Selected pq.StringArray `gorm:"type:text[];column:selected"`
	Played   *time.Time     `gorm:"column:played"`
	Clip     Clip           `gorm:"foreignKey:ClipID"`
}
