package routes

import (
	"net/http"
	"suporteApi/src/controllers"
)

var chamadoRoutes = []Route{
	// STORE
	{
		URI:      "/criar-chamado",
		Method:   http.MethodPost,
		Function: controllers.CriarChamado,
		IsClosed: false,
	},
	// INDEX
	{
		URI:      "/buscar-chamados",
		Method:   http.MethodGet,
		Function: controllers.BuscarChamados,
		IsClosed: false,
	},
	// INDEX
	{
		URI:      "/buscar-chamados/all",
		Method:   http.MethodGet,
		Function: controllers.BuscarTodosChamados,
		IsClosed: false,
	},
	// SHOW
	{
		URI:      "/buscar-chamado/{id}",
		Method:   http.MethodGet,
		Function: controllers.BuscarChamado,
		IsClosed: false,
	},
	// SHOW
	{
		URI:      "/resolver-chamado/{id}",
		Method:   http.MethodPost,
		Function: controllers.ResolverChamado,
		IsClosed: false,
	},
}
