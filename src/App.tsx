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
<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
            {erros.nome && <p className="text-error text-sm mt-1">{erros.nome}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
            {erros.email && <p className="text-error text-sm mt-1">{erros.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
            {erros.telefone && <p className="text-error text-sm mt-1">{erros.telefone}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
            {erros.senha && <p className="text-error text-sm mt-1">{erros.senha}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
            <input
              name="confirmarSenha"
              type="password"
              value={formData.confirmarSenha}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
            {erros.confirmarSenha && <p className="text-error text-sm mt-1">{erros.confirmarSenha}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md bg-blue-800 hover:bg-blue-900 transition font-medium"
          >
            Cadastrar
          </button>
        </form>

        {sucesso && (
          <p className="mt-4 text-success font-semibold text-center">
            Usuário cadastrado com sucesso!
          </p>
        )}
      </div>
    </div>
  );
};

export default App;