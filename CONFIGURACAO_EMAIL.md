# 📧 Configuração do Sistema de Email + WhatsApp

## ✅ O que foi implementado:

### 🔄 **Fluxo Duplo de Contato:**

1. **Email automático** para advocaciabeloeolimpio@gmail.com
2. **Redirecionamento para WhatsApp** com dados preenchidos
3. **Fallback inteligente** - se email falhar, vai direto pro WhatsApp

## 🛠️ **Como Configurar o EmailJS (GRATUITO):**

### **Passo 1: Criar conta no EmailJS**

1. Acesse: https://emailjs.com/
2. Clique em "Sign Up" (gratuito até 200 emails/mês)
3. Faça login com sua conta

### **Passo 2: Configurar o serviço de email**

1. No painel, clique em "Email Services"
2. Clique "Add New Service"
3. Escolha "Gmail"
4. Conecte com advocaciabeloeolimpio@gmail.com
5. Anote o **Service ID** gerado

### **Passo 3: Criar template de email**

1. Clique em "Email Templates"
2. Clique "Create New Template"
3. Use este template:

```
Assunto: Novo contato do site - {{service}}

Olá!

Você recebeu um novo contato através do site:

Nome: {{from_name}}
Email: {{from_email}}
Telefone: {{phone}}
Área de Interesse: {{service}}

Mensagem:
{{message}}

---
Sistema automático Belo&Olímpio Advocacia
```

4. Anote o **Template ID** gerado

### **Passo 4: Atualizar o código**

No arquivo `script.js`, linha 1448, substitua:

- `YOUR_PUBLIC_KEY_HERE` pela sua Public Key
- `YOUR_SERVICE_ID` pelo Service ID do Gmail
- `YOUR_TEMPLATE_ID` pelo Template ID criado

### **Onde encontrar as chaves:**

- **Public Key**: Dashboard > Account > API Keys
- **Service ID**: Email Services > (seu serviço Gmail)
- **Template ID**: Email Templates > (seu template)

## 📱 **Configuração do WhatsApp:**

✅ **Já configurado!** Usa o número: (11) 96464-2712

## 🎯 **Como funciona para o cliente:**

1. **Preenche o formulário** no site
2. **Clica "Enviar"** → Mostra "Enviando..."
3. **Email é enviado** para advocaciabeloeolimpio@gmail.com
4. **Mensagem de sucesso** → "Redirecionando para WhatsApp..."
5. **WhatsApp abre** com mensagem formatada
6. **Cliente confirma** o envio no WhatsApp

## 💡 **Vantagens desta solução:**

✅ **Dupla garantia** - email + WhatsApp  
✅ **Não perde leads** - se email falhar, vai pro WhatsApp  
✅ **Gratuito** até 200 contatos/mês  
✅ **Profissional** - emails organizados  
✅ **Imediato** - WhatsApp em tempo real

## 🔧 **Teste a configuração:**

1. Preencha o formulário no site
2. Verifique se chegou email em advocaciabeloeolimpio@gmail.com
3. Confirme se WhatsApp abriu com dados corretos

**Se tiver dúvidas, posso ajudar com a configuração!** 😊
