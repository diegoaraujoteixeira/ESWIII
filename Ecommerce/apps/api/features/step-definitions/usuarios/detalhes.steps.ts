import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import request from "supertest";

import app from "../../../src/app";
import {
  getUsuarioById,
  setUsuarios,
  usuariosCadastrados,
} from "../../../src/data/usuario.memory";

let response: request.Response;

Given("existe um usuário cadastrado com id {int}", function (id: number) {
  const usuario = usuariosCadastrados.find(
    (usuarioCadastrado) => usuarioCadastrado.id === id,
  );

  if (!usuario) {
    throw new Error(`Usuário de teste com id ${id} não foi definido`);
  }

  setUsuarios([usuario]);
});

Given("não existe usuário cadastrado com id {int}", function (id: number) {
  setUsuarios(usuariosCadastrados.filter((usuario) => usuario.id !== id));
});

When(
  "eu envio uma requisição GET de detalhe de usuário para {string}",
  async function (endpoint: string) {
    response = await request(app).get(endpoint);
  },
);

Then(
  "o status da resposta de detalhe de usuário deve ser {int}",
  function (statusCode: number) {
    expect(response.status).to.equal(statusCode);
  },
);

Then(
  "a resposta de detalhe de usuário deve conter os dados do usuário {int}",
  function (id: number) {
    const usuarioEsperado = getUsuarioById(id);

    if (!usuarioEsperado) {
      throw new Error(
        `Usuário esperado com id ${id} não foi definido no Given`,
      );
    }

    expect(response.body).to.include(usuarioEsperado);
  },
);

Then("a resposta deve informar que o usuário não foi encontrado", function () {
  expect(response.body).to.deep.equal({
    message: "Usuário não encontrado",
  });
});
