package models

type CustomBaseModel struct {
	ID uint `gorm:"primaryKey;column:id" json:"-"`
}

type CustomBaseModelClip struct {
	ID uint `gorm:"primaryKey;column:id" json:"id"`
}
