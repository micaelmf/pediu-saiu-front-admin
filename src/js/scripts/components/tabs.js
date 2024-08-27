import '../demo';
import Icon from '@/js/components/icon';
import Tabs from '@skewind/components/tabs';

/**
 * BEGIN: Navigation Tabs Example
 */
(() => {
  const exampleCodeContent = document.getElementById('exampleTabsCodeContent');
  const exampleForm = document.getElementById('tabsExampleForm');

  const updateExampleCodeContent = () => {
    const withIcon = exampleForm.with_icon.checked;

    const code = `
      <ul class="tabs ${exampleForm.variant.value}" role="tablist">
        <li role="presentation">
          <a href="#" class="tab tab--active">${
            withIcon
              ? `
            <i data-icon="feather__user" class="w-5 h-5"></i>`
              : ``
          }
            Profile
          </a>
        </li>
        <li role="presentation">
          <a href="#" class="tab">${
            withIcon
              ? `
            <i data-icon="feather__barChart2" class="w-5 h-5"></i>`
              : ``
          }
            Dashboard
          </a>
        </li>
        <li role="presentation">
          <a href="#" class="tab">${
            withIcon
              ? `
            <i data-icon="feather__settings" class="w-5 h-5"></i>`
              : ``
          }
            Settings
          </a>
        </li>
        <li role="presentation">
          <a href="#" class="tab">${
            withIcon
              ? `
            <i data-icon="feather__users" class="w-5 h-5"></i>`
              : ``
          }
            Contacts
          </a>
        </li>
      </ul>
    `;

    exampleCodeContent.innerHTML = code;
  };

  exampleForm.querySelectorAll('input').forEach((inputEl) => {
    inputEl.addEventListener('change', updateExampleCodeContent);
  });

  updateExampleCodeContent();

  const exampleTabsPreview = document.querySelector('#exampleTabsPreview');
  const exampleTabsCode = document.querySelector('#exampleTabsCode');
  exampleTabsCode.addEventListener('highlight.change', (e) => {
    exampleTabsPreview.innerHTML = e.detail.code;
    Icon.replace(exampleTabsPreview);
  });
})();

/**
 * BEGIN: Interactive Tabs Example
 */
(() => {
  const exampleCodeContent = document.getElementById('exampleInteractiveTabsCodeContent');
  const exampleForm = document.getElementById('interactiveTabsExampleForm');
  let tabInstance = null;

  const updateExampleCodeContent = () => {
    const withIcon = exampleForm.with_icon.checked;

    const code = `
      <ul id="interactiveTabs" class="tabs ${exampleForm.variant.value}" data-tabs-toggle role="tablist">
        <li role="presentation">
          <button class="tab" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">${
            withIcon
              ? `
            <i data-icon="feather__user" class="w-5 h-5"></i>`
              : ``
          }
            Profile
          </button>
        </li>
        <li role="presentation">
          <button class="tab" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">${
            withIcon
              ? `
            <i data-icon="feather__barChart2" class="w-5 h-5"></i>`
              : ``
          }
            Dashboard
          </button>
        </li>
        <li role="presentation">
          <button class="tab" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">${
            withIcon
              ? `
            <i data-icon="feather__settings" class="w-5 h-5"></i>`
              : ``
          }
            Settings
          </button>
        </li>
        <li role="presentation">
          <button class="tab" id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">${
            withIcon
              ? `
            <i data-icon="feather__users" class="w-5 h-5"></i>`
              : ``
          }
            Contacts
          </button>
        </li>
      </ul>
      <div class="mt-5 px-5">
        <div id="profile" role="tabpanel" aria-labelledby="profile-tab">
            Profile content...
        </div>
        <div id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
          Dashboard content...
        </div>
        <div id="settings" role="tabpanel" aria-labelledby="settings-tab">
          Settings content...
        </div>
        <div id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
          Contacts content...
        </div>
      </div>
    `;

    exampleCodeContent.innerHTML = code;
  };

  exampleForm.querySelectorAll('input').forEach((inputEl) => {
    inputEl.addEventListener('change', updateExampleCodeContent);
  });

  updateExampleCodeContent();

  const exampleTabsPreview = document.querySelector('#exampleInteractiveTabsPreview');
  const exampleTabsCode = document.querySelector('#exampleInteractiveTabsCode');
  exampleTabsCode.addEventListener('highlight.change', (e) => {
    if (tabInstance) {
      tabInstance.dispose();
    }

    exampleTabsPreview.innerHTML = e.detail.code;
    Icon.replace(exampleTabsPreview);
    Tabs.dataApi(exampleTabsPreview);
    tabInstance = Tabs.getInstance(exampleTabsPreview.querySelector('#interactiveTabs'));
  });
})();
