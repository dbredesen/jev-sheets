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
    # A single continuous stroke gives the J a smooth hook at small icon sizes.
    start = (.72*s, .60*s)
    controls = ((.72*s, .89*s), (.30*s, .90*s), (.28*s, .68*s))
    curve = []
    for step in range(101):
        t = step / 100
        u = 1 - t
        x = u**3*start[0] + 3*u*u*t*controls[0][0] + 3*u*t*t*controls[1][0] + t**3*controls[2][0]
        y = u**3*start[1] + 3*u*u*t*controls[0][1] + 3*u*t*t*controls[1][1] + t**3*controls[2][1]
        curve.append((round(x), round(y)))
    width = round(.10*s)
    d.line([(round(.72*s), round(.20*s)), start, *curve], fill='white', width=width, joint='curve')
    end_x, end_y = curve[-1]
    radius = width / 2
    d.ellipse((end_x-radius, end_y-radius, end_x+radius, end_y+radius), fill='white')
    return im.resize((size,size),Image.Resampling.LANCZOS)
for n in (32,120,128): icon(n).save(out/f'icon-{n}.png')
im=Image.new('RGB',(880,560),'#153D47');d=ImageDraw.Draw(im)
im.paste(icon(220),(42,55))
d.text((292,80),'Jev',font=ImageFont.truetype(font,112),fill='white')
d.text((296,211),'for Sheets',font=ImageFont.truetype(font,46),fill='#74DEC7')
d.text((56,363),'Typed AI. In your cells.',font=ImageFont.truetype(font,52),fill='white')
im.resize((220,140),Image.Resampling.LANCZOS).save(out/'card-banner-220x140.png')
