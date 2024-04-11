package models

type Clip struct {
	CustomBaseModelClip
	ClipName          string `gorm:"type:varchar(100)" json:"clip_name"`
	Timer             int    `gorm:"type:int" json:"timer"`
	YoutubeID         string `gorm:"type:varchar(100)" json:"-"`
	CloudinaryVersion string `gorm:"type:varchar(100);null" json:"-"`
	Answers           []Answer
	Logs              []Log
}

func (Clip) TableName() string {
	return "clip"
}
