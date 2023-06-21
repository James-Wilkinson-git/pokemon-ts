import { p as e, b as t } from "./p-d5c7ef4d.js";
export { s as setNonce } from "./p-d5c7ef4d.js";
const o = () => {
    const t = import.meta.url;
    const o = {};
    if (t !== "") {
        o.resourcesUrl = new URL(".", t).href;
    }
    return e(o);
};
o().then((e) =>
    t(
        [
            [
                "p-3c116622",
                [
                    [
                        1,
                        "pokemon-entry",
                        {
                            name: [1],
                            img: [1],
                            hp: [1],
                            attack: [1],
                            defense: [1],
                        },
                    ],
                ],
            ],
        ],
        e
    )
);
//# sourceMappingURL=pokemon-stencil.esm.js.map
