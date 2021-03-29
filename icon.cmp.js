



class IconElement extends HTMLElement {
  static get observedAttributes() {
    return ['href', 'use'];
  }

  viewEngine = new ViewEngine()

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.viewEngine.getTemplate('/icon.tmpl.html').then(
      (template) => {
        this.shadowRoot.appendChild(template);

        this.shadowRoot.styleSheets.item(0).insertRule('svg path { fill:red; }', 2)
        const useEl = this.shadowRoot.querySelector('use');
        const href = `${ this['href'] }#${ this['use']} `
        
        useEl.setAttribute('xlink:href', href);
      }
    );
  }

  attributeChangedCallback( name, oldValue, newValue) {
    if (newValue !== oldValue) this[name] = newValue;
  }
}
