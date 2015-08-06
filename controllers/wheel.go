package controllers

import (
	"fmt"
	"github.com/Hoodps/go-activity/util"
)

type WheelController struct {
	BaseController
}

type Info struct {
	Name  string
	Level string
	Count string
}

func (this *WheelController) Index() {
	//fmt.Println("indexss")

	tk1 := util.Get_rand_chars(12)
	fmt.Println(tk1)

	fmt.Println(util.TimeNow())
	fmt.Println(util.DateNow())

	this.Data["tk1"] = tk1
	this.TplNames = "wheel/index.html"
}

func (this *WheelController) Index_data() {
	out := make(map[string]interface{})
	list := []*Info{
		{"Macbook", "4", "3"},
		{"Iphone 6s", "3", "3"},
		{"Ipad 2", "2", "3"},
		{"华为P7", "1", "3"},
	}
	//fmt.Println(list)
	out["code"] = "0"
	out["msg"] = "SUCCESS"
	out["data"] = list
	this.Data["json"] = out
	this.ServeJson()
}

func (this *WheelController) Input_mobi() {
	out := make(map[string]interface{})
	list := map[string]string{"mobi": "15820284791"}
	//fmt.Println(list)
	out["code"] = "0"
	out["msg"] = "SUCCESS"
	out["data"] = list
	this.Data["json"] = out
	this.ServeJson()
}
func (this *WheelController) Run() {
	out := make(map[string]interface{})
	list := map[string]string{"name": "Macbook", "level": "1"}
	//fmt.Println(list)
	out["code"] = "0"
	out["msg"] = "SUCCESS"
	out["data"] = list
	this.Data["json"] = out
	this.ServeJson()
}
