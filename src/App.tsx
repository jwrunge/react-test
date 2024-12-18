import { useState } from "react";
import { tabletopStyle } from "./style/tabletop.style";
import "./App.css";

function App() {
	type Banana = {
		id: number;
		side: "left" | "right";
	};

	const [bananas, setBananas] = useState(new Map<HTMLImageElement, Banana>());

	function transitionBanana(el: HTMLImageElement, fn: () => void) {
		el.style.viewTransitionName = el.id;

		if (document?.startViewTransition) {
			const animation = document?.startViewTransition(fn);

			animation?.finished?.then(() => {
				el.style.viewTransitionName = "";
			});
		} else {
			fn();
		}
	}

	function addBanana(to: "left" | "right") {
		const pileEl = document.querySelector(`#pile-${to}`);
		const id = Math.random();
		const banana = { id, side: to };
		const bananaEl = document.createElement("img");

		bananaEl.src = "banana.png";
		bananaEl.id = `banana-${id}`;
		pileEl?.appendChild(bananaEl);
		bananas.set(bananaEl, banana);
		setBananas(bananas);
	}

	function removeBanana(from: "left" | "right") {
		const pileEl = document.querySelector(`#pile-${from}`);
		const banana = Array.from(bananas).find((b) => b[1].side === from);

		if (banana) {
			pileEl?.removeChild(banana[0]);
			bananas.delete(banana[0]);
			setBananas(bananas);
		}
	}

	function tradeBanana(to: "left" | "right") {
		const from = to === "left" ? "right" : "left";
		const bananaRef = Array.from(bananas)
			.filter((b) => b?.[1].side === from)
			.at(-1);
		if (!bananaRef) return;

		const [bananaEl, banana] = bananaRef;
		if (banana) banana.side = to;

		transitionBanana(bananaEl, () => {
			const toPileEl = document.querySelector(`#pile-${to}`);
			toPileEl?.appendChild(bananaEl);
		});
	}

	return (
		<>
			<h1>React Banana Test</h1>
			<section id="instructions">
				<h2>Let's see what I remember about React</h2>
				<p>
					Some instructions: Adjust the counter to move bananas
					between piles.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Ratione, sed laudantium veniam harum consequatur totam
					itaque quod voluptas quasi vel eius fugit aliquid nesciunt,
					incidunt repudiandae consequuntur consectetur, amet modi?
				</p>
			</section>

			<section id="tabletop" style={tabletopStyle}>
				<div className="table-side">
					<h3>Pile 1</h3>
					<div className="pile" id="pile-left"></div>
					<div className="inc-dec">
						<button onClick={() => removeBanana("left")}>-</button>
						{/* <span>{Array.from(bananas).filter([_el, banana]=> banana.side === )?.length ?? 0}</span> */}
						<button onClick={() => addBanana("left")}>+</button>
					</div>
					<button onClick={() => tradeBanana("right")}>Move</button>
				</div>

				<div className="table-side">
					<h3>Pile 2</h3>
					<div className="pile" id="pile-right"></div>
					<div className="inc-dec">
						<button onClick={() => removeBanana("right")}>-</button>
						{/* <span>{Array.from(bananas).filter([_el, banana]=> banana.side === )?.length ?? 0}</span> */}
						<button onClick={() => addBanana("right")}>+</button>
					</div>
					<button onClick={() => tradeBanana("left")}>Move</button>
				</div>
			</section>
		</>
	);
}

export default App;
