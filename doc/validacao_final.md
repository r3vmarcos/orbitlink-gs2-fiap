# Validação final — OrbitLink v1

## 01 - Ambiente do assistente

- Node.js: v22.16.0
- npm: 10.9.2
- Sistema de validação: ambiente Linux do assistente
- Ambiente local esperado do usuário: Windows 11 Pro

## 02 - Checklist executado

- [x] `package.json` revisado
- [x] `package-lock.json` revisado
- [x] `package-lock.json` sanitizado para usar `https://registry.npmjs.org/`
- [x] `npm ci --ignore-scripts --registry=https://registry.npmjs.org` executado
- [x] `npm run build` executado com sucesso
- [x] `npm run dev` executado com sucesso
- [x] Teste HTTP local executado em `http://localhost:5191`
- [x] ZIP preparado sem `node_modules`
- [x] ZIP preparado sem `dist`

## 03 - APIs NASA

O código possui integração com:

- NASA EONET
- NASA EPIC
- NASA Image and Video Library

As chamadas externas foram implementadas com fallback para dados simulados. No ambiente do assistente, o teste direto via `curl` para domínios NASA não pôde ser concluído por bloqueio de resolução DNS do sandbox. O app continua funcional sem API externa e, em ambiente com internet normal, o botão `Sincronizar APIs` executa as chamadas configuradas.

## 04 - Comandos validados

```bash
npm ci --ignore-scripts --registry=https://registry.npmjs.org
npm run build
npm run dev
curl -I http://localhost:5191
```

## 05 - Observação para Windows

O projeto foi validado no ambiente do assistente. Em Windows 11 Pro, diferenças locais de Node/npm, firewall, antivírus ou cache do npm ainda podem causar comportamentos diferentes. O `package-lock.json` foi entregue sanitizado para evitar registry interno/privado.
