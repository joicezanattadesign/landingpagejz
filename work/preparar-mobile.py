from PIL import Image
from pathlib import Path
root=Path('outputs/site-joice/assets')
dest=root/'mobile'
dest.mkdir(exist_ok=True)
photos={'e2bc7.png':768,'c4efa.png':768,'48ee7.png':768,'5c77c.png':640,'222ae.png':1600,'7484e.png':1600}
for name,width in photos.items():
    with Image.open(root/name) as im:
        im.thumbnail((width,10000),Image.Resampling.LANCZOS)
        target=dest/(Path(name).stem+'.webp')
        im.save(target,'WEBP',quality=90,method=6)
        print(name,im.size,(root/name).stat().st_size,target.stat().st_size)
