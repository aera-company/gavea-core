// This panel follows server events; no timers invent progress or conversations.
import roles from './workflow-roles.json' with {type:'json'};

// Keep an already authenticated V0.1.3 server usable without discarding its in-memory key.
export async function compatibleWorkflow(messages,context,call,onEvent){
 const text=messages.at(-1).content.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const technical=['automacao','integracao','software','sistema','codigo','aplicativo'].some(term=>text.includes(term))||/\bapi\b/.test(text);
 const commercial=['prospect','leads','qualificacao','funil','crm','vendas'].some(term=>text.includes(term));
 const names=technical?['LEO','NINA','ARI']:commercial?['NINA','NOA','ARI']:['MAYA','NOA','ARI'];
 const plan=names.map(name=>({name,...roles[name]}));
 onEvent({type:'accepted',plan,text:'Pedido recebido.'});
 const handoffs=[];let result;
 for(const [index,role] of plan.entries()){
  const partner=plan[index+1]||plan[index-1];
  onEvent({type:'stage',index,agent:role.name,zone:role.zone,label:role.label,partner:partner.name,partnerZone:partner.zone});
  // The prior request stays intact. The new user turn explicitly asks for this role.
  const current=[...messages.slice(-9),{role:'assistant',content:handoffs.length?handoffs.join('\n\n').slice(-15000):'Pedido registrado para elaboração.'},{role:'user',content:`Nesta etapa, trabalhe no papel ${role.name}. ${role.task} O pedido original está na conversa acima.`}];
  result=await call({messages:current,context});
  if(result.refused){const error=new Error('O Claude recusou este pedido. Reformule a solicitação.');error.code='refusal';throw error;}
  handoffs.push(`${role.name}:\n${result.text}`);
  onEvent({type:'handoff',index,agent:role.name,to:plan[index+1]?.name||'VOCÊ',text:result.text});
 }
 onEvent({type:'result',...result});return result;
}

export async function readWorkflow(response,onEvent){
 const reader=response.body.getReader(),decoder=new TextDecoder();let buffer='',result=null,size=0;
 function consume(line){if(!line.trim())return;const event=JSON.parse(line);if(event.type==='error'){const error=new Error(event.error);error.code=event.code;throw error;}onEvent(event);if(event.type==='result')result=event;}
 try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>1000000)throw new Error('A operação retornou mais conteúdo que o esperado.');buffer+=decoder.decode(value,{stream:true});let index;while((index=buffer.indexOf('\n'))>=0){const line=buffer.slice(0,index);buffer=buffer.slice(index+1);consume(line);}}buffer+=decoder.decode();if(buffer.trim())consume(buffer);if(!result)throw new Error('A conexão foi interrompida antes da entrega. Confira a conexão e tente novamente.');return result;}
 finally{await reader.cancel().catch(()=>{});reader.releaseLock();}
}

export function initWorkflowPanel({onStage,onOpen}){
 const $=s=>document.querySelector(s),panel=$('#work-panel');let activeIndex=-1,plan=[];
 function state(value,title,text){panel.dataset.state=value;$('#work-title').textContent=title;$('#work-summary').textContent=text;}
 function reset(){panel.hidden=true;document.body.classList.remove('live-operation');$('#work-log').replaceChildren();$('#work-stages').replaceChildren();onStage(null);}
 $('#work-open').onclick=onOpen;
 $('#work-toggle').onclick=()=>{const collapsed=panel.classList.toggle('is-collapsed');$('#work-toggle').setAttribute('aria-expanded',String(!collapsed));$('#work-toggle').textContent=collapsed?'Expandir':'Recolher';};
 $('#work-dismiss').onclick=()=>{if(panel.dataset.state!=='running')reset();};
 return {
  start(){activeIndex=-1;plan=[];const compact=innerWidth<=900;panel.hidden=false;panel.classList.toggle('is-collapsed',compact);$('#work-toggle').setAttribute('aria-expanded',String(!compact));$('#work-toggle').textContent=compact?'Expandir':'Recolher';$('#work-open').textContent='Abrir conversa ↗';$('#work-log').replaceChildren();$('#work-stages').replaceChildren();$('#work-dismiss').hidden=true;document.body.classList.add('live-operation');state('running','Enviando seu pedido.','Aguardando o serviço de IA.');},
  event(event){
   if(event.type==='accepted'){
    plan=event.plan;$('#work-stages').replaceChildren(...plan.map(role=>{const li=document.createElement('li');li.dataset.state='waiting';li.textContent=role.name;return li;}));
    state('running','Pedido recebido.','Três etapas de trabalho com Claude.');
   }
   if(event.type==='stage'){
    activeIndex=event.index;[...$('#work-stages').children].forEach((li,i)=>li.dataset.state=i<activeIndex?'done':i===activeIndex?'running':'waiting');
    state('running',`${event.agent} · ${event.label}`,`Etapa ${event.index+1} de ${plan.length} · aguardando resposta do Claude`);onStage(event);
   }
   if(event.type==='handoff'){
    $('#work-log').querySelectorAll('details').forEach(el=>el.open=false);
    const row=$('#work-stages').children[event.index];if(row)row.dataset.state='done';
    const details=document.createElement('details'),summary=document.createElement('summary'),text=document.createElement('p');
    summary.textContent=`${event.agent} → ${event.to}`;text.textContent=event.text;details.append(summary,text);details.open=true;$('#work-log').append(details);details.scrollIntoView({block:'nearest'});
   }
  },
  finish(){onStage(null);state('done','Sua entrega está pronta.','Revisão concluída. Abra a conversa para ver e ajustar o resultado.');$('#work-open').textContent='Ver entrega ↗';$('#work-dismiss').hidden=false;},
  fail(message){onStage(null);const row=$('#work-stages').children[activeIndex];if(row)row.dataset.state='error';state('error','A operação foi interrompida.',message);$('#work-open').textContent='Revisar pedido ↗';$('#work-dismiss').hidden=false;},
  reset
 };
}
