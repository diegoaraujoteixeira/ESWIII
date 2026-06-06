Feature: Carrinho

  Como cliente do e-commerce
  Quero consultar e atualizar meu carrinho
  Para organizar os produtos que desejo comprar

  Scenario: Carregar o último carrinho cadastrado
    Given existem carrinhos cadastrados
    When eu envio uma requisição GET de carrinho para "/carrinhos/ultimo"
    Then o status da resposta de carrinho deve ser 200
    And a resposta deve conter o último carrinho cadastrado

  Scenario: Salvar uma nova versão do carrinho
    When eu envio uma requisição POST de carrinho para "/carrinhos/ultimo"
    Then o status da resposta de carrinho deve ser 201
    And a resposta deve conter o carrinho salvo
