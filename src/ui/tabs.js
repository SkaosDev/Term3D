function createTabs(element, pages) {
    const buttons = [...element.querySelectorAll("button")];
    const rendered = new Set();

    const select = (name) => {
        for (const button of buttons) {
            const isSelected = button.dataset.page === name;
            button.setAttribute("aria-selected", isSelected);
            document.getElementById(button.dataset.page).hidden = !isSelected;
        }

        if (rendered.has(name)) return;
        rendered.add(name);
        requestAnimationFrame(() => setTimeout(() => pages[name](document.getElementById(name))));
    };

    for (const button of buttons) {
        button.addEventListener("click", () => select(button.dataset.page));
    }

    select(element.querySelector("[aria-selected='true']").dataset.page);
}

export { createTabs };
