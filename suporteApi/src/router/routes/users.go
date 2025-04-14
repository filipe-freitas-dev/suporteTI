package routes

import (
	"net/http"
	"suporteApi/src/controllers"
)

var userRoutes = []Route{
	// STORE
	{
		URI:      "/users",
		Method:   http.MethodPost,
		Function: controllers.CreateUser,
		IsClosed: true,
	},
	// STORE
	{
		URI:      "/validate-token",
		Method:   http.MethodPost,
		Function: controllers.ValidadeToken,
		IsClosed: false,
	},
}

var loginRoute = Route{
	URI:      "/login",
	Method:   http.MethodPost,
	Function: controllers.Login,
	IsClosed: false,
}
