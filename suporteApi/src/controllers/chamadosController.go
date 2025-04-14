package controllers

import (
	"encoding/json"
	"io"
	"net/http"
	"strconv"
	"strings"
	"suporteApi/src/database"
	"suporteApi/src/models"
	"suporteApi/src/repos"
	"suporteApi/src/responses"

	"github.com/gorilla/mux"
)

func CriarChamado(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	var chamado models.Chamado

	if err = json.Unmarshal(body, &chamado); err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	db, err := database.Connect()
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	repo := repos.NewRepoChamados(db)
	chamadoID, err := repo.Criar(chamado)
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}

	chamado.ID = chamadoID

	responses.JSON(w, http.StatusCreated, chamado)

}

func BuscarChamados(w http.ResponseWriter, r *http.Request) {
	resolvido := strings.ToLower(r.URL.Query().Get("resolvido"))

	db, err := database.Connect()
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	repo := repos.NewRepoChamados(db)
	chamados, err := repo.FindByResolvido(resolvido)
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}

	responses.JSON(w, http.StatusOK, chamados)

}

func BuscarTodosChamados(w http.ResponseWriter, r *http.Request) {

	db, err := database.Connect()
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	repo := repos.NewRepoChamados(db)
	chamados, err := repo.FindAll()
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}

	responses.JSON(w, http.StatusOK, chamados)

}

func BuscarChamado(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	chamadoID, err := strconv.ParseUint(params["id"], 10, 64)
	if err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	db, err := database.Connect()
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	repo := repos.NewRepoChamados(db)
	chamado, err := repo.FindById(chamadoID)
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}

	responses.JSON(w, http.StatusOK, chamado)
}

func ResolverChamado(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	chamadoID, err := strconv.ParseUint(params["id"], 10, 64)
	if err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	var chamado models.Chamado
	if err = json.Unmarshal(body, &chamado); err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	db, err := database.Connect()
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	repo := repos.NewRepoChamados(db)
	if err = repo.Resolver(chamadoID, chamado.Resolucao); err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}

	responses.JSON(w, http.StatusNoContent, nil)

}
