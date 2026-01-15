document.addEventListener('DOMContentLoaded', () => {
    class CustomNavbar extends HTMLElement {
        connectedCallback() {
            this.attachShadow({ mode: 'open' });

            this.shadowRoot.innerHTML = `
                <style>
                    nav {
                        background-color: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(8px);
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                        position: relative;
                    }

                    .nav-container {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        max-width: 1200px;
                        margin: 0 auto;
                    }

                    h1 {
                        font-weight: 700;
                        color: #1f2937;
                        margin-left: 1rem;
                    }

                    /* Share button */
                    .share-btn {
                        display: flex;
                        align-items: center;
                        gap: 0.4rem;
                        padding: 0.45rem 0.9rem;
                        margin-right: 1rem;
                        border-radius: 0.5rem;
                        background: #4a6fa5;
                        color: white;
                        font-weight: 500;
                        cursor: pointer;
                        transition: background 0.2s ease, transform 0.15s ease;
                    }

                    .share-btn:hover {
                        background: rgba(74, 111, 165, 0.15);
                        transform: translateY(-1px);
                    }

                    /* Share dropdown */
                    .share-menu {
                        position: absolute;
                        top: 70px;
                        right: 1.5rem;
                        background: #fff;
                        border-radius: 0.75rem;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
                        padding: 0.5rem;
                        display: none;
                        z-index: 100;
                        min-width: 180px;
                    }

                    .share-menu button {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        gap: 0.6rem;
                        padding: 0.55rem 0.7rem;
                        border-radius: 0.5rem;
                        font-size: 0.9rem;
                        cursor: pointer;
                        transition: background 0.2s ease;
                    }

                    .share-menu button:hover {
                        background: rgba(0, 0, 0, 0.05);
                    }
                </style>

                <nav class="sticky top-0 z-50 py-4 px-6">
                    <div class="nav-container">
                        <h1 class="text-3xl md:text-4xl ml-4">In Loving Memory</h1>

                        <div>
                            <button class="share-btn" id="shareBtn">
                                <i data-feather="share-2"></i>
                                Share
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
                    </div>
                </nav>
            `;

            this.attachEvents();
            feather.replace({ root: this.shadowRoot });
        }

        attachEvents() {
            const shareBtn = this.shadowRoot.getElementById('shareBtn');
            const menu = this.shadowRoot.getElementById('shareMenu');

            shareBtn.addEventListener('click', () => {
                // Try native share first
                if (navigator.share) {
                    navigator.share({
                        title: document.title,
                        text: 'In loving memory',
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

            // Close menu when clicking outside
            document.addEventListener('click', e => {
                if (!this.contains(e.target)) {
                    menu.style.display = 'none';
                }
            });
        }

        handleShare(type) {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('In loving memory');

            const links = {
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`
            };

            if (type === 'copy') {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard');
                return;
            }

            window.open(links[type], '_blank');
        }
    }

    customElements.define('custom-navbar', CustomNavbar);
});
