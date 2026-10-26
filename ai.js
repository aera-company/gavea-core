// Live requests are separate from the scripted architectural presentation.
export function initLiveAI({onOpen,onClose}) {
 const $=s=>document.querySelector(s), dialog=$('#ai-dialog');
 let status={configured:false,connected:false}, busy=false, history=[];
 function notice(text,error=false){$('#ai-notice').textContent=text;$('#ai-notice').classList.toggle('is-error',error);}
 function sync(){
  $('#ai-status').textContent=status.connected?'Conexão verificada':status.configured?'Conexão a verificar':'Aguardando conexão';
  $('#ai-status').dataset.connected=String(status.connected);
  $('#ai-model').textContent=status.model||'Claude';
  $('#ai-setup').hidden=status.connected;
  $('#ai-key').required=!status.configured;
  $('#ai-key').placeholder=status.configured?'Chave já configurada no servidor':'Cole sua chave de API';
  $('#ai-connect').textContent=status.configured?'Testar conexão':'Conectar e testar';
  $('#ai-disconnect').hidden=!status.configured;
  $('#ai-send').disabled=busy||!status.connected;
  $('#ai-prompt').disabled=busy||!status.connected;
  $('#ai-context').disabled=busy;
  for(const id of ['ai-connect','ai-key','ai-disconnect','ai-clear','ai-copy'])$('#'+id).disabled=busy;
  $('#ai-copy').disabled=busy||!history.some(m=>m.role==='assistant');
  $('#ai-send').textContent=busy?'Aguardando resposta…':'Enviar pedido ↗';
  $('#ai-conversation').setAttribute('aria-busy',String(busy));
  dialog.dataset.busy=String(busy);
 }
 async function api(path,body){
  let response;try{response=await fetch('/api/'+path,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json','X-Gavea-Client':'1'}:undefined,body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(70000)});}catch(error){throw new Error(error.name==='TimeoutError'?'A espera terminou. Confira a conexão antes de reenviar.':'O serviço local de IA não respondeu. Confira se INICIAR_GAVEA.command está em execução.');}
  let result;try{result=await response.json();}catch{throw new Error('O serviço de IA não está disponível. Reinicie a demo com INICIAR_GAVEA.command.');}
  if(!response.ok){const error=new Error(result.error||'O pedido não foi concluído.');error.code=result.code;throw error;}
  return result;
 }
 async function checkStatus(){try{status=await api('status');sync();}catch(error){status.connected=false;sync();notice(error.message,true);}}
 function append(role,text){const article=document.createElement('article'),label=document.createElement('span'),body=document.createElement('p');article.className='ai-message '+role;label.textContent=role==='user'?'SEU PEDIDO':'RESPOSTA · IA';body.textContent=text;article.append(label,body);$('#ai-messages').append(article);$('#ai-empty').hidden=true;article.scrollIntoView({block:'nearest'});}
 function open(){if(dialog.open)return;onOpen();dialog.showModal();checkStatus();}
 $('#open-ai').onclick=open;
 $('#ai-close').onclick=()=>dialog.close();
 dialog.addEventListener('close',()=>{$('#ai-key').value='';onClose();});
 $('#ai-setup').onsubmit=async event=>{
  event.preventDefault();if(busy)return;busy=true;sync();notice('Testando a conexão com o Claude…');
  const key=$('#ai-key').value.trim();$('#ai-key').value='';
  try{status=await api('connect',{key});notice('Conexão verificada. Faça seu primeiro pedido.');}
  catch(error){notice(error.message,true);}
  finally{busy=false;sync();if(status.connected&&dialog.open)$('#ai-prompt').focus();}
 };
 $('#ai-form').onsubmit=async event=>{
  event.preventDefault();if(busy||!status.connected)return;
  const prompt=$('#ai-prompt').value.trim();if(!prompt)return;
  busy=true;sync();notice('A IA está preparando a resposta. Você pode fechar o painel e voltar depois.');
  // Retain only complete pairs; retries append the current question once.
  const messages=[...history.slice(-10),{role:'user',content:prompt}];
  try{
   const result=await api('chat',{messages,context:$('#ai-context').value.trim()});
   history=[...messages,{role:'assistant',content:result.text}];
   append('user',prompt);append('assistant',result.text);$('#ai-prompt').value='';
   status.connected=true;notice(result.refused?'O Claude respondeu com uma recusa. Reformule o pedido.':'Resposta recebida. Você pode pedir um ajuste ou copiar a entrega.');
  }catch(error){if(['auth_failed','not_configured'].includes(error.code))status.connected=false;notice(error.name==='TimeoutError'?'A espera terminou. Confira a conexão antes de reenviar.':error.message,true);}
  finally{busy=false;sync();if(dialog.open&&status.connected)$('#ai-prompt').focus();}
 };
 $('#ai-disconnect').onclick=async()=>{if(busy)return;busy=true;sync();try{status=await api('disconnect',{});notice('Chave removida da memória do servidor.');}catch(error){notice(error.message,true);}finally{busy=false;sync();}};
 $('#ai-clear').onclick=()=>{if(busy)return;history=[];$('#ai-messages').replaceChildren();$('#ai-empty').hidden=false;$('#ai-prompt').value='';$('#ai-context').value='';notice('Nova conversa. O contexto anterior foi limpo.');sync();};
 $('#ai-copy').onclick=async()=>{const last=history.filter(m=>m.role==='assistant').at(-1);if(!last)return;try{await navigator.clipboard.writeText(last.content);notice('Última resposta copiada.');}catch{notice('Não foi possível copiar automaticamente. Selecione o texto da resposta.',true);}};
 $('#ai-example').onclick=()=>{$('#ai-prompt').value='Quero preparar uma apresentação comercial do MERUS. Quais informações você precisa para criar uma abordagem e um roteiro de vídeo de 30 segundos?';if(status.connected)$('#ai-prompt').focus();};
 sync();
 return {isOpen:()=>dialog.open};
}
