package routers

import (
	"github.com/Hoodps/go-activity/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{})

	beego.Router("/wheel/index", &controllers.WheelController{}, "*:Index")
	beego.Router("/wheel/index_data", &controllers.WheelController{}, "*:Index_data")
	beego.Router("/wheel/input_mobi", &controllers.WheelController{}, "*:Input_mobi")
	beego.Router("/wheel/run", &controllers.WheelController{}, "*:Run")
}
