import * as React from "react";

const style = require("./style/style.module.css");

export const Game = () => {
    return (
        <div className={style["game-view-container"]}>
            <div className={style["quest-text-left-column"]}>
                <div> <h3> Question A </h3></div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam dolores ducimus
                    explicabo molestiae necessitatibus neque numquam porro, tempora! At ea, esse iste mollitia quae quas
                    repellendus rerum sunt voluptatum?
                </div>
                <div>Architecto assumenda autem blanditiis culpa cum deserunt error esse fugit id laudantium nulla
                    perferendis porro, quaerat quas sequi suscipit vel velit vero, voluptas voluptates! Atque molestiae,
                    voluptatem. Earum, est laboriosam?
                </div>
                <div>A asperiores assumenda at blanditiis commodi, consectetur dicta distinctio doloribus esse
                    exercitationem facilis, itaque magni minus modi nihil nisi nobis nostrum quisquam saepe similique
                    temporibus veniam vitae! Iusto, quisquam, reiciendis.
                </div>
                <div>Dolor eos est ex impedit in labore, modi nemo nisi quos repellat, soluta tempora ut voluptates?
                    Adipisci, commodi explicabo facere impedit ipsa ipsum, necessitatibus nisi omnis quibusdam,
                    similique voluptate voluptatum.
                </div>
                <div>Culpa dolor ipsam iste, odit optio vitae. Aliquam aspernatur debitis deleniti, dignissimos, eveniet
                    facilis fuga minima nam necessitatibus nemo nobis non nostrum obcaecati porro provident quis rerum
                    sequi veritatis voluptate?
                </div>
                <div> <h3> Example Input/Output </h3></div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consectetur corporis, debitis
                    ducimus harum in, modi molestiae nulla porro repellendus rerum similique, sint sunt? Earum libero
                    molestiae rerum sed tempore.
                </div>
            </div>
            <div className={style["code-text-area"]}>
            </div>
        </div>
    );
};
