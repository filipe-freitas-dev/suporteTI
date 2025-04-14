package controllers

import (
	"encoding/json"
	"io"
	"net/http"
	"suporteApi/src/authentication"
	"suporteApi/src/database"
	"suporteApi/src/models"
	"suporteApi/src/repos"
	"suporteApi/src/responses"
	"suporteApi/src/security"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	var user models.User

	if err = json.Unmarshal(body, &user); err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	if err = user.Prepare(); err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	db, err := database.Connect()
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}

	defer db.Close()

	repo := repos.NewRepoUsers(db)
	userID, err := repo.Create(user)
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}

	user.ID = userID
	responses.JSON(w, http.StatusCreated, user)
}

func Login(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	var user models.User

	if err = json.Unmarshal(body, &user); err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	db, err := database.Connect()
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}

	defer db.Close()

	repo := repos.NewRepoUsers(db)
	userDBSaved, err := repo.FindByLogin(user.Login)
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}

	if err = security.ValidatePassword(userDBSaved.Senha, user.Senha); err != nil {
		responses.Error(w, http.StatusUnauthorized, err)
		return
	}

	token, err := authentication.GenerateToken(uint64(userDBSaved.ID))
	if err != nil {
		responses.Error(w, http.StatusInternalServerError, err)
		return
	}

	responses.JSON(w, http.StatusOK, token)
}

func ValidadeToken(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	var tokenJSON models.TokenJSON

	if err = json.Unmarshal(body, &tokenJSON); err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	if err = authentication.ValidateToken(tokenJSON.Token); err != nil {
		responses.Error(w, http.StatusBadRequest, err)
		return
	}

	responses.JSON(w, http.StatusNoContent, nil)
}
