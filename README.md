# Landing Page Ejen Hartanah - Azman Zakaria

Landing page statik (HTML, CSS, Vanilla JS) untuk conversion ke WhatsApp dengan fokus trust, responsif, SEO asas, dan aksesibiliti.

## Struktur Projek

- `index.html` - Struktur halaman dan kandungan utama
- `styles.css` - Styling UI/UX responsive
- `script.js` - Interaksi (smooth scroll, mobile menu, reveal, FAQ, back-to-top)
- `README.md` - Panduan projek

## Aset Diperlukan

Sediakan fail berikut dalam folder `assets/`:

- `/assets/herosection/641d60de-90a7-4a8e-b1f1-30eb46c40e03.jpeg`
- `/assets/herosection/6ee62b22-5acf-4f56-a995-067bf522799e.jpeg`
- `/assets/herosection/2865bd35-e90a-4fe4-b74d-92003cc933ff.jpeg`
- `/assets/herosection/e4d678d7-7da3-472c-bfef-5f9c6727905b.jpeg`
- `/assets/about/23a27dcd-fac2-411f-b2b5-783fb2d674bd.jpeg`
- `/assets/gallery/652435f9-7ce0-48fc-ba6f-93fd226b15ca.jpeg`
- `/assets/gallery/a182a6ab-6a70-4162-8fff-c30a69a5aa37.jpeg`
- `/assets/gallery/bc870621-825c-4d81-8765-c6d120f7ea78.jpeg`
- `/assets/gallery/c631ed28-0c99-4063-a03d-2068c0a9659c.jpeg`

## Jalankan Secara Lokal

Pilihan 1 (paling cepat):

- Buka `index.html` terus dalam browser.

Pilihan 2 (disyorkan untuk uji penuh):

```bash
python -m http.server 8080
```

Lepas itu buka `http://localhost:8080`.

## Deploy ke Cloudflare Pages

Tetapan deploy:

1. Framework preset: `None`
2. Build command: `None`
3. Output directory: `/`
4. Connect repository dan trigger deploy

Tiada build step diperlukan kerana ini static site sepenuhnya.

## URL CTA WhatsApp Digunakan

Semua CTA utama menggunakan URL ini:

`https://api.whatsapp.com/send?phone=60133976197&text=Hi%20Tuan%20Azman,%20saya%20nak%20semak%20harga%20rumah%20dan%20tanya%20pasal%20urusan%20jual%2Fbeli%2Fsewa`
