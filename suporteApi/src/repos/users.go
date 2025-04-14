package repos

import (
	"database/sql"
	"suporteApi/src/models"
)

type users struct {
	db *sql.DB
}

func NewRepoUsers(db *sql.DB) *users {
	return &users{db}
}

func (u users) Create(user models.User) (uint64, error) {
	statement, err := u.db.Prepare("INSERT INTO suportedb.users(login, senha) VALUES (?, ?)")
	if err != nil {
		return 0, err
	}
	defer statement.Close()

	result, err := statement.Exec(user.Login, user.Senha)
	if err != nil {
		return 0, err
	}

	insertedID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return uint64(insertedID), nil
}

func (u users) FindByLogin(login string) (models.User, error) {
	row, err := u.db.Query("SELECT id, senha FROM users WHERE login = ?", login)
	if err != nil {
		return models.User{}, err
	}
	defer row.Close()

	var user models.User

	if row.Next() {
		if err = row.Scan(&user.ID, &user.Senha); err != nil {
			return models.User{}, err
		}
	}

	return user, nil
}
