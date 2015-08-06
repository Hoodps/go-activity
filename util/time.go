package util

import (
	"time"
)

const (
	TIME_LAYOUT_OFIEN = "2006-01-02 15:04:05"
	DATE_LAYOUT_OFTEN = "20060102"
)

func TimeNow() string {
	return time.Now().Format(TIME_LAYOUT_OFIEN)
}

func DateNow() string {
	return time.Now().Format(DATE_LAYOUT_OFTEN)
}
