document.addEventListener('DOMContentLoaded', function () {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.accordion-header').forEach(h => {
                if (h !== this) {
                    h.classList.remove('active');
                    h.nextElementSibling.style.maxHeight = null;
                    h.nextElementSibling.style.padding = '0 1rem';
                }
            });

            // Toggle current item
            if (isActive) {
                this.classList.remove('active');
                content.style.maxHeight = null;
                content.style.padding = '0 1rem';
            } else {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.padding = '0 1rem 1rem 1rem';
            }
        });
    });
});
