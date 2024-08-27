import crel from "crel";
import Fuse from "fuse.js";
import "@skewind/components/tabs";
import Icon from "@/js/components/icon";

let items;
let fuse;

// Building element items
const buildItems = (icons) => {
  return Object.keys(icons).map((name) => {
    const element = crel("a", {
      href: "javascript:;",
      class:
        "flex flex-col items-center justify-center gap-5 rounded bg-gray-50 p-5 shadow text-xs transform hover:scale-105 relative",
    });
    const icon = Icon.create(name, { class: "w-10 h-10" }, icons[name]);
    const text = crel("span", { class: "text-xs" }, name);
    element.innerHTML = icon.toSvg();
    element.appendChild(text);

    element.addEventListener("click", async () => {
      const copiedEl = crel(
        "span",
        {
          class:
            "absolute inset-0 flex items-center justify-center bg-gray-50 text-base font-semibold",
        },
        "Copied!",
      );
      await navigator.clipboard.writeText(name);
      element.appendChild(copiedEl);
      setTimeout(() => {
        copiedEl.remove();
      }, 1000);
    });

    return {
      name: name,
      vendor: icon.getVendor() + "__",
      element,
    };
  });
};

// Init
(async () => {
  // Load all icons
  const iconsJSON = await import("@/icons/icons.json?raw");
  const icons = JSON.parse(iconsJSON.default);

  // Build items once
  items = buildItems(icons);

  // Make items searchable
  fuse = new Fuse(items, {
    keys: ["name", "vendor"],
    threshold: 0.25,
  });

  initIndexView();
  initSearchView();
})();

/**
 * BEGIN: Index View
 */

const initIndexView = () => {
  const iconTabsEl = document.querySelector("#iconTabs");
  iconTabsEl.addEventListener("tabs.show", (e) => {
    const tab = e.detail.tab;
    renderTabContent(tab.targetEl.id);
  });

  renderTabContent("feather");
};

const renderTabContent = (vendor) => {
  const tabContentEl = document.querySelector(`#${vendor}`);
  if (!!tabContentEl.innerHTML) {
    return;
  }

  let param = vendor;
  if (vendor === "heroicons") {
    param = {
      $or: [{ name: "heroiconsOutline__" }, { name: "heroiconsSolid__" }],
    };
  }

  if (vendor === "material") {
    param = "mdOutline__";
  }

  if (vendor === "flatcolor") {
    param = "fc__";
  }

  const results = fuse.search(param);
  results.forEach((each) => tabContentEl.appendChild(each.item.element));
};

/**
 * BEGIN: Search View
 */
const searchResultsEl = document.querySelector("#searchResults");
const searchForm = document.querySelector("#searchForm");
const indexView = document.querySelector("#indexView");

const initSearchView = () => {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    renderToSearchResults(e.target.q.value);
  });

  searchInput.addEventListener("blur", (e) => {
    renderToSearchResults(e.target.value);
  });

  renderToSearchResults();
};

const renderToSearchResults = (keyword = "") => {
  if (!keyword) {
    indexView.classList.remove("hidden");
    searchResultsEl.classList.add("hidden");
    return;
  }

  indexView.classList.add("hidden");
  searchResultsEl.classList.remove("hidden");
  searchResultsEl.innerHTML = "";

  const results = fuse.search(keyword);
  if (results.length) {
    results.forEach((each) => searchResultsEl.appendChild(each.item.element));
  } else {
    searchResultsEl.innerHTML = `<div>
      Icon '${keyword}' not found. Try changing the keyword.
    </div>`;
  }
};
