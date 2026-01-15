// Shared JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tooltips for share buttons
    const shareButtons = document.querySelectorAll('[data-share]');
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real app, this would implement actual sharing functionality
            alert('Share link copied to clipboard!');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // uploading  pic logic 
    const fileInput = document.getElementById("photos");
    const previewContainer = document.getElementById("preview-container");
    const addBtn = document.getElementById("addPhotosBtn");

    const MAX_FILES = 5;
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    let selectedFiles = [];

    if (!fileInput || !previewContainer || !addBtn) return;

    addBtn.onclick = () => fileInput.click();

    fileInput.addEventListener("change", () => {
        const files = Array.from(fileInput.files);

        for (const file of files) {
            if (selectedFiles.length >= MAX_FILES) {
                alert("You can upload a maximum of 5 images.");
                break;
            }

            if (file.size > MAX_SIZE) {
                alert(`${file.name} exceeds 5MB.`);
                continue;
            }

            if (!selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
                selectedFiles.push(file);
            }
            
        }

        updateFileInput();
        renderPreview();

    });

    function updateFileInput() {
        const dataTransfer = new DataTransfer();

        selectedFiles.forEach(file => {
            dataTransfer.items.add(file);
        });

        fileInput.files = dataTransfer.files;
    }
    
    
    function renderPreview() {
        previewContainer.innerHTML = "";

        selectedFiles.forEach((file, index) => {
            const reader = new FileReader();

            reader.onload = e => {
                const wrapper = document.createElement("div");
                wrapper.className = "relative group";

                wrapper.innerHTML = `
                    <img src="${e.target.result}"
                        class="w-full h-24 object-cover rounded shadow">

                    <button
                        type="button"
                        class="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                        data-index="${index}">
                        X
                    </button>
                `;

                wrapper.querySelector("button").onclick = () => {
                    selectedFiles.splice(index, 1);
                    updateFileInput();
                    renderPreview();
                };

                previewContainer.appendChild(wrapper);
            };

            reader.readAsDataURL(file);
        });

        addBtn.disabled = selectedFiles.length >= MAX_FILES;
        addBtn.classList.toggle("opacity-50", addBtn.disabled);
    }


    feather.replace();
});