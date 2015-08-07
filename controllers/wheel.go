package controllers

import (
	"fmt"
	"github.com/Hoodps/go-activity/util"
	"strings"
)

type WheelController struct {
	BaseController
}

type Info struct {
	Id    int64
	Name  string
	Level string
	Count string
	Opps  int64
}

var list = []Info{
	{1, "Macbook", "4", "3", 5},
	{2, "Iphone 6s", "3", "3", 10},
	{3, "Ipad 2", "2", "3", 20},
	{4, "华为P7", "1", "3", 30},
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

	//fmt.Println(list)
	out["code"] = "0"
	out["msg"] = "SUCCESS"
	out["data"] = list
	this.Data["json"] = out
	this.ServeJson()
}

func (this *WheelController) Input_mobi() {
	mobi := strings.TrimSpace(this.GetString("mobi"))
	fmt.Println(mobi)
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
	arr := []int{}
	for key, value := range list {
		arr[key] = value.Opps
	}

	fmt.Println(arr)
	out := make(map[string]interface{})
	list := map[string]string{"name": "Macbook", "level": "1"}
	//fmt.Println(list)
	out["code"] = "0"
	out["msg"] = "SUCCESS"
	out["data"] = list
	this.Data["json"] = out
	this.ServeJson()
}
