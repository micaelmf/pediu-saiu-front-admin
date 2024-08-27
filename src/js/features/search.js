import RichSelect from "@skewind/components/richSelect";
import Backdrop from "@skewind/utils/backdrop";
import Icon from "@/js/components/icon";

/**
 * Class definition
 */

class Search {
  constructor(selectEl) {
    this._selectEl = selectEl;
    this._navbarEl = document.querySelector(".navbar");
    this._mainEl = document.querySelector(".main");

    // Create backdrop instance
    this._backdrop = new Backdrop(this._mainEl, {
      class: "main-backdrop",
    });

    // Create richselect instance
    this.tomSelect = RichSelect.getOrCreateInstance(selectEl, {
      valueField: "url",
      labelField: "name",
      searchField: "name",
      placeholder: "Search...",
      openOnFocus: false,
      highlight: false,
      onFocus: () => this._navbarEl.classList.add("search-mode"),
      onBlur: () => this._navbarEl.classList.remove("search-mode"),
      onDropdownOpen: () => this._backdrop.show(),
      onDropdownClose: () => this._backdrop.hide(),
      onChange: (value) => (window.location.href = value),

      // fetch remote data
      load: this._queries,

      // custom rendering functions for options and items
      render: {
        loading() {
          return `<div class="py-3 px-6">Loading...</div>`;
        },
        option(item, escape) {
          // Is pages
          if (item.type === "page") {
            const pageIcon = Icon.create(item.icon);

            return `<div class="flex items-center">
              <span class="w-8 h-8 flex items-center justify-center text-gray-500">
                ${pageIcon.toSvg()}
              </span>
              <div class="px-3 flex-1 leading-tight text-gray-500">
                <span class="text-sm font-bold">${escape(item.name)}</span><br />
                <small class="text-xs">${item.url}</small>
              </div>
              <span class="badge scheme-gray">Page</span>
            </div>`;
          }

          return ``;
        },
      },
    });
  }

  /**
   * Perform queries to server
   *
   * @param {string} query
   * @param {Function} callback
   */
  _queries = (query, callback) => {
    var url = "/search.json?q=" + encodeURIComponent(query);
    fetch(url)
      .then((response) => response.json())
      .then((items) => {
        callback(items);
      })
      .catch(() => {
        callback();
      });
  };
}

/**
 * Single instance
 */
let instance;

const init = () => {
  // Creating instance
  const selectEl = document.querySelector("#tomSearch");
  if (!selectEl) return;

  instance = new Search(selectEl);
};

if (document.readyState && document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
}

export default instance;
