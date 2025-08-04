````markdown
# 📝 Formulário de Cadastro de Usuário

Projeto simples de um formulário de **cadastro de usuário** desenvolvido com **React + TypeScript** usando o bundler **Vite**.  
Inclui validação com **Yup** e máscara para telefone brasileiro usando **@react-input/mask**.

---

## 🚀 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)  
- npm (versão 8 ou superior)

---

## ⚙️ Instalação

1. **Clone o repositório**:

```bash
git clone <URL_DO_REPOSITORIO>
````

2. **Acesse o diretório do projeto**:

```bash
cd project-3
```

3. **Instale as dependências**:

```bash
npm install
```

4. **Inicie o servidor de desenvolvimento**:

```bash
npm run dev
```

5. **Abra o navegador e acesse**:

```
http://localhost:5173
```

---

## 🧪 Uso

### 🖋️ Preenchimento do Formulário:

* **Nome**: mínimo de 3 caracteres
* **E-mail**: deve ser válido (ex.: [usuario@exemplo.com](mailto:usuario@exemplo.com))
* **Telefone**: número brasileiro com 10 ou 11 dígitos (ex.: (41) 9521-3923 ou (41) 99521-3923)
* **Senha**: mínimo de 6 caracteres
* **Confirmar Senha**: deve ser igual à senha

✅ Ao clicar em **"Cadastrar"**, o formulário será validado.
Se tudo estiver certo, uma mensagem de sucesso será exibida.

⚠️ Erros de validação são exibidos abaixo de cada campo em **vermelho**.

---

## 📦 Dependências

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/)
* [Yup](https://github.com/jquense/yup): validação de campos
* [@react-input/mask](https://github.com/siunov/react-input-mask): máscara dinâmica para telefone


