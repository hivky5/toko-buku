const NO_WHATSAPP = "62882020953793"; // Ganti nomor WA Anda

function initApp() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    if (bookId) {
        const selectedBook = allBooks.find(b => b.id == bookId);
        if (selectedBook) {
            renderDetail(selectedBook);
            return;
        }
    }
    renderBooks(allBooks);
    showMainUI();
}

function renderBooks(data) {
    const container = document.getElementById('book-container');
    container.innerHTML = '';
    
    data.forEach(book => {
        const hargaAsli = parseInt(book.harga);
        const hargaMarkup = Math.round(hargaAsli * 1.1);
        
        const card = document.createElement('div');
        card.className = 'book-card';
        card.onclick = () => goToDetail(book);
        card.innerHTML = `
            <div class="book-img-frame">
                <img src="${book.foto}" class="book-img">
            </div>
            <div class="book-info">
                <div class="book-title">${book.judul}</div>
                <div class="strike-price">Rp ${hargaMarkup.toLocaleString('id-ID')}</div>
                <div class="real-price">Rp ${hargaAsli.toLocaleString('id-ID')}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

function goToDetail(book) {
    const newUrl = window.location.pathname + '?id=' + book.id;
    window.history.pushState({ id: book.id }, '', newUrl);
    renderDetail(book);
}

function renderDetail(book) {
    document.getElementById('main-ui').style.display = 'none';
    const detailUI = document.getElementById('detail-ui');
    const content = document.getElementById('detail-content');
    
    const hargaFix = parseInt(book.harga).toLocaleString('id-ID');
    const pesanWA = encodeURIComponent(`Halo, saya mau pesan: *${book.judul}*`);

    detailUI.style.display = 'block';
    content.innerHTML = `
    <div class="detail-flex">
        <div class="detail-img-frame">
            <img src="${book.foto}" class="detail-img" alt="${book.judul}">
        </div>
        
        <div class="detail-text">
            <h1>${book.judul}</h1>
            <p><strong>Penulis:</strong> ${book.penulis}</p>
            <h1 style="color: #e74c3c">Rp ${hargaFix}</h1>
            <hr>
            <h4>Sinopsis</h4>
            <p style="line-height:1.8; white-space:pre-line;">${book.sinopsis}</p>
            <a href="https://wa.me/${NO_WHATSAPP}?text=${pesanWA}" target="_blank" class="btn-wa">🛒 Pesan WhatsApp</a>
        </div>
    </div>
`;
    window.scrollTo(0, 0);
}

function closeDetail() {
    window.history.pushState({}, '', window.location.pathname);
    showMainUI();
    renderBooks(allBooks);
}

function showMainUI() {
    document.getElementById('main-ui').style.display = 'block';
    document.getElementById('detail-ui').style.display = 'none';
}

function searchBook() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filtered = allBooks.filter(b => b.judul.toLowerCase().includes(query) || b.penulis.toLowerCase().includes(query));
    renderBooks(filtered);
}

window.onpopstate = () => initApp();

// Jalankan aplikasi pertama kali
initApp();