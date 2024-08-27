import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import debounce from 'lodash/debounce';
import { manageInstances } from '../utils/component';

// Mapping toolbar command and is active
const toolbarConfig = {
  bold: {
    command: (editor) => editor.toggleBold(),
    isActive: (editor) => editor.isActive('bold'),
  },
  italic: {
    command: (editor) => editor.toggleItalic(),
    isActive: (editor) => editor.isActive('italic'),
  },
  underline: {
    command: (editor) => editor.toggleUnderline(),
    isActive: (editor) => editor.isActive('underline'),
  },
  textAlignLeft: {
    command: (editor) => editor.setTextAlign('left'),
    isActive: (editor) => editor.isActive({ textAlign: 'left' }),
  },
  textAlignCenter: {
    command: (editor) => editor.setTextAlign('center'),
    isActive: (editor) => editor.isActive({ textAlign: 'center' }),
  },
  textAlignRight: {
    command: (editor) => editor.setTextAlign('right'),
    isActive: (editor) => editor.isActive({ textAlign: 'right' }),
  },
  textAlignJustify: {
    command: (editor) => editor.setTextAlign('justify'),
    isActive: (editor) => editor.isActive({ textAlign: 'justify' }),
  },
  ol: {
    command: (editor) => editor.toggleOrderedList(),
    isActive: (editor) => editor.isActive('orderedList'),
  },
  ul: {
    command: (editor) => editor.toggleBulletList(),
    isActive: (editor) => editor.isActive('bulletList'),
  },
};

/**
 * Class definition
 */

class TextEditor {
  constructor(editorEl = null, options = {}) {
    this._editorEl = editorEl;
    this._options = options;
    this.editor = null;
    this._init();
  }

  /**
   * Destroy tiptap instance
   *
   * @returns {void}
   */
  dispose = () => {
    this.editor.destroy();
  };

  /**
   * Run Initialization
   *
   * @returns {void}
   */
  _init = () => {
    this._editorEl.classList.add('editor');

    this.editor = new Editor({
      element: this._editorEl.querySelector('.editor__body'),
      editorProps: this._options,
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['paragraph'],
        }),
        Underline,
      ],
      onSelectionUpdate: debounce(this._updateToolbarItemsState, 200, {
        leading: true,
        trailing: true,
      }),
    });

    this._updateToolbarItemsState();

    this._toolbarItems().forEach((toolbarItem) => {
      if (!(toolbarItem.dataset.toolbar in toolbarConfig)) return;
      const { command } = toolbarConfig[toolbarItem.dataset.toolbar];

      toolbarItem.addEventListener('click', (e) => {
        e.preventDefault();
        command(this.editor.chain().focus()).run();
        this._updateToolbarItemsState();
      });
    });
  };

  /**
   * Get editor toolbar elements
   *
   * @returns {Element[]}
   */
  _toolbarItems = () => {
    return this._editorEl.querySelectorAll('[data-toolbar]');
  };

  /**
   * Update each toolbar item active state
   *
   * @returns {void}
   */
  _updateToolbarItemsState = () => {
    this._toolbarItems().forEach((toolbarItem) => {
      if (!(toolbarItem.dataset.toolbar in toolbarConfig)) return;
      const { isActive } = toolbarConfig[toolbarItem.dataset.toolbar];
      if (isActive(this.editor)) {
        toolbarItem.classList.add('editor__toolbar__item--active');
      } else {
        toolbarItem.classList.remove('editor__toolbar__item--active');
      }
    });
  };
}

/**
 * Instance Manager
 */

const { getInstance, createInstance, getOrCreateInstance, destroyInstance } = manageInstances({
  create: (editorEl, options) => new TextEditor(editorEl, options),
  destroy: (instance) => instance.dispose(),
  iterable: true,
});

export default {
  getInstance,
  createInstance,
  getOrCreateInstance,
  destroyInstance,
};
