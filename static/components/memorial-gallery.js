class MemorialGallery extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --primary-color: #4a6fa5;
                }

                .gallery-container {
                    padding: 2rem 0;
                }
                .gallery-title {
                    text-align: center;
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                    color: var(--primary-color);
                }
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 1rem;
                }
                .gallery-item {
                    position: relative;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    aspect-ratio: 1;
                    transition: transform 0.3s ease;
                }
                .gallery-item:hover {
                    transform: scale(1.03);
                }
                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .gallery-caption {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(0,0,0,0.6);
                    color: white;
                    padding: 0.5rem;
                    font-size: 0.875rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .gallery-item:hover .gallery-caption {
                    opacity: 1;
                }
            </style>

            <div class="gallery-container">
                <h3 class="gallery-title">Life in Pictures</h3>

                <div class="gallery-grid">
                    <div class="gallery-item">
                        <img src="/static/imgs/pic-1.jpeg" alt="Family gathering">
                        <div class="gallery-caption">Proud Sabesan</div>
                    </div>

                    <div class="gallery-item">
                        <img src="/static/imgs/pic-2.jpeg" alt="Vacation">
                        <div class="gallery-caption">Dedicated Man of Faith</div>
                    </div>

                    <div class="gallery-item">
                        <img src="/static/imgs/pic-3.jpeg" alt="Teaching">
                        <div class="gallery-caption">Now in Heaven</div>
                    </div>

                    <div class="gallery-item">
                        <img src="/static/imgs/pic-4.jpeg" alt="Fishing">
                        <div class="gallery-caption">Vacation in Kribi</div>
                    </div>

                    <div class="gallery-item">
                        <img src="/static/imgs/pic-5.jpeg" alt="Fishing">
                        <div class="gallery-caption">Man of wisdom</div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('memorial-gallery', MemorialGallery);
