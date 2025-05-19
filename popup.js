document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("analyzer-list");
  const addBtn = document.getElementById("add");

  function renderAnalyzers(analyzers) {
    list.innerHTML = "";
    analyzers.forEach((analyzer, i) => {
      const container = document.createElement("div");
      container.className = "analyzer";
      container.innerHTML = `
        <input type="checkbox" id="enabled-${i}" ${analyzer.enabled ? "checked" : ""}>
        <input type="text" id="name-${i}" placeholder="Nazwa" value="${analyzer.name}">
        <input type="text" id="url-${i}" placeholder="Szablon URL (użyj {ioc})" value="${analyzer.urlTemplate}">
        <input type="text" id="types-${i}" placeholder="Obsługiwane typy (np. ip,hash)" value="${analyzer.supportedTypes.join(',')}">
      `;
      list.appendChild(container);
    });
  }

  chrome.storage.sync.get("analyzers", (data) => {
    const analyzers = data.analyzers || [];
    renderAnalyzers(analyzers);

    addBtn.addEventListener("click", () => {
      analyzers.push({
        name: "",
        urlTemplate: "",
        supportedTypes: ["ip"],
        enabled: true
      });
      renderAnalyzers(analyzers);
    });

    document.getElementById("save").addEventListener("click", () => {
      const updated = [];
      for (let i = 0; i < list.children.length; i++) {
        updated.push({
          name: document.getElementById(`name-${i}`).value,
          urlTemplate: document.getElementById(`url-${i}`).value,
          enabled: document.getElementById(`enabled-${i}`).checked,
          supportedTypes: document.getElementById(`types-${i}`).value.split(",").map(x => x.trim())
        });
      }

      chrome.storage.sync.set({ analyzers: updated }, () => {
        alert("Zapisano!");
      });
    });
  });
});