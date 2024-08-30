
Explicando todas as funcionalidades da API e como utilizá-la:

Leitura de Consumo de Água e Gás - API
Esta API foi desenvolvida para gerenciar a leitura individualizada de consumo de água e gás, utilizando IA para obter a medição através de fotos de medidores. A API integra-se com o Google Gemini para extrair o valor da leitura a partir de imagens enviadas.

Funcionalidades
1. Upload de Leitura (POST /upload)
Este endpoint é responsável por receber uma imagem de um medidor em formato Base64, verificar se já existe uma leitura para o mês e tipo especificados, consultar a API do Google Gemini para extrair o valor da leitura e armazenar essas informações no banco de dados.


2. Confirmação de Leitura (PATCH /confirm)
Este endpoint permite confirmar ou corrigir uma leitura existente. Ele verifica se o UUID da leitura existe, se a leitura já foi confirmada, e então atualiza o valor ou confirma a leitura.

3. Listagem de Leituras (GET /:customer_code/list)
Este endpoint lista todas as leituras realizadas por um cliente específico, com a opção de filtrar por tipo de leitura (WATER ou GAS).




Considerações Finais
Esta API foi construída para atender a um cenário específico de leitura e confirmação de valores de medidores de água e gás, utilizando tecnologia de reconhecimento de imagens. Sinta-se à vontade para contribuir, sugerir melhorias ou realizar ajustes conforme necessário.

