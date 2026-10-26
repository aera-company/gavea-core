"""Package only distributable local files, excluding secrets and dependencies."""
import hashlib
import json
import pathlib
import zipfile

root = pathlib.Path(__file__).resolve().parents[1]
version = json.loads((root/'package.json').read_text())['version']
source = ['index.html','style.css','app.js','ai.js','office.js','agents.js','data.js','package.json','package-lock.json','vite.config.js','scripts/serve_demo.py']
hashed = [root/name for name in source]+sorted((root/'dist').rglob('*'))
manifest = {'date':'2026-10-26','version':version,'sha256':{str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in hashed if p.is_file()}}
(root/'docs/BUILD_MANIFEST.json').write_text(json.dumps(manifest,indent=2)+'\n')
files = [p for p in root.iterdir() if p.is_file() and (p.suffix in ('.md','.js','.json','.html','.css','.svg','.png','.command') or p.name in ('.gitignore','.env.example'))]
for folder in ['assets','public','dist','scripts','tests','docs','backups']:
    files.extend(p for p in (root/folder).rglob('*') if p.is_file())
def allowed(p):
    rel = p.relative_to(root)
    return not any(part in ('node_modules','__pycache__','.git') or part=='.DS_Store' or (part.startswith('.env') and part!='.env.example') or part.endswith('.pem') or part.endswith('.key') for part in rel.parts)
archive = root/f'GAVEA_BUILD_2030_V{version}.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
    for p in sorted(set(files)):
        if allowed(p):z.write(p,'GAVEA OFFICE/'+str(p.relative_to(root)))
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    names = z.namelist()
    for name in ['ai.js','scripts/serve_demo.py','dist/index.html','docs/LIVE_AI_SETUP.md']:
        assert 'GAVEA OFFICE/'+name in names
    assert not any('/.env' in n and not n.endswith('/.env.example') for n in names)
print(json.dumps({'archive':archive.name,'files':len(names),'size_mb':round(archive.stat().st_size/1e6,1),'integrity':'passed'}))
