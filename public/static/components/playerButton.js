export class SongButton extends HTMLElement {
    constructor() {
        super()
    }

    static get observedAttributes() {
        return ['ico']
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render()
    }

    render() {
        const ico = this.getAttribute('ico')
        const onClick = this.getAttribute('onClick')
        this.innerHTML = `
            <img src="./static/ico/${ico}" class="playerbutton" onClick="${onClick}"></img>
        `
    }
}