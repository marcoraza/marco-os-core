# Mission Control V2 — Inventario Completo de Features

> Referencia para portar 100% do V2 para o Marco OS V3 com design system proprio.
> Gerado em 2026-03-27. Fonte: apps/marco-os-v2/vendor/mission-control/

## Paineis (35 panels em src/components/panels/)

| Painel | Arquivo | Funcao |
|--------|---------|--------|
| Activity Feed | activity-feed-panel.tsx | Feed de atividades em tempo real |
| Agent Comms | agent-comms-panel.tsx | Comunicacao entre agentes |
| Agent Cost | agent-cost-panel.tsx | Custo por agente com graficos |
| Agent Detail Tabs | agent-detail-tabs.tsx | Tabs de detalhe do agente |
| Agent History | agent-history-panel.tsx | Historico de acoes do agente |
| Agent Squad | agent-squad-panel.tsx | Gestao de squads de agentes |
| Agent Squad Phase 3 | agent-squad-panel-phase3.tsx | Squad management avancado |
| Alert Rules | alert-rules-panel.tsx | Regras de alerta configuráveis |
| Audit Trail | audit-trail-panel.tsx | Log de auditoria completo |
| Channels | channels-panel.tsx | Canais de comunicacao |
| Chat Page | chat-page-panel.tsx | Pagina de chat completa |
| Cost Tracker | cost-tracker-panel.tsx | Rastreamento de custos |
| Cron Management | cron-management-panel.tsx | Gestao de cron jobs |
| Debug | debug-panel.tsx | Painel de debug do sistema |
| Documents | documents-panel.tsx | Gestao de documentos |
| Exec Approval | exec-approval-panel.tsx | Aprovacao de execucoes |
| Gateway Config | gateway-config-panel.tsx | Configuracao do gateway |
| GitHub Sync | github-sync-panel.tsx | Sincronizacao com GitHub |
| Integrations | integrations-panel.tsx | Integracoes externas |
| Local Agents Doc | local-agents-doc-panel.tsx | Documentacao de agentes locais |
| Log Viewer | log-viewer-panel.tsx | Visualizador de logs |
| Memory Browser | memory-browser-panel.tsx | Navegador de memoria do agente |
| Memory Graph | memory-graph.tsx | Grafo visual de memoria |
| Multi Gateway | multi-gateway-panel.tsx | Multiplos gateways |
| Nodes | nodes-panel.tsx | Gestao de nodes |
| Notifications | notifications-panel.tsx | Central de notificacoes |
| Office | office-panel.tsx | Painel de escritorio/workspace |
| Orchestration Bar | orchestration-bar.tsx | Barra de orquestracao |
| Pipeline Tab | pipeline-tab.tsx | Pipeline de execucao |
| Security Audit | security-audit-panel.tsx | Auditoria de seguranca |
| Session Details | session-details-panel.tsx | Detalhes da sessao |
| Settings | settings-panel.tsx | Configuracoes do sistema |
| Skills | skills-panel.tsx | Gestao de skills |
| Standup | standup-panel.tsx | Relatorio standup |
| Super Admin | super-admin-panel.tsx | Painel de super admin |
| System Monitor | system-monitor-panel.tsx | Monitor do sistema |
| Task Board | task-board-panel.tsx | Kanban de tasks |
| Token Dashboard | token-dashboard-panel.tsx | Dashboard de tokens/custo |
| User Management | user-management-panel.tsx | Gestao de usuarios |
| Webhook | webhook-panel.tsx | Gestao de webhooks |

## Dashboard Widgets (11 widgets em src/components/dashboard/widgets/)

