"""Generate a minimal placeholder CV PDF for the Download CV button."""

lines = [
    "Dianet Adan",
    "Product Designer & Visual Systems Thinker",
    "",
    "Email: hello@dianetadan.com",
    "",
    "Focus areas: Product Design, UX/UI Design, Visual Systems,",
    "Brand Identity, Art Direction, Campaign Design.",
    "",
    "Selected projects: AscendONE, KidDo, Visionary, Rebel Owners,",
    "Beyond Meat, Toblerone.",
    "",
    "Full CV available on request -- this is a placeholder file.",
]

content_lines = ["BT", "/F1 18 Tf", "72 770 Td", "(Curriculum Vitae) Tj"]
content_lines += ["/F1 12 Tf", "0 -40 Td"]
for line in lines:
    safe = line.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")
    content_lines.append(f"({safe}) Tj")
    content_lines.append("0 -18 Td")
content_lines.append("ET")
content_stream = "\n".join(content_lines)

objects = []
objects.append("<< /Type /Catalog /Pages 2 0 R >>")
objects.append("<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
objects.append(
    "<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 5 0 R >> >> "
    "/MediaBox [0 0 612 792] /Contents 4 0 R >>"
)
stream_bytes = content_stream.encode("latin-1")
objects.append(
    f"<< /Length {len(stream_bytes)} >>\nstream\n{content_stream}\nendstream"
)
objects.append("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")

pdf = "%PDF-1.4\n"
offsets = []
for i, obj in enumerate(objects, start=1):
    offsets.append(len(pdf.encode("latin-1")))
    pdf += f"{i} 0 obj\n{obj}\nendobj\n"

xref_offset = len(pdf.encode("latin-1"))
pdf += f"xref\n0 {len(objects) + 1}\n"
pdf += "0000000000 65535 f \n"
for off in offsets:
    pdf += f"{off:010d} 00000 n \n"
pdf += f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF"

with open("public/cv/dianet-adan-cv.pdf", "wb") as f:
    f.write(pdf.encode("latin-1"))

print("done")
