import crel from "crel";
import Tooltip from "@skewind/components/tooltip";
import Icon from "@/js/components/icon";

/**
 * Class definition
 */

class Bookmark {
  constructor(wrapperEl, items) {
    this._wrapperEl = wrapperEl;
    this._items = [];
    this._activeItem = this._populateActiveItem();

    this._init(items);
  }

  /**
   * Add to bookmark
   *
   * @param {{
   *  name: {string}
   *  icon: {string}
   *  url: {string}
   * }} item
   */
  add = (item) => {
    const active = this._isItemActive(item);
    const itemEl = this._createItemElement(item, active);
    item.el = itemEl;
    this._items.push(item);
    this._wrapperEl.append(itemEl);

    if (active) {
      this._updateActiveUnbookmarked();
    }

    this._wrapperEl.dispatchEvent(
      new CustomEvent("bookmark.change", {
        detail: { items: this._items },
      }),
    );
  };

  /**
   * Remove item from bookmark
   *
   * @param {string} url
   */
  remove = (url) => {
    const item = this._items.find((eachItem) => eachItem.url == url);
    const index = this._items.indexOf(item);
    const active = this._isItemActive(this._items[index]);
    this._items.splice(index, 1);
    this._removeItemElement(item.el);

    if (active) {
      this._updateActiveUnbookmarked();
    }

    this._wrapperEl.dispatchEvent(
      new CustomEvent("bookmark.change", {
        detail: { items: this._items },
      }),
    );
  };

  /**
   * Build current page item
   *
   * @returns {{
   *  name: string
   *  icon: string
   *  url: string
   * }}
   */
  _populateActiveItem = () => {
    const name =
      document.querySelector('meta[name="title"]')?.content ??
      document.title ??
      "Untitled";
    const icon =
      document.querySelector('meta[name="icon"]')?.content ??
      "icon--feather_bookmark";
    const url = window.location.pathname + window.location.search;

    return { name, icon, url };
  };

  /**
   * Initialization
   *
   * @param {{
   *  name: string
   *  icon: string
   *  url: string
   * }[]} items
   * @returns {void}
   */
  _init = (items) => {
    items.forEach((item) => {
      this.add(item);
    });

    this._updateActiveUnbookmarked();
  };

  /**
   *
   * @param {{
   *  name: string
   *  icon: string
   *  url: string
   * }} item
   * @param {boolean} active
   * @returns {Element}
   */
  _createItemElement = (item, active = false) => {
    const linkEl = crel("a", { href: item.url, class: `navbar__icon-link` });
    linkEl.innerHTML = Icon.create(item.icon).toSvg();

    const deleteIconLinkEl = crel("a", {
      href: "javascript:;",
      title: "Unpin",
      class: "bookmark__delete",
    });
    deleteIconLinkEl.innerHTML = Icon.create("feather__x").toSvg();
    deleteIconLinkEl.addEventListener(
      "click",
      () => {
        this.remove(item.url);
      },
      { once: true },
    );

    const tooltipEl = crel(
      "div",
      { class: "bookmark__tooltip" },
      item.name,
      deleteIconLinkEl,
    );

    const itemEl = crel(
      "div",
      { class: `bookmark__item${active ? " bookmark__item--active" : ""}` },
      linkEl,
      tooltipEl,
    );

    Tooltip.getOrCreateInstance(linkEl, {
      content: tooltipEl,
      interactive: true,
      offset: [0, 5],
      appendTo: document.body,
    });

    return itemEl;
  };

  /**
   * Remove and dispose bookmarked item element
   *
   * @param {Element} itemEl
   */
  _removeItemElement = (itemEl) => {
    // Dispose tooltip before removing element
    const tooltip = Tooltip.getInstance(itemEl.firstElementChild);
    if (tooltip) {
      tooltip.dispose();
    }

    itemEl.remove();
  };

  /**
   * Check whther current active page is bookmarked
   *
   * @returns {boolean}
   */
  _activeIsBookmarked = () => {
    return (
      this._items.findIndex(
        (eachItem) => eachItem.url === this._activeItem.url,
      ) >= 0
    );
  };

  /**
   * Update unbookmarked element by its state
   *
   * @returns {void}
   */
  _updateActiveUnbookmarked = () => {
    let unbookmarkedItemEl = this._wrapperEl.querySelector(
      ".bookmark__item--unbookmarked",
    );
    if (unbookmarkedItemEl) {
      this._removeUnbookmarkedItemElement(unbookmarkedItemEl);
    }

    if (this._activeIsBookmarked()) return;

    unbookmarkedItemEl = this._createUnbookmarkedItemElement();
    this._wrapperEl.prepend(unbookmarkedItemEl);
  };

  /**
   * Create unbookmarked item element
   *
   * @returns {Element}
   */
  _createUnbookmarkedItemElement = () => {
    const linkEl = crel("a", {
      href: "javascript:;",
      class: `navbar__icon-link`,
    });
    linkEl.innerHTML = Icon.create(this._activeItem.icon).toSvg();
    linkEl.innerHTML += Icon.create("feather__plus").toSvg();
    linkEl.addEventListener("click", this._handleAddToBookmarkClick);

    const tooltipEl = crel(
      "div",
      { class: "bookmark__tooltip" },
      this._activeItem.name,
    );

    const itemEl = crel(
      "div",
      { class: `bookmark__item bookmark__item--unbookmarked` },
      linkEl,
      tooltipEl,
    );

    Tooltip.getOrCreateInstance(linkEl, {
      content: tooltipEl,
      offset: [0, 5],
      appendTo: document.body,
    });

    return itemEl;
  };

  /**
   * Remove unbookmarked item element
   *
   * @param {Element} unbookmarkedItemEl
   */
  _removeUnbookmarkedItemElement = (unbookmarkedItemEl) => {
    // Dispose tooltip before removing element
    const tooltip = Tooltip.getInstance(unbookmarkedItemEl.firstElementChild);
    if (tooltip) {
      tooltip.dispose();
    }

    // Remove add listener
    const addLinkEl = this._wrapperEl.querySelector(".navbar__icon-link");
    addLinkEl.removeEventListener("click", this._handleAddToBookmarkClick);

    unbookmarkedItemEl.remove();
  };

  /**
   * Handle add bookmark click event listener
   *
   * @returns {void}
   */
  _handleAddToBookmarkClick = () => {
    this.add(this._activeItem);
  };

  /**
   * Check whether certain item is currently active
   *
   * @param {{
   *  name: string
   *  icon: string
   *  url: string
   * }} item
   * @returns {boolean}
   */
  _isItemActive = (item) => {
    return this._activeItem.url === item.url;
  };
}

/**
 * Single instance
 */
let instance;

const init = () => {
  // Creating instance
  const bookmarkEl = document.getElementById("bookmark");
  if (!bookmarkEl) return;

  // Sample bookmark items from localStorage
  const items = [
    { name: "File Manager", icon: "feather__file", url: "/file-manager.html" },
    { name: "Chat", icon: "feather__messageSquare", url: "/chat.html" },
    { name: "Email", icon: "feather__mail", url: "/email.html" },
    { name: "Contacts", icon: "feather__users", url: "/contacts.html" },
  ];

  instance = new Bookmark(bookmarkEl, items);
  bookmarkEl.addEventListener("bookmark.change", (e) => {
    const items = e.detail.items;

    // Save items to localStorage or user database
    // console.log(items)
  });
};

if (document.readyState && document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
}

export default instance;
