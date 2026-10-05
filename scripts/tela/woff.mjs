/** WOFF 1.0 → TTF/OTF (tabelas zlib descomprimidas). O Pango do sharp não lê WOFF; lê TTF. */
import zlib from 'node:zlib';
export function woffParaSfnt(buf) {
  const flavor = buf.readUInt32BE(4);
  const numTables = buf.readUInt16BE(12);
  const tables = [];
  for (let i = 0; i < numTables; i++) {
    const o = 44 + i * 20;
    tables.push({ tag: buf.readUInt32BE(o), offset: buf.readUInt32BE(o + 4), compLength: buf.readUInt32BE(o + 8), origLength: buf.readUInt32BE(o + 12), checksum: buf.readUInt32BE(o + 16) });
  }
  let es = 1, ls = 0; while (es * 2 <= numTables) { es *= 2; ls++; }
  const head = Buffer.alloc(12 + 16 * numTables);
  head.writeUInt32BE(flavor, 0); head.writeUInt16BE(numTables, 4); head.writeUInt16BE(es * 16, 6); head.writeUInt16BE(ls, 8); head.writeUInt16BE(numTables * 16 - es * 16, 10);
  const datas = []; let off = head.length;
  tables.forEach((t, i) => {
    const raw = buf.subarray(t.offset, t.offset + t.compLength);
    const data = t.compLength < t.origLength ? zlib.inflateSync(raw) : raw;
    const r = 12 + i * 16;
    head.writeUInt32BE(t.tag, r); head.writeUInt32BE(t.checksum, r + 4); head.writeUInt32BE(off, r + 8); head.writeUInt32BE(t.origLength, r + 12);
    const pad = (4 - (data.length % 4)) % 4;
    datas.push(data, Buffer.alloc(pad)); off += data.length + pad;
  });
  return Buffer.concat([head, ...datas]);
}
