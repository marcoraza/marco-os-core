# Cleanup estrutural do marco-os-core

- [x] Confirmar componentes legados e órfãos sem uso na árvore ativa
- [x] Remover duplicatas/legados de agentes e mission control
- [x] Reorganizar componentes ativos de agentes para `components/agents/`
- [x] Atualizar imports e referências de caminho impactadas
- [x] Validar com `npm run lint`, `npm run typecheck`, `npm test` e `npm run build`

## Review

- Componentes mortos removidos: `AddAgentModal`, `AgentCard`, `AgentsMissionControl`, `AgentsOverview`, `ChatPanel`, `MissionControl`, `useAgentChat`, `gatewayClient`.
- Componentes ativos consolidados em `components/agents/`: `AgentAddModal`, `AgentCommandCenter`, `AgentDetailView`.
- Referências de documentação e file lists atualizadas para os novos caminhos.
- Validação concluída com `npm run lint`, `npm run typecheck`, `npm test` e `npm run build`.
