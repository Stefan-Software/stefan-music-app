export class custom_button extends HTMLElement {
    constructor() {
        super()
    }

    static get observedAttributes() {
        return []
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render()
    }

    render() {
        const href = this.getAttribute('href')
        const value = this.getAttribute('value')
        this.innerHTML = `
            <div class="button-div">
                <div class="button-div-container">
                    <a href=${href}>
                        <p>${value}</p>
                    </a>
                </div>
            </div>
        `
    }
}