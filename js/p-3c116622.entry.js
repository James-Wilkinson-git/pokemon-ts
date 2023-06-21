import { r as s, h as e } from "./p-d5c7ef4d.js";
const n =
    ".pokemon{border:1px dotted #666;display:block;padding:10px}.pokemon:hover{background-color:#ccc}.pokemon .img{display:block}.pokemon .name{text-transform:capitalize;display:block}.pokemon .hp,.pokemon .attack,.pokemon .defense{display:block;text-transform:uppercase}";
const o = class {
    constructor(e) {
        s(this, e);
        this.name = undefined;
        this.img = undefined;
        this.hp = undefined;
        this.attack = undefined;
        this.defense = undefined;
    }
    render() {
        return e(
            "div",
            { class: "pokemon" },
            e("span", { class: "img" }, e("img", { src: this.img, alt: "" })),
            e("span", { class: "name" }, this.name),
            e("span", { class: "hp" }, "HP : ", this.hp),
            e("span", { class: "attack" }, "Attack : ", this.attack),
            e("span", { class: "defense" }, "Defense : ", this.defense)
        );
    }
};
o.style = n;
export { o as pokemon_entry };
//# sourceMappingURL=p-3c116622.entry.js.map
