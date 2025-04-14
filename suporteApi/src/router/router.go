package router

import (
	"suporteApi/src/router/routes"

	"github.com/gorilla/mux"
)

func GenerateRouter() *mux.Router {
	r := mux.NewRouter()
	return routes.ConfigRouter(r)
}
