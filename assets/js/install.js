const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      const label = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = label;
      }, 1200);
    } catch {
      button.textContent = "Copy manually";
    }
  });
});
