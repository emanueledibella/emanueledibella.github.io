(() => {
    "use strict";

    const carousel = document.querySelector("[data-carousel]");
    const controls = document.querySelector("[data-carousel-controls]");
    const tabList = document.querySelector("[data-carousel-tabs]");

    if (carousel && controls && tabList) {
        const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
        const tabs = Array.from(tabList.querySelectorAll("[data-slide-tab]"));
        const counter = controls.querySelector("[data-slide-number]");
        const status = carousel.querySelector("[data-carousel-status]");
        let activeIndex = 0;

        const selectSlide = (index, { focusTab = false, announce = true } = {}) => {
            activeIndex = (index + slides.length) % slides.length;
            slides.forEach((slide, slideIndex) => {
                const selected = slideIndex === activeIndex;
                slide.hidden = !selected;
                slide.classList.toggle("is-entering", selected && announce);
                tabs[slideIndex].setAttribute("aria-selected", String(selected));
                tabs[slideIndex].tabIndex = selected ? 0 : -1;
            });
            counter.textContent = String(activeIndex + 1).padStart(2, "0");
            if (announce) {
                status.textContent = "Progetto " + (activeIndex + 1) + " di " + slides.length + ": " + slides[activeIndex].dataset.name + ".";
            }
            if (focusTab) tabs[activeIndex].focus();
        };

        carousel.classList.add("has-carousel");
        carousel.setAttribute("role", "region");
        tabList.setAttribute("role", "tablist");
        slides.forEach((slide, index) => {
            slide.setAttribute("role", "tabpanel");
            slide.setAttribute("aria-labelledby", tabs[index].id);
            tabs[index].setAttribute("role", "tab");
            tabs[index].addEventListener("click", () => selectSlide(index));
        });

        controls.querySelector("[data-previous]").addEventListener("click", () => selectSlide(activeIndex - 1));
        controls.querySelector("[data-next]").addEventListener("click", () => selectSlide(activeIndex + 1));
        tabList.addEventListener("keydown", (event) => {
            const positions = { ArrowRight: activeIndex + 1, ArrowLeft: activeIndex - 1, Home: 0, End: slides.length - 1 };
            if (!(event.key in positions)) return;
            event.preventDefault();
            selectSlide(positions[event.key], { focusTab: true });
        });

        carousel.querySelectorAll("[data-swipe-area]").forEach((area) => {
            let start = null;
            area.addEventListener("pointerdown", (event) => {
                if (!event.isPrimary || event.button !== 0 || event.target.closest("a")) return;
                start = { x: event.clientX, y: event.clientY, id: event.pointerId };
                area.setPointerCapture(event.pointerId);
            });
            area.addEventListener("pointerup", (event) => {
                if (!start || event.pointerId !== start.id) return;
                const deltaX = event.clientX - start.x;
                const deltaY = event.clientY - start.y;
                start = null;
                if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
                    selectSlide(activeIndex + (deltaX < 0 ? 1 : -1));
                }
            });
            area.addEventListener("pointercancel", () => { start = null; });
        });

        selectSlide(0, { announce: false });
        controls.hidden = false;
        tabList.hidden = false;
    }

    const filters = document.querySelector("[data-filters]");
    if (filters) {
        const buttons = Array.from(filters.querySelectorAll("[data-filter]"));
        const projects = Array.from(document.querySelectorAll("[data-category]"));
        const status = document.querySelector("[data-filter-status]");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const category = button.dataset.filter;
                let visibleCount = 0;
                projects.forEach((project) => {
                    const visible = category === "all" || project.dataset.category === category;
                    project.hidden = !visible;
                    if (visible) visibleCount += 1;
                });
                buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
                status.textContent = visibleCount + (visibleCount === 1 ? " progetto visualizzato." : " progetti visualizzati.");
            });
        });
        filters.hidden = false;
    }

    const year = document.querySelector("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());
})();
