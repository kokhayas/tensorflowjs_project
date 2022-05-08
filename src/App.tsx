//
// import { useCopyToClipboard } from 'usehooks-ts';
import cosSimilarity from "cos-similarity";
import React, { useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import './App.css';
import allVectors from "./data/allVectors.json";
import copyJson from "./data/copy.json";
import datastructure from "./data/datastructure.json";
import datastructureSimple from "./data/datastructure_simple.json";
import pic from "./utdslogo.png";

let nationalHistory = new Array();
let internationalHistory = new Array();

// console.log(datastructure["national"][0]["rounds"]);
export function Slide(props) {
	if (props.flag)
	return (
		<div className="slide">{props.flag}</div>
	)
	else {
		return (<></>);
	}
}
// export function Slide2(props) {
// 	if (props.flag)
// 	return (
// 		<div className="slide">{props.flag}</div>
// 	)
// 	else {
// 		return (<></>);
// 	}
// }

export function NationalModal(props) {
	let json_dict = datastructure["national"][props.index]
if (props.flag){
return (
		<ol className="sets" key={props.index}>{
			Object.values(json_dict.rounds).map((e) => {
			return (
				// <div>{e.motion}</div>

					<>
						<li className="set">
							<div className="parant">
								<div className="child1">
								<div className="title2">
									{
									e.round
									}
								</div>
									<div className="motion2">
										{
										e.motion
										}
									</div>
									<Slide flag={e.slide} />
								</div>
							</div>
						</li>
					</>
					);
				}
			)
		}
		</ol>
	);}
	else {
		return (<></>);
	}

}



export function SearchModal(props) {
	if (true) {
		return (
		<ol className="sets">{
			props.ranks.map((e) => {
			return (
		<>
			<li className="set">
				<div className="parant">
					<div className="child1">
					<div className="title">
						{
						datastructureSimple.data.find((v) => v.id==e).title + " " + datastructureSimple.data.find((v) => v.id==e).round
						}
					</div>
						<div className="motion">
							{
							datastructureSimple.data.find((v) => v.id==e).motion
							}
						</div>
						<Slide flag={datastructureSimple.data.find((v) => v.id==e).slide} />
					</div>
				</div>
			</li>
		</>
			);}
			)
		}
		</ol>
		);
	} else {
		return (<></>);
	}
}

interface AppProps {}
function App({}: AppProps) {

	const [text, setText] = useState("search engine");
	const [ranks, setRanks] = useState<Array<number>>([]);
	// const [close, setClose] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [nationalIndex, setNationalIndex] = useState(0);
	const [internationalIndex, setInternationalIndex] = useState(6000);
	const [value, copy] = useCopyToClipboard()
	const [nationalIsClicked, setNationalIsClicked] = useState(true);
	const [internationalIsClicked, setInternationalIsClicked] = useState(true);

	function text2embed() {
		use.load().then(model => {
		// Embed an array of sentences.
			const sentences = [
				text
			];
			// console.log(text);
			model.embed(sentences).then(async embeddings => {
			embeddings.print(true /* verbose */);
			let vec = await embeddings.array();
			// vec, allVectors　との間でranking
			let similarities = {}
			let similarity = -1;
			// console.log(allVectors[0]);
			// console.log(allVectors.length);
			let length = allVectors.length;

			for (let i = 0; i<length; i++){
				// console.log(vec)
				// console.log(allVectors[i]);
				let vecs = allVectors[i];
				similarity = cosSimilarity(vec[0], vecs);
				// similarity = cosSimilarity([1, 2, 3], [2, 3, 4]);
///////////////////////
				// console.log(similarity);
				similarities[i] = similarity;
			}

			let arr = similarities;
			var keys=[];
			for(let key in arr) keys.push(key);
			function compare(a, b){
				return arr[b] - arr[a];
			}
			let result = [];
			keys.sort(compare);
			for(let i=0; i<100; i++){
				result.push(keys[i]);
			}
			setRanks(result);
			});
		});
	}


	function handleClick() {
		text2embed();
		setIsClicked(!isClicked);
	}

	function handleNationalClick() {
		setNationalIndex(Math.floor(Math.random()*datastructure["national"].length));
		nationalHistory.push(nationalIndex);
		setNationalIsClicked(!nationalIsClicked);
	}
	function handleInterNationalClick() {
		setInternationalIndex(Math.floor(Math.random()*datastructure["international"].length));
		internationalHistory.push(internationalIndex);
	}



  return (
	<div className="App">
		<div className="picParent"><img src={pic} alt="picture"/></div>
		<input className="searchInput" type="text" onChange = {(e) => {setText(e.target.value)}} value={text} />
		<button className="search" onClick={ handleClick }>similarity</button>
		{/* {ranks.map((e) => {return (<div>{e}</div>); })} */}
		<div className="searchName">{ text }</div>

		{/* <CloseModal className="closeModal" isClicked={isClicked} */}
		<SearchModal className="searchModal" isClicked={isClicked} ranks={ranks}  />


{/* random motion */}
		<br></br>
		<br></br>


		{/* <button className="backward" onClick = {handleNationalBackwardClick}>戻る</button> */}
        <button className="button" onClick={() => {handleNationalClick(); setNationalIsClicked();}}>national motion</button>
        <button className="copy" onClick={() => copy(copyJson[nationalIndex])}>Copy</button>
        <div className="motion">{nationalIndex}</div>
		{/* <div className="nationalTitle">{datastructure[nationalIndex]["rounds"]["title"]}</div> */}
		<NationalModal className="nationalModal" index={nationalIndex} flag={nationalIsClicked} />


	<p className="explain">motion search engine using sentence bert embedding</p> <br></br> <p> The University of Tokyo, Debating Society. </p>
	</div>
	);
}

export default App;

