import Dropdown from '../components/dropdown';

// BEGIN: Set scroll to active sidebar nav item
const scrollToActiveSidebar = () => {
  const sidebarNavScroll = document.querySelector('#sidebarNavScroll');
  if (!sidebarNavScroll) return;

  const sidebarNavLevelItemActive = sidebarNavScroll.querySelector('.navigation-level__item--active');
  const sidebarNavItemActive = sidebarNavScroll.querySelector('.navigation__item--active');
  if (!sidebarNavItemActive) return;

  const calculateActiveScrollPosition = () => {
    const nav = sidebarNavLevelItemActive ?? sidebarNavItemActive;
    if (!nav) return;

    return nav.getBoundingClientRect().top - sidebarNavScroll.getBoundingClientRect().top - sidebarNavScroll.offsetHeight / 2 - nav.offsetHeight / 2;
  };

  const doScroll = () => {
    const sidebarNavScrollContainer = sidebarNavScroll.querySelector('.simplebar-content-wrapper');
    if (sidebarNavScrollContainer.scrollTo) {
      sidebarNavScrollContainer.scrollTo({
        top: calculateActiveScrollPosition(),
        behavior: 'smooth',
      });
      return;
    }
  };

  const collapseEl = sidebarNavItemActive.querySelector('.collapse');
  if (collapseEl) {
    // Calculate after the collapse element is shown
    collapseEl.addEventListener(
      'collapse.shown',
      () => {
        doScroll();
      },
      { once: true },
    );
  } else {
    doScroll();
  }
};

// Setup custom scroll for notifications & messages popover
const setCustomScrollForNotifAndMsg = () => {
  const messagesDropdownToggle = document.getElementById('messagesDropdownToggle');
  Dropdown.getInstance(messagesDropdownToggle)?.has(Scrollbar);

  const notificationsDropdownToggle = document.getElementById('notificationsDropdownToggle');
  Dropdown.getInstance(notificationsDropdownToggle)?.has(Scrollbar);
};

document.addEventListener('DOMContentLoaded', () => {
  scrollToActiveSidebar();
  setCustomScrollForNotifAndMsg();
});
