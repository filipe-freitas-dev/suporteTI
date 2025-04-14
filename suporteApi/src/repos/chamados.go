package repos

import (
	"database/sql"
	"suporteApi/src/models"
)

type chamados struct {
	db *sql.DB
}

func NewRepoChamados(db *sql.DB) *chamados {
	return &chamados{db}
}

func (c *chamados) Criar(chamado models.Chamado) (uint64, error) {
	statement, err := c.db.Prepare(`
	INSERT INTO suportedb.chamados(nome, descricao, prioridade) VALUES (?, ?, ?)
	`)
	if err != nil {
		return 0, err
	}
	defer statement.Close()

	result, err := statement.Exec(
		chamado.Nome,
		chamado.Descricao,
		chamado.Prioridade,
	)
	if err != nil {
		return 0, err
	}
	chamadoID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return uint64(chamadoID), nil
}

func (c *chamados) FindByResolvido(resolvido string) ([]models.Chamado, error) {
	rows, err := c.db.Query("SELECT id, nome, descricao, prioridade, resolvido, created_at FROM chamados WHERE resolvido = ?", resolvido)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var chamados []models.Chamado

	for rows.Next() {
		var chamado models.Chamado

		if err = rows.Scan(
			&chamado.ID,
			&chamado.Nome,
			&chamado.Descricao,
			&chamado.Prioridade,
			&chamado.Resolvido,
			&chamado.CreatedAt,
		); err != nil {
			return nil, err
		}

		chamados = append(chamados, chamado)
	}

	return chamados, nil
}
func (c *chamados) FindAll() ([]models.Chamado, error) {
	rows, err := c.db.Query("SELECT id, nome, descricao, prioridade, resolvido, created_at FROM chamados")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var chamados []models.Chamado

	for rows.Next() {
		var chamado models.Chamado

		if err = rows.Scan(
			&chamado.ID,
			&chamado.Nome,
			&chamado.Descricao,
			&chamado.Prioridade,
			&chamado.Resolvido,
			&chamado.CreatedAt,
		); err != nil {
			return nil, err
		}

		chamados = append(chamados, chamado)
	}

	return chamados, nil
}

func (c *chamados) FindById(chamadoID uint64) (models.Chamado, error) {
	rows, err := c.db.Query("SELECT id, nome, descricao, prioridade, resolvido, resolucao, created_at FROM chamados WHERE id = ?", chamadoID)
	if err != nil {
		return models.Chamado{}, err
	}

	var chamado models.Chamado

	if rows.Next() {
		if err = rows.Scan(
			&chamado.ID,
			&chamado.Nome,
			&chamado.Descricao,
			&chamado.Prioridade,
			&chamado.Resolvido,
			&chamado.Resolucao,
			&chamado.CreatedAt,
		); err != nil {
			return models.Chamado{}, err
		}
	}

	return chamado, nil
}

func (c *chamados) Resolver(chamadoID uint64, resolucao interface{}) error {
	statement, err := c.db.Prepare(`
	UPDATE chamados SET resolvido = ?, resolucao = ? WHERE id = ?
	`)
	if err != nil {
		return err
	}

	defer statement.Close()

	if _, err = statement.Exec(
		1,
		resolucao,
		chamadoID,
	); err != nil {
		return err
	}

	return nil
}
