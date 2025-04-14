package routes

import (
	"net/http"
	"suporteApi/src/middlewares"

	"github.com/gorilla/mux"
)

type Route struct {
	URI      string
	Method   string
	Function func(http.ResponseWriter, *http.Request)
	IsClosed bool
}

func ConfigRouter(r *mux.Router) *mux.Router {
	routes := chamadoRoutes
	routes = append(routes, userRoutes...)
	routes = append(routes, loginRoute)

	for _, route := range routes {
		if route.IsClosed {
			r.HandleFunc(route.URI, middlewares.Logger(middlewares.AuthenticateRoute(route.Function))).Methods(route.Method)
		} else {
			r.HandleFunc(route.URI, middlewares.Logger(route.Function)).Methods(route.Method)
		}
	}
	return r
}
