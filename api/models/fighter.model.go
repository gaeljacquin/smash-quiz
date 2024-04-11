package models

type Fighter struct {
	CustomBaseModel
	SmashID    string `gorm:"type:varchar(10);uniqueIndex;column:smash_id" json:"smash_id"`
	SimpleName string `gorm:"type:varchar(100);uniqueIndex;column:simple_name" json:"simple_name"`
	NameEnUs   string `gorm:"type:varchar(100);column:name_en_us" json:"name_en_us"`
	NameFrCa   string `gorm:"type:varchar(100);column:name_fr_ca" json:"-"`
	NameFrFr   string `gorm:"type:varchar(100);column:name_fr_fr" json:"-"`
	NameEsLa   string `gorm:"type:varchar(100);column:name_es_la" json:"-"`
	NameEsEs   string `gorm:"type:varchar(100);column:name_es_es" json:"-"`
	Chara0     string `gorm:"type:varchar(100);column:chara_0" json:"chara_0"`
	Chara5     string `gorm:"type:varchar(100);column:chara_5" json:"chara_5"`
}

func (Fighter) TableName() string {
	return "fighter"
}