| Widget | Arquivo | Funcao |
|--------|---------|--------|
| Event Stream | event-stream-widget.tsx | Stream de eventos em tempo real |
| Gateway Health | gateway-health-widget.tsx | Saude do gateway |
| GitHub Signal | github-signal-widget.tsx | Sinais do GitHub (commits, PRs) |
| Maintenance | maintenance-widget.tsx | Status de manutencao |
| Metric Cards | metric-cards-widget.tsx | Cards de metricas |
| Onboarding Checklist | onboarding-checklist-widget.tsx | Checklist de onboarding |
| Quick Actions | quick-actions-widget.tsx | Acoes rapidas |
| Runtime Health | runtime-health-widget.tsx | Saude do runtime |
| Security Audit | security-audit-widget.tsx | Auditoria de seguranca |
| Session Workbench | session-workbench-widget.tsx | Workbench de sessoes |
| Task Flow | task-flow-widget.tsx | Fluxo de tasks |

## Dashboard Core (6 componentes em src/components/dashboard/)

| Componente | Arquivo | Funcao |
|------------|---------|--------|
| Dashboard | dashboard.tsx | Dashboard principal |
| Agent Network | agent-network.tsx | Rede visual de agentes |
| Empty State Launchpad | empty-state-launchpad.tsx | Estado vazio com setup |
| Sessions List | sessions-list.tsx | Lista de sessoes |
| Sidebar | sidebar.tsx | Sidebar do dashboard |
| Stats Grid | stats-grid.tsx | Grid de estatisticas |
| Widget Grid | widget-grid.tsx | Grid de widgets |
| Widget Primitives | widget-primitives.tsx | Primitivos de widget |

## Chat (8 componentes em src/components/chat/)

| Componente | Arquivo | Funcao |
|------------|---------|--------|
| Chat Input | chat-input.tsx | Input de chat |
| Chat Panel | chat-panel.tsx | Painel de chat |
| Chat Workspace | chat-workspace.tsx | Workspace de chat |
| Conversation List | conversation-list.tsx | Lista de conversas |
| Message Bubble | message-bubble.tsx | Bolha de mensagem |
| Message List | message-list.tsx | Lista de mensagens |
| Session Kind Brand | session-kind-brand.tsx | Branding por tipo de sessao |
| Session Message | session-message.tsx | Mensagem de sessao |

## Layout (8 componentes em src/components/layout/)

| Componente | Arquivo | Funcao |
|------------|---------|--------|
| Header Bar | header-bar.tsx | Barra de header |
| Live Feed | live-feed.tsx | Feed ao vivo |
| Local Mode Banner | local-mode-banner.tsx | Banner modo local |
| Nav Rail | nav-rail.tsx | Navegacao lateral |
| OpenClaw Doctor Banner | openclaw-doctor-banner.tsx | Banner diagnostico |
| OpenClaw Update Banner | openclaw-update-banner.tsx | Banner de atualizacao |
| Promo Banner | promo-banner.tsx | Banner promocional |
| Update Banner | update-banner.tsx | Banner de update |

## Modals (2 componentes em src/components/modals/)

| Componente | Arquivo | Funcao |
|------------|---------|--------|
| Exec Approval Overlay | exec-approval-overlay.tsx | Overlay de aprovacao |
| Project Manager Modal | project-manager-modal.tsx | Modal de gestao de projetos |

## Onboarding (3 componentes em src/components/onboarding/)

| Componente | Arquivo | Funcao |
|------------|---------|--------|
| Onboarding Wizard | onboarding-wizard.tsx | Wizard de onboarding |
| Security Scan Card | security-scan-card.tsx | Card de scan de seguranca |
| Step Agent Runtimes | step-agent-runtimes.tsx | Step de configuracao de runtimes |

## UI Primitives (9 componentes em src/components/ui/)

| Componente | Arquivo | Funcao |
|------------|---------|--------|
| Agent Avatar | agent-avatar.tsx | Avatar do agente |
| Agent Core Node | agent-core-node.tsx | Node visual do agente |
| Button | button.tsx | Botao base |
| Digital Clock | digital-clock.tsx | Relogio digital |
| Language Switcher | language-switcher.tsx | Seletor de idioma |
| Loader | loader.tsx | Loading indicator |
| Marco Backend Notice | marco-backend-notice.tsx | Aviso de backend Marco |
| Online Status | online-status.tsx | Indicador online |
| Theme Background | theme-background.tsx | Background tematico |
| Theme Selector | theme-selector.tsx | Seletor de tema |

