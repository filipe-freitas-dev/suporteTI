package models

import "time"

type Chamado struct {
	ID         uint64      `json:"id,omitempty"`
	Nome       string      `json:"nome,omitempty"`
	Descricao  string      `json:"descricao,omitempty"`
	Prioridade string      `json:"prioridade,omitempty"`
	Resolvido  bool        `json:"resolvido,omitempty"`
	Resolucao  interface{} `json:"resolucao,omitempty"`
	CreatedAt  time.Time   `json:"created_at,omitempty"`
}
