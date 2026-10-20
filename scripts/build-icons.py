#!/usr/bin/env python3
"""
turns every svg in assets/icons and assets/tech into a css mask class,
so the logos pick up the current text colour (and work from file:// too).

run it after adding or removing a logo:
    python3 scripts/build-icons.py
"""
import base64, pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
out = ["/* built from the svgs by scripts/build-icons.py, edit the svgs not this file */",
       ".i,.t{display:inline-block;flex:none;width:1.25em;height:1.25em;background:currentColor;",
       "-webkit-mask:var(--m) center/contain no-repeat;mask:var(--m) center/contain no-repeat}"]

for folder, prefix in (("icons", "i"), ("tech", "t")):
    for svg in sorted((root / "assets" / folder).glob("*.svg")):
        raw = svg.read_text(encoding="utf-8")
        raw = re.sub(r"<!--.*?-->", "", raw, flags=re.S).strip()
        b64 = base64.b64encode(raw.encode("utf-8")).decode("ascii")
        out.append(f'.{prefix}-{svg.stem}{{--m:url("data:image/svg+xml;base64,{b64}")}}')

(root / "css" / "icons.css").write_text("\n".join(out) + "\n", encoding="utf-8")
print("wrote css/icons.css with", len(out) - 3, "icons")
