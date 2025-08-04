import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { InputMask } from '@react-input/mask';
import * as Yup from "yup";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
}

interface Erros {
  [key: string]: string;
}

const schema = Yup.object().shape({
  nome: Yup.string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter ao menos 3 caracteres"),
  email: Yup.string()
    .required("E-mail é obrigatório")
    .email("E-mail inválido"),
  telefone: Yup.string()
    .required("Telefone é obrigatório")
    .test("len", "Telefone inválido", (val) => {
      if (!val) return false;
      const digits = val.replace(/\D/g, "");
      console.log("Telefone digits:", digits); // Para depuração
      return digits.length === 10 || digits.length === 11;
    }),
  senha: Yup.string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter ao menos 6 caracteres"),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref("senha"), undefined], "Senhas não conferem")
    .required("Confirme a senha"),
});

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });
  const [erros, setErros] = useState<Erros>({});
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Input value:", value); // Para depuração
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSucesso(false);
    try {
      await schema.validate(formData, { abortEarly: false });
      setErros({});
      setSucesso(true);
    } catch (validationErrors: any) {
      const errObj: Erros = {};
      validationErrors.inner.forEach((error: any) => {
        errObj[error.path] = error.message;
      });
      setErros(errObj);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 15 }}>
          <label>Nome</label>
          <input
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, fontSize: 16 }}
          />
          {erros.nome && <p style={{ color: "red" }}>{erros.nome}</p>}
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>E-mail</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, fontSize: 16 }}
          />
          {erros.email && <p style={{ color: "red" }}>{erros.email}</p>}
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Telefone</label>
          <InputMask
            mask="(__) ____-____"
            replacement={{ _: /\d/ }}
            modify={(input: { value: string }) => {
              const digits = (input.value || "").replace(/\D/g, "");
              return {
                mask: digits.length > 10 ? "(__) _____-_____" : "(__) ____-____",
              };
            }}
            name="telefone"
            value={formData.telefone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFormData((f) => ({ ...f, telefone: e.target.value }));
            }}
            type="tel"
            style={{ width: "100%", padding: 8, fontSize: 16 }}
          />
          {erros.telefone && <p style={{ color: "red" }}>{erros.telefone}</p>}
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Senha</label>
          <input
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, fontSize: 16 }}
          />
          {erros.senha && <p style={{ color: "red" }}>{erros.senha}</p>}
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Confirmar Senha</label>
          <input
            name="confirmarSenha"
            type="password"
            value={formData.confirmarSenha}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, fontSize: 16 }}
          />
          {erros.confirmarSenha && (
            <p style={{ color: "red" }}>{erros.confirmarSenha}</p>
          )}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: 18,
            border: "none",
            cursor: "pointer",
          }}
        >
          Cadastrar
        </button>
      </form>

      {sucesso && (
        <p
          style={{
            marginTop: 20,
            color: "green",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Usuário cadastrado com sucesso!
        </p>
      )}
    </div>
  );
};

export default App;