import React, { useState } from 'react';
import './App.css';
function App() {
	// initialize the hooks
	let [value, setValue] = useState({
		length_one: 0,
		quantity_one: 0,
		length_two: 0,
		quantity_two: 0,
		min_needed_rebar: 0,
		error: '',
		isError: false,
	});
	// handel each input changes
	const handelChange = (e) => {
		setValue({
			...value,
			[e.target.name]: parseInt(e.target.value),
		});
	};
	// handel overall calculation
	const handelCalculation = () => {
		const { length_one, quantity_one, length_two, quantity_two } = value;

		let standartRebar = 12; //standard rebar or reinforcement is 12 meter
		let length_quantity_one = length_one * quantity_one; //the product of the first length and quantity
		let length_quantity_two = length_two * quantity_two; // the product of the second length and quantity

		if (
			!(
				length_one < 0 || //check if the input value less than zero
				length_two < 0 ||
				quantity_one < 0 ||
				quantity_two < 0
			)
		) {
			let cntr_one = 1; // the counter for the first two fields i.e length one and quantity one
			if (length_quantity_one !== 0) {
				//checks the input field haveValue or not
				if (length_quantity_one > standartRebar) {
					while (length_quantity_one > standartRebar) {
						length_quantity_one = length_quantity_one - standartRebar; //subtract standard rebar (12) from the product (4*10)
						cntr_one++;
					}
					setValue({ ...value, min_needed_rebar: cntr_one }); //assign the counter to min needed rebar
				} else {
					setValue({ ...value, min_needed_rebar: cntr_one }); // if the value less than the standard rebar
				}
			} else {
				setValue({
					error: 'You Entered Zero Value! Please try again!',
					isError: true,
				});
			}

			let cntr_two = 1; //The counter for the second two fields i.e length two and quantity two
			if (length_quantity_two !== 0) {
				//checks for the last two fields haveValue differ from 0 zero

				if (length_quantity_two > standartRebar) {
					while (length_quantity_two > standartRebar) {
						length_quantity_two = length_quantity_two - standartRebar; //subtract standard rebar (12) from the product (4*10)
						cntr_two++;
					}
					setValue({ ...value, min_needed_rebar: cntr_one + cntr_two }); //assign the counter to min needed rebar
				} else {
					setValue({ ...value, min_needed_rebar: cntr_one + cntr_two }); //assign the counter to min needed rebar if the value of the last two field is less than standard rebar
				}
			} else {
				setValue({
					error: 'You Entered Zero Value! Please try again!',
					isError: true,
				});
			}
		} else {
			setValue({
				error: 'You Entered Negative Value! Please try again!',
				isError: true,
			});
		}
	};
	return (
		<div className="App">
			<nav className="navbar navbar-light bg-light">
				<a className="navbar-brand" href="#">
					<img src="/favicon.ico" width="100" height="30" alt="" />
				</a>
			</nav>
			<div className="container">
				<div className="row">
					<div className="col-lg-4"></div>
					<div className="col-lg-4">
						<h4>Length One</h4>
						<input
							type="number"
							name="length_one"
							placeholder="hhhhh"
							value={value.length_one}
							onChange={handelChange}
						/>
						<br />
						<br />
						<h4>Quantity_one </h4>
						<input
							type="number"
							name="quantity_one"
							value={value.quantity_one}
							onChange={handelChange}
						/>
						<br />
						<br />

						<h4>Length Two</h4>
						<input
							type="number"
							name="length_two"
							value={value.length_two}
							onChange={handelChange}
						/>
						<br />
						<br />

						<h4>Quantity_two</h4>
						<input
							type="number"
							name="quantity_two"
							value={value.quantity_two}
							onChange={handelChange}
						/>
						<br />
						<br />
						<div>
							<h4>Minimum Needed Rebar</h4>
							{value.min_needed_rebar}
						</div>

						<br />
						<br />
						<button
							className="btn btn-primary mb-2"
							onClick={handelCalculation}
						>
							Calculate
						</button>
						{value.isError ? (
							<div className="alert alert-danger" role="alert">
								{value.error}
							</div>
						) : (
							''
						)}
					</div>
					<div className="col-lg-4"></div>
				</div>
			</div>
		</div>
	);
}

export default App;