## Settings (1 componente em src/components/settings/)

| Componente | Arquivo | Funcao |
|------------|---------|--------|
| Agent Runtimes Section | agent-runtimes-section.tsx | Configuracao de runtimes |

## HUD (1 componente em src/components/hud/)

| Componente | Arquivo | Funcao |
|------------|---------|--------|
| Connection Status | connection-status.tsx | Status de conexao |

## API Routes (12 familias, ~176 endpoints)

| Familia | Endpoints | Funcoes |
|---------|-----------|---------|
| agents | CRUD | Registrar, listar, atualizar, remover agentes |
| tasks | CRUD + outcomes | Criar, atribuir, mover, concluir, comentar, tempo |
| sessions | lifecycle | Criar, listar, detalhes, encerrar sessoes |
| auth | login/register/logout | Autenticacao e perfil |
| memory | search + index | Busca FTS5, rebuild index, browse |
| workflows | templates | Gestao de templates de workflow |
| scheduler | status + trigger | Status de jobs, trigger manual |
| cron | OpenClaw sync | Sincronizacao com OpenClaw crons |
| skills | registry + cache | Registro, cache, seguranca de skills |
| settings | config + audit | Configuracoes, defaults, auditoria |
| gateway-config | hash + RPC | Configuracao do gateway com concorrencia |
| chat | conversations | Conversas, mensagens, canais |

## Paginas

| Rota | Funcao |
|------|--------|
| / (catch-all [[...panel]]) | SPA com roteamento por panel ID |
| /login | Tela de login |
| /setup | Wizard de setup inicial |
| /docs | Documentacao da API (OpenAPI) |

## Total: 86 componentes + 176 API endpoints

---

## Checklist de Portagem para V3

### Paineis (prioridade alta)
- [ ] Activity Feed
- [ ] Agent Comms (inter-agent chat)
- [ ] Agent Cost (graficos de custo)
- [ ] Agent Detail Tabs (tabs completas)
- [ ] Agent History
- [ ] Agent Squad
- [ ] Alert Rules
- [ ] Audit Trail
- [ ] Channels
- [ ] Chat Page
- [ ] Cost Tracker
- [ ] Cron Management
- [ ] Debug
- [ ] Documents
- [ ] Exec Approval
- [ ] Gateway Config
- [ ] GitHub Sync
- [ ] Integrations
- [ ] Local Agents Doc
- [ ] Log Viewer
- [ ] Memory Browser
- [ ] Memory Graph
- [ ] Multi Gateway
- [ ] Nodes
- [ ] Notifications
- [ ] Office
- [ ] Orchestration Bar
- [ ] Pipeline Tab
- [ ] Security Audit
- [ ] Session Details
- [ ] Settings
- [ ] Skills
- [ ] Standup
- [ ] Super Admin
- [ ] System Monitor
- [ ] Task Board
- [ ] Token Dashboard
- [ ] User Management
- [ ] Webhook

### Dashboard Widgets
- [ ] Event Stream
- [ ] Gateway Health
- [ ] GitHub Signal
- [ ] Maintenance
- [ ] Metric Cards
- [ ] Onboarding Checklist
- [ ] Quick Actions
- [ ] Runtime Health
- [ ] Security Audit
- [ ] Session Workbench
- [ ] Task Flow

### Chat System
- [ ] Chat Input
- [ ] Chat Panel
- [ ] Chat Workspace
- [ ] Conversation List
- [ ] Message Bubble
- [ ] Message List

### API Integration
- [ ] mcApi.ts rewrite (12 familias)
- [ ] Type alignment com response shapes reais
- [ ] Auth flow
- [ ] Polling/WebSocket strategy
