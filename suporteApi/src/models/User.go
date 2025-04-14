package models

import (
	"errors"
	"strings"
	"suporteApi/src/security"
	"time"
)

type User struct {
	ID        uint64    `json:"id,omitempty"`
	Login     string    `json:"login,omitempty"`
	Senha     string    `json:"senha,omitempty"`
	CreatedAt time.Time `json:"created_at,omitempty"`
}

func (u *User) Prepare() error {
	if err := u.validate(); err != nil {
		return err
	}

	if err := u.format(); err != nil {
		return err
	}

	return nil
}

func (u *User) validate() error {

	if u.Login == "" {
		return errors.New("o campo \"login\" não pode estar vazio")
	}

	if u.Senha == "" {
		return errors.New("o campo \"senha\" não pode estar vazio")
	}

	return nil
}

func (u *User) format() error {
	u.Login = strings.TrimSpace(u.Login)

	hashPass, err := security.Hash(u.Senha)
	if err != nil {
		return err
	}

	u.Senha = string(hashPass)

	return nil
}
