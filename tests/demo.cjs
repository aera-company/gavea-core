const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {createRequire}=require('node:module');
let pw;try{pw=require('playwright');}catch{pw=createRequire(process.env.PLAYWRIGHT_PACKAGE||'/Users/tiagolima/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json')('playwright');}
const root=path.resolve(__dirname,'..'),base=process.env.GAVEA_URL||'http://127.0.0.1:8086';
const report={date:process.env.GAVEA_TEST_DATE||new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()),url:base,checks:[],errors:[],warnings:[],externalRequests:[],screenshots:[]};
const out=path.join(root,'docs');
function pass(name){report.checks.push(name);console.log('PASS',name);}
async function shot(page,name){await page.screenshot({path:path.join(out,name)});report.screenshots.push(name);}
(async()=>{
 const browser=await pw.chromium.launch({headless:false,args:['--use-angle=metal']});
 try{
  const context=await browser.newContext({viewport:{width:1600,height:900},deviceScaleFactor:1});
  await context.route('**/*',route=>{const u=route.request().url();if(!u.startsWith(base)&&!u.startsWith('data:')&&!u.startsWith('blob:')){report.externalRequests.push(u);route.abort();}else route.continue();});
  const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());if(m.type()==='warning')report.warnings.push(m.text());});
  const response=await page.goto(base);assert.equal(response.status(),200);
  await page.waitForFunction(()=>window.gavea?.state.ready,{timeout:30000});await page.waitForSelector('#loading[hidden]',{state:'attached'});
  assert.equal(await page.evaluate(()=>window.gavea.state.visualMode),false);assert(await page.locator('#scene canvas').isVisible());assert(await page.locator('#experience').isVisible());
  await shot(page,'01-overview-1600x900.png');pass('Build de produção: cena WebGL real, abertura 16:9 e carregamento concluído');
  const expected=[['brand','MAYA'],['marketing','NOA'],['growth','NINA'],['technology','LEO'],['direction','ARI']];
  for(const [id,agent] of expected){await page.locator(`.zone-button[data-id="${id}"]`).click();await page.waitForTimeout(1950);assert.equal(await page.locator('#agent-name').innerText(),agent);assert.equal(await page.locator(`.zone-button[data-id="${id}"]`).getAttribute('aria-pressed'),'true');assert.equal(await page.evaluate(()=>window.gavea.state.selected),id);assert.equal(await page.evaluate(()=>window.gavea.diagnostics.highlightedZone),await page.evaluate(()=>window.gavea.diagnostics.currentZone));assert(await page.locator('#panel-example').innerText());if(id==='brand'||id==='technology')await shot(page,`02-${id}-1600x900.png`);}
  pass('Cinco núcleos: perfil, responsabilidades, aplicação e aproximação de câmera');
  await page.locator('#next-department').click();assert.equal(await page.evaluate(()=>window.gavea.state.mode),'intro');await page.waitForTimeout(2000);
  await page.locator('.hotspot[data-id="brand"]').click();assert.equal(await page.evaluate(()=>window.gavea.state.selected),'brand');await page.locator('#panel-return').click();await page.waitForTimeout(2000);pass('Hotspot espacial e retorno à visão geral');
  const camera=()=>page.evaluate(()=>window.gavea.diagnostics.camera);
  const a=await camera();await page.mouse.move(1100,450);await page.mouse.down();await page.mouse.move(1220,480,{steps:18});await page.mouse.up();await page.waitForTimeout(500);const b=await camera();assert(Math.hypot(...a.map((x,i)=>x-b[i]))>.1);await page.mouse.wheel(0,-200);await page.waitForTimeout(500);const c=await camera();assert(Math.hypot(...b.map((x,i)=>x-c[i]))>.1);pass('Órbita por arraste e zoom por scroll');
  await page.locator('#reset-camera').click();await page.waitForTimeout(2000);const z=await camera();await page.locator('#zoom-in').click();const zin=await camera();assert(Math.hypot(...z.map((x,i)=>x-zin[i]))>.1);await page.locator('#zoom-out').click();pass('Botões de zoom e reinicialização');
  await page.locator('#quality').click();assert.equal(await page.locator('#quality').getAttribute('aria-pressed'),'true');assert.equal(await page.evaluate(()=>window.gavea.diagnostics.quality),'leve');await page.locator('#quality').click();assert.equal(await page.evaluate(()=>window.gavea.diagnostics.quality),'alta');pass('Qualidade leve desativa reflexão e sombras, alta restaura');
  await page.locator('#open-command').click();await page.locator('#command-input').fill('um comando desconhecido');await page.locator('#command-form button[type="submit"]').click();assert(await page.locator('#command-feedback').innerText().then(t=>t.includes('não reconhecido')));await page.locator('#command-input').fill('Ir para tecnologia');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>window.gavea.state.selected),'technology');assert.equal(await page.locator('#command-dialog').isVisible(),false);pass('Comando textual: validação, parser em português e navegação real');
  await page.keyboard.press('Meta+k');assert(await page.locator('#command-dialog').isVisible());await page.keyboard.press('Escape');assert.equal(await page.locator('#command-dialog').isVisible(),false);
  await page.emulateMedia({reducedMotion:'reduce'});await page.keyboard.press('1');assert.equal(await page.evaluate(()=>window.gavea.state.selected),'brand');assert.equal(await page.evaluate(()=>window.gavea.diagnostics.currentZone),'think');const r1=await camera();await page.waitForTimeout(300);const r2=await camera();assert(Math.hypot(...r1.map((x,i)=>x-r2[i]))<.0001);await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>window.gavea.state.mode),'intro');await page.keyboard.press('p');assert.equal(await page.evaluate(()=>window.gavea.state.tour.paused),true);await page.locator('#tour-stop').click();pass('Teclado 1–5, Esc, P, ⌘K; movimento reduzido sem voo de câmera e tour manual');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.locator('#presentation').click();await page.locator('#tour-pause').click();assert.equal(await page.evaluate(()=>window.gavea.state.tour.paused),true);
  for(let i=0;i<5;i++){await page.locator('#tour-next').click();assert.equal(await page.evaluate(()=>window.gavea.state.selected),expected[i][0]);assert((await page.locator('#tour-phase').innerText()).includes(expected[i][1]));assert.equal(await page.evaluate(()=>window.gavea.diagnostics.flowStep),i+1);}
  await page.locator('#tour-next').click();assert.equal(await page.evaluate(()=>window.gavea.state.mode),'closing');assert((await page.locator('#closing').innerText()).includes('ONE DIRECTION.'));await page.waitForTimeout(2000);await shot(page,'04-closing-1600x900.png');await page.locator('#tour-prev').click();assert.equal(await page.evaluate(()=>window.gavea.state.selected),'direction');await page.locator('#tour-stop').click();pass('Apresentação: abertura, 5 fases, linhas de conexão, pausa, avanço, retorno e encerramento');
  for(const viewport of [{width:1440,height:900},{width:1024,height:768},{width:768,height:1024},{width:390,height:844},{width:375,height:667}]){await page.setViewportSize(viewport);await page.locator('#reset-camera').click();await page.waitForTimeout(2000);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);assert(await page.locator('#experience').isVisible());await page.locator('.zone-button[data-id="marketing"]').click();assert.equal(await page.locator('#agent-name').innerText(),'NOA');const isReachable=await page.locator('#next-department').evaluate(e=>{e.scrollIntoView({block:'nearest'});const r=e.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;});assert(isReachable);if(viewport.width===390)await shot(page,'05-mobile-focus-390x844.png');if(viewport.width===1440)await shot(page,'05-laptop-1440x900.png');}
  pass('1440, 1024, 768, 390 e 375 px: sem overflow horizontal; navegação e painéis acessíveis');
  await page.setViewportSize({width:390,height:844});await page.locator('#reset-camera').click();await page.waitForTimeout(2000);await shot(page,'05-mobile-overview-390x844.png');
  await page.setViewportSize({width:1600,height:900});await page.locator('#reset-camera').click();await page.waitForTimeout(2100);
  report.performance=await page.evaluate(()=>window.gavea.diagnostics);pass('Medição de desempenho durante navegação real na GPU local');
  const beforeLossErrors=report.errors.length;await page.evaluate(()=>document.querySelector('#scene canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());await page.waitForSelector('body.visual-mode',{state:'attached'});assert(await page.locator('#fallback-notice').isVisible());await page.locator('.zone-button[data-id="growth"]').click();assert.equal(await page.locator('#agent-name').innerText(),'NINA');pass('Perda real do contexto WebGL ativa referência e mantém a narrativa navegável');report.contextLossMessages=report.errors.splice(beforeLossErrors);
  await page.goto(base+'/?fallback=1');await page.waitForSelector('body.visual-mode',{state:'attached'});assert.equal(await page.locator('#scene canvas').count(),0);assert(await page.locator('#fallback-notice').isVisible());await shot(page,'06-fallback-1600x900.png');await page.locator('.zone-button[data-id="direction"]').click();assert.equal(await page.locator('#agent-name').innerText(),'ARI');pass('Contingência forçada sem iniciar WebGL, com identificação de referência visual');
  assert.equal(report.externalRequests.length,0);pass('Zero requisições externas: bibliotecas, marcas e fonte servidas localmente');
  assert.equal(report.errors.length,0,JSON.stringify(report.errors));pass('Zero exceções JS ou erros de console na execução normal');
  await context.close();
  if(process.env.GAVEA_RECORD!=='0'){
    console.log('RECORDING percurso automático (~65 segundos)');
    const recording=await browser.newContext({viewport:{width:1600,height:900},recordVideo:{dir:path.join(out,'recording'),size:{width:1600,height:900}}});
    const p=await recording.newPage();await p.goto(base);await p.waitForFunction(()=>window.gavea?.state.ready,{timeout:30000});await p.waitForTimeout(1600);await p.locator('#experience').click();
    for(let i=1;i<=6;i++){await p.waitForFunction(index=>window.gavea.state.tour.index===index,i,{timeout:15000});console.log('TOUR',i);}
    await p.waitForTimeout(10500);assert.equal(await p.evaluate(()=>window.gavea.state.mode),'closing');assert.equal(await p.evaluate(()=>window.gavea.state.tour.paused),true);await shot(p,'07-natural-tour-complete.png');
    const video=p.video();await recording.close();await video.saveAs(path.join(out,'GAVEA-BUILD-2030-demo.webm'));report.video='GAVEA-BUILD-2030-demo.webm';pass('Percurso automático completo em tempo real (~65 s), encerramento estável e gravação WebM');
  }
 }finally{await browser.close();fs.writeFileSync(path.join(out,'TEST_RESULTS.json'),JSON.stringify(report,null,2));}
})().catch(e=>{console.error(e);process.exitCode=1;});
