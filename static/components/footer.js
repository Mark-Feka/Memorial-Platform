class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background-color: #f8fafc;
                    border-top: 1px solid #e2e8f0;
                }
                .share-btn {
                    transition: all 0.2s ease;
                }
                .share-btn:hover {
                    transform: translateY(-2px);
                }
            </style>

            <footer id="contact" class="py-12 px-4">
                <div class="container mx-auto max-w-4xl">
                    <div class="text-center mb-8">
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">
                            Thank You for Honoring His Memory
                        </h3>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Your stories and memories help keep Feka Christopher's spirit alive for generations to come.
                        </p>
                    </div>

                    <div class="flex justify-center space-x-4 mb-8">
                        <a href="#" data-share class="share-btn bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded-full">
                            <i data-feather="facebook"></i>
                        </a>
                        <a href="#" data-share class="share-btn bg-green-100 hover:bg-green-200 text-green-800 p-3 rounded-full">
                            <i data-feather="twitter"></i>
                        </a>
                        <a href="#" data-share class="share-btn bg-red-100 hover:bg-red-200 text-red-800 p-3 rounded-full">
                            <i data-feather="mail"></i>
                        </a>
                        <a href="#" data-share class="share-btn bg-purple-100 hover:bg-purple-200 text-purple-800 p-3 rounded-full">
                            <i data-feather="share-2"></i>
                        </a>
                    </div>

                    <div class="text-center text-gray-500 text-sm">
                        <p>Created with love by the Feka family</p>
                        <p class="mt-2">© 2023 In Loving Memory Bobe Njuakom</p>
                    </div>
                </div>
            </footer>
        `;

        feather.replace({ root: this.shadowRoot });
    }
}

customElements.define('custom-footer', CustomFooter);
