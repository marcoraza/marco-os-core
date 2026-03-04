import type { FieldDef } from '../components/ui/FormModal';

export interface FormConfig {
  title: string;
  fields: FieldDef[];
  notionCommand: string;
}

// ─── Finanças ─────────────────────────────────────────────────────────────────

export const financeConfig: FormConfig = {
  title: 'Nova Transação',
  notionCommand: 'financas',
  fields: [
    {
      name: 'name',
      label: 'Descrição',
      type: 'text',
      required: true,
      placeholder: 'Ex: Aluguel março',
    },
    {
      name: 'valor',
      label: 'Valor (R$)',
      type: 'number',
      required: true,
      placeholder: '0.00',
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
        { value: 'Entrada', label: 'Entrada' },
        { value: 'Saida', label: 'Saída' },
      ],
    },
    {
      name: 'categoria',
      label: 'Categoria',
      type: 'select',
      options: [
        { value: 'Moradia', label: 'Moradia' },
        { value: 'Alimentação', label: 'Alimentação' },
        { value: 'Transporte', label: 'Transporte' },
        { value: 'Saúde', label: 'Saúde' },
        { value: 'Educação', label: 'Educação' },
        { value: 'Lazer', label: 'Lazer' },
        { value: 'Serviços', label: 'Serviços' },
        { value: 'Receita Projeto', label: 'Receita Projeto' },
        { value: 'Outros', label: 'Outros' },
      ],
    },
    {
      name: 'data',
      label: 'Data',
      type: 'date',
    },
    {
      name: 'recorrente',
      label: 'Recorrente',
      type: 'toggle',
      defaultValue: false,
    },
  ],
};

// ─── Saúde ────────────────────────────────────────────────────────────────────

export const healthConfig: FormConfig = {
  title: 'Nova Atividade',
  notionCommand: 'saude',
  fields: [
    {
      name: 'name',
      label: 'Atividade',
      type: 'text',
      required: true,
      placeholder: 'Ex: Treino funcional',
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
        { value: 'Treino', label: 'Treino' },
        { value: 'Peso', label: 'Peso' },
        { value: 'Habito', label: 'Hábito' },
        { value: 'Sono', label: 'Sono' },
        { value: 'Humor', label: 'Humor' },
      ],
    },
    {
      name: 'valor',
      label: 'Valor (kg, hrs, etc)',
      type: 'number',
      placeholder: '0',
    },
    {
      name: 'duracao',
      label: 'Duração (min)',
      type: 'number',
      placeholder: '0',
    },
    {
      name: 'data',
      label: 'Data',
      type: 'date',
    },
    {
      name: 'notas',
      label: 'Notas',
      type: 'textarea',
      placeholder: 'Observações...',
    },
  ],
};

// ─── Reuniões ─────────────────────────────────────────────────────────────────

export const reunioesConfig: FormConfig = {
  title: 'Nova Reunião',
  notionCommand: 'meeting',
  fields: [
    {
      name: 'name',
      label: 'Título',
      type: 'text',
      required: true,
      placeholder: 'Ex: Alinhamento de projeto',
    },
    {
      name: 'date',
      label: 'Data e Hora',
      type: 'date',
      required: true,
    },
    {
      name: 'participants',
      label: 'Participantes',
      type: 'text',
      placeholder: 'Nomes separados por vírgula',
    },
    {
      name: 'objective',
      label: 'Pauta / Objetivo',
      type: 'textarea',
      placeholder: 'Descreva a pauta da reunião...',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Agendada', label: 'Agendada' },
        { value: 'Confirmada', label: 'Confirmada' },
      ],
    },
  ],
};

// ─── Projetos ─────────────────────────────────────────────────────────────────

export const projetosConfig: FormConfig = {
  title: 'Novo Projeto',
  notionCommand: 'project',
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
      placeholder: 'Nome do projeto',
    },
    {
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
      placeholder: 'Descreva o projeto...',
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      options: [
        { value: 'Receita', label: 'Receita' },
        { value: 'Infra', label: 'Infra' },
        { value: 'Conteúdo', label: 'Conteúdo' },
        { value: 'Pessoal', label: 'Pessoal' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Ativo', label: 'Ativo' },
        { value: 'Planejamento', label: 'Planejamento' },
        { value: 'Pausado', label: 'Pausado' },
      ],
    },
  ],
};

// ─── Network (Contato) ────────────────────────────────────────────────────────

export const networkConfig: FormConfig = {
  title: 'Novo Contato',
  notionCommand: 'person',
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
      placeholder: 'Nome completo',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'email@exemplo.com',
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      options: [
        { value: 'Contato', label: 'Contato' },
        { value: 'Lead', label: 'Lead' },
        { value: 'Parceiro', label: 'Parceiro' },
        { value: 'Mentor', label: 'Mentor' },
      ],
    },
    {
      name: 'projeto',
      label: 'Projeto Relacionado',
      type: 'text',
      placeholder: 'Nome do projeto',
    },
    {
      name: 'notas',
      label: 'Notas',
      type: 'textarea',
      placeholder: 'Informações sobre o contato...',
    },
  ],
};

// ─── Brain Dump ───────────────────────────────────────────────────────────────

export const braindumpConfig: FormConfig = {
  title: 'Novo Brain Dump',
  notionCommand: 'braindump',
  fields: [
    {
      name: 'name',
      label: 'Título',
      type: 'text',
      required: true,
      placeholder: 'Título da ideia ou nota',
    },
    {
      name: 'content',
      label: 'Conteúdo',
      type: 'textarea',
      placeholder: 'Escreva seus pensamentos...',
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      options: [
        { value: 'Ideia', label: 'Ideia' },
        { value: 'Reflexão', label: 'Reflexão' },
        { value: 'Tarefa', label: 'Tarefa' },
        { value: 'Referência', label: 'Referência' },
      ],
    },
  ],
};

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skillsConfig: FormConfig = {
  title: 'Nova Skill',
  notionCommand: 'skill',
  fields: [
    {
      name: 'name',
      label: 'Skill',
      type: 'text',
      required: true,
      placeholder: 'Ex: TypeScript, Design de UX',
    },
    {
      name: 'categoria',
      label: 'Categoria',
      type: 'select',
      options: [
        { value: 'Desenvolvimento', label: 'Desenvolvimento' },
        { value: 'Design', label: 'Design' },
        { value: 'Negócios', label: 'Negócios' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'IA', label: 'IA' },
        { value: 'Soft Skill', label: 'Soft Skill' },
        { value: 'Outros', label: 'Outros' },
      ],
    },
    {
      name: 'nivel',
      label: 'Nível',
      type: 'select',
      options: [
        { value: 'Iniciante', label: 'Iniciante' },
        { value: 'Intermediário', label: 'Intermediário' },
        { value: 'Avançado', label: 'Avançado' },
        { value: 'Expert', label: 'Expert' },
      ],
    },
    {
      name: 'progresso',
      label: 'Progresso (%)',
      type: 'number',
      placeholder: '0-100',
    },
    {
      name: 'notas',
      label: 'Notas',
      type: 'textarea',
      placeholder: 'Recursos, cursos, observações...',
    },
  ],
};
