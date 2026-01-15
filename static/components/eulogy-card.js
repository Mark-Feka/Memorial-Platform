class CustomEulogyCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.syncAttributes();
        this.render();
        this.attachEvents();
        feather.replace({ root: this.shadowRoot });
    }

    syncAttributes() {
        this.name = this.getAttribute('name') || '';
        this.relationship = this.getAttribute('relationship') || '';
        this.date = this.getAttribute('date') || '';
        this.message = this.getAttribute('message') || '';
        try {
            this.photos = JSON.parse(this.getAttribute('photos') || '[]');
        } catch {
            this.photos = [];
        }
        
    }

     /* ---------- PHOTO GRID ---------- */
    renderPhotoGrid() {

        const maxPreview = 5;
        const photos = this.photos.slice(0, maxPreview);
        const extraCount = this.photos.length - maxPreview;

        return `
            <div class="photo-grid count-${photos.length}">
                ${photos.map((src, index) => `
                    <div class="photo-item" data-index="${index}">
                        <img src="${src}" loading="lazy" />
                        ${index === maxPreview - 1 && extraCount > 0
                            ? `<div class="overlay">+${extraCount}</div>`
                            : ''
                        }
                    </div>
                `).join('')}
            </div>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: system-ui, sans-serif;
                }

                .eulogy-card {
                    background: #fff;
                    border-radius: 12px;
                    padding: 16px;
                    box-shadow: 0 2px 10px rgba(0,0,0,.08);
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                }

                .user-name {
                    font-weight: 600;
                }

                .message {
                    margin: 12px 0;
                    line-height: 1.5;
                }

                /* ===== PHOTO GRID ===== */
                .photo-grid {
                    display: grid;
                    gap: 4px;
                    border-radius: 10px;
                    overflow: hidden;
                    cursor: pointer;
                }

                .photo-grid.count-1 {
                    grid-template-columns: 1fr;
                }

                .photo-grid.count-2 {
                    grid-template-columns: 1fr 1fr;
                }

                .photo-grid.count-3,
                .photo-grid.count-4,
                .photo-grid.count-5 {
                    grid-template-columns: 1fr 1fr;
                }

                .photo-item {
                    position: relative;
                    aspect-ratio: 1 / 1;
                    overflow: hidden;
                    background: #eee;
                }

                .photo-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform .3s ease;
                }

                .photo-item:hover img {
                    transform: scale(1.05);
                }

                .overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,.6);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    font-weight: 600;
                }
                
                /* ===== FOOTER / SHARE ===== */
                .card-footer {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 12px;
                    position: relative;
                }
                
                .share-btn {
                    display: flex;
                    align-items: center;
                    gap: .4rem;
                    padding: .45rem .9rem;
                    border-radius: .5rem;
                     background: #4a6fa5;
                    color: white;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background .2s ease, transform .15s ease;
                }
                

                 .share-btn:hover {
                    background: rgba(74,111,165,.15);
                    transform: translateY(-1px);
                }

                .share-menu {
                    position: absolute;
                    bottom: 48px;
                    right: 0;
                    background: #fff;
                    border-radius: .75rem;
                    box-shadow: 0 10px 30px rgba(0,0,0,.12);
                    padding: .5rem;
                    display: none;
                    min-width: 180px;
                    z-index: 10;
                }

                .share-menu button {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: .6rem;
                    padding: .55rem .7rem;
                    border-radius: .5rem;
                    font-size: .9rem;
                    cursor: pointer;
                }
                
                .share-menu button:hover {
                    background: rgba(0,0,0,.05);
                }


                /* ===== MODAL ===== */
                .modal {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,.85);
                    display: none;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }

                .modal.active {
                    display: flex;
                }

                .modal img {
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 8px;
                }

                .close-btn {
                    position: absolute;
                    top: 20px;
                    right: 24px;
                    font-size: 28px;
                    color: white;
                    cursor: pointer;
                }
            </style>

            <div class="eulogy-card">
                <div class="card-header">
                    <div>
                        <div class="user-name">${this.name}</div>
                        <div class="user-relationship">${this.relationship}</div>
                    </div>
                    <span class="date">${this.date}</span>
                </div>

                <div class="message">${this.message}</div>

                ${this.photos.length ? this.renderPhotoGrid() : ''}
                
                <div class="card-footer">
                    <button class="share-btn" id="shareBtn">
                        <i data-feather="share-2"></i> Share
                    </button>

                    <div class="share-menu" id="shareMenu">
                        <button data-type="facebook">
                            <i data-feather="facebook"></i> Facebook
                        </button>
                        <button data-type="twitter">
                            <i data-feather="twitter"></i> Twitter / X
                        </button>
                        <button data-type="copy">
                            <i data-feather="link"></i> Copy link
                        </button>
                    </div>
                </div>

                <div class="modal" id="modal">
                    <span class="close-btn">✕</span>
                    <img />
                </div>
                
            </div>
        `;
    }

    attachEvents() {
        /* ----- IMAGE MODAL ----- */
        const modal = this.shadowRoot.getElementById('modal');
        const modalImg = modal.querySelector('img');

        this.shadowRoot.querySelectorAll('.photo-item').forEach(item => {
            item.addEventListener('click', () => {
                modalImg.src = item.querySelector('img').src;
                modal.classList.add('active');
            });
        });

        modal.querySelector('.close-btn').onclick = () =>
            modal.classList.remove('active');

        modal.onclick = e => {
            if (e.target === modal) modal.classList.remove('active');
        };

        /* ----- SHARE LOGIC ----- */
        const shareBtn = this.shadowRoot.getElementById('shareBtn');
        const menu = this.shadowRoot.getElementById('shareMenu');

        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: `In loving memory of ${this.name}`,
                    text: this.message.slice(0, 120),
                    url: window.location.href
                }).catch(() => {});
            } else {
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            }
        });

        menu.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleShare(btn.dataset.type);
                menu.style.display = 'none';
            });
        });

        document.addEventListener('click', e => {
            if (!this.contains(e.target)) menu.style.display = 'none';
        });
    }

    handleShare(type) {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`In loving memory of ${this.name}`);

        if (type === 'copy') {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied');
            return;
        }

        const links = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        };

        window.open(links[type], '_blank');
    }
}

customElements.define('custom-eulogy-card', CustomEulogyCard);