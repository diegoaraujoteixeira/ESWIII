import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import request from "supertest";

import app from "../../../src/app";
import {
  clearUsuarios,
  getUsuarios,
  resetUsuarios,
} from "../../../src/data/usuario.memory";
import { Usuario } from "../../../src/model/usuario";

let response: request.Response;

Given("existem usuários cadastrados", function () {
  resetUsuarios();
});

Given("não existem usuários cadastrados", function () {
  clearUsuarios();
});

When(
  "eu envio uma requisição GET de listagem de usuários para {string}",
  async function (endpoint: string) {
    response = await request(app).get(endpoint);
  },
);

Then(
  "o status da resposta da listagem de usuários deve ser {int}",
  function (statusCode: number) {
    expect(response.status).to.equal(statusCode);
  },
);

Then(
  "a resposta da listagem de usuários deve conter os usuários cadastrados",
  function () {
    expect(response.body).to.be.an("array");

    const usuariosRecebidos = response.body as Usuario[];

    for (const usuarioEsperado of getUsuarios()) {
      const usuarioRecebido = usuariosRecebidos.find(
        (usuario) => usuario.id === usuarioEsperado.id,
      );

      expect(usuarioRecebido).to.include(usuarioEsperado);
    }
  },
);

Then(
  "a resposta da listagem de usuários deve ser uma lista vazia",
  function () {
    expect(response.body).to.deep.equal([]);
  },
);