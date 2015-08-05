package util

import (
	//"fmt"
	"math/rand"
	"time"
)

func Get_rand_chars(lenght int) (s string) {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	str := []string{"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
		"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
		"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"}
	var res string
	for i := 0; i < lenght; i++ {
		//fmt.Println(str[i])
		res += str[r.Intn(61)]
	}
	return res
}
