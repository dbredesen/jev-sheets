from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
out=Path(__file__).resolve().parents[1] / 'marketplace/assets'
out.mkdir(parents=True, exist_ok=True)
font='/System/Library/Fonts/Supplemental/Arial Bold.ttf'
def icon(size):
    scale=4
    im=Image.new('RGB',(size*scale,size*scale),'#153D47'); d=ImageDraw.Draw(im)
    s=size*scale
    for x,y in [(0.16,0.16),(0.38,0.16),(0.16,0.38),(0.38,0.38)]:
        d.rectangle((int(x*s),int(y*s),int((x+.14)*s),int((y+.14)*s)),fill='#74DEC7')
    d.line([(int(.72*s),int(.20*s)),(int(.72*s),int(.67*s)),(int(.61*s),int(.79*s)),(int(.39*s),int(.79*s)),(int(.29*s),int(.68*s))],fill='white',width=max(4,int(.10*s)))
    return im.resize((size,size),Image.Resampling.LANCZOS)
for n in (32,120,128): icon(n).save(out/f'icon-{n}.png')
im=Image.new('RGB',(880,560),'#153D47');d=ImageDraw.Draw(im)
im.paste(icon(220),(42,55))
d.text((292,80),'Jev',font=ImageFont.truetype(font,112),fill='white')
d.text((296,211),'for Sheets',font=ImageFont.truetype(font,46),fill='#74DEC7')
d.text((56,363),'Typed AI. In your cells.',font=ImageFont.truetype(font,52),fill='white')
im.resize((220,140),Image.Resampling.LANCZOS).save(out/'card-banner-220x140.png')
