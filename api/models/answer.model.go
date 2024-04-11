package models

type Answer struct {
	CustomBaseModel
	ClipID  uint    `gorm:"column:clip_id"`
	SmashID string  `gorm:"type:varchar(10);uniqueIndex;column:smash_id"`
	Clip    Clip    `gorm:"foreignKey:ClipID"`
	Fighter Fighter `gorm:"foreignKey:SmashID"`
}

func (Answer) TableName() string {
	return "answer"
}
