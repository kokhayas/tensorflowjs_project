import cosSimilarity from "cos-similarity";
import React, { useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import './App.css';
import copyJson from "./data/copy.json";
import datastructure from "./data/datastructure.json";
import datastructureSimple from "./data/datastructure_simple.json";
import allVectors from "./data/round.json";
import pic from "./utdslogo.png";

let t = "Peace is a journey of a thousand miles and it must be taken one step at a time.";

let nationalHistory = new Array();
let internationalHistory = new Array();
export function Slide(props) {
	if (props.flag)
	return (
		<div className="slide">{props.flag}</div>
	)
	else {
		return (<></>);
	}
}
export function NationalModal(props) {
	let json_dict = datastructure["national"][props.index]
if (true){
return (
		<div className="sets" key={props.index}>
		<div className="titles">{json_dict.title}</div>
			{
			Object.values(json_dict.rounds).map((e) => {
			return (
					<>
						<div className="set">
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
						</div>
					</>
					);
				}
			)
		}
		<div className="index">{props.index}/{datastructure["national"].length}</div>
		</div>
	);}
	else {
		return (<></>);
	}
}
export function InternationalModal(props) {
	let json_dict = datastructure["international"][props.index]
if (true){
return (
		<div className="sets" key={props.index}>
		<div className="titles">{json_dict.title}</div>
			{
			Object.values(json_dict.rounds).map((e) => {
			return (
					<>
						<div className="set">
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
						</div>
					</>
					);
				}
			)
		}
		<div className="index">{props.index}/{datastructure["international"].length}</div>

		</div>
	);}
	else {
		return (<></>);
	}
}

export function SearchModal(props) {
	// if (isClicked){
	if (true) {
		return (
		<div className="sets">{
			props.ranks.map((e) => {
			return (
		<>
			<div className="set">
				<div className="parant">
					<div className="child1">
					<div className="title">
						{
						datastructureSimple.data.find((v) => v.id==e).title + " / " + datastructureSimple.data.find((v) => v.id==e).round
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
			</div>
		</>
			);}
			)
		}
		</div>
		);
	} else {
		return (<></>);
	}
}

interface AppProps {}
function App({}: AppProps) {
	// let t = "World-peace can be achieved when the power of love replaces the love of power"

	const [text, setText] = useState(t);
	const [ranks, setRanks] = useState<Array<number>>([]);
	const [isClicked, setIsClicked] = useState(false);
	const [nationalIndex, setNationalIndex] = useState(0);
	const [internationalIndex, setInternationalIndex] = useState(0);
	const [value, copy] = useCopyToClipboard()
	const [nationalIsClicked, setNationalIsClicked] = useState(true);
	const [internationalIsClicked, setInternationalIsClicked] = useState(true);
	const [isWaiting, setIsWaiting] = useState(false);
	const [l, setL] = useState(10);
	const [Length, setLLength] = useState(10);
	const [isSearch, setIsSearch] = useState(false);

	function text2embed() {
		if (true) {
		use.load().then(model => {
			const sentences = [text];
			model.embed(sentences).then(async embeddings => {
			embeddings.print(true);
			let vec = await embeddings.array();
			let similarities = {}
			let similarity = -1;
			for (let i = 0; i<allVectors.length; i++) {
				let vecs = allVectors[i];
				similarity = cosSimilarity(vec[0], vecs);
				similarities[i] = similarity;}
			let arr = similarities;
			var keys=[];
			for(let key in arr) keys.push(key);
				function compare(a, b) {
				return arr[b] - arr[a];}
			let result = [];
			keys.sort(compare);
			// ここのLengthを変える
			for(let i=0; i<	l; i++){
				result.push(keys[i]); }
			setRanks(result);
			});
		});
	}}

	function handleClick() {
		setLLength(l);
		setIsWaiting(true)
		setIsClicked(!isClicked);
		text2embed();
		setIsWaiting(false);
		}


	function handleNationalClick() {
		setNationalIndex(Math.floor(Math.random()*datastructure["national"].length));
		nationalHistory.push(nationalIndex);
		setNationalIsClicked(!nationalIsClicked);
	}
	function handleInternationalClick() {
		setInternationalIndex(Math.floor(Math.random()*datastructure["international"].length));
		internationalHistory.push(internationalIndex);
		setInternationalIsClicked(!internationalIsClicked);
	}

	function handleNationalBackwardClick() {
		setNationalIndex(nationalHistory.pop());
	}

	function handleInternationalBackwardClick() {
		setInternationalIndex(internationalHistory.pop());
	}


  return (
	<div className="App">
		<div className="picParent"><img src={pic} alt="picture"/></div>

	<div className="flex">
		<button className="backward" onClick = {handleNationalBackwardClick}>back</button>
        <button className="button" onClick={() => {handleNationalClick();}}>national motion</button>
        <button className="copy" onClick={() => copy(copyJson[nationalIndex])}>copy</button>
	</div>
		<NationalModal className="nationalModal" index={nationalIndex} flag={nationalIsClicked} type={"national"} />
        {/* <div className="index">{nationalIndex}/{datastructure["national"].length}</div> */}

	<div className="flex">
		<button className="backward" onClick = {handleInternationalBackwardClick}>back</button>
        <button className="button" onClick={() => {handleInternationalClick();}}>international motion</button>
        <button className="copy" onClick={() => copy(copyJson[internationalIndex + datastructure["national"].length - 1])}>copy</button>
	</div>
		<InternationalModal className="internationalModal" index={internationalIndex} flag={internationalIsClicked} type={"international"} />
        {/* <div className="index">{internationalIndex}/{datastructure["international"].length}</div> */}


		<div className="parent-input-button">
			<input className="searchInput" type="text" onChange = {(e) => {setText(e.target.value)}} value={text} />
			<button className="search" onClick={ handleClick } disabled={ isWaiting }>search</button>
		</div>
		<div className="searchName">{ text }</div>
		<SearchModal className="searchModal" isClicked={isClicked} ranks={ranks}  />
		<div>{ isClicked && !isWaiting ? <input className="length" type="text" placeholder="10" onChange={e => setL(Number(e.target.value))} value={l} /> : <></>} </div>


	<p className="explain">motion search engine created by utds member by using sentence bert embedding</p>
	<p> The University of Tokyo, Debating Society. UTDS</p>
	<p>motions are gathered from utds website http://resources.tokyodebate.org/debate-motion/motion/</p>
	<br></br>
	</div>
	);
}

export default App;

